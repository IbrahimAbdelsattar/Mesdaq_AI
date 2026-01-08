"""
Pydantic Schemas for API Request/Response validation
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    """Request schema for news analysis endpoint"""
    news_text: str = Field(..., min_length=10, max_length=5000, description="Arabic news text to analyze")
    
    class Config:
        json_schema_extra = {
            "example": {
                "news_text": "هذا خبر عن حادثة في الشرق الأوسط"
            }
        }

class PredictionResponse(BaseModel):
    """Response schema for ML model predictions"""
    model_confidence: float = Field(..., ge=0, le=1, description="Model confidence 0-1")
    logits_fake: float = Field(..., description="Fake logit value")
    logits_real: float = Field(..., description="Real logit value")
    sentiment: str = Field(..., description="Sentiment: positive, negative, neutral")
    is_clickbait: bool = Field(..., description="Whether text is clickbait")
    clickbait_keywords: Optional[str] = Field(None, description="Detected clickbait keywords")
    entity_person_count: int = Field(default=0)
    entity_org_count: int = Field(default=0)
    entity_loc_count: int = Field(default=0)
    word_count: int = Field(default=0)

class ExplanationResponse(BaseModel):
    """Response schema for LLM explanation data"""
    llm_model: str = Field(..., description="LLM model used (e.g., claude-3.5-sonnet)")
    llm_provider: str = Field(..., description="LLM provider (e.g., openrouter)")
    explanation: str = Field(..., description="LLM-generated explanation in Arabic")
    prompt_tokens: Optional[int] = Field(None)
    completion_tokens: Optional[int] = Field(None)

class AnalysisResultResponse(BaseModel):
    """Complete response schema for analysis endpoint"""
    analysis_id: int = Field(..., description="Unique analysis ID")
    is_fake: bool = Field(..., description="Whether news is classified as fake")
    credibility_score: int = Field(..., ge=0, le=100, description="Credibility score 0-100")
    explanation: str = Field(..., description="Human-readable explanation")
    prediction_details: PredictionResponse = Field(..., description="Detailed model predictions")
    explanation_data: Optional[ExplanationResponse] = Field(None, description="LLM explanation metadata")
    created_at: datetime = Field(..., description="Timestamp of analysis")

class HealthResponse(BaseModel):
    """Health check response"""
    status: str = Field(default="healthy")
    model_loaded: bool = Field(...)
    database_connected: bool = Field(...)
    llm_available: bool = Field(...)
    version: str = Field(default="1.0.0")

class AnalysisHistoryResponse(BaseModel):
    """Single history item"""
    analysis_id: int
    news_text: str
    is_fake: bool
    credibility_score: int
    created_at: datetime

class HistoryResponse(BaseModel):
    """Paginated history response"""
    total: int
    limit: int
    offset: int
    items: List[AnalysisHistoryResponse]

class StatsResponse(BaseModel):
    """Statistics response"""
    total_analyses: int
    fake_count: int
    real_count: int
    avg_credibility_score: float
    fake_percentage: float
    last_24h_analyses: int
    last_analysis_time: Optional[datetime]

class ErrorResponse(BaseModel):
    """Error response schema"""
    error: str
    detail: Optional[str] = None
    code: int
