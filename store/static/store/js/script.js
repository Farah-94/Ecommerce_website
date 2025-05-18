document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded successfully!");

    // ✅ Fix: Ensure Swiper Slider is initialized only if available
    if (typeof Swiper !== "undefined") {
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 10000, // 10-second transitions
                disableOnInteraction: false
            },
            effect: "fade", // Smooth fade effect
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
        console.log("✅ Swiper initialized successfully.");
    } else {
        console.error("⚠️ Swiper.js not found. Ensure it's properly loaded before `script.js`.");
    }

    // ✅ Dropdown Menu Functionality
    const menuButton = document.querySelector(".dropbtn");
    const menuContent = document.querySelector(".dropdown-content");

    if (menuButton && menuContent) {
        menuButton.addEventListener("click", (event) => {
            event.stopPropagation();
            menuContent.classList.toggle("open");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
                menuContent.classList.remove("open");
                document.querySelectorAll(".submenu, .sub-dropdown").forEach(sub => sub.classList.remove("open"));
            }
        });

        // Handle submenus efficiently
        document.querySelectorAll(".has-submenu > a").forEach(item => {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                const submenu = item.nextElementSibling;
                submenu.classList.toggle("open");
            });
        });

        console.log("✅ Dropdown functionality initialized.");
    } else {
        console.error("⚠️ Dropdown elements not found. Check your HTML structure.");
    }
});