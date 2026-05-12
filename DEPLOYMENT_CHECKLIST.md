# Render Deployment Checklist ✅

## Pre-Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string obtained
- [ ] MongoDB Network Access set to allow all IPs (0.0.0.0/0)
- [ ] Code pushed to GitHub repository

---

## Backend Deployment

### Render Configuration
- [ ] New Web Service created
- [ ] Repository connected
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

### Environment Variables
- [ ] `MONGO_URI` = `mongodb+srv://...` (MongoDB Atlas connection string)
- [ ] `JWT_SECRET` = Strong random string
- [ ] `FRONTEND_URL` = (Add after frontend deployment)
- [ ] `NODE_ENV` = `production` (optional)

### Verification
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., `https://your-backend.onrender.com`)
- [ ] Test endpoint: Visit `https://your-backend.onrender.com/` → Should show "API is running..."

---

## Frontend Deployment

### Render Configuration
- [ ] New Static Site created
- [ ] Same repository connected
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL` = Your backend URL from above

### Verification
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., `https://your-frontend.onrender.com`)
- [ ] Website loads correctly

---

## Post-Deployment

- [ ] Update backend `FRONTEND_URL` environment variable with actual frontend URL
- [ ] Backend automatically redeployed after env update
- [ ] Test full application:
  - [ ] Homepage loads
  - [ ] Products display
  - [ ] User registration works
  - [ ] User login works
  - [ ] Cart functionality works
  - [ ] Checkout process works
  - [ ] Admin dashboard accessible (if applicable)

---

## Common Issues

### Backend Issues
- ❌ **"Cannot connect to database"**
  - ✅ Check `MONGO_URI` is correct
  - ✅ Verify MongoDB Atlas Network Access allows 0.0.0.0/0

- ❌ **"Application failed to start"**
  - ✅ Check Render logs for errors
  - ✅ Verify all dependencies are in `package.json`

### Frontend Issues
- ❌ **"Network Error" or "Failed to fetch"**
  - ✅ Verify `VITE_API_URL` is set correctly
  - ✅ Check backend is running

- ❌ **CORS errors in browser console**
  - ✅ Ensure `FRONTEND_URL` is set in backend
  - ✅ Verify frontend URL matches exactly (no trailing slash)
  - ✅ Redeploy backend after updating CORS

- ❌ **404 on page refresh**
  - ✅ Verify `_redirects` file exists in `frontend/public/`
  - ✅ Check Publish Directory is `dist`

---

## URLs to Save

**Backend URL:** `https://________________________.onrender.com`

**Frontend URL:** `https://________________________.onrender.com`

**MongoDB Atlas:** `mongodb+srv://________________________`

---

## Next Steps After Deployment

1. **Test thoroughly** - Try all features
2. **Monitor logs** - Check for errors in Render dashboard
3. **Set up custom domain** (optional) - In Render settings
4. **Consider upgrading** - Free tier has cold starts
5. **Set up file storage** - Cloudinary/S3 for persistent uploads

---

**Deployment Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete
