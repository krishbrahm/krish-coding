let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let isLiked = false;
let products = [];

async function loadProducts() {
    try {
        let response = await fetch("https://dummyjson.com/products/category/mens-shoes");
        let data = await response.json();
        products = data.products;
        displayProducts(products);
        updateCounts();
        document.getElementById('loader').style.display = 'none';
    } catch (error) {
        document.getElementById('loader').innerHTML = 'Failed to load products!';
        console.log(error);
    }
};

function displayProducts(list) {
    let container = document.getElementById('products');
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = `<h2>No shoes found!</h2>`;
        return;
    }
    list.forEach(product => {
        isLiked = wishlist.includes(product.id);
        container.innerHTML += `
        <div class="card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="card-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="price">
                    $${Math.round(product.price)}
                </div>
                <p>⭐ ${product.rating}</p>
                <div class="actions">
                    <button onclick="addToCart(${product.id})">🛒<br>Add</button>
                    <button onclick="toggleWishlist(${product.id})">${isLiked ? "❤️" : "🤍"}</button>
                    <button onclick="showDetails(${product.id})">👁️ View</button>
                </div>
            </div>
        </div>`;
    });
};

document.getElementById('search').addEventListener('input', function () {
    let searchText = this.value.toLowerCase();
    let filtered = products.filter(product => product.title.toLowerCase().includes(searchText));
    displayProducts(filtered);
});

function addToCart(id) {
    let product = products.find(item => item.id === id);
    if (!product) {
        return;
    }
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    alert(product.title + " Added to cart");
};

function toggleWishlist(id) {
    let position = wishlist.indexOf(id);
    if (position === -1) {
        wishlist.push(id);
    } else {
        wishlist.splice(position, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    displayProducts(products);
    isLiked ? isLiked = false : isLiked = true
};

function updateCounts() {
    document.getElementById('cart-count').innerHTML = cart.length;
    document.getElementById('cart-total').innerHTML = cart.length;
    document.getElementById('wish-count').innerHTML = wishlist.length;
    document.getElementById('wishlist-total').innerHTML = wishlist.length;
    document.getElementById('product-total').innerHTML = products.length;
};

function showDetails(id) {
    let product = products.find(item => item.id === id);
    if (!product) {
        return;
    }
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${product.images[0]}"
        alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>⭐ ${product.rating}</p>
        <p>Stock: ${product.stock}</p>
        <div class="price">
            $${Math.round(product.price)}
        </div>
        <button onclick="addToCart(${product.id})">Add to cart</button>
    `;
    document.getElementById('modal').style.display = 'flex';
};

function closeModal() {
    document.getElementById('modal').style.display = 'none';
};

function toggleDark() {
    document.body.classList.toggle('dark');
    let dark = document.body.classList.contains('dark');
    localStorage.setItem('dark-mode', dark);
};

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark')
};

function sortProducts(way) {
    if (way === 'low') {
        displayProducts(products.sort((a, b) => a.price - b.price))
    } else {
        displayProducts(products.sort((a, b) => b.price - a.price))
    }
};

function showAll() {
    displayProducts(products);
};

function showCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.opacity = 100;
    cartModal.style.display = 'flex'

    let container = document.getElementById('cart-items');
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<h1>Your cart is empty!</h1>';
        document.getElementById('cart-price').innerHTML = 'Total: $0';
        document.getElementById('cart-modal').style.display = 'flex';
        return;
    }
    let total = 0;
    cart.forEach((product, index) => {
        let price = Math.round(product.price);
        total += price;
        container.innerHTML += `
            <div style="display: flex; 
            align-items: center; 
            gap: 15px; margin: 15px 0; 
            padding: 10px;
            border-bottom: 1px solid #ccc">
                <img src="${product.thumbnail}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px">
                <div style="flex: 1">
                    <h3>${product.title}</h3>
                    <p>$${price}</p>
                </div>
                <button onclick="removeFromCart(${index})">✖️</button>
            </div>
        `;
    });
    document.getElementById('cart-price').innerHTML = 'Total: $' + total;
    document.getElementById('cart-modal').style.display = 'flex';
};

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
};

function showWishlist() {
    const wishlistTitle = document.getElementById('wishlist-title');
    wishlistTitle.style.opacity = 100
    let container = document.getElementById('wishlist-items');
    document.getElementById('cart-modal').style.opacity = 100
    container.innerHTML = '';
    let savedProducts = products.filter(product => wishlist.includes(product.id));
    if (savedProducts.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty</p>';
    }
    savedProducts.forEach(product => {
        let price = Math.round(product.price);
        container.innerHTML += `
            <div style="display: flex; gap: 15px; align-items: center; margin: 15px 0; padding: 10px; border-bottom: 1px solid #ccc">
                <img src="${product.thumbnail}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px">
                <div style="flex: 1">
                    <h3>${product.title}</h3>
                    <p>$${price}</p>
                </div>
                <button onclick="addToCart(${product.id})">🛒</button>
                <button onclick="toggleWishlist(${product.id})">✖️</button>
            </div>
        `;
    });
};

function closeWishlist() {
    document.getElementById('wishlist-modal').style.display = 'none'
};

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCounts();
    showCart();
};

function checkOut() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    let total = 0;
    cart.forEach(product => {
        total += Math.round(product.price);
    });
    alert('Order placed successfully!\n\n' + 'Total amount: $' + total + '\n\n Thank you for shopping with Shoe Mart!');
    cart = [];
    localStorage.removeItem('cart');
    updateCounts();
    closeCart();
    document.getElementById('year').innerHTML = new Date().getFullYear();

};

window.onclick = function (event) {
    let modal = document.getElementById('modal');
    let cartModal = document.getElementById('cart-modal');
    let wishlistModal = document.getElementById('wishlist-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target === wishlistModal) {
        wishlistModal.style.display = 'none';
    }
};

loadProducts();