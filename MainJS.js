// NEW: Open full admin dashboard
window.openFullAdmin = function() {
    window.open('admin-dashboard.html', '_blank');
}

// NEW: Export orders (bonus feature)
window.exportOrders = function() {
    if (!orders || orders.length === 0) {
        showTemporaryMessage('No orders to export', '#ff9800');
        return;
    }
    
    let csv = 'Order ID,Customer Name,Phone,Total,Payment,Status,Tracking,Date\n';
    orders.forEach(o => {
        csv += `"${o.id}","${o.customer?.name || ''}","${o.customer?.phone || ''}","${o.total}","${o.payment}","${o.status}","${o.tracking}","${new Date(o.createdAt).toLocaleString()}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loadify-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showTemporaryMessage('✅ Orders exported!', '#4CAF50');
}

// ENSURE localStorage sync works across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'orders') {
        orders = JSON.parse(e.newValue || '[]');
        if (document.getElementById('adminOrdersList')) {
            buildAdminList();
        }
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const track = document.querySelector('.slider-track');
    let isDragging = false;
    let startX = 0;
    let baseTransform = 0;

    slider.onmousedown = function(e) {
        isDragging = true;
        track.classList.add('paused');
        startX = e.clientX;
        // Get current animation position
        const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
        baseTransform = matrix.m41 || 0; // Current X position
        slider.style.cursor = 'grabbing';
        e.preventDefault();
    };

    document.onmousemove = function(e) {
        if (!isDragging) return;
        
        const currentX = e.clientX;
        const deltaX = (currentX - startX) * 1.5; // Drag sensitivity
        track.style.transform = `translateX(${baseTransform + deltaX}px)`;
    };

    document.onmouseup = function() {
        if (isDragging) {
            isDragging = false;
            slider.style.cursor = 'grab';
            track.classList.remove('paused');
            // Smooth reset to animation
            track.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                track.style.transform = '';
                track.style.transition = '';
            }, 100);
        }
    };

    // MOBILE TOUCH - SAME LOGIC
    slider.ontouchstart = function(e) {
        isDragging = true;
        track.classList.add('paused');
        startX = e.touches[0].clientX;
        const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
        baseTransform = matrix.m41 || 0;
    };

    document.ontouchmove = function(e) {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const deltaX = (currentX - startX) * 1.5;
        track.style.transform = `translateX(${baseTransform + deltaX}px)`;
        e.preventDefault();
    };

    document.ontouchend = function() {
        if (isDragging) {
            isDragging = false;
            track.classList.remove('paused');
            track.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                track.style.transform = '';
                track.style.transition = '';
            }, 100);
        }
    };

    // Prevent text selection
    slider.onselectstart = function() { return false; };
});


// ✨ Color Picker Functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Select all color options
  const colorOptions = document.querySelectorAll('.color-option');
  
  colorOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      // Prevent card/modal click
      e.stopPropagation();
      
      // Get current card
      const card = this.closest('.card');
      
      // Remove active class from all colors in this card
      card.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('active');
      });
      
      // Add active class to clicked color
      this.classList.add('active');
      
      // Store selection (for modal/use later)
      const selectedColor = this.dataset.color;
      const productId = card.dataset.product;
      
      // Optional: Console log for debugging
      console.log(`✅ ${productId}: ${selectedColor} selected`);
      
      // Optional: Save to localStorage for modal
      // localStorage.setItem(`${productId}_color`, selectedColor);
    });
  });
  
  // Optional: Reset all colors on page load
  function resetColors() {
    colorOptions.forEach(option => {
      if (option.classList.contains('black')) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
  
  // Uncomment to auto-reset on page load
  // resetColors();
  
  console.log('🎨 Color picker initialized!');
});
/* -------------------------
   Data & Initialization
   ------------------------- */
const SIM_PRICE = 50;

const productData = {
  "LDPhone11": { price: "₱14,999", desc: "• 6.1-inch Liquid Retina HD display<br>• Dual 12MP camera system (Wide + Ultra Wide)<br>• A13 Bionic chip<br>• Up to 17 hours video playback battery life<br>• Dual 12MP camera system", type: "device" },
  "LDPhone12": { price: "₱16,999", desc: "• 6.1-inch Super Retina XDR display<br>• Dual 12MP camera system (Wide + Ultra Wide)<br>• A14 Bionic chip<br>•5G connectivity for faster downloads and streaming<br>• Dual 12MP camera system", type: "device" },
  "LDPhone13": { price: "₱18,999", desc: "• 6.1-inch Super Retina XDR display<br>• Dual 12MP camera system (Wide + Ultra Wide)<br>• A14 Bionic chip<br>•5G connectivity for faster performance<br>• Ceramic Shield front for improved durability", type: "device" },
  "IPhone14": { price: "₱20,999", desc: "• 6.1-inch Super Retina XDR display<br>• Dual 12MP camera system (Wide + Ultra Wide)<br>• A15 Bionic chip<br>•Up to 20 hours video playback<br>• Ceramic Shield front with durable design", type: "device" },
  "Call & Text Packages": { price: "₱99", desc: "• Unli Calls<br>• Unli Texts<br>• 7 Days Validity", type: "eload" },
  "High-Speed Data": { price: "₱50", desc: "• 5G Data<br>• No Speed Cap<br>• 1–30 Days Options", type: "eload" },
  "All-in-One Combo Load": { price: "₱199", desc: "• 2GB Data<br>• Unli Texts<br>• 100 Mins Calls", type: "eload" }
};

let cart = loadFromStorage('cart') || [];
let orders = loadFromStorage('orders') || [];

/* -------------------------
   Utility helper functions
   ------------------------- */
function formatMoney(num) {
  return '₱' + Number(num).toLocaleString();
}
function parseMoney(p) {
  // expects strings like "₱14,999" or numbers
  if (typeof p === 'number') return p;
  return parseInt(String(p).replace(/₱|,/g, '')) || 0;
}
function saveToStorage(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function loadFromStorage(k){ try { const s=localStorage.getItem(k); return s?JSON.parse(s):null; } catch(e){ return null; } }
function randomBetween(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

/* -------------------------
   NAV & HEADER Controls
   ------------------------- */
function toggleNav(){
  document.getElementById('navLinks').classList.toggle('open');
}

/* -------------------------
   PRODUCT MODAL (SIM / QTY / COD)
   ------------------------- */
function openModal(product){
  const modal=document.getElementById('modalOverlay');
  const title=document.getElementById('modalTitle');
  const details=document.getElementById('modalDetails');
  const simOpt=document.getElementById('simOption');
  const buyCodBtn=document.getElementById('buyCodBtn');
  const qtyInput=document.getElementById('modalQty');

  title.textContent = product;
  details.innerHTML = `<strong>Price:</strong> ${productData[product].price}<br><br>${productData[product].desc}`;
  qtyInput.value = 1;

  // show sim option only for devices
  if (productData[product].type === 'device') {
    simOpt.style.display = 'block';
    buyCodBtn.style.display = 'block';
  } else {
    simOpt.style.display = 'none';
    buyCodBtn.style.display = 'none';
    // uncheck sim if present
    document.getElementById('addSimCard').checked = false;
  }

  modal.style.display='flex';
}
function closeModal(){
  document.getElementById('modalOverlay').style.display='none';
}



/* -------------------------
   CART FUNCTIONS
   ------------------------- */
function updateCart(){
  const itemsDiv=document.getElementById('cartItems');
  const count=document.getElementById('cartCount');
  const totalEl=document.getElementById('cartTotal');

  itemsDiv.innerHTML='';
  let total=0;

  cart.forEach((it, idx) => {
    const base = parseMoney(it.price);
    const extras = it.extra || 0;
    const qty = it.qty || 1;
    const line = (base + extras) * qty;
    total += line;

    itemsDiv.innerHTML += `
      <div class="cart-item">
        <strong>${it.name}</strong>
        <div class="muted">Qty: ${qty} &nbsp; • &nbsp; Unit: ${it.price}${it.extra ? ' +₱' + it.extra : ''}</div>
        <small>Subtotal: ${formatMoney(line)}</small>
        <div style="margin-top:8px;">
          <button class="remove-btn" onclick="removeItem(${idx})">Remove</button>
        </div>
      </div>
    `;
  });

  count.textContent = cart.length;
  totalEl.textContent = formatMoney(total);
  saveToStorage('cart', cart);
}
function removeItem(index){
  cart.splice(index,1);
  updateCart();
}
function toggleCart(){
  document.getElementById('cartPanel').classList.toggle('open');
}

/* -------------------------
   ADD TO CART & BUY COD
   ------------------------- */
function addToCart(){
  const productName = document.getElementById('modalTitle').textContent;
  const qty = Math.max(1, parseInt(document.getElementById('modalQty').value || 1));
  const simAdded = document.getElementById('addSimCard').checked;
  const basePrice = productData[productName].price;
  const extra = simAdded ? SIM_PRICE : 0;

  cart.push({
    name: productName + (simAdded ? ' + SIM Card' : ''),
    sku: productName,
    price: basePrice,
    extra: extra,
    qty: qty,
    type: productData[productName].type
  });

  updateCart();
  closeModal();
  showTemporaryMessage('Added to cart', '#00BCD4');
  // open cart so user sees it
  document.getElementById('cartPanel').classList.add('open');
}

function buyWithCOD(){
  // Add item to cart (device only) then open checkout with COD preselected
  const productName = document.getElementById('modalTitle').textContent;
  if (productData[productName].type !== 'device') {
    showTemporaryMessage('COD only available for devices', 'red');
    return;
  }
  addToCart(); // adds item and opens cart
  // open checkout and preselect COD if allowed
  setTimeout(()=>{
    openCheckout('cod'); // will open modal and set COD enabled
  }, 220);
}

/* -------------------------
   CHECKOUT FLOW
   ------------------------- */
function openCheckout(preselectPayment = null){
  if (cart.length === 0) {
    showTemporaryMessage('Your cart is empty!', 'red');
    return;
  }

  // build summary
  let html = '';
  let total = 0;
  let deviceInCart = false;

  cart.forEach(it => {
    const unit = parseMoney(it.price);
    const extras = it.extra || 0;
    const line = (unit + extras) * (it.qty || 1);
    total += line;
    html += `<div style="margin-bottom:6px;"><strong>${it.name}</strong><br><small>${it.qty} × ${it.price}${it.extra? ' +₱' + it.extra : ''} → ${formatMoney(line)}</small></div>`;
    if (it.type === 'device') deviceInCart = true;
  });

  html += `<hr><div><strong>Total: ${formatMoney(total)}</strong></div>`;

  document.getElementById('orderSummary').innerHTML = html;

  // Enable/disable COD
  const codOption = document.getElementById('codOption');
  codOption.disabled = !deviceInCart;

  // If preselect provided and allowed, set it
  const radios = document.querySelectorAll('input[name="payment"]');
  radios.forEach(r => r.checked = false);
  if (preselectPayment && (!codOption.disabled || preselectPayment !== 'cod')) {
    const r = document.querySelector('input[name="payment"][value="'+preselectPayment+'"]');
    if (r) r.checked = true;
  }

  // show checkout
  document.getElementById('checkoutModal').style.display = 'flex';
  // close cart panel
  document.getElementById('cartPanel').classList.remove('open');
}

function closeCheckout(){
  document.getElementById('checkoutModal').style.display = 'none';
}

/* -------------------------
   CONFIRM ORDER -> create order, save, receipt & tracking
   ------------------------- */

   document.addEventListener("DOMContentLoaded", function () {

  const confirmBtn = document.getElementById("confirmCheckout");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {

      const payment = document.querySelector("input[name='payment']:checked");
      if (!payment) {
        alert("Select payment method.");
        return;
      }

      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const addr = document.getElementById("custAddr").value.trim();

      if (!name || !phone || !addr) {
        alert("Fill all customer fields.");
        return;
      }

      if (!/^[0-9]{1,12}$/.test(phone)) {
        alert("Phone must be numbers only (max 12 digits).");
        return;
      }

      const now = Date.now();
      const tracking = "LD-" + now + "-" + randomBetween(100, 999);

      let total = 0;
      cart.forEach(it => {
        total += (parseMoney(it.price) + (it.extra || 0)) * it.qty;
      });

      const order = {
        id: "ORD-" + now,
        tracking: tracking,
        createdAt: new Date().toISOString(),
        customer: { name, phone, address: addr },
        items: [...cart],
        total: total,
        payment: payment.value,
        status: payment.value === "cod" ? "Pending (COD)" : "Paid"
      };

      orders.push(order);
      saveToStorage("orders", orders);

      cart = [];
      saveToStorage("cart", cart);
      updateCart();

      closeCheckout();
      alert("Order placed! Tracking: " + tracking);

    });
  }

});

/* -------------------------
   RECEIPT & PRINT
   ------------------------- */
function showReceipt(order){
  const el = document.getElementById('receiptContent');
  el.innerHTML = `
    <div class="receipt-header">
      <div>
        <h3>LOADIFY BY G4</h3>
        <div class="muted">Official Receipt</div>
      </div>
      <div class="muted">Order: <strong>${order.id}</strong><br>Tracking: <strong>${order.tracking}</strong></div>
    </div>
    <hr>
    <div><strong>Customer</strong><br>${escapeHtml(order.customer.name)}<br>${escapeHtml(order.customer.phone)}<br>${escapeHtml(order.customer.address)}</div>
    <hr>
    <div><strong>Items</strong>
      <div style="margin-top:8px;">
        ${order.items.map(it=>`<div style="margin-bottom:6px;"><strong>${escapeHtml(it.name)}</strong><br><small>Qty: ${it.qty} • Unit: ${it.price}${it.extra? ' +₱' + it.extra : ''}</small></div>`).join('')}
      </div>
    </div>
    <hr>
    <div><strong>Total:</strong> ${formatMoney(order.total)}</div>
    <div style="margin-top:8px;"><strong>Payment:</strong> ${escapeHtml(order.payment.toUpperCase())} • <strong>Status:</strong> ${escapeHtml(order.status)}</div>
    <div style="margin-top:12px; font-size:12px;" class="muted">Order time: ${new Date(order.createdAt).toLocaleString()}</div>
  `;
  document.getElementById('receiptModal').style.display = 'flex';
}

function printReceipt(){
  const content = document.getElementById('receiptContent').innerHTML;
  const w = window.open('', '_blank', 'width=700,height=800');
  w.document.write(`<html><head><title>Receipt</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:18px;} .muted{color:#666;font-size:13px;}</style></head><body>${content}</body></html>`);
  w.document.close();
  w.print();
}
function closeReceipt(){ document.getElementById('receiptModal').style.display = 'none'; }

/* -------------------------
   TRACKING LOOKUP
   ------------------------- */
function openTrack(){ document.getElementById('trackModal').style.display='flex'; }
function closeTrack(){ document.getElementById('trackModal').style.display='none'; document.getElementById('trackInput').value=''; document.getElementById('trackOutput').innerHTML=''; }

function lookupTracking(){
  const q = (document.getElementById('trackInput').value || '').trim();
  if (!q) { showTemporaryMessage('Enter a tracking number', 'red'); return; }
  const found = orders.find(o => o.tracking === q);
  const out=document.getElementById('trackOutput');
  if (!found) {
    out.innerHTML = '<div style="color:#e91e63;">No order found with that tracking number.</div>';
    return;
  }
  out.innerHTML = `<div><strong>Order:</strong> ${found.id}</div>
                   <div><strong>Name:</strong> ${escapeHtml(found.customer.name)}</div>
                   <div><strong>Status:</strong> ${escapeHtml(found.status)}</div>
                   <div style="margin-top:8px;"><strong>Items:</strong>
                     ${found.items.map(it=>`<div style="margin-top:6px;">${escapeHtml(it.name)} • ${it.qty} • ${formatMoney((parseMoney(it.price)+ (it.extra||0))*it.qty)}</div>`).join('')}
                   </div>
                   <div style="margin-top:8px;"><strong>Total:</strong> ${formatMoney(found.total)}</div>`;
}

/* -------------------------
   ADMIN PANEL (password simple)
   ------------------------- */
const ADMIN_PASSWORD = 'admin123'; // change if needed

function openAdminPrompt(){
  const p = prompt('Enter admin password:');
  if (p === ADMIN_PASSWORD) {
    openAdmin();
  } else {
    if (p !== null) alert('Wrong password.');
  }
}
function openAdmin(){
  buildAdminList();
  document.getElementById('adminPanel').style.display='flex';
}
function closeAdmin(){ document.getElementById('adminPanel').style.display='none'; }
function refreshOrders(){ orders = loadFromStorage('orders') || []; buildAdminList(); }

function buildAdminList(filterText=''){
  const list = document.getElementById('adminOrdersList');
  list.innerHTML = '';
  const arr = (orders || []).slice().reverse(); // newest first
  const filtered = arr.filter(o => {
    if (!filterText) return true;
    const f = filterText.toLowerCase();
    return o.id.toLowerCase().includes(f) || o.tracking.toLowerCase().includes(f) || (o.customer && o.customer.name.toLowerCase().includes(f)) || o.status.toLowerCase().includes(f);
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div class="muted">No orders yet.</div>';
    return;
  }

  filtered.forEach(o => {
    list.innerHTML += `
      <div class="order-row">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong>${o.id}</strong> <div class="muted">Tracking: ${o.tracking}</div>
            <div class="muted">Name: ${escapeHtml(o.customer.name)} • ${escapeHtml(o.customer.phone)}</div>
          </div>
          <div style="text-align:right;">
            <div class="muted">${new Date(o.createdAt).toLocaleString()}</div>
            <div style="margin-top:6px;"><strong>${formatMoney(o.total)}</strong></div>
          </div>
        </div>
        <div style="margin-top:8px;">
          <strong>Items:</strong>
          <div style="margin-top:6px;">${o.items.map(it=>`<div>${escapeHtml(it.name)} • Qty: ${it.qty} • ${formatMoney((parseMoney(it.price)+(it.extra||0))*it.qty)}</div>`).join('')}</div>
        </div>
        <div style="margin-top:8px; display:flex; gap:8px;">
          <button onclick="markDelivered('${o.id}')" ${o.status.toLowerCase().includes('delivered')? 'disabled' : ''}>Mark as Delivered</button>
          <button onclick="deleteOrder('${o.id}')" style="background:#e91e63;color:white;">Delete</button>
          <button onclick="viewOrderReceipt('${o.id}')">View Receipt</button>
        </div>
        <div style="margin-top:8px;" class="muted">Status: ${escapeHtml(o.status)}</div>
      </div>
    `;
  });
}

function applyAdminFilter(){
  const f = document.getElementById('adminFilter').value || '';
  buildAdminList(f);
}

function markDelivered(id){
  const oidx = orders.findIndex(o=>o.id===id);
  if (oidx >= 0) {
    orders[oidx].status = 'Delivered';
    saveToStorage('orders', orders);
    buildAdminList();
    showTemporaryMessage('Marked delivered', '#00BCD4');
  }
}
function deleteOrder(id){
  if (!confirm('Delete order permanently?')) return;
  orders = orders.filter(o=>o.id !== id);
  saveToStorage('orders', orders);
  buildAdminList();
  showTemporaryMessage('Order deleted', '#e91e63');
}
function clearOrdersConfirm(){
  if (!confirm('Clear ALL orders? This cannot be undone.')) return;
  orders = [];
  saveToStorage('orders', orders);
  buildAdminList();
  showTemporaryMessage('All orders cleared', '#e91e63');
}
function viewOrderReceipt(id){
  const o = orders.find(x=>x.id===id);
  if (!o) return alert('Order not found');
  showReceipt(o);
}

/* -------------------------
   CONTACT MODAL
   ------------------------- */
function openContactModal(){
    document.getElementById('contactModal').style.display='flex';
}
function closeContactModal(){
    document.getElementById('contactModal').style.display='none';
}


/* -------------------------
   Helpers & small UX
   ------------------------- */
function showTemporaryMessage(message, color='#e91e63'){
  let msg=document.getElementById('tempMessage');
  msg.textContent = message;
  msg.style.background = color;
  msg.style.opacity = '1';
  msg.style.transform = 'translate(-50%,0)';
  setTimeout(()=>{ msg.style.opacity='0'; msg.style.transform='translate(-50%,-20px)'; }, 3000);
}

/* -------------------------
   TRACK / ADMIN / CART init
   ------------------------- */
updateCart();
refreshOrders();

/* -------------------------
   Utility - escape for HTML display
   ------------------------- */
function escapeHtml(str){
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}