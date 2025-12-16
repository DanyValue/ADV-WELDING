let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// GUARDAR CARRITO
// =====================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// =====================
// CONTADOR DEL ICONO
// =====================
function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    countEl.textContent = totalItems;
}

// =====================
// AGREGAR PRODUCTO
// =====================
function addToCart(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = cart.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    saveCart();
    renderCart();
}

// =====================
// RENDER CARRITO
// =====================
function renderCart() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");
    if (!list || !totalEl) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.precio * item.cantidad;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.nombre}</strong><br>
            Cantidad: ${item.cantidad} — $${(item.precio * item.cantidad).toFixed(2)}
            <button onclick="removeFromCart(${index})">✖</button>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

// =====================
// ELIMINAR PRODUCTO
// =====================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// =====================
// VACIAR CARRITO
// =====================
const clearBtn = document.getElementById("clear-cart-btn");
if (clearBtn) {
    clearBtn.onclick = () => {
        cart = [];
        saveCart();
        renderCart();
    };
}

// =====================
// MODAL CARRITO
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const openCart = document.getElementById("open-cart");
    const closeCart = document.getElementById("close-cart");
    const cartModal = document.getElementById("cart-modal");

    if (openCart && cartModal) {
        openCart.addEventListener("click", () => {
            cartModal.style.display = "flex";
            renderCart();
        });
    }

    if (closeCart && cartModal) {
        closeCart.addEventListener("click", () => {
            cartModal.style.display = "none";
        });
    }

    updateCartCount();
});



