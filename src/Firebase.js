import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVPYK1ICvL4oXQNzMwetQFQ_5Cim4tHVE",
    authDomain: "virtual-friends-8afc9.firebaseapp.com",
    projectId: "virtual-friends-8afc9",
    storageBucket: "virtual-friends-8afc9.appspot.com",
    messagingSenderId: "52471838498",
    appId: "1:52471838498:web:266ec0b71bde852515d77b",
    measurementId: "G-ZRL5S0B302"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
