// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd9Zb9VGlUqxkJFGZA1pi5sVmzeO1Oh3s",
  authDomain: "happiwrap-44eba.firebaseapp.com",
  projectId: "happiwrap-44eba",
  storageBucket: "happiwrap-44eba.appspot.com",
  messagingSenderId: "119301743343",
  appId: "1:119301743343:web:9fd4f0659bbc8eeb24f11a",
  measurementId: "G-RNHS6LLDZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app);

export {app,auth};