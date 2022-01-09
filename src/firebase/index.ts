// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb3cOdP7DQSKZnaXW9JOkxk-Y0ZHM-JLg",
  authDomain: "beaches-e14b5.firebaseapp.com",
  projectId: "beaches-e14b5",
  storageBucket: "beaches-e14b5.appspot.com",
  messagingSenderId: "198289700223",
  appId: "1:198289700223:web:2922a05544b5b38cd4564a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
