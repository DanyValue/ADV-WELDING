// ---- Carrito global con localStorage ----
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarIcono();
}

// Actualizar número del carrito
function actualizarIcono() {
    document.querySelectorAll(".count").forEach(c => {
        c.textContent = carrito.length;
    });
}

// Agregar producto
function agregar(id) {
    const prod = productos.find(p => p.id === id);
    carrito.push(prod);
    guardarCarrito();
}

// Abrir / cerrar carrito
function toggleCarrito() {
    const c = document.getElementById("carrito");
    c.classList.toggle("abierto");
    renderCarrito();
}

// Render contenido
function renderCarrito() {
    const cont = document.getElementById("itemsCarrito");
    const totalHTML = document.getElementById("total");

    if (!cont) return;

    let html = "";
    let total = 0;

    carrito.forEach(p => {
        html += `
            <div class="carrito-item">
                <span>${p.nombre}</span>
                <span>$${p.precio}</span>
            </div>
        `;
        total += p.precio;
    });

    cont.innerHTML = html;
    totalHTML.textContent = total;
}

actualizarIcono();

