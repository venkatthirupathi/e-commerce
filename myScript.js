let cartData = []; // To store cart items
let bookedData = []; // To store booked items

function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

function redirectToLogin() {
    alert("You need to log in to add items to the cart.");
    window.location.href = 'login.html';
}

function addToCart(itemName, itemPrice) {
    if (!isLoggedIn()) {
        redirectToLogin();
        return;
    }

    let price = isNaN(itemPrice) ? itemPrice : parseFloat(itemPrice);
    cartData.push({ name: itemName, price: price });

    displayCartItems();
}

function removeCartItem(index) {
    cartData.splice(index, 1);
    displayCartItems();
}

function displayCartItems() {
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    cartData.forEach((item, index) => {
        let newItem = document.createElement('div');
        newItem.classList.add('cart-item');
        newItem.innerHTML = `
            <p>${item.name}</p>
            <p>Rs ${item.price}</p>
            <button class="remove-item-btn" onclick="removeCartItem(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(newItem);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPriceElement = document.getElementById('total-price');
    let total = cartData.reduce((acc, item) => acc + item.price, 0);
    totalPriceElement.innerText = total.toFixed(2);
}

function bookCart() {
    if (cartData.length > 0) {
        bookedData = cartData.slice();
        cartData = [];
        displayCartItems();
        displayBookedItems();
        document.getElementById('booking-message').innerText = 'Cart Booked';
    } else {
        document.getElementById('booking-message').innerText = 'Cart is empty';
    }
}

function displayBookedItems() {
    let bookedItemsDiv = document.getElementById('booked-items');
    bookedItemsDiv.innerHTML = '';

    bookedData.forEach((item, index) => {
        let newBookedItem = document.createElement('div');
        newBookedItem.classList.add('booked-item');
        newBookedItem.innerHTML = `
            <p>${item.name}</p>
            <p>Rs ${item.price}</p>
            <button class="remove-booked-btn" onclick="removeBookedItem(${index})">Cancel</button>
        `;
        bookedItemsDiv.appendChild(newBookedItem);
    });
}

function removeBookedItem(index) {
    bookedData.splice(index, 1);
    displayBookedItems();
}
