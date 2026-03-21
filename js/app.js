import { agregarProducto, obtenerProductos } from "./firebase-db.js";

async function pruebaFirebase() {
  const productos = await obtenerProductos();
  console.log("🔥 Firebase conectado:", productos);
}

pruebaFirebase();

const STORE_KEY = 'adv_products_v3';
const CART_KEY = 'adv_cart';

const seedData = [
    { id: '1', name: 'Inversora 130A', price: 850, category: 'Inversoras', image: 'https://picsum.photos/seed/inversora/400/400', desc: 'Máquina soldadora inversora portátil y eficiente.', isNew: true },
    { id: '2', name: 'Careta Electrónica', price: 125, category: 'Caretas', image: 'https://picsum.photos/seed/careta/400/400', desc: 'Careta de soldar con oscurecimiento automático.' },
    { id: '3', name: 'Estéreo Bluetooth', price: 340, category: 'Estereos', image: 'https://picsum.photos/seed/estereo/400/400', desc: 'Estéreo para auto con conectividad Bluetooth y USB.' },
    { id: '4', name: 'Bocinas Coaxiales 6.5"', price: 490, category: 'Bocinas', image: 'https://picsum.photos/seed/bocinas/400/400', desc: 'Set de bocinas coaxiales de alta fidelidad.' },
    { id: '5', name: 'Control Universal', price: 220, category: 'Controles', image: 'https://picsum.photos/seed/control/400/400', desc: 'Control remoto universal programable.' },
    { id: '6', name: 'Inversora 200A', price: 1310, category: 'Inversoras', image: 'https://picsum.photos/seed/inversora2/400/400', desc: 'Soldadora inversora de grado industrial.' },
    { id: '7', name: 'Careta Profesional', price: 250, category: 'Caretas', image: 'https://picsum.photos/seed/careta2/400/400', desc: 'Careta profesional con amplio campo de visión.' },
    { id: '8', name: 'Estéreo Pantalla 7"', price: 1500, category: 'Estereos', image: 'https://picsum.photos/seed/estereo2/400/400', desc: 'Estéreo con pantalla táctil de 7 pulgadas.' }
];

function getProducts() {
    const stored = localStorage.getItem(STORE_KEY);
    if (!stored) {
        localStorage.setItem(STORE_KEY, JSON.stringify(seedData));
        return seedData;
    }
    return JSON.parse(stored);
}

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function updateCartCount() {
    const cart = getCart();
    const countEls = document.querySelectorAll('.cart-count');
    countEls.forEach(el => {
        if (cart.length > 0) {
            el.textContent = cart.length;
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    
    // Feedback visual rápido
    const btn = event.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
    btn.classList.add('bg-green-400');
    setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.remove('bg-green-400');
    }, 1000);
}

function viewProduct(id) {
    localStorage.setItem('adv_selected_product', id);
    window.location.href = 'producto.html';
}

// Inicializar contador globalmente
document.addEventListener('DOMContentLoaded', updateCartCount);
