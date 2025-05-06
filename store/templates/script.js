document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".product-slide img");

    slides.forEach(slide => {
        slide.addEventListener("click", function () {
            window.location.href = "product_detail.html"; // Redirect to details page
        });
    });
});