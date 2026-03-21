// 1. Importa 'db' desde tu archivo de configuración
import { db } from "./firebase-config.js";

// 2. Importa las funciones necesarias desde la CDN de Google
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- LÍNEAS DE DIAGNÓSTICO ---
console.log("🔍 Verificando conexión en firebase-db.js...");
console.log("Valor de db:", db);


// Función para guardar
export const agregarProducto = async (producto) => {
    try {
        // El primer argumento DEBE ser 'db'
        const docRef = await addDoc(collection(db, "productos"), producto);
        return docRef.id;
    } catch (e) {
        console.error("Error al añadir producto:", e);
        throw e;
    }
};

// Función para obtener (la que falla en la línea 123)
export const obtenerProductos = async () => {
    try {
        // Aquí es donde db debe ser válido
        const q = query(collection(db, "productos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productos = [];
        querySnapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() });
        });
        return productos;
    } catch (e) {
        console.error("Error al obtener productos:", e);
        throw e;
    }
};
