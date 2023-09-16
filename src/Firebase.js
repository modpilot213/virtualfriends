import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVPYK1ICvL4oXQNzMwetQFQ_5Cim4tHVE",
  authDomain: "virtual-friends-8afc9.firebaseapp.com",
  projectId: "virtual-friends-8afc9",
  storageBucket: "virtual-friends-8afc9.appspot.com",
  messagingSenderId: "52471838498",
  appId: "1:52471838498:web:266ec0b71bde852515d77b",
  measurementId: "G-ZRL5S0B302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };

