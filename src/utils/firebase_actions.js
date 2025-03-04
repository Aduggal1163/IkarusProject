// src/utils/firebaseActions.js
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Save solar system configuration
export const saveConfiguration = async (config) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "solarConfigurations"), {
      ...config,
      userId: user.uid, // Save config with user ID
      timestamp: new Date()
    });
    console.log("Configuration saved with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

// Load user-specific configurations
export const getConfigurations = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in");
    return [];
  }

  try {
    const q = query(collection(db, "solarConfigurations"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const configs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("User configurations:", configs);
    return configs;
  } catch (e) {
    console.error("Error fetching configurations:", e);
  }
};
