from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import logging
from contextlib import asynccontextmanager
import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Import Services
from db_service import DatabaseService
from llm_service import LLMExplainer
from feature_extractor import SentimentAnalyzer, extract_features
from database_models import Analysis
from api_schemas import AnalyzeRequest, AnalysisResultResponse, HistoryResponse, StatsResponse, HealthResponse

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mesdaq_api")

# Global State for ML Model
ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Load ML models on startup, clean up on shutdown
    """
    model_dir = os.path.dirname(os.path.abspath(__file__))
    logger.info(f"Loading AraBERT model from {model_dir}...")
    
    try:
        # Load model and tokenizer ONCE
        tokenizer = BertTokenizer.from_pretrained(model_dir)
        model = BertForSequenceClassification.from_pretrained(model_dir)
        model.eval()
        
        # Store in global state
        ml_models["tokenizer"] = tokenizer
        ml_models["model"] = model
        ml_models["sentiment_analyzer"] = SentimentAnalyzer(model=model, tokenizer=tokenizer)
        
        logger.info("AraBERT model loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load ML models: {e}")
        # We might want to raise here, but for now we'll log it.
        # Apps without model will fail on analysis but run health checks.
    
    yield
    
    # Cleanup if needed
    logger.info("Shutting down...")
    ml_models.clear()

app = FastAPI(title="Mesdaq AI API", version="1.0.0", lifespan=lifespan)

# CORS - Allow all for MVP
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services
db_service = DatabaseService()
llm_service = LLMExplainer()

def get_db():
    session = db_service.get_session()
    try:
        yield session
    finally:
        session.close()

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Check system health"""
    model_loaded = "model" in ml_models
    db_connected = True # DB checked on init
    try:
        # Verify DB connection
        db_service.get_statistics()
    except:
        db_connected = False
        
    return {
        "status": "healthy" if model_loaded and db_connected else "degraded",
        "model_loaded": model_loaded,
        "database_connected": db_connected,
        "llm_available": bool(llm_service.api_key),
        "version": "1.0.0"
    }

@app.post("/analyze", response_model=AnalysisResultResponse)
async def analyze_news(request: AnalyzeRequest, session = Depends(get_db)):
    """
    Main Analysis Endpoint:
    1. Extract features (Sentiment, Clickbait, NER)
    2. Classify (Fake/Real)
    3. Generate LLM Explanation
    """
    
    if "sentiment_analyzer" not in ml_models:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    analyzer = ml_models["sentiment_analyzer"]
    
    # 1. Run Inference (Fast)
    inputs = analyzer.tokenizer(request.news_text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = analyzer.model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)
        fake_prob = probs[0][0].item() # Assuming 0 is Fake/Negative
        real_prob = probs[0][1].item() # Assuming 1 is Real/Positive
        
        # Determine label
        is_fake = fake_prob > real_prob
        model_confidence = fake_prob if is_fake else real_prob
    
    # 2. Extract other features
    features = extract_features(request.news_text, sentiment_analyzer=analyzer)
    # features dict: sentiment, clickbait_analysis, ner_counts, total_words
    
    # 3. Calculate Credibility Score
    sentiment = features["sentiment"] 
    is_clickbait = features["clickbait_analysis"]["is_clickbait"]
    clickbait_keywords = ", ".join(features["clickbait_analysis"]["found_keywords"])
    
    entity_counts = features["ner_counts"]
    entity_total = sum(entity_counts.values())
    entity_diversity = min(1.0, entity_total / 10.0)
    
    # 4. Generate LLM Explanation
    explanation_text, p_tokens, c_tokens = llm_service.generate_explanation(
        news_text=request.news_text,
        is_fake=is_fake,
        model_confidence=model_confidence,
        sentiment=sentiment,
        is_clickbait=is_clickbait,
        entities=entity_counts
    )
    
    # 5. Calculate Final Score
    credibility_score = llm_service.calculate_credibility_score(
        is_fake=is_fake,
        model_confidence=model_confidence,
        sentiment=sentiment,
        is_clickbait=is_clickbait,
        entity_diversity=entity_diversity
    )
    
    # 6. Save to Database
    # Create Analysis
    analysis = db_service.create_analysis(
        news_text=request.news_text,
        is_fake=is_fake,
        credibility_score=credibility_score,
        explanation=explanation_text, 
        session=session
    )
    
    # Create Prediction
    db_service.create_prediction(
        analysis_id=analysis.id,
        model_confidence=model_confidence,
        logits_fake=outputs.logits[0][0].item(), 
        logits_real=outputs.logits[0][1].item(),
        sentiment=sentiment,
        is_clickbait=is_clickbait,
        clickbait_keywords=clickbait_keywords,
        entity_person_count=entity_counts.get("PER", 0),
        entity_org_count=entity_counts.get("ORG", 0),
        entity_loc_count=entity_counts.get("LOC", 0),
        word_count=features["total_words"],
        session=session
    )
    
    # Create Explanation Metadata
    db_service.create_explanation(
        analysis_id=analysis.id,
        llm_model=llm_service.model,
        llm_provider="openrouter",
        raw_explanation=explanation_text,
        prompt_tokens=p_tokens,
        completion_tokens=c_tokens,
        session=session
    )
    
    # Update stats
    db_service.update_daily_stats(session=session)
    
    # 7. Construct Response
    return AnalysisResultResponse(
        analysis_id=analysis.id,
        is_fake=is_fake,
        credibility_score=credibility_score,
        explanation=explanation_text,
        prediction_details={
            "model_confidence": model_confidence,
            "logits_fake": outputs.logits[0][0].item(),
            "logits_real": outputs.logits[0][1].item(),
            "sentiment": sentiment,
            "is_clickbait": is_clickbait,
            "clickbait_keywords": clickbait_keywords,
            "entity_person_count": entity_counts.get("PER", 0),
            "entity_org_count": entity_counts.get("ORG", 0),
            "entity_loc_count": entity_counts.get("LOC", 0),
            "word_count": features["total_words"]
        },
        explanation_data={
            "llm_model": llm_service.model,
            "llm_provider": "openrouter",
            "explanation": explanation_text,
            "prompt_tokens": p_tokens,
            "completion_tokens": c_tokens
        },
        created_at=analysis.created_at
    )

@app.get("/history", response_model=HistoryResponse)
async def get_history(limit: int = 20, offset: int = 0, session = Depends(get_db)):
    items, total = db_service.get_analyses_paginated(limit, offset, session)
    
    # Convert to response format
    history_items = []
    for item in items:
        history_items.append({
            "analysis_id": item.id,
            "news_text": item.news_text[:100] + "..." if len(item.news_text) > 100 else item.news_text,
            "is_fake": item.is_fake,
            "credibility_score": item.credibility_score,
            "created_at": item.created_at
        })
        
    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "items": history_items
    }

@app.get("/stats", response_model=StatsResponse)
async def get_stats(session = Depends(get_db)):
    return db_service.get_statistics(session)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
