# Firebase Setup Checklist - Let's Do This! 🚀

Follow these steps in order. Check each box as you complete it.

---

## Step 1: Create Firebase Project (5 minutes)

### Actions:
1. [ ] Go to https://console.firebase.google.com
2. [ ] Click **"Add project"** or **"Create a project"**
3. [ ] Project name: Enter `fijai-church` (or any name)
4. [ ] Click **Continue**
5. [ ] **Disable** Google Analytics (not needed)
6. [ ] Click **Create project**
7. [ ] Wait for setup to complete
8. [ ] Click **Continue**

✅ **You're now in your Firebase Console!**

---

## Step 2: Register Web App (2 minutes)

### Actions:
1. [ ] In Firebase Console, click the **Web icon** (`</>`)
2. [ ] App nickname: Enter `Fijai Church Website`
3. [ ] **Leave "Firebase Hosting" UNCHECKED**
4. [ ] Click **Register app**
5. [ ] **STOP! Keep this page open** - you'll need these values:

```
apiKey: "AIza..."
authDomain: "fijai-church-xxxxx.firebaseapp.com"
projectId: "fijai-church-xxxxx"
storageBucket: "fijai-church-xxxxx.appspot.com"
messagingSenderId: "123456789"
appId: "1:123456789:web:abcdef"
```

6. [ ] **Copy all 6 values** (we'll use them in Step 8)

---

## Step 3: Enable Authentication (3 minutes)

### Actions:
1. [ ] In left sidebar, click **Authentication**
2. [ ] Click **Get started**
3. [ ] Under "Sign-in method", click **Email/Password**
4. [ ] Toggle **Enable** (first option only)
5. [ ] Click **Save**

✅ **Authentication enabled!**

---

## Step 4: Create Admin User (2 minutes)

### Actions:
1. [ ] Still in Authentication, click **Users** tab
2. [ ] Click **Add user**
3. [ ] Email: Enter your email (e.g., `admin@fijaichurchofchrist.com`)
4. [ ] Password: Create a **strong password**
5. [ ] **WRITE DOWN YOUR PASSWORD!** ⚠️
6. [ ] Click **Add user**

**Save these credentials securely:**
```
Email: ________________________
Password: ______________________
```

✅ **Admin account created!**

---

## Step 5: Enable Firestore Database (3 minutes)

### Actions:
1. [ ] In left sidebar, click **Firestore Database**
2. [ ] Click **Create database**
3. [ ] Select **"Start in production mode"**
4. [ ] Click **Next**
5. [ ] Location: Choose **eur3 (europe-west)** (closest to Ghana)
6. [ ] Click **Enable**
7. [ ] Wait for database to be created

✅ **Firestore enabled!**

---

## Step 6: Set Firestore Security Rules (2 minutes)

### Actions:
1. [ ] In Firestore Database, click **Rules** tab
2. [ ] **Delete everything** in the editor
3. [ ] **Copy and paste** this exactly:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /documents/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. [ ] Click **Publish**

✅ **Firestore rules set!**

---

## Step 7: Enable Cloud Storage (2 minutes)

### Actions:
1. [ ] In left sidebar, click **Storage**
2. [ ] Click **Get started**
3. [ ] Click **Next** (production mode is fine)
4. [ ] Location: Select **eur3** (same as Firestore)
5. [ ] Click **Done**

✅ **Storage enabled!**

---

## Step 8: Set Storage Security Rules (2 minutes)

### Actions:
1. [ ] In Storage, click **Rules** tab
2. [ ] **Delete everything** in the editor
3. [ ] **Copy and paste** this exactly:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

4. [ ] Click **Publish**

✅ **Storage rules set!**

---

## Step 9: Update Your Code (3 minutes) ⚠️ IMPORTANT

### Actions:

**Option A: Use Environment Variables (Recommended)**

1. [ ] Create a file named `.env.local` in your project folder
2. [ ] Add these lines (using YOUR values from Step 2):

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

3. [ ] Save the file
4. [ ] **Restart your server:**
   - Stop current server (Ctrl+C)
   - Run: `PORT=3005 npm start`

**Option B: Edit Config File Directly**

1. [ ] Open `src/firebase/config.js`
2. [ ] Find this section (around line 8):

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  // ... etc
};
```

3. [ ] Replace with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

4. [ ] Save the file

✅ **Firebase configured!**

---

## Step 10: Test Your Setup (2 minutes)

### Actions:
1. [ ] Go to http://localhost:3005/login
2. [ ] Enter your admin email and password (from Step 4)
3. [ ] Click **Sign In**

### Expected Result:
✅ You should see the **Admin Panel**!

### If you see an error:
- Check that you entered credentials correctly
- Verify all Firebase services are enabled
- Check browser console (F12) for error messages

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] Can access admin panel at http://localhost:3005/admin
- [ ] See "Upload New Document" form
- [ ] See "Uploaded Documents" list (empty at first)
- [ ] No error messages

---

## 🚀 First Upload Test

### Let's upload your first document:

1. [ ] In Admin Panel, fill out the form:
   - Title: Test Sermon
   - Author: Your name
   - Category: Faith Journey
   - Pages: 1 page
   - Description: This is a test

2. [ ] Click "Choose file" and select any PDF

3. [ ] Click **Upload Document**

4. [ ] Wait for upload progress

5. [ ] See success message!

6. [ ] Go to http://localhost:3005 (main website)

7. [ ] Scroll to "Scriptures & Teachings"

8. [ ] **Your document is there!** 🎉

---

## ⚠️ Important Notes

### Keep These Safe:
- [ ] Admin email
- [ ] Admin password
- [ ] Firebase project name

### Don't Share:
- Your Firebase API keys are safe in the code
- Only share admin login with trusted people

### Backup:
- Firebase automatically backs up your data
- Documents stored in Firebase cloud

---

## 🆘 Troubleshooting

### Problem: Can't create Firebase project
**Solution:** Make sure you're logged into Google account

### Problem: Can't log into admin panel
**Solution:**
- Check email/password are correct
- Verify user was created in Firebase Authentication
- Check browser console for errors

### Problem: Upload fails
**Solution:**
- Verify Storage is enabled
- Check Storage rules are published
- Make sure file is PDF or Word document

### Problem: Document doesn't appear on website
**Solution:**
- Refresh the website
- Check Firestore Database to see if document was saved
- Check browser console for errors

---

## 📍 Useful Links

- **Firebase Console:** https://console.firebase.google.com
- **Your Project:** https://console.firebase.google.com/project/YOUR_PROJECT_ID
- **Admin Login:** http://localhost:3005/login
- **Admin Panel:** http://localhost:3005/admin
- **Main Website:** http://localhost:3005

---

## ✅ Completion Summary

Once all steps are done:

**Time spent:** ~15 minutes
**What you got:**
- ✅ Professional admin panel
- ✅ Cloud storage (5GB free)
- ✅ Secure authentication
- ✅ Easy PDF uploads
- ✅ Real-time website updates
- ✅ No code editing needed ever again!

**Next steps:**
1. Upload your real sermon documents
2. Share admin credentials with trusted staff
3. Deploy your website to production

---

## 🎊 Congratulations!

You now have a professional content management system for your church website!

**No more editing JSON files.** Just login, upload, done! 🚀

---

## Need Help?

If you get stuck on any step, check:
1. Firebase Console for error messages
2. Browser console (F12) for technical errors
3. `FIREBASE_SETUP_GUIDE.md` for detailed explanations

**You got this!** 💪
