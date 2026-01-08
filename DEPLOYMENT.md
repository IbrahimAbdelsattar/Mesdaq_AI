# Deployment Guide for Mesdaq AI

This guide covers 3 methods to deploy Mesdaq AI:
1.  **Render.com** (Recommended: Easiest & Free Tier available)
2.  **Railway.app** (Great alternative)
3.  **Docker / VPS** (For full control on DigitalOcean/AWS)

---

## Option 1: Render.com (Recommended)
This method automatically deploys the Backend, Frontend, and Database using the `render.yaml` Blueprint I created.

1.  **Push your code to GitHub/GitLab**.
    *   Make sure this folder is the root of your repository.
2.  Create an account on [Render.com](https://render.com).
3.  Click **"New +"** -> **"Blueprint"**.
4.  Connect your GitHub repository.
5.  Render will detect the `render.yaml` file.
6.  **Configuration**:
    *   It will ask for `OPENROUTER_API_KEY`. Enter your key (sk-...).
7.  Click **Apply**.
8.  Render will:
    *   Create a PostgreSQL database (`mesdaq-db`).
    *   Deploy the Backend (`mesdaq-backend`).
    *   Deploy the Frontend (`mesdaq-frontend`).
9.  **Done!** Your app is live at the URL provided by Render.

---

## Option 2: Railway.app

1.  Create an account on [Railway.app](https://railway.app).
2.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
3.  Select your repository.
4.  Adding Variables:
    *   Go to **Variables** tab.
    *   Add `OPENROUTER_API_KEY`.
    *   Add `DATABASE_URL` (Railway provides a PostgreSQL plugin you can attach).
5.  **Build Command**: `pip install -r requirements.txt`
6.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7.  For Frontend:
    *   You might need to deploy the `mesdaq-main` folder as a separate service usually involving `npm run build` and `npm run preview`.

---

## Option 3: Docker / VPS (DigitalOcean, AWS, Azure)
If you have a server (Ubuntu/Debian) with Docker installed:

1.  **Copy files** to your server (git clone or SCP).
2.  **Set Environment Variables**:
    *   Create a `.env` file on the server with:
        ```env
        OPENROUTER_API_KEY=sk-...
        # Database URL (optional if using sqlite default)
        ```
3.  **Run Docker Compose**:
    ```bash
    docker-compose up --build -d
    ```
4.  **Access**:
    *   Your app will be available at `http://YOUR_SERVER_IP`.

---

## Important Notes on Production

### Database
*   **Default**: The app uses SQLite (`mesdaq_ai.db`). This is fine for Docker/VPS with volumes.
*   **Cloud (Render/Railway)**: These platforms delete files on restart. **You MUST use PostgreSQL**.
    *   My `render.yaml` automatically sets up PostgreSQL.
    *   To use it, the app reads `DATABASE_URL` environment variable.

### API Keys
*   Never commit your `.env` file to GitHub.
*   Always set `OPENROUTER_API_KEY` in the dashboard of your hosting provider.
