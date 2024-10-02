import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "rsvp-71ea9.firebaseapp.com",
  projectId: "rsvp-71ea9",
  storageBucket: "rsvp-71ea9.appspot.com",
  messagingSenderId: "325100336820",
  appId: "1:325100336820:web:c716b7426cfd6844fe49e1",
  measurementId: "G-7JR1TTHMR9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
