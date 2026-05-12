# 🔧 Fix MongoDB Connection Error

## ❌ Error You're Seeing

```
Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.c1nhck4.mongodb.net
```

This means your app can't connect to MongoDB Atlas.

---

## ✅ Solution: Configure MongoDB Atlas Network Access

### Step-by-Step Fix:

#### 1. Go to MongoDB Atlas
- Visit: https://cloud.mongodb.com/
- Log in with your credentials

#### 2. Select Your Project
- Click on your project name
- You should see your Cluster0

#### 3. Configure Network Access (CRITICAL!)
- Click **"Network Access"** in the left sidebar (under Security section)
- Click **"+ ADD IP ADDRESS"** button
- You'll see a dialog box

#### 4. Allow All IPs
- Click **"ALLOW ACCESS FROM ANYWHERE"**
- It will automatically fill in: `0.0.0.0/0`
- Add a comment (optional): "Render deployment"
- Click **"Confirm"**

#### 5. Wait for Changes
- **Important:** Wait 2-3 minutes for changes to propagate
- You'll see a green "Active" status when ready

#### 6. Verify Cluster is Active
- Click **"Database"** in the left sidebar
- Check that Cluster0 shows: **"Active"** (not "Paused")
- If paused, click **"..."** → **"Resume"**

#### 7. Verify Database User
- Click **"Database Access"** in the left sidebar
- Find user: `akibk6005_db_user`
- Check privileges: Should have "Read and write to any database"
- If user doesn't exist, create it:
  - Click **"+ ADD NEW DATABASE USER"**
  - Username: `akibk6005_db_user`
  - Password: `Akib123`
  - Database User Privileges: "Read and write to any database"
  - Click **"Add User"**

---

## 🧪 Test Connection After Configuration

After configuring MongoDB Atlas, restart your server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm start
```

You should see:
```
Server running on port 8080
MongoDB Atlas connected
```

---

## 🔄 Alternative: Use Local MongoDB (Temporary)

If you want to test locally while configuring Atlas:

### Option 1: Install MongoDB Locally

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run on `mongodb://127.0.0.1:27017`

**Mac (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: Use MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://127.0.0.1:27017`

---

## 📝 Your Configuration

### Current Setup (in backend/.env):

**For Local Testing:**
```env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
```

**For Production (MongoDB Atlas):**
```env
MONGO_URI=mongodb+srv://akibk6005_db_user:Akib123@cluster0.c1nhck4.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
```

---

## 🎯 What to Do Now

### For Local Development:
1. **Option A:** Install local MongoDB and use local connection
2. **Option B:** Configure MongoDB Atlas Network Access (recommended)

### For Render Deployment:
- **You MUST use MongoDB Atlas** (local MongoDB won't work on Render)
- Configure Network Access as described above

---

## ✅ Verification Steps

After configuring MongoDB Atlas:

1. **Wait 2-3 minutes** after adding IP to Network Access
2. **Restart your server:**
   ```bash
   npm start
   ```
3. **Check for success message:**
   ```
   MongoDB Atlas connected
   ```
4. **If still failing:**
   - Check Network Access shows `0.0.0.0/0` as Active
   - Verify cluster is not paused
   - Try restarting your computer (DNS cache)
   - Check your internet connection

---

## 🐛 Still Having Issues?

### Check These:

1. **Network Access Configuration:**
   - Go to MongoDB Atlas → Network Access
   - Should show: `0.0.0.0/0` with status "Active"

2. **Cluster Status:**
   - Go to MongoDB Atlas → Database
   - Cluster0 should show "Active" (not "Paused")

3. **User Credentials:**
   - Go to MongoDB Atlas → Database Access
   - User `akibk6005_db_user` should exist

4. **Internet Connection:**
   - Make sure you have internet access
   - Try accessing other websites

5. **Firewall/Antivirus:**
   - Some firewalls block MongoDB connections
   - Try temporarily disabling to test

6. **DNS Issues:**
   - Try restarting your computer
   - Try using a different network (mobile hotspot)

---

## 📞 Quick Reference

### MongoDB Atlas URLs:
- Dashboard: https://cloud.mongodb.com/
- Network Access: https://cloud.mongodb.com/ → Network Access
- Database Access: https://cloud.mongodb.com/ → Database Access

### Your Credentials:
- Username: `akibk6005_db_user`
- Password: `Akib123`
- Database: `ecommerce`
- Cluster: `cluster0.c1nhck4.mongodb.net`

---

## 🎉 Once Connected

After successful connection, you can:
1. Continue local development
2. Deploy to Render with confidence
3. Your data will be stored in MongoDB Atlas

---

**Remember:** For Render deployment, you MUST configure MongoDB Atlas Network Access to `0.0.0.0/0`!
