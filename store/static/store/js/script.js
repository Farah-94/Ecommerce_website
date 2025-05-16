console.log("script.js is loading!");

document.addEventListener("DOMContentLoaded", function () {
    let sliderContainer = document.querySelector(".slider-container");
    let slides = document.querySelectorAll(".product-slide");

    console.log("Slider container:", sliderContainer);
    console.log("Slides:", slides.length);

    if (!sliderContainer || slides.length === 0) {
        console.error("Slider elements not found!");
        return;
    }

    let currentSlide = 0;
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    setInterval(nextSlide, 5000);
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
    // Check if the click is outside the dropdown or submenu
    if (!event.target.closest(".dropdown") && !event.target.closest(".has-submenu")) {
        const dropdownContent = document.querySelector(".dropdown-content");
        const menus = document.querySelectorAll(".submenu, .sub-dropdown");

        // Hide dropdown content if it exists
        dropdownContent?.classList.remove("show");

        // Hide all submenus safely
        menus.forEach(menu => menu?.style.display = "none");
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