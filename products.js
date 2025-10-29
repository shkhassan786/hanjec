// Product database
const products = [
    // Health & Care
    {
        id: 1,
        title: "Vitamin C Supplement - 60 Tablets",
        description: "Boost your immunity with our premium Vitamin C tablets. 1000mg per serving.",
        price: 499,
        originalPrice: 799,
        discount: "38% OFF",
        category: "health",
        image: "img1.jpg",
        rating: 4.5,
        reviews: 1250
    },
    {
        id: 2,
        title: "Digital Blood Pressure Monitor",
        description: "Accurate and easy-to-use blood pressure monitor with large LCD display.",
        price: 1299,
        originalPrice: 2499,
        discount: "48% OFF",
        category: "health",
        image: "img1.jpg",
        rating: 4.3,
        reviews: 890
    },
    // Electronics
    {
        id: 3,
        title: "Wireless Bluetooth Headphones",
        description: "Premium sound quality with active noise cancellation. 30-hour battery life.",
        price: 1999,
        originalPrice: 4999,
        discount: "60% OFF",
        category: "electronics",
        image: "img2.jpg",
        rating: 4.6,
        reviews: 3420
    },
    {
        id: 4,
        title: "Smart Watch Fitness Tracker",
        description: "Track your fitness goals with heart rate monitor, sleep tracking, and more.",
        price: 2499,
        originalPrice: 5999,
        discount: "58% OFF",
        category: "electronics",
        image: "img2.jpg",
        rating: 4.4,
        reviews: 2150
    },
    {
        id: 5,
        title: "Portable Power Bank 20000mAh",
        description: "Fast charging power bank with dual USB ports and LED display.",
        price: 899,
        originalPrice: 1999,
        discount: "55% OFF",
        category: "electronics",
        image: "img2.jpg",
        rating: 4.5,
        reviews: 1890
    },
    // Men's Wear
    {
        id: 6,
        title: "Men's Cotton Casual Shirt",
        description: "Comfortable and stylish casual shirt perfect for everyday wear.",
        price: 599,
        originalPrice: 1199,
        discount: "50% OFF",
        category: "mens",
        image: "img3.jpg",
        rating: 4.2,
        reviews: 980
    },
    {
        id: 7,
        title: "Men's Denim Jeans - Slim Fit",
        description: "Premium quality denim jeans with perfect fit and comfort.",
        price: 899,
        originalPrice: 1799,
        discount: "50% OFF",
        category: "mens",
        image: "img3.jpg",
        rating: 4.4,
        reviews: 1560
    },
    {
        id: 8,
        title: "Men's Formal Blazer",
        description: "Elegant formal blazer for office and special occasions.",
        price: 1999,
        originalPrice: 4999,
        discount: "60% OFF",
        category: "mens",
        image: "img3.jpg",
        rating: 4.6,
        reviews: 720
    },
    // Ladies Wear
    {
        id: 9,
        title: "Women's Designer Kurti",
        description: "Beautiful ethnic kurti with intricate embroidery work.",
        price: 799,
        originalPrice: 1999,
        discount: "60% OFF",
        category: "ladies",
        image: "img4.jpg",
        rating: 4.5,
        reviews: 2340
    },
    {
        id: 10,
        title: "Women's Western Dress",
        description: "Trendy western dress perfect for parties and casual outings.",
        price: 1299,
        originalPrice: 2999,
        discount: "57% OFF",
        category: "ladies",
        image: "img4.jpg",
        rating: 4.3,
        reviews: 1670
    },
    {
        id: 11,
        title: "Women's Saree with Blouse",
        description: "Elegant traditional saree with matching blouse piece.",
        price: 1599,
        originalPrice: 3999,
        discount: "60% OFF",
        category: "ladies",
        image: "img4.jpg",
        rating: 4.7,
        reviews: 1890
    },
    // Baby Wear
    {
        id: 12,
        title: "Baby Romper Set - 3 Pieces",
        description: "Soft and comfortable romper set for babies 0-12 months.",
        price: 499,
        originalPrice: 1299,
        discount: "62% OFF",
        category: "baby",
        image: "img5.png",
        rating: 4.6,
        reviews: 1120
    },
    {
        id: 13,
        title: "Baby Winter Wear Combo",
        description: "Warm and cozy winter wear set including jacket and pants.",
        price: 899,
        originalPrice: 2199,
        discount: "59% OFF",
        category: "baby",
        image: "img5.png",
        rating: 4.5,
        reviews: 890
    },
    // Kids Wear
    {
        id: 14,
        title: "Kids Party Wear Dress",
        description: "Beautiful party wear dress for girls aged 2-8 years.",
        price: 699,
        originalPrice: 1799,
        discount: "61% OFF",
        category: "kids",
        image: "img6.png",
        rating: 4.4,
        reviews: 1450
    },
    {
        id: 15,
        title: "Kids Casual T-Shirt & Shorts Set",
        description: "Comfortable casual wear set for boys aged 3-10 years.",
        price: 599,
        originalPrice: 1499,
        discount: "60% OFF",
        category: "kids",
        image: "img6.png",
        rating: 4.3,
        reviews: 1230
    },
    // Mobile & Accessories
    {
        id: 16,
        title: "Smartphone Case with Screen Protector",
        description: "Durable protective case with tempered glass screen protector.",
        price: 299,
        originalPrice: 799,
        discount: "63% OFF",
        category: "mobile",
        image: "img7.jpg",
        rating: 4.2,
        reviews: 3450
    },
    {
        id: 17,
        title: "Fast Charging Cable - 3 Pack",
        description: "High-quality fast charging cables compatible with all devices.",
        price: 399,
        originalPrice: 999,
        discount: "60% OFF",
        category: "mobile",
        image: "img7.jpg",
        rating: 4.4,
        reviews: 2890
    },
    {
        id: 18,
        title: "Wireless Car Charger Mount",
        description: "Convenient wireless charging mount for your car.",
        price: 799,
        originalPrice: 1999,
        discount: "60% OFF",
        category: "mobile",
        image: "img7.jpg",
        rating: 4.5,
        reviews: 1670
    },
    // Toys
    {
        id: 19,
        title: "Educational Building Blocks Set",
        description: "Creative building blocks set for kids aged 3+ years. 100 pieces.",
        price: 599,
        originalPrice: 1499,
        discount: "60% OFF",
        category: "toys",
        image: "img8.jpg",
        rating: 4.6,
        reviews: 2340
    },
    {
        id: 20,
        title: "Remote Control Car",
        description: "High-speed remote control car with rechargeable battery.",
        price: 1299,
        originalPrice: 2999,
        discount: "57% OFF",
        category: "toys",
        image: "img8.jpg",
        rating: 4.5,
        reviews: 1890
    },
    {
        id: 21,
        title: "Stuffed Teddy Bear - Large",
        description: "Soft and cuddly teddy bear, perfect gift for kids.",
        price: 799,
        originalPrice: 1999,
        discount: "60% OFF",
        category: "toys",
        image: "img8.jpg",
        rating: 4.7,
        reviews: 3120
    }
];

let filteredProducts = [...products];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartCount();
});

// Display products
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('products-grid');
    
    if (productsToDisplay.length === 0) {
        grid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='img1.jpg'">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-description">${product.description}</div>
            <div>
                <span class="product-price">₹${product.price}</span>
                <span class="product-original-price">₹${product.originalPrice}</span>
                <span class="product-discount">${product.discount}</span>
            </div>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow(${product.id})">
                    Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (halfStar) stars += '⯨';
    for (let i = 0; i < emptyStars; i++) stars += '☆';
    
    return stars;
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (categoryFilter !== 'all' && product.category !== categoryFilter) {
            return false;
        }
        
        // Price filter
        if (priceFilter !== 'all') {
            const price = product.price;
            if (priceFilter === '0-500' && price > 500) return false;
            if (priceFilter === '500-1000' && (price < 500 || price > 1000)) return false;
            if (priceFilter === '1000-2000' && (price < 1000 || price > 2000)) return false;
            if (priceFilter === '2000+' && price < 2000) return false;
        }
        
        return true;
    });
    
    displayProducts(filteredProducts);
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayProducts(products);
        return;
    }
    
    const searchResults = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(searchResults);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${product.title} added to cart!`);
}

// Buy now
function buyNow(productId) {
    addToCart(productId);
    window.location.href = 'cart.html';
}

// View product details
function viewProduct(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = `product-detail.html?id=${productId}`;
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});
