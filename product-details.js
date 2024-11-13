document.addEventListener("DOMContentLoaded", function () {
  // Fetch product data from Fake Store API
  fetch("https://fakestoreapi.com/products/1") // Fetch data for product with ID 1
    .then((response) => response.json())
    .then((data) => {
      // Log the entire response for debugging purposes
      console.log(data);

      // Set product name, description, price
      document.getElementById("productName").textContent =
        data.title || "Product Name"; // Fallback to default if not found
      document.getElementById("productDescription").textContent =
        data.description || "Product description goes here..."; // Fallback to default
      document.getElementById(
        "productPrice"
      ).textContent = `$${data.price.toFixed(2)}`;

      // Set product image
      const mainImage = document.getElementById("mainImage");
      mainImage.src = data.image;

      // Set product thumbnails
      const thumbnailGallery = document.getElementById("thumbnailGallery");
      data.images.forEach((image) => {
        const thumbnail = document.createElement("img");
        thumbnail.classList.add("thumbnail");
        thumbnail.src = image;
        thumbnail.setAttribute("data-image", image);
        thumbnail.alt = "Thumbnail";
        thumbnailGallery.appendChild(thumbnail);
      });

      // Handle Quantity Change
      let quantity = 1;
      document.getElementById("quantity").textContent = quantity;

      document
        .getElementById("increaseQuantity")
        .addEventListener("click", () => {
          quantity++;
          document.getElementById("quantity").textContent = quantity;
        });

      document
        .getElementById("decreaseQuantity")
        .addEventListener("click", () => {
          if (quantity > 1) {
            quantity--;
            document.getElementById("quantity").textContent = quantity;
          }
        });

      // Handle Add to Cart Button
      document.getElementById("addToCart").addEventListener("click", () => {
        alert(`Added ${quantity} of ${data.title} to the cart!`);
      });

      // Handle Save and Share Button
      document.getElementById("saveButton").addEventListener("click", () => {
        alert(`Saved ${data.title}!`);
      });

      document.getElementById("shareButton").addEventListener("click", () => {
        alert(`Sharing ${data.title}...`);
      });

      // Create product rating stars dynamically
      const rating = data.rating && data.rating.rate ? data.rating.rate : 0; // Default to 0 if no rating data
      const productRating = document.getElementById("productRating");

      if (productRating) {
        // Ensure that the rating is correctly displayed
        productRating.innerHTML = ""; // Clear any previous stars
        for (let i = 0; i < 5; i++) {
          const star = document.createElement("span");
          star.classList.add("star");
          if (i < rating) {
            star.innerHTML = "★"; // Filled star
          } else {
            star.innerHTML = "☆"; // Empty star
          }
          productRating.appendChild(star);
        }
      } else {
        console.error("No productRating element found.");
      }

      // Read More functionality for description
      const descriptionElement = document.getElementById("productDescription");
      const readMoreBtn = document.getElementById("readMoreBtn");

      if (descriptionElement && readMoreBtn) {
        // Initially truncate the description
        const truncatedText =
          data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description;
        descriptionElement.textContent = truncatedText;

        // When Read More is clicked, expand the description
        readMoreBtn.addEventListener("click", () => {
          if (descriptionElement.textContent === truncatedText) {
            descriptionElement.textContent = data.description; // Show full description
            readMoreBtn.textContent = "Read Less"; // Change button text
          } else {
            descriptionElement.textContent = truncatedText; // Show truncated description
            readMoreBtn.textContent = "Read More"; // Change button text back
          }
        });
      }
    })
    .catch((err) => console.error("Error fetching product data:", err));
});
