// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4K0P0rLqCVJyrlHP-xiXjUWLX25IyTZo",
  authDomain: "portfolio-final-737e7.firebaseapp.com",
  projectId: "portfolio-final-737e7",
  storageBucket: "portfolio-final-737e7.appspot.com",
  messagingSenderId: "134394932819",
  appId: "1:134394932819:web:9cb159a28659d5f19da0a6",
  measurementId: "G-0XNZQTLEPY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
