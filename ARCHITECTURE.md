# Deployment Architecture

## Current Setup (Local Development)

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                           │
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Frontend   │         │   Backend    │                │
│  │              │         │              │                │
│  │ React + Vite │────────▶│   Express    │                │
│  │ Port: 5173   │  Proxy  │   Port: 8080 │                │
│  └──────────────┘         └──────┬───────┘                │
│                                   │                         │
│                                   ▼                         │
│                          ┌──────────────┐                  │
│                          │   MongoDB    │                  │
│                          │ Port: 27017  │                  │
│                          └──────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## Production Setup (Render.com)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RENDER.COM CLOUD                            │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Static Site Service                                       │   │
│  │  ┌──────────────────────────────────────────────────┐     │   │
│  │  │  Frontend (React + Vite)                         │     │   │
│  │  │  https://your-frontend.onrender.com              │     │   │
│  │  │                                                   │     │   │
│  │  │  • Serves static HTML/CSS/JS                     │     │   │
│  │  │  • Built from /frontend folder                   │     │   │
│  │  │  • Uses dist/ as publish directory               │     │   │
│  │  └──────────────────────┬───────────────────────────┘     │   │
│  └─────────────────────────┼─────────────────────────────────┘   │
│                            │                                       │
│                            │ API Calls                             │
│                            │ (VITE_API_URL)                        │
│                            ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Web Service                                               │   │
│  │  ┌──────────────────────────────────────────────────┐     │   │
│  │  │  Backend (Node.js + Express)                     │     │   │
│  │  │  https://your-backend.onrender.com               │     │   │
│  │  │                                                   │     │   │
│  │  │  • Serves REST API                               │     │   │
│  │  │  • Built from /backend folder                    │     │   │
│  │  │  • Runs on process.env.PORT                      │     │   │
│  │  │  • CORS allows frontend URL                      │     │   │
│  │  └──────────────────────┬───────────────────────────┘     │   │
│  └─────────────────────────┼─────────────────────────────────┘   │
│                            │                                       │
└────────────────────────────┼───────────────────────────────────────┘
                             │
                             │ Database Connection
                             │ (MONGO_URI)
                             ▼
                    ┌──────────────────┐
                    │  MongoDB Atlas   │
                    │  (Cloud Database)│
                    │                  │
                    │  • Free Tier     │
                    │  • Global Access │
                    └──────────────────┘
```

## Data Flow

### User Visits Website
```
1. User → https://your-frontend.onrender.com
2. Render serves static files (HTML, CSS, JS)
3. React app loads in browser
```

### User Interacts with App
```
1. User clicks "View Products"
2. Frontend makes API call to: https://your-backend.onrender.com/api/products
3. Backend receives request
4. Backend queries MongoDB Atlas
5. MongoDB returns data
6. Backend sends JSON response
7. Frontend displays products
```

### Authentication Flow
```
1. User submits login form
2. Frontend → POST https://your-backend.onrender.com/api/users/login
3. Backend validates credentials against MongoDB
4. Backend generates JWT token
5. Backend sends token in HTTP-only cookie
6. Frontend stores user info in Redux
7. Subsequent requests include cookie automatically
```

## Environment Variables Flow

### Frontend Build Time
```
Build Process:
1. Render reads VITE_API_URL from environment
2. Vite replaces import.meta.env.VITE_API_URL in code
3. Built files contain actual backend URL
4. Static files deployed to CDN
```

### Backend Runtime
```
Server Startup:
1. Render provides PORT environment variable
2. Backend reads MONGO_URI, JWT_SECRET, FRONTEND_URL
3. Server connects to MongoDB Atlas
4. Server configures CORS with frontend URL
5. Server listens on provided PORT
```

## File Upload Flow (Current Setup)

```
1. User uploads image
2. Frontend → POST https://your-backend.onrender.com/api/upload
3. Backend saves to /uploads folder on server disk
4. Backend returns file path
5. Frontend displays image from: https://your-backend.onrender.com/uploads/image.png

⚠️ WARNING: On Render free tier, /uploads is ephemeral!
   Files deleted on redeploy or server restart.
```

## Recommended Production File Upload Flow

```
1. User uploads image
2. Frontend → POST https://your-backend.onrender.com/api/upload
3. Backend uploads to Cloudinary/S3
4. Cloudinary/S3 returns permanent URL
5. Backend saves URL to MongoDB
6. Frontend displays image from: https://res.cloudinary.com/...

✅ Files persist permanently
✅ CDN delivery (faster)
✅ Image transformations available
```

## Service Communication

### CORS Configuration
```
Backend allows requests from:
- http://localhost:5173 (local dev)
- http://localhost:5174 (local dev)
- https://your-frontend.onrender.com (production)

Credentials: true (allows cookies)
```

### API Base URL
```
Frontend uses:
- Local: http://localhost:8080
- Production: https://your-backend.onrender.com

Set via VITE_API_URL environment variable
```

## Deployment Pipeline

### Backend Deployment
```
1. Push to GitHub
2. Render detects changes
3. Runs: npm install (in /backend)
4. Runs: npm start
5. Server starts on Render-provided PORT
6. Health check passes
7. Service goes live
```

### Frontend Deployment
```
1. Push to GitHub
2. Render detects changes
3. Runs: npm install (in /frontend)
4. Runs: npm run build
5. Vite builds to /dist folder
6. Render deploys /dist to CDN
7. Site goes live
```

## Scaling Considerations

### Current Setup (Free Tier)
- ✅ Good for: Development, testing, portfolios
- ⚠️ Limitations:
  - Services sleep after 15 min inactivity
  - Cold start: 30-60 seconds
  - Ephemeral file storage
  - Limited bandwidth

### Production Recommendations
- 💰 Upgrade to paid tier ($7/month per service)
  - No cold starts
  - Persistent disk storage
  - More resources
- 🌐 Add CDN for static assets
- 📊 Add monitoring (Render provides basic metrics)
- 🔒 Add custom domain with SSL
- 💾 Use Cloudinary/S3 for file uploads
- 🗄️ Consider MongoDB Atlas paid tier for backups

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Static Site)                                 │
│  • HTTPS enforced by Render                             │
│  • Environment variables baked into build               │
│  • No sensitive data in client code                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS Only
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Backend (Web Service)                                  │
│  • HTTPS enforced by Render                             │
│  • CORS restricts origins                               │
│  • JWT authentication                                   │
│  • HTTP-only cookies                                    │
│  • Environment variables in Render dashboard            │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Encrypted Connection
                     ▼
┌─────────────────────────────────────────────────────────┐
│  MongoDB Atlas                                          │
│  • TLS/SSL encryption                                   │
│  • Username/password authentication                     │
│  • IP whitelist (0.0.0.0/0 for Render)                  │
│  • Network isolation                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

**Two Services Required:**
1. **Static Site** (Frontend) - Serves React app
2. **Web Service** (Backend) - Serves API

**External Service:**
- **MongoDB Atlas** - Database (separate from Render)

**Communication:**
- Frontend → Backend: HTTPS API calls
- Backend → Database: Encrypted MongoDB connection
- CORS configured to allow only your frontend domain

**Environment Variables:**
- Set in Render dashboard (not in code)
- Different for each service
- Frontend vars must start with `VITE_`
