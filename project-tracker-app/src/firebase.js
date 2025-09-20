import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Replace with your Firebase config
const firebaseConfig = {
apiKey: "AIzaSyBCXw_j9NRcbapWfog80rc-T8AWpoH2pnk",
  authDomain: "project-tracker-51e1d.firebaseapp.com",
  databaseURL: "https://project-tracker-51e1d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tracker-51e1d",
  storageBucket: "project-tracker-51e1d.firebasestorage.app",
  messagingSenderId: "473254970901",
  appId: "1:473254970901:web:d4db68ef8d8b36b0a6f01c",
  measurementId: "G-BRB5M3LWXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const database = getDatabase(app);
