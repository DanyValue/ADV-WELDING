import { app } from "./firebase-config.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

// Guardar producto
export async function agregarProducto(producto) {
  await addDoc(collection(db, "productos"), producto);
}

// Obtener productos
export async function obtenerProductos() {
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
