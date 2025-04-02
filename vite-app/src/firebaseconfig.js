// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg98XhpVXSwyFnX4W-Btwkym57Zij3AtE",
  authDomain: "react-exam-88273.firebaseapp.com",
  projectId: "react-exam-88273",
  storageBucket: "react-exam-88273.firebasestorage.app",
  messagingSenderId: "749662151224",
  appId: "1:749662151224:web:ba885e8730cd672feefccd",
  measurementId: "G-B53RY3ZY7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);