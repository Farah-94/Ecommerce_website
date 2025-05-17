document.addEventListener("DOMContentLoaded", function () {
    const heroSlider = document.querySelector(".slider-container");
    const heroSlides = document.querySelectorAll(".hero-slide");
    let currentHeroSlide = 0;
    let slideInterval;

    function updateHeroSlider() {
        heroSlider.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
    }

    function nextHeroSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        updateHeroSlider();
    }

    // Auto-advance every 5 seconds
    slideInterval = setInterval(nextHeroSlide, 5000);

    // Pause on hover and resume when mouse leaves
    heroSlider.addEventListener("mouseenter", () => clearInterval(slideInterval));
    heroSlider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextHeroSlide, 5000);
    });
});




