import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration object
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://delightful-cosmetics-bf4dc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: import.meta.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.FIREBASE_APP_ID,
  };
  

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Exporting Firebase services
export { auth, googleProvider, analytics };
