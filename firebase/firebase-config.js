// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants';

const { extra } = Constants.expoConfig;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: expo.firebase.apiKey,
  authDomain: expo.firebase.authDomain,
  projectId: expo.firebase.projectId,
  storageBucket: expo.firebase.storageBucket,
  messagingSenderId: expo.firebase.messagingSenderId,
  appId: expo.firebase.appId,
  measurementId: expo.firebase.endpointUrl,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, analytics, firestore, database };