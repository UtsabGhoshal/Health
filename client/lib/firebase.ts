import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyARMUiSBYcEAElUx00LIJGG_sLY_mT7tho",
  authDomain: "buzgo-68567.firebaseapp.com",
  projectId: "buzgo-68567",
  storageBucket: "buzgo-68567.firebasestorage.app",
  messagingSenderId: "594175097417",
  appId: "1:594175097417:web:b90ba53249e0c8b939dd98",
  measurementId: "G-D49EJ4B2MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
