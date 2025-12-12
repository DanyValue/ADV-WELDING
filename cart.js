// cart.js - versión reforzada con logs y robustez
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('[cart.js] Iniciando cart.js');

    // Cargar carrito de localStorage
    let cart = Array.isArray(JSON.parse(localStorage.getItem('cart') || '[]'))
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];

    // Evitar crear icono/modal duplicados (si se recarga script por error)
    if (!document.querySelector('.cart-icon')) {
      const cartIcon = document.createElement('div');
      cartIcon.className = 'cart-icon';
      cartIcon.innerHTML = '🛒<span id="cart-count">0</span>';
      document.body.appendChild(cartIcon);
    }

    if (!document.querySelector('.cart-modal')) {
      const cartModal = document.createElement('div');
      cartModal.className = 'cart-modal';
      cartModal.innerHTML = `
        <div class="cart-modal-content">
          <span class="close-cart" title="Cerrar">&times;</span>
          <h3>Tu Carrito</h3>
          <ul id="cart-list"></ul>
          <p class="cart-total">Total: $<span id="cart-total">0</span></p>
        </div>`;
      document.body.appendChild(cartModal);
    }

    const cartIconEl = document.querySelector('.cart-icon');
    const cartModalEl = document.querySelector('.cart-modal');
    const cartListEl = document.querySelector('#cart-list');
    const cartTotalEl = document.querySelector('#cart-total');
    const cartCountEl = document.querySelector('#cart-count');

    if (!cartIconEl || !cartModalEl || !cartListEl || !cartTotalEl || !cartCountEl) {
      console.error('[cart.js] No se encontró un elemento esencial del carrito en el DOM.');
      return;
    }

    // Actualiza interfaz desde el array cart
    function updateCartUI() {
      cartListEl.innerHTML = '';
      let total = 0;
      cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="cart-item-name">${escapeHtml(item.name)}</span>
          <span class="cart-item-price">$${Number(item.price).toFixed(2)}</span>
          <button class="remove-btn" data-index="${i}" aria-label="Eliminar">✖</button>
        `;
        cartListEl.appendChild(li);
        total += Number(item.price) || 0;
      });
      cartTotalEl.textContent = Number(total).toFixed(2);
      cartCountEl.textContent = String(cart.length);
      localStorage.setItem('cart', JSON.stringify(cart));
      // console debug
      console.log('[cart.js] UI actualizada. items:', cart.length, 'total:', total);
    }

    // Escape simple para seguridad en innerHTML
    function escapeHtml(text) {
      return String(text).replace(/[&<>"'`=\/]/g, s => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'
      }[s]));
    }

    // Añadir producto
    function addToCart(name, price) {
      if (!name || isNaN(Number(price))) {
        console.warn('[cart.js] Datos inválidos para agregar:', name, price);
        return;
      }
      cart.push({ name: String(name), price: Number(price) });
      updateCartUI();
    }

    // Delegación: captura clicks en botones de eliminar dentro del UL
    cartListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.remove-btn');
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      if (!Number.isNaN(idx) && idx >= 0 && idx < cart.length) {
        cart.splice(idx, 1);
        updateCartUI();
      }
    });

    // Eventos modal/icon
    cartIconEl.addEventListener('click', () => cartModalEl.style.display = 'flex');
    cartModalEl.addEventListener('click', (e) => { if (e.target === cartModalEl) cartModalEl.style.display = 'none'; });
    const closeBtn = cartModalEl.querySelector('.close-cart');
    if (closeBtn) closeBtn.addEventListener('click', () => cartModalEl.style.display = 'none');

    // Inicializa UI
    updateCartUI();

    // Conectar botones que YA EXISTEN
    function connectExistingButtons() {
      const btns = document.querySelectorAll('button.add-to-cart, .producto-card button[data-name][data-price]');
      if (!btns || btns.length === 0) {
        console.log('[cart.js] No se encontraron botones de "add-to-cart" al inicializar.');
      }
      btns.forEach(btn => {
        // prevenir múltiples listeners
        if (btn.dataset.cartConnected) return;
        btn.dataset.cartConnected = '1';
        btn.addEventListener('click', (ev) => {
          const name = btn.dataset.name || btn.getAttribute('data-name') || btn.getAttribute('data-product-name');
          const priceRaw = btn.dataset.price || btn.getAttribute('data-price') || btn.getAttribute('data-product-price');
          const price = parseFloat(String(priceRaw).replace(/[^0-9.-]+/g, '')) || 0;
          console.log('[cart.js] Click agregar:', name, price);
          addToCart(name, price);
        });
      });
    }

    // Llamada inicial
    connectExistingButtons();

    // Observer: si tu HTML añade productos dinámicamente, los conectamos automáticamente
    const observer = new MutationObserver((mutationsList) => {
      for (const m of mutationsList) {
        if (m.addedNodes && m.addedNodes.length) {
          // pequeña pausa para que se inserten atributos
          setTimeout(connectExistingButtons, 50);
          break;
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log('[cart.js] Listo. Observando cambios y botones conectados.');

  } catch (err) {
    console.error('[cart.js] Error crítico:', err);
  }
});







