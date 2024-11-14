// Function to fetch product data and display it
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Get the container where the products will be inserted
    const productContainer = document.getElementById("product-container");

    // Limit to two products only
    const limitedProducts = products.slice(0, 2);

    // Loop through the limited products and create HTML elements for each
    limitedProducts.forEach((product, index) => {
      // Create product row if necessary
      if (index % 2 === 0) {
        const row = document.createElement("div");
        row.classList.add("row");

        // Create product column
        const column1 = createProductColumn(product);

        // Add the column to the row
        row.appendChild(column1);

        // Add row to the container
        productContainer.appendChild(row);
      } else {
        // Add the second product to the same row
        const row = productContainer.querySelector(".row:last-child");
        const column2 = createProductColumn(product);

        // Add the column to the existing row
        row.appendChild(column2);
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to create a product column element
function createProductColumn(product) {
  const column = document.createElement("div");
  column.classList.add("product-box");

  // Create product image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  // Create product info section
  const productInfo = document.createElement("div");
  productInfo.classList.add("product-box-info");
  productInfo.innerHTML = `
        <p><strong>${product.title}</strong> </p>
        <p><strong>Size:</strong> Medium</p> <!-- Custom size -->
        <p><strong>Color:</strong> Red</p>   <!-- Custom color -->
        <p><strong>Quantity:</strong> 1</p>   <!-- Custom quantity -->
    `;

  // Append image and info to the column
  column.appendChild(img);
  column.appendChild(productInfo);

  return column;
}

// Call the fetchProducts function to load data when the page is loaded
window.onload = fetchProducts;
