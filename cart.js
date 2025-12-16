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

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "👋 *Hola, buen día*%0A";
    mensaje += "🛒 *Quiero realizar el siguiente pedido:*%0A%0A";

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        mensaje += `🔹 *${item.nombre}*%0A`;
        mensaje += `   Cantidad: ${item.cantidad}%0A`;
        mensaje += `   Precio unitario: $${item.precio.toFixed(2)} MXN%0A`;
        mensaje += `   Subtotal: $${subtotal.toFixed(2)} MXN%0A%0A`;
    });

    mensaje += "———————————————%0A";
    mensaje += `💰 *TOTAL DEL PEDIDO:* $${total.toFixed(2)} MXN%0A`;
    mensaje += "———————————————%0A%0A";
    mensaje += "📍 *Quedo atento(a) a su confirmación.*%0A";
    mensaje += "¡Gracias! 🙌";

    const telefono = "526481468147"; // tu número con lada
    const url = `https://wa.me/${telefono}?text=${mensaje}`;

    window.open(url, "_blank");
}



