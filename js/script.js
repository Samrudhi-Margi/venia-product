const header = document.querySelector(".header");

const sticky = header.offsetTop;

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

const navLinks = document.querySelectorAll(".nav-links li a"); // Select all <a> elements within <li>

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove 'active' class from all links
    navLinks.forEach((el) => el.classList.remove("active"));
    // Add 'active' class to the clicked link
    link.classList.add("active");
  });
});

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", function (event) {
    event.stopPropagation();

    const content = this.nextElementSibling;
    const arrow = this.querySelector(".arrow");

    const isActive = this.classList.contains("active");

    const parentAccordion = this.closest(".accordion");
    const siblingHeaders =
      parentAccordion.querySelectorAll(".accordion-header");

    siblingHeaders.forEach((otherHeader) => {
      const otherContent = otherHeader.nextElementSibling;
      const otherArrow = otherHeader.querySelector(".arrow");

      if (otherHeader !== this) {
        otherContent.style.display = "none";
        otherHeader.classList.remove("active");

        if (otherArrow) {
          otherArrow.innerHTML =
            '<img src="images/down-arrow.png" alt="arrow down" />';
        }
      }
    });

    if (isActive) {
      content.style.display = "none";
      this.classList.remove("active");

      // Reset the arrow if it exists
      if (arrow) {
        arrow.innerHTML =
          '<img src="images/down-arrow.png" alt="arrow down" />';
      }
    } else {
      content.style.display = "block";
      this.classList.add("active");

      if (arrow) {
        arrow.innerHTML = '<img src="images/up-arrow.png" alt="arrow up" />';
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

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
