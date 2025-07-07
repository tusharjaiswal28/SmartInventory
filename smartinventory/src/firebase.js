// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, push, onValue, remove, set, get, child} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTCvECsaTF07Rr7Cjt0VJeTf21NoZtmf8",
  authDomain: "smart-inventory-rct.firebaseapp.com",
  databaseURL:"https://smart-inventory-rct-default-rtdb.firebaseio.com",
  projectId: "smart-inventory-rct",
  storageBucket: "smart-inventory-rct.firebasestorage.app",
  messagingSenderId: "887292858621",
  appId: "1:887292858621:web:b1119b1c1c844b2f95ae94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {db, ref, push, onValue, remove, set, get, child, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut};