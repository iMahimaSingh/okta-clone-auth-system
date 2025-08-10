// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpUypSKubKh-jv1ITgbfuak5YRoP6qAQI",
  authDomain: "okta-clone-auth-system.firebaseapp.com",
  projectId: "okta-clone-auth-system",
  storageBucket: "okta-clone-auth-system.appspot.com",
  messagingSenderId: "941125057460",
  appId: "1:941125057460:web:5ddbe78ec683c37f3d90e1",
  measurementId: "G-W67P9JGV7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);