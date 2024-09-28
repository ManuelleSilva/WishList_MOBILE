import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-R3Q0vsC0VHE1QMqY7SZTm2azMLLJNQo",
  authDomain: "appwish-67f4c.firebaseapp.com",
  projectId: "appwish-67f4c",
  storageBucket: "appwish-67f4c.appspot.com",
  messagingSenderId: "699842038466",
  appId: "1:699842038466:web:2e8f2352dea442aa73095b"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);