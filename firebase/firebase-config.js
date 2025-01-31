// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_dhXrU5-3m_QsUAka7FVavlGTgNTlppI",
  authDomain: "crypta-d5e13.firebaseapp.com",
  projectId: "crypta-d5e13",
  storageBucket: "crypta-d5e13.firebasestorage.app",
  messagingSenderId: "539604836728",
  appId: "1:539604836728:web:5876a760ea6bf2189ee88d",
  measurementId: "G-X7J7VJSX4N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, analytics, firestore, database };