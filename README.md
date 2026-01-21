# Mesdaq AI - Arabic Fake News Detection System

## 📋 Project Overview

**Mesdaq AI** is a comprehensive full-stack application for detecting fake news in Arabic language. It combines advanced machine learning with large language models to analyze news credibility, sentiment, and authenticity. The system provides detailed explanations for each classification using AI-powered reasoning.

**Status:** ✅ NTI Final Project - Production Ready  
**Team:** 4 AI Engineers:
- Ibrahim Abdelsattar
- Yassein Ahmed
- Taha Atta
- Youssif AboZaid

---

## 🎯 System Architecture

```
<<<<<<< HEAD
┌──────────────────────────────────────────────────────────────┐
│                  FRONTEND (React 18)                         │
│         React + TypeScript + Vite + Tailwind CSS            │
│              Running on http://localhost:5173                │
└──────────────────────────────────────────────────────────────┘
                           ↓ HTTP POST/GET
                  (CORS enabled for localhost)
┌──────────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                           │
│       Python 3.9+ | FastAPI 0.104.1 | Uvicorn              │
│              Running on http://localhost:8000                │
└──────────────────────────────────────────────────────────────┘
    ↙              ↓              ↓              ↘
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Inference│  │   LLM    │  │ Database │  │  Health  │
│ Service  │  │ Explainer│  │ Service  │  │  Check   │
│ (AraBERT)│  │ (Claude) │  │(SQLAlchemy)│
└──────────┘  └──────────┘  └──────────┘  └──────────┘
     ↓              ↓              ↓
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Fine-tuned│  │OpenRouter│  │ SQLite   │
│ AraBERT  │  │API Key   │  │Database  │
│ Model    │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘
=======
    ┌──────────────────────────────────────────────────────────────┐
    │                  FRONTEND (React 18)                         │
    │         React + TypeScript + Vite + Tailwind CSS             │
    │              Running on http://localhost:5173                │
    └──────────────────────────────────────────────────────────────┘
                           ↓ HTTP POST/GET
                    (CORS enabled for localhost)
    ┌──────────────────────────────────────────────────────────────┐
    │                  BACKEND (FastAPI)                           │
    │       Python 3.9+ | FastAPI 0.104.1 | Uvicorn              │
    │              Running on http://localhost:8000                │
    └──────────────────────────────────────────────────────────────┘
        ↙              ↓              ↓              ↘
    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Inference│  │   LLM    │  │ Database │  │  Health  │
    │ Service  │  │ Explainer│  │ Service  │  │  Check   │
    │ (AraBERT)│  │ (Claude) │  │(SQLAlchemy)│
    └──────────┘  └──────────┘  └──────────┘  └──────────┘
         ↓              ↓              ↓
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │Fine-tuned│  │OpenRouter│  │ SQLite   │
    │ AraBERT  │  │API Key   │  │Database  │
    │ Model    │  │          │  │          │
    └──────────┘  └──────────┘  └──────────┘
>>>>>>> 7c0d9e50487efe23520d027b401447ffb5402354
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**
- **npm or bun**
- **OpenRouter API Key** (provided in `.env`)

### Installation & Running

**Option 1: One-Click Start (Windows)**
```bash
double-click start.bat
```

**Option 2: Manual Setup**

1. **Install Python Dependencies:**
```bash
pip install -r requirements.txt
```

2. **Install Frontend Dependencies:**
```bash
cd mesdaq-main
npm install
cd ..
```

3. **Start Backend (Terminal 1):**
```bash
python main.py
```

4. **Start Frontend (Terminal 2):**
```bash
cd mesdaq-main
npm run dev
```

5. **Access the System:**
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/docs

**Option 3: Docker (Recommended for Production)**

1. **Build and Run:**
```bash
docker-compose up --build -d
```

2. **Access:**
- Frontend: http://localhost
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

To stop:
```bash
docker-compose down
```

---

## 📁 Project Structure

```
mesdaq/
├── Backend Python Files (Root Level)
│   ├── main.py                    # FastAPI application & REST endpoints
│   ├── llm_service.py             # Claude 3.5 explanations via OpenRouter
│   ├── database_models.py         # SQLAlchemy ORM models
│   ├── db_service.py              # Database CRUD operations
│   ├── api_schemas.py             # Pydantic validation schemas
│   └── feature_extractor.py       # Sentiment, clickbait, NER analysis
│
├── Configuration & Dependencies
│   ├── requirements.txt           # Python package dependencies
│   ├── .env                       # Environment variables (API keys, DB URL)
│   ├── start.bat                  # Windows launcher script
│   └── config.json                # AraBERT model configuration
│
├── ML Model Files
│   ├── model.safetensors          # Fine-tuned AraBERT model weights
│   ├── tokenizer.json             # Tokenizer configuration
│   ├── tokenizer_config.json      # Advanced tokenizer settings
│   ├── vocab.txt                  # Arabic vocabulary (64K tokens)
│   └── special_tokens_map.json    # Special token mappings
│
├── Frontend Application (React)
│   └── mesdaq-main/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Index.tsx      # Main page with all sections
│       │   │   └── NotFound.tsx   # 404 page
│       │   ├── components/
│       │   │   ├── AnalyzeSection.tsx      # Input form & analysis UI
│       │   │   ├── ResultsSection.tsx      # Results display
│       │   │   ├── HeroSection.tsx         # Landing section
│       │   │   ├── FeaturesSection.tsx     # Features showcase
│       │   │   ├── HowItWorksSection.tsx   # Process explanation
│       │   │   ├── AboutSection.tsx        # Project info
│       │   │   ├── TeamSection.tsx         # Team members
│       │   │   ├── Navbar.tsx              # Navigation
│       │   │   ├── Footer.tsx              # Footer
│       │   │   ├── FeatureCard.tsx         # Feature component
│       │   │   ├── ResultCard.tsx          # Result display card
│       │   │   ├── TeamCard.tsx            # Team member card
│       │   │   └── ui/                     # shadcn-ui components
│       │   ├── hooks/
│       │   │   └── useNewsAnalysis.ts      # API integration hook
│       │   ├── lib/
│       │   │   └── utils.ts                # Utility functions
│       │   ├── App.tsx                     # Main app component
│       │   ├── main.tsx                    # Entry point
│       │   └── vite-env.d.ts               # Vite type definitions
│       ├── .env.local                      # Frontend env vars
│       ├── vite.config.ts                  # Vite configuration
│       ├── tsconfig.json                   # TypeScript config
│       ├── tailwind.config.ts              # Tailwind CSS config
│       ├── package.json                    # Dependencies
│       └── index.html                      # HTML template
│
└── Notebooks (Analysis & Testing)
    ├── test_feature_extraction.ipynb       # Feature testing notebook
    └── yusufs-notebook-jan-6.ipynb        # Project exploration
