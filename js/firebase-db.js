// IMPORTANTE: Importar 'db' y las funciones de firestore
import { db } from "./firebase-config.js"; 
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Función para guardar
export const agregarProducto = async (producto) => {
    try {
        // El primer argumento DEBE ser 'db'
        const docRef = await addDoc(collection(db, "productos"), producto);
        return docRef.id;
    } catch (e) {
        console.error("Error al añadir: ", e);
        throw e;
    }
};

// Función para obtener (la que te está dando el error en el render)
export const obtenerProductos = async () => {
    try {
        const q = query(collection(db, "productos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productos = [];
        querySnapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() });
        });
        return productos;
    } catch (e) {
        console.error("Error al obtener: ", e);
        throw e;
    }
};
