import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu firebaseConfig aquí...
const firebaseConfig = {
  apiKey: "AIzaSyDzrtSDv8wXwj2hoWZ7SBTkm1gKt-1q0A4",
  authDomain: "gen-lang-client-0177915830.firebaseapp.com",
  projectId: "gen-lang-client-0177915830",
  storageBucket: "gen-lang-client-0177915830.firebasestorage.app",
  messagingSenderId: "8073771450",
  appId: "1:8073771450:web:ac974ac82aae6969b70583"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
