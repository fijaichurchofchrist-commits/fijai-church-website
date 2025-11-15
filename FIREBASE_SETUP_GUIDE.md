# Firebase Setup Guide for Church of Christ Fijai Website

This guide will walk you through setting up Firebase for your church website so you can upload PDFs and documents without touching any code.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `fijai-church` (or any name you prefer)
4. Click **Continue**
5. Disable Google Analytics (optional for this project)
6. Click **Create project**
7. Wait for Firebase to finish setting up your project
8. Click **Continue**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Enter app nickname: `Fijai Church Website`
3. **Do NOT** check "Also set up Firebase Hosting"
4. Click **Register app**
5. You'll see your Firebase configuration object - **KEEP THIS PAGE OPEN**

## Step 3: Configure Firebase in Your Code

1. Open the file: `src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",                    // From Firebase Console
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // From Firebase Console
  projectId: "YOUR_PROJECT_ID",                   // From Firebase Console
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // From Firebase Console
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // From Firebase Console
  appId: "YOUR_APP_ID"                            // From Firebase Console
};
```

3. **Save the file**

## Step 4: Enable Authentication

1. In Firebase Console, click **Authentication** in the left sidebar
2. Click **Get started**
3. Click on **Email/Password** under Sign-in method
4. Toggle **Enable**
5. Click **Save**

## Step 5: Create Admin User

1. Still in **Authentication**, click the **Users** tab
2. Click **Add user**
3. Enter email: `admin@fijaichurchofchrist.com` (or your preferred email)
4. Enter a strong password (save this securely!)
5. Click **Add user**

**IMPORTANT:** Save this email and password - you'll use it to log into the admin panel!

## Step 6: Enable Cloud Firestore

1. In Firebase Console, click **Firestore Database** in the left sidebar
2. Click **Create database**
3. Select **Start in production mode**
4. Click **Next**
5. Choose a location closest to Ghana (e.g., `eur3 (europe-west)`)
6. Click **Enable**

## Step 7: Set Firestore Security Rules

1. In Firestore Database, click the **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read documents
    match /documents/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## Step 8: Enable Cloud Storage

1. In Firebase Console, click **Storage** in the left sidebar
2. Click **Get started**
3. Click **Next** (keep production mode)
4. Select the same location you chose for Firestore
5. Click **Done**

## Step 9: Set Storage Security Rules

1. In Storage, click the **Rules** tab
2. Replace the default rules with:

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

3. Click **Publish**

## Step 10: Test Your Setup

1. Run your website: `npm start` (if not already running)
2. Visit: `http://localhost:3005/login`
3. Enter the admin email and password you created in Step 5
4. You should see the Admin Panel!

## Using the Admin Panel

### To Upload a Document:

1. Go to `http://localhost:3005/login` and sign in
2. Fill in the form:
   - **Title**: Name of the sermon/teaching
   - **Author**: Who wrote/presented it
   - **Category**: Select from dropdown (Faith Journey, Spiritual Foundations, etc.)
   - **Number of Pages**: How many pages (e.g., "12 pages")
   - **Description**: Brief summary
   - **Upload File**: Click to select your PDF or Word document
3. Click **Upload Document**
4. Wait for the progress bar to complete
5. The document will instantly appear on your website!

### To Delete a Document:

1. In the Admin Panel, find the document in the list on the right
2. Click the trash icon
3. Confirm deletion
4. The document is removed from the website immediately

## When Your Site Goes Live

After deploying your website to a hosting service (Vercel, Netlify, etc.):

1. Go to Firebase Console
2. Click **Authentication** → **Settings** → **Authorized domains**
3. Add your live website domain (e.g., `fijaichurch.com`)
4. Click **Add**

Now the admin panel will work on your live site too!

## Security Best Practices

1. **Never share your admin credentials**
2. Use a strong password for the admin account
3. Only create admin accounts for trusted church staff
4. Keep your Firebase config file secure (it's safe in the code, but don't share it publicly)

## Troubleshooting

### Can't log in?
- Check that you created the admin user in Firebase Authentication
- Verify email and password are correct
- Make sure you published the Firestore and Storage rules

### Documents not appearing?
- Check Firebase Console → Firestore Database to see if documents are being saved
- Check browser console for errors (press F12)
- Verify Firestore rules allow read access

### Upload fails?
- Check Storage rules allow write for authenticated users
- Verify file is PDF or Word document
- Check file size (Firebase free tier has 5GB storage limit)

## Firebase Free Tier Limits

- **Storage**: 5 GB
- **Downloads**: 1 GB/day
- **Firestore Reads**: 50,000/day
- **Firestore Writes**: 20,000/day

This is more than enough for a church website. If you exceed limits, Firebase will notify you.

## Need Help?

If you encounter issues:
1. Check the browser console for error messages (press F12)
2. Verify all steps were completed
3. Ensure Firebase config values are correct in `src/firebase/config.js`

---

**Congratulations!** Your website now has a content management system. You can upload PDFs anytime without touching code!
