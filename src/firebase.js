// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFOT0EQWPUGppCwxei2GVf2NqiBcN8YVY",
  authDomain: "http://solar-system-a0ebf.firebaseapp.com",
  projectId: "solar-system-a0ebf",
  storageBucket: "http://solar-system-a0ebf.firebasestorage.app",
  messagingSenderId: "672514859100",
  appId: "1:672514859100:web:0ccc97759f066012cf8699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };