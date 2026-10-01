# Mesdaq AI | مصداق

An Arabic news credibility analysis prototype combining a local BERT-family model, linguistic signals, explanation generation, and a React interface.

**Technology:** Python · FastAPI · Transformers/PyTorch · SQLAlchemy · React · Vite

## Features

- Accept Arabic news text and return classification, confidence, and a credibility score.
- Extract sentiment, keyword-based clickbait indicators, word counts, and optional named-entity counts.
- Generate explanations through OpenRouter, with a local fallback explanation path.
- Persist analysis history, prediction metadata, and daily statistics.

## Repository guide

| Path | Purpose |
|---|---|
| [main.py](main.py) | Model loading and FastAPI endpoints. |
| [feature_extractor.py](feature_extractor.py) | Sentiment, clickbait, and optional NER. |
| [llm_service.py](llm_service.py) | Explanation generation and credibility scoring. |
| [db_service.py](db_service.py) | Database persistence and queries. |
| [api_schemas.py](api_schemas.py) | Request and response schemas. |
| [mesdaq-main](mesdaq-main) | React/Vite frontend. |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment notes. |

## Requirements and current limitations

**Model weights are missing from the current checkout.** Tokenizer/config files are present, but neither `model.safetensors` nor `pytorch_model.bin` is committed. Supply the matching classifier weights at the repository root before analysis can work. The health endpoint can run while the model is unavailable; `/analyze` then returns `503`.

The inference code assumes output index `0` is fake and index `1` is real, while sentiment extraction reuses the same model with a separate label interpretation. Verify the trained label mapping before interpreting results. Optional NER needs spaCy and `xx_ent_wiki_sm`, which are not in the main requirements. The prototype does not independently verify news against external evidence.

## Getting started

```bash
git clone https://github.com/IbrahimAbdelsattar/Mesdaq_AI.git
cd Mesdaq_AI
```

Use a Python virtual environment:

```bash
python -m venv .venv
```

Activate it with `source .venv/bin/activate` on macOS/Linux or `.venv\Scripts\Activate.ps1` in PowerShell.

```bash
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

## Frontend

In another terminal:

```bash
cd mesdaq-main
npm install
npm run dev
```

Check the frontend API configuration and use the Vite origin printed at startup.

## API surface

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Service/model status |
| POST | `/analyze` | Analyze a `news_text` request |
| GET | `/history` | Analysis history |
| GET | `/stats` | Aggregate statistics |

These are the routes implemented in the current `main.py`; they do not carry an `/api` prefix.

## Runtime configuration

Create a local `.env` with your own `OPENROUTER_API_KEY` if using generated explanations. `DATABASE_URL` defaults to a local SQLite database when absent. Do not copy committed credential values into a new environment.
