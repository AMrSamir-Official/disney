// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Use Firebase's storage, not redux-persist

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArcd4hn2cuCN3R0Im9hsUaAQqMfIziaJc",
  authDomain: "disneyplus-react-app.firebaseapp.com",
  projectId: "disneyplus-react-app",
  storageBucket: "disneyplus-react-app.appspot.com",
  messagingSenderId: "545170743314",
  appId: "1:545170743314:web:3a75f8aefa1d76626838cb",
  measurementId: "G-DBS7Q9N8EP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Correct Firebase storage initialization
