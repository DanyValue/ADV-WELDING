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
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");

    if (!list) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <li>
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">✖</button>
            </li>
        `;
    });

    totalEl.textContent = total;
    countEl.textContent = cart.length;
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
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let message = "🧾 *Pedido ADV WELDING*\n\n";

    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `\n💰 *Total:* $${total}\n\n`;
    message += "Gracias por su preferencia 🙌";

    const phoneNumber = "526481468147"; // TU NÚMERO
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}







