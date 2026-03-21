import { agregarProducto, obtenerProductos } from "./js/firebase-db.js";

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Cargar la tabla apenas abra la página
    renderAdminList();
});

// --- LÓGICA DE ENVÍO A FIREBASE ---
const adminForm = document.getElementById('adminForm');

if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerText;

        // 1. Capturar valores de los inputs
        const name = document.getElementById('prodName').value;
        const desc = document.getElementById('prodDesc').value;
        const price = parseFloat(document.getElementById('prodPrice').value);
        const sku = document.getElementById('prodSku').value;
        
        // Capturar categoría seleccionada
        const categoryRadio = document.querySelector('input[name="category"]:checked');
        const category = categoryRadio ? categoryRadio.value : 'General';

        // 2. Obtener imágenes (desde la variable global en admin.html)
        const finalImages = window.currentImages || [];
        
        // Validación mínima
        if (finalImages.length === 0) {
            if (!confirm("No has subido imágenes. ¿Deseas guardar el producto con una imagen por defecto?")) {
                return;
            }
        }

        // 3. Crear objeto del producto
        const nuevoProducto = {
            name,
            desc,
            price,
            sku,
            category,
            image: finalImages[0] || 'https://picsum.photos/400/400', // Imagen principal
            images: finalImages, // Array completo
            createdAt: new Date().getTime()
        };

        try {
            // Feedback visual: Bloquear botón
            submitBtn.innerText = 'Guardando en la nube...';
            submitBtn.disabled = true;

            // 🔥 LLAMADA A FIREBASE
            await agregarProducto(nuevoProducto);

            // Éxito
            submitBtn.innerText = '¡Guardado con éxito!';
            submitBtn.classList.replace('bg-[#0058bb]', 'bg-green-600');

            // Limpiar formulario (función global en admin.html)
            if (window.resetForm) window.resetForm();

            // Refrescar la tabla de abajo
            await renderAdminList();

            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.classList.replace('bg-green-600', 'bg-[#0058bb]');
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            console.error("Error al guardar en Firebase:", error);
            alert("Error de Firebase: " + error.message);
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// --- RENDERIZADO DE LA TABLA DESDE FIREBASE ---
async function renderAdminList() {
    const tbody = document.getElementById('adminProductList');
    if (!tbody) return;

    try {
        tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">Cargando inventario...</td></tr>';
        
        // Obtener datos reales de Firestore
        const productos = await obtenerProductos();
        
        if (productos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-gray-500">No hay productos en la base de datos.</td></tr>';
            return;
        }

        tbody.innerHTML = ''; // Limpiar
        productos.forEach(prod => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50 transition border-b border-gray-100">
                    <td class="p-4 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src="${prod.image}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/100/100'">
                        </div>
                        <span class="font-bold text-gray-900">${prod.name}</span>
                    </td>
                    <td class="p-4 text-gray-600">
                        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">${prod.category}</span>
                    </td>
                    <td class="p-4 text-gray-900 font-bold">$${parseFloat(prod.price).toFixed(2)} MXN</td>
                    <td class="p-4 text-right">
                        <button class="text-[#0058bb] hover:text-blue-800 font-medium mr-4 transition">Editar</button>
                        <button class="text-red-500 hover:text-red-700 font-medium transition">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al renderizar lista:", error);
        tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Error al conectar con la base de datos.</td></tr>';
    }
}
