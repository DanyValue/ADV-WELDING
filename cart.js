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

function toggleCart() {
    const modal = document.getElementById("cartModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <div class="qty-controls">
                <button onclick="changeQty(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <span>$${subtotal}</span>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = total;
    updateCartCount();
    saveCart();
}


document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clear-cart-btn");
    if (!clearBtn) return;

    clearBtn.addEventListener("click", () => {
        if (!confirm("¿Vaciar todo el carrito?")) return;
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
    });
});
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
}

function sendWhatsAppOrder() {
    if (!cart || cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let message = "🧾 *Pedido ADV WELDING*\n\n";
    let total = 0;

    cart.forEach(item => {

        const nombre =
            item.name ||
            item.nombre ||
            item.product ||
            "Producto";

        const precio = Number(
            item.price ||
            item.precio ||
            item.cost ||
            0
        );

        const cantidad = Number(
            item.quantity ||
            item.cantidad ||
            item.qty ||
            1
        );

        const subtotal = precio * cantidad;
        total += subtotal;

        message += `• ${nombre} x${cantidad} - $${subtotal}\n`;
    });

    message += `\n💰 *Total:* $${total}\n\n`;
    message += "Gracias por su preferencia 🙌";

    const phoneNumber = "526481468147"; // TU NÚMERO REAL
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}








