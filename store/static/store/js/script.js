console.log("javascript is loading")


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

// ----------------
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    // Toggle main dropdown menu
    if (menuButton && dropdownContent) {
        menuButton.addEventListener("click", function () {
            dropdownContent.classList.toggle("open");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!menuButton.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove("open");
            }
        });
    }



    // Toggle submenus when clicking on parent categories
    const submenuTriggers = document.querySelectorAll(".has-submenu > a");

    submenuTriggers.forEach(trigger => {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle("open");

            // Close other submenus
            document.querySelectorAll(".has-submenu").forEach(item => {
                if (item !== parent) item.classList.remove("open");
            });
        });
    });
});

// -----------------