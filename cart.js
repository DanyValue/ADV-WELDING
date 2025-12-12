// ======= CARRITO MODAL DEFINITIVO =======
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Crear icono flotante
const cartIcon = document.createElement('div');
cartIcon.className = 'cart-icon';
cartIcon.innerHTML = '🛒<span id="cart-count">0</span>';
document.body.appendChild(cartIcon);

// Crear modal
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';
cartModal.innerHTML = `
    <div class="cart-modal-content">
        <span class="close-cart">&times;</span>
        <h3>Tu Carrito</h3>
        <ul id="cart-list"></ul>
        <p class="cart-total">Total: $<span id="cart-total">0</span></p>
    </div>
`;
document.body.appendChild(cartModal);

const cartList = cartModal.querySelector('#cart-list');
const cartTotal = cartModal.querySelector('#cart-total');
const cartCount = cartIcon.querySelector('#cart-count');
const closeCartBtn = cartModal.querySelector('.close-cart');

// ======= FUNCIONES =======

// Actualizar carrito: mostrar productos, total y contador
function updateCart() {
    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-btn" data-index="${index}">✖</button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    cartCount.textContent = cart.length;

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Conectar eventos de eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = parseInt(btn.dataset.index);
            cart.splice(idx, 1);
            updateCart();
        };
    });
}

// Agregar producto al carrito
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// ======= EVENTOS =======

// Abrir modal
cartIcon.addEventListener('click', () => cartModal.style.display = 'flex');

// Cerrar modal
closeCartBtn.addEventListener('click', () => cartModal.style.display = 'none');

// Cerrar modal al dar clic fuera
cartModal.addEventListener('click', e => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// ======= INICIALIZAR =======
updateCart();

// Conectar botones de productos (si existen)
document.querySelectorAll('.producto-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        addToCart(name, price);
    });
});




