// Firebase v9+ syntax with modular SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqpoZOG_0NsEyR6kptHCO176RwNkIV6Co",
  authDomain: "fem-cookies.firebaseapp.com",
  projectId: "fem-cookies",
  storageBucket: "fem-cookies.appspot.com",
  messagingSenderId: "644451757006",
  appId: "1:644451757006:web:04f1dcfd387a4af995199f",
  measurementId: "G-VMVTXBH608",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
