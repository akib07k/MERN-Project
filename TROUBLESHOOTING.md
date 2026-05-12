# Troubleshooting Guide

## Backend Issues

### ❌ Error: "Application failed to respond"

**Symptoms:**
- Backend service shows "Deploy failed"
- Logs show connection timeout

**Solutions:**
1. Check if `npm start` script exists in `backend/package.json`
2. Verify `server.js` uses `process.env.PORT`
3. Check logs for specific error messages

---

### ❌ Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**Symptoms:**
- Backend starts but can't connect to database
- Logs show MongoDB connection error

**Solutions:**
1. ✅ Verify `MONGO_URI` environment variable is set correctly
2. ✅ Check MongoDB Atlas Network Access allows `0.0.0.0/0`
3. ✅ Ensure connection string format is correct:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```
4. ✅ Replace `<username>`, `<password>`, `<dbname>` with actual values
5. ✅ Check username/password don't contain special characters (or URL-encode them)

---

### ❌ Error: "Cannot find module 'express'"

**Symptoms:**
- Backend fails to start
- Logs show missing module errors

**Solutions:**
1. ✅ Verify all dependencies are in `backend/package.json`
2. ✅ Check Build Command is `npm install`
3. ✅ Try manual redeploy

---

### ❌ Error: "Port already in use"

**Symptoms:**
- Backend fails to start locally
- Error: `EADDRINUSE: address already in use`

**Solutions:**
1. ✅ Kill process using port 8080:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:8080 | xargs kill -9
   ```
2. ✅ Change PORT in `.env` to different number

---

## Frontend Issues

### ❌ Error: "Failed to fetch" or "Network Error"

**Symptoms:**
- Frontend loads but API calls fail
- Browser console shows network errors

**Solutions:**
1. ✅ Verify `VITE_API_URL` environment variable is set in Render
2. ✅ Check backend URL is correct (no trailing slash)
3. ✅ Ensure backend service is running (visit backend URL)
4. ✅ Check browser console for CORS errors

---

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Symptoms:**
- API calls fail with CORS error in browser console
- Backend is running but frontend can't connect

