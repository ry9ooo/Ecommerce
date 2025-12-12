$('.top-bar-close').on('click', function () {
    $('.top-bar').slideUp();
});

document.addEventListener('DOMContentLoaded', () => {


    const CURRENT_PAGE = window.location.pathname;
    const headerButtons = document.querySelectorAll('.header-icons button');
    if (headerButtons.length > 0) {

        headerButtons[0].addEventListener('click', () => {
            window.location.href = 'Cart.html';
        });
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';

        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // LISTING

    if (CURRENT_PAGE.includes('index.html') || CURRENT_PAGE.endsWith('/')) {
        console.log("Active Page: Listing");

        const productCards = document.querySelectorAll('.card');
        productCards.forEach((card) => {
            card.addEventListener('click', () => {
                window.location.href = 'product.html';
            });
        });
    }

    // PRODUCT

    else if (CURRENT_PAGE.includes('product.html')) {
        console.log("Active Page: Product");

        const addToCartBtn = document.querySelector('.btn-add-cart');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                localStorage.setItem('cart_has_items', 'true');
                alert("Successfully added Item to cart!");
            });
        }
    }

    // CART

    else if (CURRENT_PAGE.includes('Cart.html')) {
        console.log("Active Page: Cart");

        const checkoutBtn = document.querySelector('.order-summary button') || document.querySelector('.checkout-btn');

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                window.location.href = 'checkout.html';
            });
        }
    }

    // CHECKOUT

    else if (CURRENT_PAGE.includes('checkout.html')) {
        console.log("Active Page: Checkout");

        const placeOrderBtn = document.querySelector('.place-order-btn');

        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const inputs = document.querySelectorAll('.address-form input');

                const shippingInfo = {
                    address: inputs[0]?.value,
                    city: inputs[1]?.value,
                    state: inputs[2]?.value,
                    zip: inputs[3]?.value,
                    country: inputs[4]?.value,
                    email: inputs[5]?.value,
                    name: inputs[6]?.value
                };


                if (Object.values(shippingInfo).some(val => val === "" || val === undefined)) {
                    alert("Please fill in all fields before placing the order.");
                    return;
                }


                localStorage.setItem('user_shipping_info', JSON.stringify(shippingInfo));

                placeOrderBtn.innerText = "Processing...";

                setTimeout(() => {
                    alert("Order Placed Successfully! Shipping information saved.");
                    localStorage.removeItem('cart_has_items');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }
    }
});