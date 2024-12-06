// script.js
let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const checkoutButton = document.getElementById("checkout-button");

    // Update cart items
    cartItems.innerHTML = "";
    cart.forEach(({ item, price }, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item} - ${price}€`;
        listItem.innerHTML += ` <button onclick="removeFromCart(${index})">Entfernen</button>`;
        cartItems.appendChild(listItem);
    });

    // Update total
    totalElement.textContent = `Gesamt: ${total}€`;

    // Enable PayPal button if cart isn't empty
    checkoutButton.disabled = cart.length === 0;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// PayPal Checkout Integration
document.getElementById("checkout-button").addEventListener("click", () => {
    const paypalUrl = "https://www.paypal.com/cgi-bin/webscr";
    const params = new URLSearchParams({
        cmd: "_cart",
        upload: "1",
        business: "BeyzaNur572001@outlook.com",
    });

    cart.forEach((item, index) => {
        params.append(`item_name_${index + 1}`, item.item);
        params.append(`amount_${index + 1}`, item.price);
        params.append(`quantity_${index + 1}`, 1);
    });

    window.location.href = `${paypalUrl}?${params.toString()}`;
});
