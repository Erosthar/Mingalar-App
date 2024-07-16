// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzdIDxLqyCtrnxZHaMdivEA-O0UKVjs4g",
  authDomain: "mingalar-915f1.firebaseapp.com",
  databaseURL: "https://mingalar-915f1-default-rtdb.firebaseio.com",
  projectId: "mingalar-915f1",
  storageBucket: "mingalar-915f1.appspot.com",
  messagingSenderId: "386059169408",
  appId: "1:386059169408:web:6b2e4d8fa0bcb4d00d8065",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
