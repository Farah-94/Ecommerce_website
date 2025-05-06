console.log("script.js is loading!");

document.addEventListener("DOMContentLoaded", function () {
    let sliderContainer = document.querySelector(".slider-container");
    let slides = document.querySelectorAll(".product-slide");
    let totalSlides = slides.length;
    let currentSlide = 0;

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0; // Loop back to first slide
        }
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(nextSlide, 5000); // Moves the images every 5 seconds
});