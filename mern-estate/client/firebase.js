// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d32a0.firebaseapp.com",
  projectId: "mern-estate-d32a0",
  storageBucket: "mern-estate-d32a0.appspot.com",
  messagingSenderId: "996212110711",
  appId: "1:996212110711:web:b6ce688447b15827fe5d72"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)