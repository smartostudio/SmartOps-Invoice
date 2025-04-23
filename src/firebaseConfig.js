// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNNA-qrWBGaI3ohI5o2LFLAOLztiAzqYI",
  authDomain: "smartopsinvoice.firebaseapp.com",
  projectId: "smartopsinvoice",
  storageBucket: "smartopsinvoice.firebasestorage.app",
  messagingSenderId: "667698373662",
  appId: "1:667698373662:web:cc1fae6e34ebf0d5f03a0f",
  measurementId: "G-RQFB04B41N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
