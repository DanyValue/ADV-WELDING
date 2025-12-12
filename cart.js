/* ===========================
   SISTEMA DE CARRITO GLOBAL
   =========================== */

let cart = [];

/* Cargar carrito desde localStorage */
function loadCart() {
    const stored = localStorage.getItem("cart");
    cart = stored ? JSON.parse(stored) : [];
}

/* Guardar carrito */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Agregar producto */
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    saveCart();
    renderCart();
    alert("Producto agregado al carrito ✔️");
}

/* Renderizar carrito en cualquier página */
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalSpan = document.getElementById("total");

    if (!cartList || !totalSpan) {
        return;
    }

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toLocaleString()}
            <button onclick="removeItem(${index})" style="
                background:red;
                border:none;
                color:white;
                padding:4px 8px;
                border-radius:5px;
                cursor:pointer;
            ">X</button>
        `;
        cartList.appendChild(li);
    });

    totalSpan.textContent = "$" + total.toLocaleString();
}

/* Eliminar producto del carrito */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

/* Inicializar */
loadCart();
document.addEventListener("DOMContentLoaded", renderCart);


