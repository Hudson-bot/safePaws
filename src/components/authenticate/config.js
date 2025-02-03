// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt3ppTMm6YSpBtEqI_bO7C0d7zursAxNg",
  authDomain: "safepaws-68764.firebaseapp.com",
  projectId: "safepaws-68764",
  storageBucket: "safepaws-68764.firebasestorage.app",
  messagingSenderId: "752656503427",
  appId: "1:752656503427:web:425808e3595a480ac701b6",
  measurementId: "G-F4X1FSMVER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the required Firebase objects
export { auth, provider, app, sendPasswordResetEmail };
