// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4-RPOoX8kRoLJB_kQdsEP-Ue3yUsZPDw",
  authDomain: "email-client-9121c.firebaseapp.com",
  projectId: "email-client-9121c",
  storageBucket: "email-client-9121c.appspot.com",
  messagingSenderId: "990461024390",
  appId: "1:990461024390:web:941f1017d5a0fbc6229907"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const mailRef =collection(db, "mail");

export default app;