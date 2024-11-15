// Function to fetch product data and display it
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const productContainer = document.getElementById("product-container");

    const limitedProducts = products.slice(0, 2);

    limitedProducts.forEach((product, index) => {
      if (index % 2 === 0) {
        const row = document.createElement("div");
        row.classList.add("row");

        const column1 = createProductColumn(product);

        row.appendChild(column1);

        productContainer.appendChild(row);
      } else {
        const row = productContainer.querySelector(".row:last-child");
        const column2 = createProductColumn(product);

        row.appendChild(column2);
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function createProductColumn(product) {
  const column = document.createElement("div");
  column.classList.add("product-box");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-box-info");
  productInfo.innerHTML = `
        <p><strong>${product.title}</strong> </p>
        <p><strong>Size:</strong> Medium</p> <!-- Custom size -->
        <p><strong>Color:</strong> Red</p>   <!-- Custom color -->
        <p><strong>Quantity:</strong> 1</p>   <!-- Custom quantity -->
    `;

  column.appendChild(img);
  column.appendChild(productInfo);

  return column;
}

window.onload = fetchProducts;
