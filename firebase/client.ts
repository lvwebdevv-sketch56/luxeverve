import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initFirebaseClient() {
  // Safe check for Next.js build-time pre-rendering when environment variables are blank/commented
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase Client SDK: api key is missing! Exporting mock auth/db references for safe build.");
    return {
      auth: null as any,
      db: null as any,
    };
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  return {
    auth: getAuth(app),
    db: getFirestore(app),
  };
}

export const { auth, db } = initFirebaseClient();
