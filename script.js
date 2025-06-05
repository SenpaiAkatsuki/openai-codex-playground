let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;
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
    cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<img src="${item.image}" alt="${item.name}"> <span>${item.name}</span> - $${item.price.toFixed(2)}`;
        container.appendChild(div);
    });
    const totalElem = document.getElementById('total');
    if (totalElem) {
        totalElem.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }
    renderPayPalButton();
}

function renderPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container || typeof paypal === 'undefined') return;
    container.innerHTML = '';
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{ amount: { value: cartTotal.toFixed(2) } }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                cart = [];
                localStorage.removeItem('cart');
                displayCart();
            });
        }
    }).render('#paypal-button-container');
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
