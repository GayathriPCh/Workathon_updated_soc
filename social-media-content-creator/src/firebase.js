// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIGR_3EUA9K7bHpgNaGtmQvcTAR1PCwoo",
  authDomain: "news-dee8a.firebaseapp.com",
  projectId: "news-dee8a",
  storageBucket: "news-dee8a.appspot.com",
  messagingSenderId: "182879481388",
  appId: "1:182879481388:web:b31f3ca03603ed6beaab89",
  measurementId: "G-W7QG00Z2F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);
export const storage = getStorage(app); // Export the storage instance

export { db };