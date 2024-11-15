let params = new URLSearchParams(document.location.search);
var catId = params.get("catId");

const catObj = {
  mc: "men's clothing",
  wc: "women's clothing",
  j: "jewelery",
  e: "electronics",
};

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 10;

// Fetch products from the fake API

const getProducts = async (id) => {
  console.log(id);

  fetch(`https://fakestoreapi.com/products/category/${catObj[id]}`)
    .then((response) => response.json())
    .then((data) => {
      // Adding mock availability data
      data = data.map((product) => {
        product.available = Math.random() < 0.7; // 70% chance of being in stock
        return product;
      });

      allProducts = data;
      filteredProducts = data;
      // loadCategories();
      displayProducts();
      updateResultCount();
    })
    .catch((error) => console.error("Error fetching products:", error));
};

getProducts(catId);

const getCategory = () => {
  fetch(`https://fakestoreapi.com/products/categories`)
    .then((response) => response.json())
    .then((categoriesArr) => {
      console.log(categoriesArr);

      // const categoryRadios = ;
      let categoryOptions = "";
      if (categoriesArr.length > 0) {
        categoriesArr.map((category) => {
          categoryOptions += `<div class="category-filter">
          <input type="radio" name="category" id="${category}" value="${category}"></input>
          <label for="${category}">${category}</label>
          </div>`;
        });
      }

      document.getElementById("categoryFilter").innerHTML = categoryOptions;
    })
    .catch((error) => console.error("Error fetching products:", error));
};

getCategory();

// Load categories for filter

// Display products with pagination
function displayProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = currentPage * productsPerPage;
  const productsToDisplay = filteredProducts.slice(start, end);
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}" />
            </div>
            <div class="product-info">
                <h4>${product.title}</h4>
                <p>$${product.price}</p>
                <p>Availability: ${
                  product.available ? "In Stock" : "Out of Stock"
                }</p>
            </div>
        `;
    productContainer.appendChild(productElement);
  });

  updatePagination();
}

function dynamicMenuLinks() {
  let menuLinks = document.getElementById("navLinks");
  menuLinks.innerHTML = `<li><a href="index.html" class="${
    catId == "" ? "active" : ""
  }">Home</a></li>
  <li><a href="category.html?catId=wc" class="${
    catId == "wc" ? "active" : ""
  }">Women</a></li>
  <li><a href="category.html?catId=mc" class="${
    catId == "mc" ? "active" : ""
  }">Men</a></li>
  <li><a href="category.html?catId=e" class="${
    catId == "e" ? "active" : ""
  }">Electronics</a></li>
  <li><a href="category.html?catId=j" class="${
    catId == "j" ? "active" : ""
  }">Jewellery</a></li>`;
}

dynamicMenuLinks();

// Update result count
function updateResultCount() {
  const resultCount = document.getElementById("result-count");
  resultCount.textContent = `Showing ${filteredProducts.length} results`;
}

// Update pagination buttons
function updatePagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const currentPageElem = document.getElementById("current-page");

  // Disable buttons if on first or last page
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Update page number
  currentPageElem.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Filter by category

let catFilterWrapper = document.getElementById("categoryFilter");

let radioElem = catFilterWrapper.querySelector("input[type='radio']");
radioElem.addEventListener("click", function () {
  alert("wwe");
});

// let filterRadio = document.querySelector('input[name="category"]');
// filterRadio.addEventListener("click", (e) => {
//   console.log(e.target);

//   const selectedCategory = e.target.value;

//   console.log(selectedCategory);

//   // currentPage = 1;
//   // displayProducts();
//   // updateResultCount();
// });

// Filter by price
document.getElementById("price-filter").addEventListener("input", (e) => {
  const maxPrice = e.target.value;
  document.getElementById("price-range").textContent = `Price: 0 - ${maxPrice}`;
  filteredProducts = allProducts.filter((product) => product.price <= maxPrice);
  currentPage = 1;
  displayProducts();
  updateResultCount();
});

// Filter by availability
document
  .getElementById("availability-filter")
  .addEventListener("change", (e) => {
    const availability = e.target.value;
    if (availability === "true") {
      filteredProducts = allProducts.filter((product) => product.available);
    } else if (availability === "false") {
      filteredProducts = allProducts.filter((product) => !product.available);
    } else {
      filteredProducts = allProducts;
    }
    currentPage = 1;
    displayProducts();
    updateResultCount();
  });

// Sort by price
document.getElementById("sort-price").addEventListener("change", (e) => {
  const sortOrder = e.target.value;
  filteredProducts.sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });
  displayProducts();
});

// Pagination - previous page
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

// Pagination - next page
document.getElementById("next-btn").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
  }
});
