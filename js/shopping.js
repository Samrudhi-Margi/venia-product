document.addEventListener("DOMContentLoaded", async function () {
  const cartItemsContainer = document.getElementById("cart-items-list");

  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  const cart = [
    { productId: 1, quantity: 2 },
    { productId: 3, quantity: 1 },
    { productId: 5, quantity: 3 },
  ];

  const cartItems = cart.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  function displayCartItems(items) {
    items.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

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

      const increaseBtn = cartItemDiv.querySelector(".increase-quantity");
      const decreaseBtn = cartItemDiv.querySelector(".decrease-quantity");
      const quantityInput = cartItemDiv.querySelector("input[type='number']");

      increaseBtn.addEventListener("click", function () {
        item.quantity++;
        quantityInput.value = item.quantity; // Update the value in the input element
        updatePriceSummary();
      });

      decreaseBtn.addEventListener("click", function () {
        if (item.quantity > 1) {
          item.quantity--;
          quantityInput.value = item.quantity; // Update the value in the input element
          updatePriceSummary();
        }
      });

      quantityInput.addEventListener("input", function () {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
          updatePriceSummary();
        } else {
          quantityInput.value = item.quantity;
        }
      });
    });
  }

  displayCartItems(cartItems);

  function updatePriceSummary() {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1;
    const shipping = 5.0;
    const total = subtotal + tax + shipping;

    // Update the summary
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  updatePriceSummary();
});
