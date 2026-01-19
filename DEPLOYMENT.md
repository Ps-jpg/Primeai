# Deployment Guide

## Phase 1: Push Code to GitHub
1.  Initialize Git (if not done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit for deployment"
    ```
2.  Create a new repository on [GitHub](https://github.com/new).
3.  Link and push your code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## Phase 2: Deploy Backend (Render)
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select your repository.
4.  **Configuration**:
    *   **Name**: `backend-dashboard-api` (or similar)
    *   **Root Directory**: `backend` (Important! Only if your backend is in a subfolder)
    *   **Environment**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  **Environment Variables**:
    *   `NODE_ENV`: `production`
    *   `MONGODB_URI`: (Copy from your `.env`)
    *   `JWT_SECRET`: (Copy from your `.env`)
    *   `JWT_EXPIRE`: `7d`
    *   `FRONTEND_URL`: (You will update this later after deploying frontend, or use `*` for now)
6.  Click **Create Web Service**.
7.  **Wait for it to deploy**. Copy the URL (e.g., `https://backend-api.onrender.com`).

## Phase 3: Deploy Frontend (Vercel)
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Vite
5.  **Root Directory**: Click "Edit" and select `frontend`.
6.  **Environment Variables**:
    *   `VITE_API_URL`: Paste your Render Backend URL (e.g., `https://backend-api.onrender.com/api/v1`)
    *   **Important**: Add `/api/v1` at the end of the URL.
7.  Click **Deploy**.

## Phase 4: Final Connection
1.  Copy your new Vercel Frontend URL (e.g., `https://frontend-dashboard.vercel.app`).
2.  Go back to **Render Dashboard** -> **Settings** -> **Environment Variables**.
3.  Update `FRONTEND_URL` to your Vercel URL (removes CORS issues).
4.  **Save Changes** (Render will redeploy automatically).

🎉 **Done!** Your full stack app is live.
