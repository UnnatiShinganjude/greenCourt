$(document).ready(function() {
    // Cache jQuery selectors
    const $menuCartElement = $('.menu-cart');
    const $cartItemsElement = $('.cart-list');
    const $cartElement = $('.cart');
    const $mainElement = $('.main');
    
    // Initializing empty cart
    let cart = [];

    // Function to add product to cart
    function addToCart(productElement) {
        const $productElement = $(productElement);
        const productId = $productElement.data('product');
        const productName = $productElement.find('.product-title').text();
        const productImage = $productElement.find('.product-img').attr('src');
        const productPrice = parseFloat($productElement.find('.product-price').text().replace('₹', ''));

        let existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1; // Increment if item exists
        } else {
            const newItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            // Add new item to cart
            cart.push(newItem);
        }
        
        // Update cart count
        updateCartCount();
        // Re-render cart items
        renderCartItems();
    }

    // Function to update cart count shown in menu
    function updateCartCount() {
        const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
        $menuCartElement.find('.cart-count').text(itemCount);
    }

    // Function to render the items in the cart
    function renderCartItems() {
        // Clear cart items container
        $cartItemsElement.empty();
        if (cart.length === 0) {
            // Display empty cart image
            $cartItemsElement.html(`
                <div class="cart-empty">
                     <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                </svg>
                     <p>Your cart is currently empty. Start shopping now!</p>
                </div>
            `);
        } else {
            // Create cart items HTML
            let cartItemsHtml = '';
            $.each(cart, function(index, item) {
                cartItemsHtml += `
                    <div class="cart-item">
                        <img class="cart-item-img" src="${item.image}" alt="${item.name}">   
                        <div class="cart-item-desc">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-quantity">
                                <button class="change-quantity" data-id="${item.id}" data-action="decrement">-</button>
                                ${item.quantity}
                                <button class="change-quantity" data-id="${item.id}" data-action="increment">+</button>
                            </div>
                        </div>
                        <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="cart-item-remove" data-id="${item.id}"><i class="fa solid fa-trash"></i></button> 
                    </div>
                `;
            });
            $cartItemsElement.append(cartItemsHtml);
        }
        // Update the cart action/order summary
        updateOrderSummary();
    }

    // Function to update order summary (total)
    function updateOrderSummary() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        $('#final-price .cart-amount-value').text(`₹${total.toFixed(2)}`);
    }

    // Event handler for adding product to cart
    $('.add-to-cart').on('click', function() {
        const productElement = $(this).closest('.product');
        addToCart(productElement);
    });

     // Event listener for changing quantity
     $cartItemsElement.on('click', '.change-quantity', function() {
          const productId = $(this).data('id');
          const action = $(this).data('action');
           let existingItem = cart.find(item => item.id === productId);
           if (existingItem) {
               if (action === 'increment') {
                existingItem.quantity += 1;
              } else if (action === 'decrement' && existingItem.quantity > 1) {
                 existingItem.quantity -= 1;
              }
          }
    
            // Update cart count and re-render items
            updateCartCount();
            renderCartItems();
        });

     // Event listener for removing item
    $cartItemsElement.on('click', '.cart-item-remove', function() {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId); // Remove item from cart
        updateCartCount();
        renderCartItems();
    });
    
   //event listener for toggling cart
    $menuCartElement.on('click',function() {
        $cartElement.toggleClass('collapsed');
        $mainElement.toggleClass('expanded',$cartElement.hasClass('collapsed'));
    });

    renderCartItems();//initial cart items

    // Get the button
    const scrollUpBtn = $("#scrollUpBtn");

    // Show the button when scrolling down
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            scrollUpBtn.fadeIn();
        } else {
            scrollUpBtn.fadeOut();
        }
    });

    // Scroll to the top when the button is clicked
    scrollUpBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
});