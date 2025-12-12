// cart.js - manejo de carrito (persistente en localStorage) y modal central
const CART_KEY = 'advw_cart_v1';

/* Utilities */
function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function formatPrice(n){ return '$' + Number(n).toFixed(2); }

/* UI updates */
function updateCartCountOnAll(){
  const countEls = document.querySelectorAll('.cart-count');
  const totalItems = getCart().reduce((s,i) => s + (i.qty||1), 0);
  countEls.forEach(el => el.textContent = totalItems);
}

/* Add item: id, name, price, img */
function addToCart(item){
  const cart = getCart();
  const idx = cart.findIndex(i=> i.id === item.id);
  if(idx >= 0){
    cart[idx].qty = (cart[idx].qty || 1) + 1;
  } else {
    cart.push({...item, qty:1});
  }
  saveCart(cart);
  updateCartCountOnAll();
  // small feedback - briefly animate cart button if present
  const btn = document.querySelector('.cart-btn');
  if(btn){ btn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}], {duration:220}); }
}

/* Remove item by index */
function removeFromCart(index){
  const cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  updateCartCountOnAll();
  renderCartModal();
}

/* Clear cart */
function clearCart(){
  saveCart([]);
  updateCartCountOnAll();
  renderCartModal();
}

/* Total */
function cartTotal(){
  return getCart().reduce((s,i) => s + (i.price * (i.qty || 1)), 0);
}

/* Modal render */
function renderCartModal(){
  const cart = getCart();
  const listEl = document.getElementById('cart-list');
  const emptyEl = document.getElementById('cart-empty');
  const totalEl = document.getElementById('cart-total');
  if(!listEl) return; // if modal not present on page
  listEl.innerHTML = '';
  if(cart.length === 0){
    emptyEl.style.display = 'block';
    totalEl.textContent = formatPrice(0);
    return;
  }
  emptyEl.style.display = 'none';
  cart.forEach((it, idx) => {
    const itemNode = document.createElement('div');
    itemNode.className = 'cart-item';
    itemNode.innerHTML = `
      <div class="meta">
        <img src="${it.img || 'https://via.placeholder.com/120x90'}" alt="">
        <div>
          <div class="name">${it.name}</div>
          <div class="qty">Cantidad: ${it.qty || 1}</div>
        </div>
      </div>
      <div>
        <div class="price">${formatPrice(it.price * (it.qty || 1))}</div>
        <div style="text-align:right; margin-top:8px;">
          <button data-idx="${idx}" class="btn-remove" style="background:#ff6b6b;color:#fff;border:none;padding:6px 8px;border-radius:6px;cursor:pointer;">Eliminar</button>
        </div>
      </div>
    `;
    listEl.appendChild(itemNode);
  });

  // attach remove listeners
  listEl.querySelectorAll('.btn-remove').forEach(btn=>{
    btn.onclick = (e) => removeFromCart(Number(btn.dataset.idx));
  });

  totalEl.textContent = formatPrice(cartTotal());
}

/* Modal controls */
function openCartModal(){
  const back = document.getElementById('cart-backdrop');
  if(!back) return;
  back.classList.add('open');
  renderCartModal();
}
function closeCartModal(){
  const back = document.getElementById('cart-backdrop');
  if(!back) return;
  back.classList.remove('open');
}

/* Checkout action - here open WhatsApp with summary (optional) */
function checkoutWhatsApp(){
  const cart = getCart();
  if(cart.length === 0) return alert('No hay artículos en el carrito.');
  let text = 'Hola, quiero hacer un pedido:%0A';
  cart.forEach(i=>{
    text += `- ${i.name} x${i.qty} = ${formatPrice(i.price * i.qty)}%0A`;
  });
  text += `%0ATotal: ${formatPrice(cartTotal())}`;
  // reemplaza el número por el de tu negocio con código de país (ej. 52 para MX). El número usado anteriormente fue 526481004199.
  window.open(`https://wa.me/526481004199?text=${encodeURIComponent(text)}`);
}

/* Initialize on page: set cart count and wire modal buttons (if exist) */
function initCartOnPage(){
  updateCartCountOnAll();

  // wire open buttons
  document.querySelectorAll('.cart-btn').forEach(b=>{
    b.onclick = (e) => { openCartModal(); };
  });

  // close backdrop
  const backdrop = document.getElementById('cart-backdrop');
  if(backdrop){
    backdrop.querySelector('.btn-close')?.addEventListener('click', closeCartModal);
    backdrop.addEventListener('click', function(e){
      if(e.target === backdrop) closeCartModal();
    });
    // wire clear/checkout
    const clearBtn = document.getElementById('cart-clear');
    if(clearBtn) clearBtn.onclick = clearCart;
    const checkoutBtn = document.getElementById('cart-checkout');
    if(checkoutBtn) checkoutBtn.onclick = checkoutWhatsApp;
  }

  // render if modal exists (not necessary now)
  renderCartModal();
}

/* expose addToCart to global so product pages can call it easily */
window.addToCart = function(item){
  addToCart(item);
};
window.initCartOnPage = initCartOnPage;
