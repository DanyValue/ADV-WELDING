let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function toggleCarrito(show = true) {
    const modal = document.getElementById("cart-modal");
    if (!modal) return;

    modal.style.display = show ? "flex" : "none";
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const price = Number(item.price) || 0;
        total += price;

        const li = document.createElement("li");
        li.textContent = `${item.name} - $${price}`;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total;
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    countEl.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", () => {

    renderCart();
    updateCartCount();

    // 🛒 Abrir carrito
    const openCart = document.getElementById("open-cart");
    if (openCart) {
        openCart.addEventListener("click", () => toggleCarrito(true));
    }

    // ❌ Cerrar carrito
    const closeCart = document.getElementById("close-cart");
    if (closeCart) {
        closeCart.addEventListener("click", () => toggleCarrito(false));
    }

    // 🧹 Vaciar carrito
    const clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (!confirm("¿Vaciar todo el carrito?")) return;
            cart = [];
            localStorage.removeItem("cart");
            renderCart();
            updateCartCount();
            toggleCarrito(false);
        });
    }
});

function sendWhatsAppOrder() {
    if (!cart || cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let message = "🧾 *Pedido ADV WELDING*\n\n";
    let total = 0;

    cart.forEach(item => {
        const nombre = item.name || "Producto";
        const precio = Number(item.price) || 0;
        const cantidad = 1;

        const subtotal = precio * cantidad;
        total += subtotal;

        message += `• ${nombre} x${cantidad} - $${subtotal}\n`;
    });

    message += `\n💰 *Total:* $${total}\n\n`;
    message += "Gracias por su preferencia 🙌";

    const phoneNumber = "526484695423";
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}
