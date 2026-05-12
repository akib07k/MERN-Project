# 🚀 Quick Start - Deploy to Render in 15 Minutes

## Step 1: MongoDB Atlas (5 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login → Create FREE cluster
3. Database Access → Add User (save username/password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Copy connection string → Replace `<username>`, `<password>`, `<dbname>`

## Step 2: Push to GitHub (2 min)
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Step 3: Deploy Backend (4 min)
1. Go to https://dashboard.render.com/
2. **New +** → **Web Service**
3. Connect GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = `my-super-secret-jwt-key-12345`
   - `NODE_ENV` = `production`
6. **Create Web Service**
7. **Copy backend URL** (e.g., `https://my-backend.onrender.com`)

## Step 4: Deploy Frontend (4 min)
1. **New +** → **Static Site**
2. Same GitHub repo
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Environment Variables:
   - `VITE_API_URL` = Your backend URL from Step 3
5. **Create Static Site**
6. **Copy frontend URL** (e.g., `https://my-frontend.onrender.com`)

## Step 5: Update Backend CORS (1 min)
1. Go back to **Backend service**
2. **Environment** → Add variable:
   - `FRONTEND_URL` = Your frontend URL from Step 4
3. **Save Changes** (auto-redeploys)

## Step 6: Test! ✅
Visit your frontend URL and test the app!

---

## 📝 Quick Reference

### Backend Settings
```
Root Directory:    backend
Build Command:     npm install
Start Command:     npm start
```

**Environment Variables:**
- `MONGO_URI` - MongoDB Atlas connection
- `JWT_SECRET` - Secret key
- `FRONTEND_URL` - Frontend URL
- `NODE_ENV` - production

### Frontend Settings
```
Root Directory:       frontend
Build Command:        npm install && npm run build
Publish Directory:    dist
```

**Environment Variables:**
- `VITE_API_URL` - Backend URL

---

## ⚠️ Important Notes

- **Free tier:** Services sleep after 15 min inactivity (30-60s cold start)
- **Uploads:** Files are temporary on free tier (use Cloudinary for production)
- **Database:** Must use MongoDB Atlas (local MongoDB won't work)

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check MongoDB connection string is correct
- Verify Network Access allows 0.0.0.0/0

**CORS errors?**
- Ensure `FRONTEND_URL` is set in backend
- Check it matches your frontend URL exactly

**Frontend can't connect?**
- Verify `VITE_API_URL` is your backend URL
- Check backend is running (visit backend URL)

---

**Need more details?** See `RENDER_DEPLOYMENT_GUIDE.md`

**Deployment checklist?** See `DEPLOYMENT_CHECKLIST.md`

**Exact settings?** See `RENDER_SETTINGS.txt`
