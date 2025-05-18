document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is loading...");

    // ✅ FIX: Swiper Slider Initialization
    if (typeof Swiper !== "undefined") {
        var swiper = new Swiper(".mySwiper", {
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
        console.log("Swiper initialized successfully.");
    } else {
        console.error("Swiper.js not found. Make sure it's loaded before script.js.");
    }

    // ✅ FIX: Dropdown Menu Functionality
    const menuButton = document.querySelector(".dropbtn");
    const menuContent = document.querySelector(".dropdown-content");
    const latestItem = document.querySelector(".has-submenu > a");
    const womanMenu = document.querySelector(".submenu .has-submenu > a");
    const submenu = document.querySelector(".submenu");
    const subDropdown = document.querySelector(".sub-dropdown");

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.stopPropagation();
            menuContent.classList.toggle("open");
        });
    }

    if (latestItem) {
        latestItem.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            submenu.classList.toggle("open");
        });
    }

    if (womanMenu) {
        womanMenu.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            subDropdown.classList.toggle("open");
        });
    }

    // ✅ FIX: Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
            menuContent.classList.remove("open");
            submenu.classList.remove("open");
            subDropdown.classList.remove("open");
        }
    });

    console.log("Dropdown functionality initialized.");
});
