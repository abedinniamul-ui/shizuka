
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf1AehnpJ0bDqIo7BaSjA6vh7Mj-9ylFI",
  authDomain: "shizukaprivate.firebaseapp.com",
  projectId: "shizukaprivate",
  storageBucket: "shizukaprivate.firebasestorage.app",
  messagingSenderId: "824571686108",
  appId: "1:824571686108:web:9836f0ba6db8ade8e15819",
  measurementId: "G-K04232DNVC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
