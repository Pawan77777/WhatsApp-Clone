// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuje8YJGJ8MQ2fNz089oUPzQLTNl9zbrM",
  authDomain: "whatsapp-366fc.firebaseapp.com",
  projectId: "whatsapp-366fc",
  storageBucket: "whatsapp-366fc.firebasestorage.app",
  messagingSenderId: "195299578346",
  appId: "1:195299578346:web:83b69624623e84067de293",
  measurementId: "G-0RWQ4WQ073",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
