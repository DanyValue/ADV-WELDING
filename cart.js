// ======= CARRITO MODAL DEFINITIVO CON ELIMINAR =======
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

// Actualizar carrito y localStorage
function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-btn" data-index="${index}">✖</button>
        `;
        cartList.appendChild(li);
        total += item.price;
    });

    // Agregar eventos a botones eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            cart.splice(index, 1); // eliminar del array
            updateCart(); // actualizar carrito
        });
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

// Conectar botones de productos
document.querySelectorAll('.producto-card button').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        addToCart(name, price);
    });
});



