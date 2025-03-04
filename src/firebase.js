// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFHU&EQWPUGppCwNj2i2GVf2NqiBcN8sadb",
  authDomain: "http://solar-system-a0ebf.firebaseapp.com",
  projectId: "solar-system-basidf",
  storageBucket: "http://solar-system-aan sf.firebasestorage.app",
  messagingSenderId: "6725627839102",
  appId: "1:6725156700:web:0627180HUSAf066012cf8699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };