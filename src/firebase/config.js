// src/firebase/config.js
// ============================================================
// HOW TO CONNECT YOUR FIREBASE PROJECT:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project called "Tekzar"
// 3. Add a Web App and copy the config object
// 4. Replace the placeholder values below with your real config
// 5. In Firebase console:
//    - Enable Authentication > Email/Password
//    - Enable Firestore Database (start in production mode)
//    - Add your admin email to Authentication > Users
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBU2AdiTz3N_jM4cUnxEbr7zsWoAjuT1FQ",
  authDomain: "tekzar-43775.firebaseapp.com",
  projectId: "tekzar-43775",
  storageBucket: "tekzar-43775.firebasestorage.app",
  messagingSenderId: "1069403805092",
  appId: "1:1069403805092:web:ddafb33111068852689d31",
  measurementId: "G-NLTP0V1Q88"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
