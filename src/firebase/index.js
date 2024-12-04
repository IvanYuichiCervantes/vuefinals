// Import Firebase core and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG8lwnrGg5bi7CU68mCxZO1TGwDsr5pEM",
  authDomain: "clickergame-fd54c.firebaseapp.com",
  projectId: "clickergame-fd54c",
  storageBucket: "clickergame-fd54c.appspot.com", // Corrected URL
  messagingSenderId: "49124870711",
  appId: "1:49124870711:web:9286196fea271bcbf84db2",
  measurementId: "G-EDPF43B66Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
