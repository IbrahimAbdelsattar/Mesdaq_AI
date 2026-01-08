"""
Database Models for Mesdaq AI
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Analysis(Base):
    """
    Main analysis record for a news item
    """
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    news_text = Column(Text, nullable=False)
    is_fake = Column(Boolean, nullable=False)
    credibility_score = Column(Integer, nullable=False)  # 0-100
    explanation = Column(Text, nullable=True)  # Human-readable summary
    user_ip = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    prediction = relationship("Prediction", back_populates="analysis", uselist=False, cascade="all, delete-orphan")
    explanation_data = relationship("ExplanationData", back_populates="analysis", uselist=False, cascade="all, delete-orphan")

class Prediction(Base):
    """
    Detailed technical prediction data from the model
    """
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), unique=True, nullable=False)
    
    model_confidence = Column(Float, nullable=False)
    logits_fake = Column(Float, nullable=False)
    logits_real = Column(Float, nullable=False)
    sentiment = Column(String, nullable=False)
    is_clickbait = Column(Boolean, nullable=False)
    clickbait_keywords = Column(Text, nullable=True)
    
    # Entity counts stored directly for easy querying
    entity_person_count = Column(Integer, default=0)
    entity_org_count = Column(Integer, default=0)
    entity_loc_count = Column(Integer, default=0)
    word_count = Column(Integer, default=0)
    
    analysis = relationship("Analysis", back_populates="prediction")

class ExplanationData(Base):
    """
    Metadata about the LLM explanation generation
    """
    __tablename__ = "explanation_data"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), unique=True, nullable=False)
    
    llm_model = Column(String, nullable=False)
    llm_provider = Column(String, nullable=False)
    raw_explanation = Column(Text, nullable=False)
    prompt_tokens = Column(Integer, nullable=True)
    completion_tokens = Column(Integer, nullable=True)
    
    analysis = relationship("Analysis", back_populates="explanation_data")

class DailyStats(Base):
    """
    Pre-aggregated daily statistics for dashboard performance
    """
    __tablename__ = "daily_stats"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, unique=True, nullable=False)
    
    total_analyses = Column(Integer, default=0)
    fake_count = Column(Integer, default=0)
    real_count = Column(Integer, default=0)
    avg_credibility_score = Column(Float, default=0.0)
