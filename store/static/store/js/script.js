console.log("script.js is loading!");

// Product Slider Logic
document.addEventListener("DOMContentLoaded", function () {
    let sliderContainer = document.querySelector(".slider-container");
    let slides = document.querySelectorAll(".product-slide");
    let totalSlides = slides.length;
    let currentSlide = 0;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(nextSlide, 5000); // Moves the images every 5 seconds
});

// Dropdown Menu Toggle
document.querySelector(".dropbtn").addEventListener("click", function () {
    document.querySelector(".dropdown-content").classList.toggle("show");
});

// Submenu Toggle with Better Behavior
document.addEventListener("DOMContentLoaded", function () {
    const submenus = document.querySelectorAll(".has-submenu > a");

    submenus.forEach(submenu => {
        submenu.addEventListener("click", function (event) {
            event.preventDefault();

            const nextSubmenu = this.nextElementSibling;

            // Close all other submenus before opening the clicked one
            document.querySelectorAll(".submenu, .sub-dropdown").forEach(menu => {
                if (menu !== nextSubmenu) {
                    menu.style.display = "none";
                }
            });

            // Toggle the clicked submenu
            nextSubmenu.style.display = nextSubmenu.style.display === "block" ? "none" : "block";
        });
    });
});

// Close dropdowns if clicking outside
window.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown") && !event.target.closest(".has-submenu")) {
        const dropdownContent = document.querySelector(".dropdown-content");
        const menus = document.querySelectorAll(".submenu, .sub-dropdown");

        if (dropdownContent) {
            dropdownContent.classList.remove("show");
        }

        menus.forEach(menu => {
            if (menu) {
                menu.style.display = "none";
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.product-slide');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    window.moveSlide = function(n) {
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-rotate every 5 seconds if multiple images
    if (slides.length > 1) {
        setInterval(() => moveSlide(1), 5000);
    }
});