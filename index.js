const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100;

function setupNavigation() {
  document.querySelectorAll('.header-icons button:first-child, .header-icons img[alt="Cart"]').forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  });
  
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => window.location.href = 'listing.html');
  }
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.cursor = 'pointer';
    link.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      e.preventDefault();
      if (text === 'Home') window.location.href = 'listing.html';
      else if (text.includes('Categories')) window.location.href = 'listing.html';
    });
  });
  
  const closeTopBar = document.querySelector('.top-bar-close');
  if (closeTopBar) closeTopBar.addEventListener('click', () => document.querySelector('.top-bar').style.display = 'none');
}

function setupCartPage() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const qtyEl = this.parentElement.querySelector('.qty-val');
      let qty = parseInt(qtyEl.textContent);
      if (this.textContent === '+') qty++;
      else if (this.textContent === '−' && qty > 1) qty--;
      qtyEl.textContent = qty;
      updateCartTotal();
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.cart-item');
      item.style.opacity = '0';
      setTimeout(() => { item.remove(); updateCartTotal(); }, 300);
    });
  });
  
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'checkout.html'; });
  
  const continueLink = document.querySelector('.continue-link');
  if (continueLink) continueLink.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'listing.html'; });
}

function updateCartTotal() {
  let subtotal = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
    const qty = parseInt(item.querySelector('.qty-val').textContent);
    subtotal += price * qty;
  });
  
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const total = subtotal + tax + shipping;
  
  const subtotalEl = document.querySelector('.summary-row:nth-child(1) span:last-child');
  const shippingEl = document.querySelector('.summary-row:nth-child(2) span:last-child');
  const taxEl = document.querySelector('.summary-row:nth-child(3) span:last-child');
  const totalEl = document.querySelector('.total-row span:last-child');
  
  if (subtotalEl) subtotalEl.textContent = `$ ${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$ ${shipping.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$ ${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$ ${total.toFixed(2)}`;
}

function setupCheckoutPage() {
  const editCartBtn = document.querySelector('.btn-edit-cart');
  if (editCartBtn) editCartBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'cart.html'; });
  
  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Order placed successfully!');
      window.location.href = 'index.html';
    });
  }
}

function setupProductsPage() {
  document.querySelectorAll('.card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.wishlist-icon')) window.location.href = 'productt.html';
    });
  });
  
  document.querySelectorAll('.footer-links a, .footer-links li').forEach(link => {
    link.style.cursor = 'pointer';
    link.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      if (text === 'Cart') {
        e.preventDefault();
        window.location.href = 'cart.html';
      } else if (text === 'Checkout') {
        e.preventDefault();
        window.location.href = 'checkout.html';
      }
    });
  });
}

function setupProductDetailPage() {
  const addToCartBtn = document.querySelector('.btn-add-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const notification = document.createElement('div');
      notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4078FF; color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999;';
      notification.textContent = 'Item added to cart!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setupNavigation();
  if (document.querySelector('.cart-wrapper')) { setupCartPage(); updateCartTotal(); }
  if (document.querySelector('.checkout-grid')) setupCheckoutPage();
  if (document.querySelector('.main-wrapper')) setupProductsPage();
  if (document.querySelector('.product-hero-section')) setupProductDetailPage();
});

// field errori
function setupCheckoutPage() {
  const editCartBtn = document.querySelector('.btn-edit-cart');
  if (editCartBtn) editCartBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'cart.html'; });
  
  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const form = document.querySelector('.address-form');
      const inputs = form.querySelectorAll('input');
      let emptyFields = [];
      
      inputs.forEach(input => {
        const label = input.previousElementSibling;
        const fieldName = label ? label.textContent : 'Field';
        
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          emptyFields.push(fieldName);
        } else {
          input.style.borderColor = '#ddd';
        }
      });
      
      if (emptyFields.length > 0) {
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ff4444; color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999;';
        notification.innerHTML = '<strong>Error:</strong> Please fill in all required fields:<br>' + emptyFields.join(', ');
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
      } else {
        const notification = document.createElement('div');
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #1a7535ff; color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999;';
        notification.textContent = 'Order placed successfully!';
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.remove();
          window.location.href = 'listing.html';
        }, 2000);
      }
    });
  }
  
  const formInputs = document.querySelectorAll('.address-form input');
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.style.borderColor = '#ddd';
      }
    });
  });
}