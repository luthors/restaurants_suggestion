import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8sce3T7eJH1b2Ti-55pFMk-uozArLCdw",
  authDomain: "restaurants-suggestion.firebaseapp.com",
  projectId: "restaurants-suggestion",
  storageBucket: "restaurants-suggestion.appspot.com",
  messagingSenderId: "346457044513",
  appId: "1:346457044513:web:c8cd9382acfac5872ed560",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
