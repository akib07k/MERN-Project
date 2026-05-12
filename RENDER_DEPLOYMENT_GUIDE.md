# Render.com Deployment Guide

This is a full-stack MERN application that requires **TWO separate services** on Render:
1. **Backend** (Node.js Web Service)
2. **Frontend** (Static Site)

---

## Prerequisites

### 1. MongoDB Atlas Setup
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
- Whitelist all IPs (0.0.0.0/0) in Network Access for Render

### 2. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## Part 1: Deploy Backend (Web Service)

### Step 1: Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### Step 2: Configure Backend Service

**Basic Settings:**
- **Name:** `your-app-backend` (choose any name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`

**Build & Deploy Settings:**
```
Build Command:    npm install
Start Command:    npm start
```

### Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your-super-secret-jwt-key-12345` | Use a strong random string |
| `FRONTEND_URL` | `https://your-frontend-name.onrender.com` | Add this AFTER deploying frontend |
| `NODE_ENV` | `production` | Optional but recommended |

**Important:** You'll update `FRONTEND_URL` after deploying the frontend in Part 2.

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. **Copy your backend URL** (e.g., `https://your-app-backend.onrender.com`)
4. Test it by visiting: `https://your-app-backend.onrender.com/` (should show "API is running...")

---

## Part 2: Deploy Frontend (Static Site)

### Step 1: Create New Static Site
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect the same GitHub repository

### Step 2: Configure Frontend Service

**Basic Settings:**
- **Name:** `your-app-frontend` (choose any name)
- **Region:** Same as backend
- **Branch:** `main`
- **Root Directory:** `frontend`

**Build & Deploy Settings:**
```
Build Command:        npm install && npm run build
Publish Directory:    dist
```

### Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-app-backend.onrender.com` |

**Replace with your actual backend URL from Part 1!**

### Step 4: Deploy
1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. **Copy your frontend URL** (e.g., `https://your-app-frontend.onrender.com`)

---

## Part 3: Update Backend CORS

Now that you have your frontend URL, update the backend:

1. Go to your **Backend Web Service** on Render
2. Click **"Environment"** in the left sidebar
3. Find the `FRONTEND_URL` variable
4. Update its value to your actual frontend URL: `https://your-app-frontend.onrender.com`
5. Click **"Save Changes"**
6. Render will automatically redeploy the backend

---

## Part 4: Verify Deployment

### Test Backend:
```bash
curl https://your-app-backend.onrender.com/
# Should return: "API is running..."
```

### Test Frontend:
1. Visit your frontend URL: `https://your-app-frontend.onrender.com`
2. Try logging in, browsing products, etc.
3. Check browser console for any errors

---

## Important Notes

### Free Tier Limitations
- **Backend services spin down after 15 minutes of inactivity**
- First request after inactivity takes 30-60 seconds (cold start)
- Consider upgrading to paid plan for production apps

### Database
- **You MUST use MongoDB Atlas** (or another cloud MongoDB)
- Local MongoDB (`mongodb://127.0.0.1:27017`) will NOT work on Render

### File Uploads
- Uploaded files are stored in the `/uploads` folder
- **On Render's free tier, uploaded files are ephemeral** (deleted on redeploy)
- For persistent storage, use:
  - Cloudinary
  - AWS S3
  - Render Disks (paid feature)

### Environment Variables
- Never commit `.env` files to Git
- Always set environment variables in Render dashboard
- Frontend env vars must start with `VITE_`

---

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings include frontend URL
- Look for errors in browser console (F12)

### CORS errors
- Ensure `FRONTEND_URL` is set in backend environment variables
- Make sure it matches your actual frontend URL exactly
- Redeploy backend after updating CORS settings

### 404 errors on frontend routes
- The `_redirects` file should handle this automatically
- Verify `Publish Directory` is set to `dist`

---

## Quick Reference

### Backend Service Settings
```
Root Directory:    backend
Build Command:     npm install
Start Command:     npm start
```

### Frontend Service Settings
```
Root Directory:       frontend
Build Command:        npm install && npm run build
Publish Directory:    dist
```

### Required Environment Variables

**Backend:**
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Your frontend URL on Render

**Frontend:**
- `VITE_API_URL` - Your backend URL on Render

---

## Support

If you encounter issues:
1. Check Render logs (Dashboard → Your Service → Logs)
2. Review browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible

---

**Deployment Complete! 🚀**

Your app should now be live on Render.com with both frontend and backend working together.
