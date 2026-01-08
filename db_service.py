"""
Database Service for CRUD operations and data persistence
"""
import logging
from datetime import datetime, timedelta
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker, Session
from database_models import Base, Analysis, Prediction, ExplanationData, DailyStats
import os
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("db_service")

class DatabaseService:
    """
    Handles all database operations with transaction management
    """
    
    def __init__(self, database_url: str = None):
        if database_url is None:
            database_url = os.getenv("DATABASE_URL", "sqlite:///./mesdaq_ai.db")
        
        self.database_url = database_url
        
        # Handle Render's postgres:// vs sqlalchemy's postgresql://
        if self.database_url.startswith("postgres://"):
            self.database_url = self.database_url.replace("postgres://", "postgresql://", 1)

        connect_args = {"check_same_thread": False} if "sqlite" in self.database_url else {}
        
        self.engine = create_engine(
            self.database_url,
            connect_args=connect_args
        )
        
        # Create tables
        Base.metadata.create_all(bind=self.engine)
        
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        logger.info(f"Database initialized: {database_url}")
    
    def get_session(self) -> Session:
        """Get a database session"""
        return self.SessionLocal()
    
    def create_analysis(
        self,
        news_text: str,
        is_fake: bool,
        credibility_score: int,
        explanation: str,
        user_ip: str = None,
        session: Session = None
    ) -> Analysis:
        """Create a new analysis record"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            analysis = Analysis(
                news_text=news_text,
                is_fake=is_fake,
                credibility_score=credibility_score,
                explanation=explanation,
                user_ip=user_ip
            )
            session.add(analysis)
            session.commit()
            session.refresh(analysis)
            logger.info(f"Analysis created: ID {analysis.id}")
            return analysis
        except Exception as e:
            session.rollback()
            logger.error(f"Failed to create analysis: {str(e)}")
            raise
        finally:
            if close_session:
                session.close()
    
    def create_prediction(
        self,
        analysis_id: int,
        model_confidence: float,
        logits_fake: float,
        logits_real: float,
        sentiment: str,
        is_clickbait: bool,
        clickbait_keywords: str = None,
        entity_person_count: int = 0,
        entity_org_count: int = 0,
        entity_loc_count: int = 0,
        word_count: int = 0,
        session: Session = None
    ) -> Prediction:
        """Create prediction record"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            prediction = Prediction(
                analysis_id=analysis_id,
                model_confidence=model_confidence,
                logits_fake=logits_fake,
                logits_real=logits_real,
                sentiment=sentiment,
                is_clickbait=is_clickbait,
                clickbait_keywords=clickbait_keywords,
                entity_person_count=entity_person_count,
                entity_org_count=entity_org_count,
                entity_loc_count=entity_loc_count,
                word_count=word_count
            )
            session.add(prediction)
            session.commit()
            session.refresh(prediction)
            return prediction
        except Exception as e:
            session.rollback()
            logger.error(f"Failed to create prediction: {str(e)}")
            raise
        finally:
            if close_session:
                session.close()
    
    def create_explanation(
        self,
        analysis_id: int,
        llm_model: str,
        llm_provider: str,
        raw_explanation: str,
        prompt_tokens: int = None,
        completion_tokens: int = None,
        session: Session = None
    ) -> ExplanationData:
        """Create explanation record"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            explanation = ExplanationData(
                analysis_id=analysis_id,
                llm_model=llm_model,
                llm_provider=llm_provider,
                raw_explanation=raw_explanation,
                prompt_tokens=prompt_tokens,
                completion_tokens=completion_tokens
            )
            session.add(explanation)
            session.commit()
            session.refresh(explanation)
            return explanation
        except Exception as e:
            session.rollback()
            logger.error(f"Failed to create explanation: {str(e)}")
            raise
        finally:
            if close_session:
                session.close()
    
    def get_analysis_by_id(self, analysis_id: int, session: Session = None) -> Analysis:
        """Get analysis by ID with all related data"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            analysis = session.query(Analysis).filter(Analysis.id == analysis_id).first()
            return analysis
        finally:
            if close_session:
                session.close()
    
    def get_analyses_paginated(
        self,
        limit: int = 20,
        offset: int = 0,
        session: Session = None
    ) -> tuple:
        """Get paginated analyses"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            total = session.query(func.count(Analysis.id)).scalar()
            analyses = session.query(Analysis).order_by(Analysis.created_at.desc()).limit(limit).offset(offset).all()
            return analyses, total
        finally:
            if close_session:
                session.close()
    
    def get_statistics(self, session: Session = None) -> dict:
        """Get overall statistics"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            total_analyses = session.query(func.count(Analysis.id)).scalar() or 0
            fake_count = session.query(func.count(Analysis.id)).filter(Analysis.is_fake == True).scalar() or 0
            real_count = total_analyses - fake_count
            
            avg_score = session.query(func.avg(Analysis.credibility_score)).scalar() or 0
            
            # Last 24 hours
            twenty_four_hours_ago = datetime.utcnow() - timedelta(hours=24)
            last_24h = session.query(func.count(Analysis.id)).filter(
                Analysis.created_at >= twenty_four_hours_ago
            ).scalar() or 0
            
            # Last analysis time
            last_analysis = session.query(Analysis.created_at).order_by(
                Analysis.created_at.desc()
            ).first()
            last_time = last_analysis[0] if last_analysis else None
            
            return {
                "total_analyses": total_analyses,
                "fake_count": fake_count,
                "real_count": real_count,
                "avg_credibility_score": round(float(avg_score), 2),
                "fake_percentage": round((fake_count / total_analyses * 100), 2) if total_analyses > 0 else 0,
                "last_24h_analyses": last_24h,
                "last_analysis_time": last_time
            }
        finally:
            if close_session:
                session.close()
    
    def update_daily_stats(self, session: Session = None):
        """Update daily statistics"""
        
        if session is None:
            session = self.get_session()
            close_session = True
        else:
            close_session = False
        
        try:
            today = datetime.utcnow().date()
            
            # Get or create today's stats
            stats = session.query(DailyStats).filter(func.date(DailyStats.date) == today).first()
            
            if not stats:
                stats = DailyStats(date=datetime.combine(today, datetime.min.time()))
                session.add(stats)
            
            # Recalculate today's stats
            today_start = datetime.combine(today, datetime.min.time())
            today_end = datetime.combine(today, datetime.max.time())
            
            total = session.query(func.count(Analysis.id)).filter(
                Analysis.created_at >= today_start,
                Analysis.created_at <= today_end
            ).scalar() or 0
            
            fake = session.query(func.count(Analysis.id)).filter(
                Analysis.created_at >= today_start,
                Analysis.created_at <= today_end,
                Analysis.is_fake == True
            ).scalar() or 0
            
            real = total - fake
            
            avg_score = session.query(func.avg(Analysis.credibility_score)).filter(
                Analysis.created_at >= today_start,
                Analysis.created_at <= today_end
            ).scalar() or 0
            
            stats.total_analyses = total
            stats.fake_count = fake
            stats.real_count = real
            stats.avg_credibility_score = float(avg_score)
            
            session.commit()
            logger.info(f"Daily stats updated: {total} analyses, {fake} fake, {real} real")
        except Exception as e:
            session.rollback()
            logger.error(f"Failed to update daily stats: {str(e)}")
            raise
        finally:
            if close_session:
                session.close()
