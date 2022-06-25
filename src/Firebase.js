// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDEaCmZAeEA0MptAaW1WMIHcupyDR-N5hI",
  // authDomain: "coffee-chat-together.firebaseapp.com",
  // projectId: "coffee-chat-together",
  // storageBucket: "coffee-chat-together.appspot.com",
  // messagingSenderId: "925098527252",
  // appId: "1:925098527252:web:efbf5bf2103dc397b73501",
  // measurementId: "G-7ZS37857FM",
  // databaseURL:"https://coffee-chat-together-default-rtdb.asia-southeast1.firebasedatabase.app"

  apiKey: "AIzaSyDEaCmZAeEA0MptAaW1WMIHcupyDR-N5hI",
  authDomain: "coffee-chat-together.firebaseapp.com",
  databaseURL: "https://coffee-chat-together-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-chat-together",
  storageBucket: "coffee-chat-together.appspot.com",
  messagingSenderId: "925098527252",
  appId: "1:925098527252:web:efbf5bf2103dc397b73501",
  measurementId: "G-7ZS37857FM"

};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;
