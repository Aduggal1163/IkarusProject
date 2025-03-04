 🌌 3D Solar System with Firebase Integration 🌌  

A dynamic and interactive 3D solar system built using Three.js with real-time configuration saving and loading via Firebase Firestore. Users can adjust planet size, orbit speed, and distance from the Sun — and save or retrieve their custom solar system setups.  

 🚀 Features  
- 🪐 Realistic 3D solar system with all 8 planets and visible orbits.  
- 🌕 Planets and a glowing Sun with a starry background.  
- ⚙ Sidebar for real-time control of planet properties:  
  - Planet Size  
  - Orbit Speed  
  - Distance from the Sun  
- ☁ Firebase Firestore integration:  
  - Save the current solar system configuration.  
  - Load a saved configuration.  

---

 🛠 Tech Stack  
- Frontend: HTML, CSS, JavaScript  
- 3D Graphics: Three.js  
- Backend: Firebase Firestore  
- Auth: Firebase Authentication  
- Deployment: Netlify.com

---

📁 Folder Structure  


project-root/
|-- src/
|   |-- components/
|   |   |-- solarsystem.js 
        |-- auth.js
|   |-- utils/
|   |   |-- firebaseActions.js  
        |-- AuthActions.js                   
|-- firebase.js    

|-- solarsystem.html                   # Main UI and controls
|-- script.js                    # Sidebar and interactions
|-- styles.css 
---

🧑‍💻 Setup Instructions  

⿡ Clone the Repository 
bash
git clone https://github.com/Aduggal1163/IkarusProject.git
cd IKARUS


⿢ Set Up Firebase 
- Go to [Firebase Console](https://console.firebase.google.com/)  
- Create a new project  
- Add Firestore and enable Authentication (Email/Password)  
- Get your Firebase config and replace in firebase.js  

javascript
// firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


⿣Run Locally 
Open solarsystem.html directly or use a live server extension (like in VSCode).  

⿤ Deployed Link: ---
---
 📝 Usage   
1. Adjust planet size, orbit speed, and distance from the Sun using the control panel.  
2. Save your custom configuration to Firestore.  
3. Retrieve and load saved configurations anytime.  

---

 🌠 Future Enhancements  

- 🛰 Add more celestial objects like comets and asteroids.  
- 🌍 Improve planet textures and visual details.  
- 🧑‍🚀 User profiles with multiple saved configurations.  
- 🌌 Animation for planet rotations and orbital motion.  

---

💡 Credits  
Built with ❤ by Abhishek Duggal& Aastha.  

---
