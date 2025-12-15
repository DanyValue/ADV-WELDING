let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    cart.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio
    });

    saveCart();
    renderCart();
}

function renderCart() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="removeFromCart(${index})">✖</button>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

document.getElementById("clear-cart-btn").onclick = () => {
    cart = [];
    saveCart();
    renderCart();
};

updateCartCount();

document.addEventListener("DOMContentLoaded", () => {
    const openCart = document.getElementById("open-cart");
    const closeCart = document.getElementById("close-cart");
    const cartModal = document.getElementById("cart-modal");

    if (openCart) {
        openCart.addEventListener("click", () => {
            cartModal.style.display = "flex";
            renderCart();
        });
    }

    if (closeCart) {
        closeCart.addEventListener("click", () => {
            cartModal.style.display = "none";
        });
    }
});


