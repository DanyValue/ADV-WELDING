import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 TU CONFIG REAL
const firebaseConfig = {
  apiKey: "AIzaSyDzrtSDv8wXwj2hoWZ7SBTkm1gKt-1q0A4",
  authDomain: "gen-lang-client-0177915830.firebaseapp.com",
  projectId: "gen-lang-client-0177915830",
  storageBucket: "gen-lang-client-0177915830.firebasestorage.app",
  messagingSenderId: "8073771450",
  appId: "1:8073771450:web:ac974ac82aae6969b70583"
};

// 🔥 Inicializar Firebase AQUÍ directamente
const app = initializeApp(firebaseConfig);
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

// ================= FUNCIONES =================

export async function agregarProducto(producto) {
  console.log("🔥 Intentando guardar en Firebase...");
  const docRef = await addDoc(collection(db, "productos"), producto);
  console.log("📄 ID generado:", docRef.id);
}

export async function obtenerProductos() {
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
