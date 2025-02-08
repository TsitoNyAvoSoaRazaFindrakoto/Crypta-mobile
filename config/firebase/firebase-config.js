// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants';

const { extra } = Constants.expoConfig;

const firebaseConfig = {
  apiKey: extra.firebase.apiKey,
  authDomain: extra.firebase.authDomain,
  projectId: extra.firebase.projectId,
  storageBucket: extra.firebase.storageBucket,
  messagingSenderId: extra.firebase.messagingSenderId,
  appId: extra.firebase.appId,
  measurementId: extra.firebase.endpointUrl,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, firestore, database };