**Solutions:**
1. ✅ Verify `FRONTEND_URL` is set in backend environment variables
2. ✅ Check frontend URL matches exactly (including https://)
3. ✅ Ensure no trailing slash in `FRONTEND_URL`
4. ✅ Redeploy backend after updating CORS settings
5. ✅ Clear browser cache and try again

**Example:**
```
✅ Correct: https://my-app.onrender.com
❌ Wrong:   https://my-app.onrender.com/
❌ Wrong:   http://my-app.onrender.com (should be https)
```

---

### ❌ Error: "404 Not Found" on page refresh

**Symptoms:**
- Homepage works
- Navigating within app works
- Refreshing on `/products` or other routes shows 404

**Solutions:**
1. ✅ Verify `_redirects` file exists in `frontend/public/`
2. ✅ Check `_redirects` contains: `/* /index.html 200`
3. ✅ Ensure Publish Directory is set to `dist`
4. ✅ Redeploy frontend

---

### ❌ Error: "import.meta.env.VITE_API_URL is undefined"

**Symptoms:**
- API calls go to `undefined/api/products`
- Console shows undefined in API URLs

**Solutions:**
1. ✅ Verify `VITE_API_URL` is set in Render environment variables
2. ✅ Check variable name starts with `VITE_` (required for Vite)
3. ✅ Redeploy frontend after adding environment variable
4. ✅ Clear browser cache

---

### ❌ Error: "Build failed" during deployment

**Symptoms:**
- Frontend deployment fails
- Logs show build errors

**Solutions:**
1. ✅ Check Build Command is: `npm install && npm run build`
2. ✅ Verify `frontend/package.json` has `build` script
3. ✅ Test build locally: `cd frontend && npm run build`
4. ✅ Check for TypeScript or ESLint errors in logs

---

## Database Issues

### ❌ Error: "Authentication failed"

**Symptoms:**
- Backend can't connect to MongoDB
- Logs show authentication error

**Solutions:**
1. ✅ Verify username and password in connection string
2. ✅ Check user exists in MongoDB Atlas Database Access
3. ✅ Ensure password doesn't contain special characters (or URL-encode)
4. ✅ Try creating new database user

---

### ❌ Error: "IP not whitelisted"

**Symptoms:**
- Connection timeout to MongoDB
- Logs show network error

**Solutions:**
1. ✅ Go to MongoDB Atlas → Network Access
2. ✅ Add IP Address: `0.0.0.0/0` (allows from anywhere)
3. ✅ Wait 2-3 minutes for changes to propagate
4. ✅ Redeploy backend

---

### ❌ Error: "Database connection string is invalid"

**Symptoms:**
- Backend fails to start
- Logs show invalid connection string

**Solutions:**
1. ✅ Check format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
2. ✅ Ensure no spaces in connection string
3. ✅ Verify cluster name is correct
4. ✅ Check database name is specified at the end

---

## Environment Variable Issues

### ❌ Error: "process.env.VARIABLE is undefined"

**Symptoms:**
- Backend can't read environment variables
- Logs show undefined values

**Solutions:**
1. ✅ Verify variables are set in Render dashboard (not in code)
2. ✅ Check variable names match exactly (case-sensitive)
3. ✅ Redeploy after adding/updating variables
4. ✅ Ensure no quotes around values in Render dashboard

---

### ❌ Frontend can't access environment variables

**Symptoms:**
- `import.meta.env.VITE_API_URL` is undefined
- API calls fail

**Solutions:**
1. ✅ Ensure variable name starts with `VITE_`
2. ✅ Set in Render dashboard, not in `.env` file
3. ✅ Redeploy frontend (env vars are baked into build)
4. ✅ Clear browser cache

---

## Deployment Issues

### ❌ Service keeps restarting

**Symptoms:**
- Backend shows "Running" then "Deploying" repeatedly
- Service never becomes stable

**Solutions:**
1. ✅ Check logs for crash errors
2. ✅ Verify MongoDB connection is working
3. ✅ Ensure all required environment variables are set
4. ✅ Check for syntax errors in code

---

### ❌ "This site can't be reached"

**Symptoms:**
- Service shows "Live" in Render
- But URL doesn't load

**Solutions:**
1. ✅ Wait 2-3 minutes after deployment
2. ✅ Check service status in Render dashboard
3. ✅ Try accessing from different browser/device
4. ✅ Check Render status page for outages

---

### ❌ Changes not reflecting after deployment

**Symptoms:**
- Pushed new code to GitHub
- Render deployed successfully
- But changes don't appear

**Solutions:**
1. ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. ✅ Try incognito/private browsing mode
3. ✅ Check correct branch is deployed in Render settings
4. ✅ Verify changes are in the deployed branch on GitHub

---

## Performance Issues

### ❌ First request takes 30-60 seconds

**Symptoms:**
- Site loads slowly after period of inactivity
- Subsequent requests are fast

**Cause:**
- Free tier services sleep after 15 minutes of inactivity
- This is normal behavior on Render free tier

**Solutions:**
1. ✅ Upgrade to paid tier ($7/month) for always-on service
2. ✅ Use a service like UptimeRobot to ping your site every 5 minutes
3. ✅ Accept cold starts as part of free tier

---

### ❌ Images not loading

**Symptoms:**
- Uploaded images show broken image icon
- Console shows 404 for image URLs

**Solutions:**
1. ✅ Check `/uploads` folder exists in backend
2. ✅ Verify static file serving is configured:
   ```javascript
   app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
   ```
3. ✅ **Important:** On free tier, uploads are ephemeral
4. ✅ Consider using Cloudinary or S3 for persistent storage

---

## Authentication Issues

### ❌ "Unauthorized" errors after login

**Symptoms:**
- Login succeeds
- But subsequent requests fail with 401

**Solutions:**
1. ✅ Check cookies are being sent (credentials: true in CORS)
2. ✅ Verify JWT_SECRET is set in backend
3. ✅ Ensure frontend and backend URLs match CORS config
4. ✅ Check cookie settings allow cross-origin

---

### ❌ Can't stay logged in

**Symptoms:**
- Login works
- But user is logged out on page refresh

**Solutions:**
1. ✅ Check Redux persist configuration
2. ✅ Verify localStorage is working
3. ✅ Check browser isn't blocking cookies
4. ✅ Ensure JWT token isn't expired

---

## Build Issues

### ❌ "npm ERR! code ELIFECYCLE"

**Symptoms:**
- Build fails with npm error
- Logs show lifecycle script error

**Solutions:**
1. ✅ Check for syntax errors in code
2. ✅ Verify all imports are correct
3. ✅ Test build locally: `npm run build`
4. ✅ Check Node version compatibility

---

### ❌ "Module not found" during build

**Symptoms:**
- Build fails
- Can't find specific module

**Solutions:**
1. ✅ Verify module is in `package.json` dependencies
2. ✅ Check import path is correct
3. ✅ Ensure file exists in repository
4. ✅ Check file name case matches (case-sensitive on Linux)

---

## How to Check Logs

### Backend Logs
1. Go to Render Dashboard
2. Click on your backend service
3. Click "Logs" in left sidebar
4. Look for errors in red

### Frontend Build Logs
1. Go to Render Dashboard
2. Click on your frontend static site
3. Click "Events" tab
4. Click on latest deploy
5. View build logs

### Browser Console Logs
1. Open your deployed frontend
2. Press F12 (or Cmd+Option+I on Mac)
3. Click "Console" tab
4. Look for errors in red

---

## Still Having Issues?

### Debugging Checklist
- [ ] All environment variables set correctly
- [ ] MongoDB Atlas allows connections from anywhere
- [ ] Backend service is "Live" in Render
- [ ] Frontend service is "Live" in Render
- [ ] CORS configured with correct frontend URL
- [ ] No errors in Render logs
- [ ] No errors in browser console
- [ ] Tried clearing browser cache
- [ ] Tested in incognito mode

### Get Help
1. Check Render logs for specific error messages
2. Search error message on Google/Stack Overflow
3. Check Render documentation: https://render.com/docs
4. Check MongoDB Atlas documentation
5. Review this guide's relevant section

---

## Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| CORS errors | Set `FRONTEND_URL` in backend, redeploy |
| Can't connect to DB | Check `MONGO_URI` and Network Access |
| 404 on refresh | Verify `_redirects` file exists |
| API calls fail | Check `VITE_API_URL` is set |
| Slow first load | Normal on free tier (cold start) |
| Images missing | Use Cloudinary/S3 for persistence |
| Build fails | Check logs for specific error |
| Auth issues | Verify `JWT_SECRET` is set |

---

**Remember:** Most issues are due to:
1. Missing environment variables
2. Incorrect MongoDB configuration
3. CORS misconfiguration
4. Browser cache

Always check these first! 🔍
