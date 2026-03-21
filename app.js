const STORE_KEY = 'adv_products';
const CART_KEY = 'adv_cart';

const seedData = [
    { id: '1', name: 'Silla Velvet Arq', price: 850, category: 'Mobiliario', image: 'https://picsum.photos/seed/silla/400/400', desc: 'Silla de diseño minimalista con tapizado en terciopelo.', isNew: true },
    { id: '2', name: 'Varrón Ceramic V', price: 125, category: 'Decoración', image: 'https://picsum.photos/seed/jarron/400/400', desc: 'Jarrón de cerámica artesanal con textura natural.' },
    { id: '3', name: 'Lámpara Industrial Nox', price: 340, category: 'Iluminación', image: 'https://picsum.photos/seed/lampara/400/400', desc: 'Lámpara colgante estilo industrial con acabado metálico.' },
    { id: '4', name: 'Mesa Lateral Oak', price: 490, category: 'Mobiliario', image: 'https://picsum.photos/seed/mesa/400/400', desc: 'Mesa auxiliar de madera de roble macizo.' },
    { id: '5', name: 'Sofá Modular Cloud', price: 2200, category: 'Mobiliario', image: 'https://picsum.photos/seed/sofa/400/400', desc: 'Sofá modular de diseño contemporáneo.' },
    { id: '6', name: 'Set de Arte Bauhaus', price: 310, category: 'Decoración', image: 'https://picsum.photos/seed/arte/400/400', desc: 'Set de cuadros con diseño inspirado en la escuela Bauhaus.' },
    { id: '7', name: 'Lámpara Pie Oro', price: 1150, category: 'Iluminación', image: 'https://picsum.photos/seed/lamparapie/400/400', desc: 'Lámpara de pie con acabado en oro cepillado.' },
    { id: '8', name: 'Comedor Carrara', price: 3500, category: 'Mobiliario', image: 'https://picsum.photos/seed/comedor/400/400', desc: 'Mesa de comedor con cubierta de mármol Carrara.' }
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
