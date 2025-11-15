import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCB6OBWik7JAvVBs1_2yb4aKlo3j0VxCbQ",
  authDomain: "fijai-church.firebaseapp.com",
  projectId: "fijai-church",
  storageBucket: "fijai-church.firebasestorage.app",
  messagingSenderId: "881904823953",
  appId: "1:881904823953:web:ff039daa3c12cbc0f75930"
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "demo-api-key" &&
         !firebaseConfig.apiKey.includes("YOUR_");
};

// Initialize Firebase only if configured
let app = null;
let db = null;
let storage = null;
let auth = null;

try {
  if (isFirebaseConfigured()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
  } else {
    console.log('Firebase not configured - using demo mode. Follow FIREBASE_SETUP_GUIDE.md to enable admin features.');
  }
} catch (error) {
  console.log('Firebase initialization skipped:', error.message);
}

export { db, storage, auth };
export default app;