```

---

## 🔧 Technologies & Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18+ | UI framework |
| TypeScript | 5+ | Type-safe JavaScript |
| Vite | 5+ | Build tool & dev server |
| Tailwind CSS | 3+ | Styling & utility-first CSS |
| shadcn-ui | Latest | Component library |
| Framer Motion | Latest | Animations & transitions |
| Lucide React | Latest | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.104.1 | Web framework |
| Uvicorn | 0.24.0 | ASGI server |
| SQLAlchemy | 2.0.23 | ORM & database |
| Pydantic | 2.5.0 | Data validation |
| PyTorch | 2.1.1 | ML framework |
| Transformers | 4.36.1 | Pre-trained models |
| spaCy | 3.7.2 | NLP & NER |
| Requests | 2.31.0 | HTTP client |

### ML Models
| Model | Purpose | Details |
|-------|---------|---------|
| AraBERT | Fake news detection | Fine-tuned, 768 hidden dims, 12 layers, 64K vocab |
| Claude 3.5 Sonnet | Explanations & reasoning | Via OpenRouter API |
| spaCy Arabic | Named Entity Recognition | Person, Organization, Location extraction |

### Database
| Technology | Purpose | Details |
|------------|---------|---------|
| SQLAlchemy | ORM | Object-relational mapping |
| SQLite | Dev database | Local file-based (development) |
| PostgreSQL | Prod database | Recommended for production |

---

## 📊 API Endpoints

### Health Check
```
GET /health
Response: {status, model_loaded, database_connected, llm_available, version}
```

### News Analysis (Main Endpoint)
```
POST /api/analyze
Request: {news_text: string}
Response: {
  analysis_id: int,
  is_fake: boolean,
  credibility_score: 0-100,
  explanation: string (Arabic),
  prediction_details: {
    model_confidence: 0-1,
    sentiment: "positive|negative|neutral",
    is_clickbait: boolean,
    entities: {person_count, org_count, loc_count, word_count}
  },
  explanation_data: {
    llm_model: string,
    llm_provider: string,
    explanation: string (Arabic)
  },
  created_at: timestamp
}
```

### Analysis History
```
GET /api/history?limit=20&offset=0
Response: {total, limit, offset, items: []}
```

### System Statistics
```
GET /api/stats
Response: {
  total_analyses: int,
  fake_count: int,
  real_count: int,
  avg_credibility_score: float,
  fake_percentage: float,
  last_24h_analyses: int,
  last_analysis_time: timestamp
}
```

---

## 🔄 Data Flow

### Step-by-Step Analysis Process

```
1. USER INPUT
   ↓
   User enters Arabic news text in AnalyzeSection

