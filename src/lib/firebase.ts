import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDn9EcNwseR_Z8cEGeQPbo-jxyF4KRYv5Q",
  authDomain: "jobzai.firebaseapp.com",
  projectId: "jobzai",
  storageBucket: "jobzai.firebasestorage.app",
  messagingSenderId: "408604248427",
  appId: "1:408604248427:web:74f1d51c8146dda1ef242e",
  measurementId: "G-M2CG9CM4EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };