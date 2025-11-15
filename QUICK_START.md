# Quick Start Guide - Firebase Admin Panel

## What You Can Do Now

Your church website now has a **Content Management System (CMS)** that lets you:
- Upload PDF and Word documents
- Manage sermon notes and Bible study materials
- Add, view, and delete documents
- All without touching any code!

## 🚀 Getting Started (Quick Steps)

### 1. Set Up Firebase (One-time setup - 15 minutes)

Follow the detailed guide in `FIREBASE_SETUP_GUIDE.md`

**Quick checklist:**
- ✅ Create Firebase project
- ✅ Enable Authentication (Email/Password)
- ✅ Create admin user
- ✅ Enable Firestore Database
- ✅ Enable Cloud Storage
- ✅ Update `src/firebase/config.js` with your Firebase credentials

### 2. Access Admin Panel

Once Firebase is configured:

1. **Start your website:**
   ```bash
   cd /Users/felixofori/Desktop/Fijaicoc/fijai-church
   npm start
   ```

2. **Go to admin login:**
   - Open browser: `http://localhost:3005/login`

3. **Sign in:**
   - Use the email and password you created in Firebase

4. **Upload documents:**
   - Fill in the form
   - Select your PDF or Word file
   - Click "Upload Document"
   - Done! It appears on the website instantly

## 📍 Important URLs

- **Main Website**: http://localhost:3005
- **Admin Login**: http://localhost:3005/login
- **Admin Panel**: http://localhost:3005/admin (requires login)
- **Firebase Console**: https://console.firebase.google.com

## 🎯 How to Upload Documents

1. Go to http://localhost:3005/login
2. Sign in with your admin credentials
3. Fill in the upload form:
   - **Title**: e.g., "Walking in Faith"
   - **Author**: e.g., "Elder James Mensah"
   - **Category**: Choose from dropdown
   - **Pages**: e.g., "12 pages"
   - **Description**: Brief summary
   - **File**: Click to select PDF/Word document
4. Click "Upload Document"
5. Wait for upload to complete
6. Your document appears on the website immediately!

## 🗑️ How to Delete Documents

1. In the Admin Panel (right side)
2. Find the document you want to remove
3. Click the trash icon
4. Confirm deletion
5. Document is removed from website instantly

## 📱 How It Works

```
YOU                    FIREBASE                  WEBSITE
│                         │                          │
│  Upload PDF            │                          │
│──────────────────────> │                          │
│                         │                          │
│                    Stores file                     │
│                    Saves info                      │
│                         │                          │
│                         │  Fetches documents       │
│                         │ <────────────────────────│
│                         │                          │
│                         │  Displays PDFs           │
│                         │ ─────────────────────────>│
│                         │                          │
```

## 🔐 Security

- Only logged-in admins can upload/delete
- Website visitors can only view and download
- Your Firebase credentials are safe in the code
- Never share admin login credentials

## ❓ Common Questions

**Q: Can I have multiple admins?**
A: Yes! Create more users in Firebase Authentication.

**Q: What file types are supported?**
A: PDF (.pdf) and Word documents (.doc, .docx)

**Q: Is there a file size limit?**
A: Firebase free tier has 5GB total storage.

**Q: Can I edit documents after upload?**
A: Currently, you need to delete and re-upload. Editing feature can be added later.

**Q: What happens if I don't set up Firebase?**
A: The website will use the sample documents from the JSON file until Firebase is configured.

## 🆘 Troubleshooting

**Can't access admin panel?**
→ Make sure you've set up Firebase and created an admin user

**Documents not showing?**
→ Check Firebase Console → Firestore Database to verify data is being saved

**Upload failing?**
→ Check that Storage rules are set correctly in Firebase

**Website shows sample data?**
→ Firebase is not configured yet or config values are incorrect

## 📞 Need Help?

1. Check `FIREBASE_SETUP_GUIDE.md` for detailed setup instructions
2. Open browser console (F12) to see error messages
3. Verify Firebase config in `src/firebase/config.js`

---

**Ready to upload your first document?**

1. Complete Firebase setup
2. Visit http://localhost:3005/login
3. Sign in and start uploading!
