// slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const dotsContainer = document.querySelector(".slider-dots");

// Create navigation dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("slider-dot");
  if (i === currentSlide) {
    dot.classList.add("active");
  }
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateDots() {
  const dots = document.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function changeSlide(direction) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides[currentSlide].classList.add("active");
  updateDots();
}

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  updateDots();
}

// Auto slide change every 5 seconds
setInterval(() => changeSlide(1), 5000);

/* get products */

let getHomeProducts = async () => {
  await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      function getOneProductPerCategory(products) {
        const categoryMap = new Map();

        products.forEach((product) => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product);
          }
        });

        return Array.from(categoryMap.values());
      }

      const oneProductPerCategory = getOneProductPerCategory(products);

      // Get the container where the cards will go

      const displayCatCards = () => {
        if (oneProductPerCategory.length > 0) {
          let catCards = "";

          oneProductPerCategory.map((product) => {
            catCards += `
        <a href="category.html?catId=${
          product.category == "men's clothing"
            ? "mc"
            : product.category == "women's clothing"
            ? "wc"
            : product.category == "jewelery"
            ? "j"
            : product.category == "electronics"
            ? "e"
            : ""
        }" class="card">
          <img class="card__image" src="${product.image}" alt="${
              product.category
            }">
        <div class="card__content">
          <h3 class="card__title">${product.category}</h3>
          <p class="card__description">Lorem ipsum dolor sit amet</p>
        </div>
        </a>`;
          });

          return catCards;
        }
      };

      let cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = displayCatCards();
    })
    .catch((error) => console.error("Error fetching data:", error));
};

getHomeProducts();
