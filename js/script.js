const header = document.querySelector(".header");

// Get the offset position of the header
const sticky = header.offsetTop;

// Add a scroll event listener
window.addEventListener("scroll", () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

//hamburger
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.navbar');

// hamburger.addEventListener('click', () => {
// //   navbar.classList.toggle('active');
//   navLinks.classList.toggle('active');
// });

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("d-flex");
});

// active memu

const navLinks = document.querySelectorAll(".nav-links li a"); // Select all <a> elements within <li>

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove 'active' class from all links
    navLinks.forEach((el) => el.classList.remove("active"));
    // Add 'active' class to the clicked link
    link.classList.add("active");
  });
});

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

//card
// Fetch data from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    // Get unique categories from the product data
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    // Get the container where the cards will go
    const cardContainer = document.getElementById("card-container");

    // Loop over the categories to create a card for each
    categories.slice(0, 4).forEach((category) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Find the first product that belongs to the current category to use its image
      const product = products.find((p) => p.category === category);

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
  .catch((error) => console.error("Error fetching data:", error));

// Get all the accordion headers
const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", function (event) {
    // Prevent propagation to parent accordion
    event.stopPropagation();

    const content = this.nextElementSibling; // Content comes after the header
    const arrow = this.querySelector(".arrow"); // Try to find the arrow in the header

    // Check if the clicked header is already active
    const isActive = this.classList.contains("active");

    // Close only the sibling headers within the same parent accordion
    const parentAccordion = this.closest(".accordion");
    const siblingHeaders =
      parentAccordion.querySelectorAll(".accordion-header");

    siblingHeaders.forEach((otherHeader) => {
      const otherContent = otherHeader.nextElementSibling;
      const otherArrow = otherHeader.querySelector(".arrow");

      if (otherHeader !== this) {
        otherContent.style.display = "none";
        otherHeader.classList.remove("active");

        // Reset the arrow if it exists
        if (otherArrow) {
          otherArrow.innerHTML =
            '<img src="images/down-arrow.png" alt="arrow down" />'; // Reset arrow
        }
      }
    });

    // Toggle the clicked section
    if (isActive) {
      content.style.display = "none"; // If already active, close the content
      this.classList.remove("active"); // Remove active class

      // Reset the arrow if it exists
      if (arrow) {
        arrow.innerHTML =
          '<img src="images/down-arrow.png" alt="arrow down" />'; // Reset arrow
      }
    } else {
      content.style.display = "block"; // Show the content
      this.classList.add("active"); // Add active class

      // Change the arrow if it exists
      if (arrow) {
        arrow.innerHTML = '<img src="images/up-arrow.png" alt="arrow up" />'; // Change arrow to up
      }
    }
  });
});

//form
document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  // Static list of countries
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Mexico",
    "Brazil",
    "China",
    "Japan",
    "South Korea",
    "South Africa",
    "Russia",
    "Argentina",
    "Netherlands",
    "Belgium",
    "Sweden",
  ];

  // Loop through the countries array and create option elements for each country
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country; // Set the option's value to the country name
    option.textContent = country; // Set the option text to the country name
    countrySelect.appendChild(option); // Append the option to the dropdown
  });

  // Static list of states (for example, US states) for when the country is selected
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // When a country is selected, populate the state dropdown
  countrySelect.addEventListener("change", function () {
    const selectedCountry = countrySelect.value;

    // Clear the state dropdown
    stateSelect.innerHTML =
      '<option value="" disabled selected>Select a state</option>';

    // If the selected country is 'United States', populate with US states
    if (selectedCountry === "United States") {
      usStates.forEach((state) => {
        const option = document.createElement("option");
        option.value = state; // Set the option's value to the state name
        option.textContent = state; // Set the option text to the state name
        stateSelect.appendChild(option); // Append the option to the dropdown
      });
    } else {
      // If any other country is selected, you can choose to populate with default options or leave empty
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No states available";
      stateSelect.appendChild(option);
    }
  });
});