2. FRONTEND PROCESSING
   ↓
   useNewsAnalysis hook validates input
   Sends POST request to http://localhost:8000/api/analyze

3. BACKEND VALIDATION
   ↓
   main.py receives request
   Pydantic validates input schema (api_schemas.py)

4. ML INFERENCE
   ↓
   inference_service.run_inference() executes:
   - AraBERT tokenization (512 max tokens)
   - Model prediction (cuda/cpu)
   - Logits calculation

5. FEATURE EXTRACTION
   ↓
   Sentiment Analysis: positive/negative/neutral
   Clickbait Detection: keyword matching
   NER (Named Entities): Person, Org, Location counts

6. CREDIBILITY SCORING
   ↓
   Base score from model confidence
   + Sentiment adjustment (±5)
   + Clickbait penalty (±10)
   + Entity diversity bonus (0-10)
   = Final score (0-100)

7. LLM EXPLANATION
   ↓
   llm_service calls Claude 3.5 via OpenRouter:
   - Sends Arabic prompt with analysis details
   - Gets detailed explanation (fallback if fails)
   - Extracts tokens used

8. DATABASE STORAGE
   ↓
   db_service stores:
   - Analysis record (text, classification, score)
   - Prediction details (confidence, sentiment, entities)
   - Explanation data (LLM provider, tokens)
   - Daily statistics (updated)

9. RESPONSE TO FRONTEND
   ↓
   main.py returns AnalysisResultResponse
   Frontend displays in ResultsSection component

10. USER SEES RESULTS
    ↓
    Fake/Real classification badge
    Credibility score visualization
    Detailed Arabic explanation
    Sentiment & clickbait indicators
