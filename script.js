let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function displayCart() {
    updateCartCount();
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<img src="${item.image}" alt="${item.name}"> <span>${item.name}</span> - $${item.price.toFixed(2)}`;
        container.appendChild(div);
    });
    const totalElem = document.getElementById('total');
    if (totalElem) {
        totalElem.textContent = `Total: $${total.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            cart = [];
            localStorage.removeItem('cart');
            displayCart();
            alert('Order placed!');
        });
    }
});
