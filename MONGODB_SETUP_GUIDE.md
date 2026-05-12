# MongoDB Atlas Setup Guide

## ✅ Your MongoDB Credentials

**Connection String:**
```
mongodb+srv://akibk6005_db_user:Akib123@cluster0.c1nhck4.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

**Details:**
- Username: `akibk6005_db_user`
- Password: `Akib123`
- Cluster: `cluster0.c1nhck4.mongodb.net`
- Database: `ecommerce`

---

## 🔧 Required MongoDB Atlas Configuration

### Step 1: Verify Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Select your project
4. Click **"Network Access"** in the left sidebar
5. Click **"Add IP Address"**
6. Select **"Allow Access from Anywhere"**
7. Enter IP: `0.0.0.0/0`
8. Click **"Confirm"**

**⚠️ Important:** Wait 2-3 minutes for changes to take effect!

---

### Step 2: Verify Database User

1. Click **"Database Access"** in the left sidebar
2. Verify user `akibk6005_db_user` exists
3. Check that password is correct: `Akib123`
4. Ensure user has **"Read and write to any database"** privileges

If user doesn't exist or password is wrong:
- Click **"Edit"** next to the user
- Update password to: `Akib123`
- Click **"Update User"**

---

### Step 3: Verify Cluster is Running

1. Click **"Database"** in the left sidebar
2. Check that `Cluster0` shows status: **"Active"**
3. If cluster is paused, click **"Resume"**

---

### Step 4: Test Connection

After completing steps 1-3, test the connection:

```bash
cd backend
npm install
node -e "import('mongoose').then(m => m.default.connect(process.env.MONGO_URI).then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(err => { console.error('❌ Failed:', err.message); process.exit(1); }))"
```

---

## 🚀 For Render Deployment

When deploying to Render, use this **exact connection string** in your environment variables:

```
MONGO_URI=mongodb+srv://akibk6005_db_user:Akib123@cluster0.c1nhck4.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

**Copy-paste this into Render's environment variable field!**

---

## 🔒 Security Notes

### Current Setup (Development)
- ✅ Password is simple for development
- ✅ Network access allows all IPs (required for Render)

### For Production (Recommended)
Consider updating:
1. **Stronger password** - Use a complex password with special characters
2. **Separate users** - Different users for dev/production
3. **Database name** - Use different databases for dev/production

---

## 🐛 Troubleshooting

### Error: "querySrv ECONNREFUSED"
**Solution:** Network Access not configured
- Add IP `0.0.0.0/0` in Network Access
- Wait 2-3 minutes

### Error: "Authentication failed"
**Solution:** Wrong username or password
- Verify credentials in Database Access
- Update password if needed

### Error: "Cluster not found"
**Solution:** Cluster URL might be wrong
- Go to Database → Connect → Connect your application
- Copy the connection string
- Replace `<password>` with `Akib123`
- Replace `<dbname>` with `ecommerce`

---

## 📋 Quick Checklist

Before deploying to Render:
- [ ] MongoDB Atlas account active
- [ ] Cluster0 is running (status: Active)
- [ ] User `akibk6005_db_user` exists with password `Akib123`
- [ ] Network Access allows `0.0.0.0/0`
- [ ] Connection string tested and working
- [ ] Database name is `ecommerce`

---

## 🎯 Ready for Deployment

Once MongoDB Atlas is configured:

1. **Local Development:**
   - Your `backend/.env` already has the correct connection string
   - Just run: `npm run dev` in backend folder

2. **Render Deployment:**
   - Copy this connection string to Render's `MONGO_URI` environment variable:
   ```
   mongodb+srv://akibk6005_db_user:Akib123@cluster0.c1nhck4.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
   ```

---

## 📞 Need Help?

If you're still having issues:
1. Check MongoDB Atlas status page
2. Verify all steps above are completed
3. Wait 2-3 minutes after making changes
4. Try connecting from MongoDB Compass (GUI tool)

---

**Your connection string is ready to use! Just ensure Network Access is configured in MongoDB Atlas.**