```

---

## 📝 All Changes Made (Session 1)

### 1. **Backend Python Files Created**
- `main.py` (255 lines)
  - FastAPI application with 4 REST endpoints
  - CORS middleware for frontend communication
  - Orchestrates all backend services
  - Error handling and logging

- `inference_service.py` (145 lines)
  - Singleton pattern for model loading
  - Loads AraBERT tokenizer & model on startup
  - Orchestrates feature extraction pipeline
  - Returns predictions with confidence scores

- `llm_service.py` (175 lines)
  - Integration with OpenRouter API
  - Claude 3.5 Sonnet model access
  - Arabic prompt engineering
  - Credibility scoring algorithm
  - Fallback explanations if LLM fails

- `database_models.py` (60 lines)
  - SQLAlchemy ORM models
  - 4 tables: Analysis, Prediction, ExplanationData, DailyStats
  - Relationships and indexes for optimization
  - Auto-timestamp creation/update

- `db_service.py` (240 lines)
  - Complete CRUD operations
  - Transaction management
  - Atomic database operations
  - Statistics aggregation
  - Daily stats updating

- `api_schemas.py` (95 lines)
  - Pydantic validation models
  - Request schema (AnalyzeRequest)
  - Response schemas (AnalysisResultResponse, HealthResponse, etc.)
  - Type hints for all API data

### 2. **Frontend Files Created/Updated**
- `mesdaq-main/src/hooks/useNewsAnalysis.ts` (NEW)
  - React hook for API integration
  - State management (loading, error, result)
  - HTTP POST to backend
  - Error handling & fallbacks

- `mesdaq-main/.env.local` (NEW)
  - Frontend environment configuration
  - Backend URL: http://localhost:8000

- `mesdaq-main/src/components/AnalyzeSection.tsx` (UPDATED)
  - Integrated useNewsAnalysis hook
  - User input handling
  - Loading states & error display
  - Result callback to parent

- `mesdaq-main/src/components/ResultsSection.tsx` (UPDATED)
  - Dynamic result rendering
  - Displays credibility score
  - Shows explanation text
  - Entity & sentiment information

- `mesdaq-main/src/pages/Index.tsx` (UPDATED)
  - State management for results
  - Props passing between components
  - Scroll-to-results functionality

### 3. **Configuration Files Created**
- `requirements.txt`
  - 11 Python dependencies listed
  - Fastapi, PyTorch, Transformers, SQLAlchemy, etc.

- `.env`
  - OpenRouter API Key (sk-or-v1-...)
  - Database URL (SQLite)
  - Model directory path

- `start.bat`
  - Windows batch script
  - Auto-installs dependencies
  - Launches backend & frontend simultaneously
  - Opens API documentation

### 4. **UI/UX Polish (Latest Updates)**
- **Team Section Redesign**:
  - Integrated professional portraits for Ibrahim, Youssef, Yassin, and Taha.
  - Implemented a premium **Glassmorphism** layout for team cards.
  - Added advanced micro-animations (grayscale to color, dynamic shadows).
  - Multi-layer gradient rings for portraits (Primary → Blue → Purple).
- **Modern Minimal Footer**:
  - Consolidated multiple rows into a **single elegant line**.
  - Integrated "NTI Final Project" branding within a specialized badge.
  - Optimized for a clean, professional finish across all viewports.
- **Performance**:
  - Image assets optimized and served via dedicated `/public/team` directory.

---

## 🎓 Model Details

### AraBERT
- **Type:** BERT-based transformer for Arabic
- **Fine-tuning:** Trained on fake news detection dataset
- **Architecture:** 768 hidden dimensions, 12 layers
- **Vocabulary:** 64,000 Arabic tokens
- **Max Sequence Length:** 512 tokens
- **Input:** Arabic text (tokenized & padded)
- **Output:** Binary classification (Fake/Real) + logits

### Feature Extraction
1. **Sentiment Analysis** → positive, negative, neutral
2. **Clickbait Detection** → keyword-based classification
3. **Named Entity Recognition** → counts of PERSON, ORG, LOC
4. **Text Statistics** → word count, character count

### Claude 3.5 Sonnet (LLM)
- **Provider:** OpenRouter API
- **Purpose:** Generate detailed Arabic explanations
- **Temperature:** 0.7 (balanced creativity & consistency)
- **Max Tokens:** 500 per response
- **Language:** Arabic prompts & responses
- **Cost:** Tracked via token usage (prompt + completion)

---

## 💾 Database Schema

### Table: `analyses`
```
id (PK)
news_text (Text)
is_fake (Boolean)
credibility_score (Integer, 0-100)
explanation (Text, Arabic)
created_at (DateTime)
updated_at (DateTime)
user_ip (String, optional)
```

### Table: `predictions`
```
id (PK)
analysis_id (FK → analyses.id)
model_confidence (Float, 0-1)
logits_fake (Float)
logits_real (Float)
sentiment (String)
is_clickbait (Boolean)
clickbait_keywords (String, optional)
entity_person_count (Integer)
entity_org_count (Integer)
entity_loc_count (Integer)
word_count (Integer)
created_at (DateTime)
```

### Table: `explanations`
```
id (PK)
analysis_id (FK → analyses.id)
llm_model (String)
llm_provider (String)
raw_explanation (Text, Arabic)
prompt_tokens (Integer, optional)
completion_tokens (Integer, optional)
generated_at (DateTime)
```

### Table: `daily_stats`
```
id (PK)
date (DateTime)
total_analyses (Integer)
fake_count (Integer)
real_count (Integer)
avg_credibility_score (Float)
created_at (DateTime)
```

---

## 🔐 Security & Performance

### CORS Settings
- Allowed origins: `localhost:5173`, `localhost:3000`
- Credentials: Enabled
- Methods: All (GET, POST, PUT, DELETE, etc.)

### Rate Limiting
- No rate limiting implemented (development)
- Recommended for production: 100 requests/minute

### Performance Optimizations
- Singleton pattern for model loading (single instance)
- Model loaded once on startup (~500MB)
- Tokenizer cached in memory
- Database connection pooling (SQLAlchemy)
- Indexes on frequently queried columns

### Expected Response Times
- AraBERT inference: 1-2 seconds
- Feature extraction: 0.5 seconds
- LLM explanation: 2-3 seconds (OpenRouter API)
- Database storage: 0.2 seconds
- **Total end-to-end:** 3-5 seconds

---

## 🧪 Testing & Validation

### Available Test Files
- `test_feature_extraction.ipynb` - Feature extraction testing
- `yusufs-notebook-jan-6.ipynb` - Project exploration notebook

### Manual Testing with cURL

```bash
# Health check
curl http://localhost:8000/health

