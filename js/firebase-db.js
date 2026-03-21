import { app } from ".js/firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 IMPORTANTE: usar ESTA instancia
const db = getFirestore(app);

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
