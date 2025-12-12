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

// Actualizar carrito y guardar en localStorage
function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar producto
function addToCart(name, price) {
    cart.push({name, price});
    updateCart();
}

// Eventos modal
cartIcon.addEventListener('click', () => cartModal.style.display = 'flex');
closeCartBtn.addEventListener('click', () => cartModal.style.display = 'none');
cartModal.addEventListener('click', e => { if(e.target === cartModal) cartModal.style.display = 'none'; });

// Inicializar carrito al cargar la página
updateCart();

// Conectar botones de productos si existen
document.querySelectorAll('.producto-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        addToCart(name, price);
    });
});


