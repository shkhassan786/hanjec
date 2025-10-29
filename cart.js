let cart = [];
let promoApplied = false;
let discountAmount = 0;

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayCart();
    updateCartCount();
});

// Load cart from localStorage
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <button onclick="window.location.href='products.html'">
                    Start Shopping
                </button>
            </div>
        `;
        updateSummary();
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='img1.jpg'">
            <div class="item-details">
                <div class="item-title">${item.title}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-price">₹${item.price}</div>
            </div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="btn-remove" onclick="removeItem(${item.id})">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
    
    updateSummary();
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Remove item
function removeItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Update cart summary
function updateSummary() {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping
    
    // Calculate discount
    if (promoApplied) {
        discountAmount = Math.round(subtotal * 0.1); // 10% discount
    } else {
        discountAmount = 0;
    }
    
    const total = subtotal + shipping - discountAmount;
    
    document.getElementById('item-count').textContent = itemCount;
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    document.getElementById('discount-value').textContent = discountAmount;
    document.getElementById('total').textContent = `₹${total}`;
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    // Valid promo codes
    const validCodes = ['HANJEC', 'HANJEC10', 'WELCOME10', 'FIRST10'];
    
    if (validCodes.includes(promoCode)) {
        if (promoApplied) {
            alert('Promo code already applied!');
            return;
        }
        promoApplied = true;
        alert('Promo code applied! You got 10% discount.');
        promoInput.value = '';
        promoInput.disabled = true;
        updateSummary();
    } else {
        alert('Invalid promo code. Try: HANJEC, HANJEC10, WELCOME10, or FIRST10');
    }
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Store order details
    const orderDetails = {
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: discountAmount,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) - discountAmount,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    window.location.href = 'checkout.html';
}
