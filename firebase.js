// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF-k6cNupa70emIJATl9caOuDOhS99-yA",
  authDomain: "admin-user-ae2d3.firebaseapp.com",
  projectId: "admin-user-ae2d3",
  storageBucket: "admin-user-ae2d3.appspot.com",
  messagingSenderId: "86770869148",
  appId: "1:86770869148:web:3b0f7d12f5f4fe92be9e59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
