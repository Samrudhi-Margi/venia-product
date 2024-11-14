document.addEventListener("DOMContentLoaded", async function () {
  const cartItemsContainer = document.getElementById("cart-items-list");

  // Fetch products from the Fake Store API
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  // Sample products added to the cart (for demonstration purposes)
  const cart = [
    { productId: 1, quantity: 2 },
    { productId: 3, quantity: 1 },
    { productId: 5, quantity: 3 },
  ];

  // Fetch product details and populate the cart
  const cartItems = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  // Function to display cart items
  function displayCartItems(items) {
    items.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      // Adding image, name, size, color, and quantity
      cartItemDiv.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <p class="item-name">${item.title}</p>
                <p class="item-color">Color: ${item.color || "N/A"}</p>
                <p class="item-size">Size: ${item.size || "N/A"}</p>
                <p class="item-price">
                $${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
             <div class="quantity-control">
                    <button class="decrease-quantity">-</button>
                    <span class="item-quantity"><input type="number" value="${
                      item.quantity
                    }" min="1"></span>
                    <button class="increase-quantity">+</button>
                </div>
            <div class="item-actions">
                <button class="edit-item"><img src="images/edit-icon.png" alt="arrow down" />Edit</button>
                <button class="remove-item"><img src="images/delete-icon.png" alt="arrow down" />Remove</button>
                <button class="save-item"><img src="images/heart-icon.png" alt="arrow down" />Save for later</button>
            </div>
        `;
      cartItemsContainer.appendChild(cartItemDiv);

      // Add event listeners for quantity buttons
      const increaseBtn = cartItemDiv.querySelector(".increase-quantity");
      const decreaseBtn = cartItemDiv.querySelector(".decrease-quantity");
      const quantityInput = cartItemDiv.querySelector("input[type='number']");

      increaseBtn.addEventListener("click", function () {
        item.quantity++;
        quantitySpan.textContent = item.quantity;
        updatePriceSummary();
      });

      decreaseBtn.addEventListener("click", function () {
        if (item.quantity > 1) {
          item.quantity--;
          quantitySpan.textContent = item.quantity;
          updatePriceSummary();
        }
      });
      // Update the quantity when the input field value is manually changed
      quantityInput.addEventListener("input", function () {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
          updatePriceSummary();
        } else {
          quantityInput.value = item.quantity; // Revert to current quantity if invalid input
        }
      });
    });
  }

  // Display cart items
  displayCartItems(cartItems);

  // Price Summary calculation
  function updatePriceSummary() {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // Assume 10% tax
    const shipping = 5.0; // Flat shipping cost
    const total = subtotal + tax + shipping;

    // Update the summary
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  // Initial price update
  updatePriceSummary();
});
