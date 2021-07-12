import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: passar para o arquivo .env
const firebaseConfig = {
  apiKey: "AIzaSyBWgdV48IxU_nQ-ltXYwAFOyKatWpq1JNA",
  authDomain: "react-snake-app-herval.firebaseapp.com",
  databaseURL: "https://react-snake-app-herval-default-rtdb.firebaseio.com",
  projectId: "react-snake-app-herval",
  storageBucket: "react-snake-app-herval.appspot.com",
  messagingSenderId: "874049624366",
  appId: "1:874049624366:web:a1c81ae51a04f2b51d42bf",
  measurementId: "G-BRHBH09LP6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export {
  firebaseApp,
  db
};