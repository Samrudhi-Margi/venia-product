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

//card
// Fetch data from the API

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
  // countries.forEach((country) => {
  //   const option = document.createElement("option");
  //   option.value = country; // Set the option's value to the country name
  //   option.textContent = country; // Set the option text to the country name
  //   countrySelect.appendChild(option); // Append the option to the dropdown
  // });
  const displayCountries = () => {
    let countryOption = "";
    countries.map((country) => {
      countryOption += `<option value="${country}">${country}</option>`;
    });

    return countryOption;
  };

  if (countrySelect) {
    countrySelect.innerHTML = displayCountries();
  }
});
