# 🚀 E-Commerce MERN Stack - Render Deployment

This project is a full-stack e-commerce application built with MongoDB, Express, React, and Node.js (MERN stack). It's ready to deploy on Render.com.

---

## 📋 Documentation Index

Choose the guide that fits your needs:

### 🎯 Quick Start (Recommended)
- **[QUICK_START.md](QUICK_START.md)** - Deploy in 15 minutes with step-by-step instructions

### 📚 Comprehensive Guides
- **[RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)** - Complete deployment guide with detailed explanations
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Interactive checklist to track your progress
- **[RENDER_SETTINGS.txt](RENDER_SETTINGS.txt)** - Quick reference for exact Render settings

### 🔧 Technical Documentation
- **[CHANGES_SUMMARY.md](CHANGES_SUMMARY.md)** - What was changed for deployment
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and data flow diagrams
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🏗️ Project Structure

```
.
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads (ephemeral on Render)
│   ├── utils/              # Utility functions
│   ├── .env.example        # Environment variables template
│   ├── package.json        # Backend dependencies
│   └── server.js           # Express server entry point
│
├── frontend/               # React/Vite application
│   ├── public/             # Static assets
│   │   └── _redirects      # SPA routing configuration
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # React entry point
│   ├── .env.example        # Environment variables template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
└── [Deployment Guides]     # Documentation files
```

---

## ⚡ Quick Deploy

### Prerequisites
1. GitHub account
2. Render.com account (free)
3. MongoDB Atlas account (free)

### Deploy Steps
```bash
# 1. Clone and prepare
git clone <your-repo>
cd <your-repo>

# 2. Follow QUICK_START.md
# - Set up MongoDB Atlas
# - Deploy backend to Render
# - Deploy frontend to Render
# - Configure environment variables

# 3. Done! 🎉
```

---

## 🔑 Environment Variables

### Backend (Web Service)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

### Frontend (Static Site)
```env
VITE_API_URL=https://your-backend.onrender.com
```

See `.env.example` files in each folder for templates.

---

## 🎯 Deployment Configuration

### Backend Service (Web Service)
```
Root Directory:    backend
Build Command:     npm install
Start Command:     npm start
```

### Frontend Service (Static Site)
```
Root Directory:       frontend
Build Command:        npm install && npm run build
Publish Directory:    dist
```

---

## 🌐 Architecture

```
User Browser
     ↓
Frontend (Static Site on Render)
     ↓
Backend API (Web Service on Render)
     ↓
MongoDB Atlas (Cloud Database)
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams.

---

## ✨ Features

- 🛍️ Product catalog with search and filters
- 🛒 Shopping cart functionality
- 👤 User authentication (JWT)
- 📦 Order management
- 👨‍💼 Admin dashboard
- 📱 Responsive design (Tailwind CSS)
- 🔒 Secure authentication with HTTP-only cookies
- 📸 Image upload functionality

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit (state management)
- React Router (routing)
- Tailwind CSS (styling)
- Vite (build tool)
- Axios (HTTP client)

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)

### Deployment
- Render.com (hosting)
- MongoDB Atlas (database)

---

## 🚀 Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

Visit `http://localhost:5173` to see the app.

---

## 📝 Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Application tested and working

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed checklist.

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Cold Starts:** Services sleep after 15 minutes of inactivity
- **File Storage:** Uploaded files are ephemeral (deleted on redeploy)
- **Database:** Must use MongoDB Atlas (local MongoDB won't work)

### Production Recommendations
- Use Cloudinary or S3 for persistent file storage
- Upgrade to paid tier for always-on services
- Set up monitoring and alerts
- Use custom domain with SSL

---

## 🐛 Troubleshooting

Having issues? Check these first:

1. **CORS Errors**
   - Verify `FRONTEND_URL` is set in backend
   - Check it matches your frontend URL exactly

2. **Database Connection Failed**
   - Check `MONGO_URI` is correct
   - Verify MongoDB Atlas Network Access allows 0.0.0.0/0

3. **API Calls Failing**
   - Verify `VITE_API_URL` is set in frontend
   - Check backend service is running

4. **404 on Page Refresh**
   - Verify `_redirects` file exists in `frontend/public/`

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for comprehensive solutions.

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | Fast deployment guide |
| [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) | Detailed deployment instructions |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Step-by-step checklist |
| [RENDER_SETTINGS.txt](RENDER_SETTINGS.txt) | Quick settings reference |
| [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md) | What was modified |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & fixes |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🆘 Support

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Review Render logs for specific errors
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

## 🎉 Ready to Deploy?

Start with **[QUICK_START.md](QUICK_START.md)** for the fastest path to deployment!

---

**Made with ❤️ using the MERN stack**
