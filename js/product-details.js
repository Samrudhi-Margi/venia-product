document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products/1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const productName = document.getElementById("productName");
      productName.textContent = data.title || "Product Name";
      console.log("Product Name: ", productName.textContent);

      const productDescription = document.getElementById("productDescription");
      productDescription.textContent =
        data.description || "Product description goes here...";

      const productPrice = document.getElementById("productPrice");
      productPrice.textContent = `$${data.price.toFixed(2)}`;
      console.log("Product Price: ", productPrice.textContent);

      const productRating = document.getElementById("productRating");
      productRating.textContent = data.rating
        ? `Rating: ${data.rating.rate} / 5`
        : "No rating available";
      console.log("Product Rating: ", productRating.textContent);

      const mainImage = document.getElementById("mainImage");
      mainImage.src = data.image;
      console.log("Main Image: ", mainImage.src);

      const thumbnailGallery = document.querySelector(".thumbnail-gallery");
      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          const thumbnail = document.createElement("img");
          thumbnail.classList.add("thumbnail");
          thumbnail.src = image;
          thumbnail.setAttribute("data-image", image);
          thumbnail.alt = "Thumbnail";
          thumbnailGallery.appendChild(thumbnail);

          console.log("Thumbnail Image: ", image);
        });
      }
    })
    .catch((err) => console.error("Error fetching product data:", err));
});