# Analyze news
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"news_text":"هذا خبر عن حادثة في الشرق الأوسط"}'

# Get history
curl http://localhost:8000/api/history?limit=10

# Get statistics
curl http://localhost:8000/api/stats
```

### API Documentation
Interactive documentation available at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## 📦 Deployment

### Development
```bash
# Currently configured for localhost development
# SQLite database: mesdaq_ai.db
# Frontend: npm run dev
# Backend: python main.py
```

### Production
```bash
# Recommended changes:
# 1. Use PostgreSQL instead of SQLite
# 2. Set DATABASE_URL=postgresql://user:pass@host/db
# 3. Use Gunicorn for backend:
#    gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
# 4. Deploy frontend build: npm run build
# 5. Serve with Nginx or similar
# 6. Enable HTTPS & update CORS origins
```

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'torch'"
**Solution:** Run `pip install -r requirements.txt`

### Issue: "Connection refused on localhost:8000"
**Solution:** Ensure backend is running: `python main.py`

### Issue: "OPENROUTER_API_KEY not found"
**Solution:** Check `.env` file contains the API key

### Issue: "Model files not found"
**Solution:** Ensure model files (safetensors, tokenizer.json, etc.) are in the root directory

### Issue: "SQLite database locked"
**Solution:** Close other connections, or use PostgreSQL for production

---

## 👥 Team & Contributions

**Member 1 (إبراهيم عبدالستار):**
- AI Engineer
- Development of AI models and machine learning solutions for fake news detection.

**Member 2 (يوسف أبو زيد):**
- AI Engineer
- Building and optimizing Transformer models for Arabic text classification.

**Member 3 (ياسين):**
- AI Engineer
- Designing Natural Language Processing (NLP) pipelines and feature extraction.

**Member 4 (طه):**
- AI Engineer
- Implementing LLM logic and generating explainable AI outputs.

---

## 📚 Additional Resources

- **AraBERT Paper:** https://aclanthology.org/2020.acl-main.645/
- **OpenRouter Docs:** https://openrouter.ai/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **React Docs:** https://react.dev/
- **SQLAlchemy Docs:** https://docs.sqlalchemy.org/

---

## 📄 License

Proprietary - Mesdaq AI Project

---

## ✨ Summary

**Mesdaq AI** is a complete, production-ready fake news detection system developed as an **NTI Final Project**. It leverages state-of-the-art machine learning (AraBERT) combined with advanced LLMs (Claude 3.5) to provide accurate classifications with detailed, explainable reasoning. The system features a high-end, professional UI with glassmorphism aesthetics and real-time analysis capabilities.

**Key Achievements:**
- ✅ Full-stack implementation (React + FastAPI)
- ✅ Advanced ML pipeline with AraBERT
- ✅ LLM-powered explanations in Arabic
- ✅ Production-ready database design
- ✅ Comprehensive API with 4 endpoints
- ✅ Real-time credibility scoring (0-100)
- ✅ Daily statistics & analytics
- ✅ Complete documentation

**Ready for:** Development, Testing, and Deployment

---

**Last Updated:** January 8, 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete & Ready for Production



