import { agregarProducto, obtenerProductos } from "./firebase-db.js";

// Escuchar el evento del formulario
document.getElementById('adminForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    // Capturar datos
    const name = document.getElementById('prodName').value;
    const desc = document.getElementById('prodDesc').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const category = document.querySelector('input[name="category"]:checked')?.value || 'Inversoras';
    
    // currentImages viene del script en el HTML
    const finalImages = window.currentImages || []; 

    const nuevoProducto = {
        name,
        desc,
        price,
        category,
        image: finalImages[0] || 'https://picsum.photos/400/400',
        images: finalImages,
        createdAt: new Date().getTime()
    };

    try {
        btn.innerText = 'Guardando...';
        btn.disabled = true;

        // 🔥 LLAMADA REAL A FIREBASE
        await agregarProducto(nuevoProducto);

        btn.innerText = '¡Guardado!';
        btn.classList.add('bg-green-600');
        
        // Limpiar
        window.resetForm(); 
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('bg-green-600');
            btn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error("Error en Firebase:", error);
        alert("Error al guardar en la nube: " + error.message);
        btn.innerText = originalText;
        btn.disabled = false;
    }
});
