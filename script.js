const header = document.querySelector('.header');

// Get the offset position of the header
const sticky = header.offsetTop;

// Add a scroll event listener
window.addEventListener('scroll', () => {
    if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});



//hamburger
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.navbar');

// hamburger.addEventListener('click', () => {
// //   navbar.classList.toggle('active');
//   navLinks.classList.toggle('active');
// });

const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('d-flex');
});


// slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsContainer = document.querySelector('.slider-dots');

// Create navigation dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === currentSlide) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function changeSlide(direction) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  updateDots();
}

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  updateDots();
}

// Auto slide change every 5 seconds
setInterval(() => changeSlide(1), 5000);

//card
// Fetch data from the API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    // Get unique categories from the product data
    const categories = [...new Set(products.map(product => product.category))];

    // Get the container where the cards will go
    const cardContainer = document.getElementById('card-container');
    
    // Loop over the categories to create a card for each
    categories.slice(0, 4).forEach(category => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Find the first product that belongs to the current category to use its image
      const product = products.find(p => p.category === category);

      // Insert product image, category, and description into the card
      card.innerHTML = `
        <img class="card__image" src="${product.image}" alt="${category}">
        <div class="card__content">
          <h3 class="card__title">${category}</h3>
          <p class="card__description">Lorem ipsum dolor sit amet</p>
        </div>
      `;

      // Append the card to the container
      cardContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

  