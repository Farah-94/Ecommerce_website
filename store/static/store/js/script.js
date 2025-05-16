console.log("script.js is loading!");

// Wait for the DOM to load before running scripts
document.addEventListener("DOMContentLoaded", function () {
    // **Index Page Slider**
    const homeSlider = document.querySelector(".slider-container");
    const homeSlides = document.querySelectorAll(".product-slide");

    console.log("Home Slider container:", homeSlider);
    console.log("Home Slides count:", homeSlides.length);

    if (homeSlider && homeSlides.length > 0) {
        let currentHomeSlide = 0;

        function nextHomeSlide() {
            currentHomeSlide = (currentHomeSlide + 1) % homeSlides.length;
            homeSlider.style.transform = `translateX(-${currentHomeSlide * 100}%)`;
        }

        setInterval(nextHomeSlide, 5000);
    }

    // **Buy Product Page Slider**
    const productSlider = document.querySelector(".product-slides");
    const productSlides = productSlider?.querySelectorAll(".slide");

    console.log("Product Slider container:", productSlider);
    console.log("Product Slides count:", productSlides?.length);

    if (productSlider && productSlides.length > 0) {
        let currentProductSlide = 0;

        function showProductSlide(index) {
            productSlides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        window.moveSlide = function (n) {
            currentProductSlide = (currentProductSlide + n + productSlides.length) % productSlides.length;
            showProductSlide(currentProductSlide);
        };

        if (productSlides.length > 1) {
            setInterval(() => moveSlide(1), 5000);
        }

        showProductSlide(currentProductSlide);
    }

    // **Dropdown Menu Toggle**
    const dropBtn = document.querySelector(".dropbtn");
    const dropContent = document.querySelector(".dropdown-content");

    if (dropBtn && dropContent) {
        dropBtn.addEventListener("click", function () {
            dropContent.classList.toggle("show");
        });
    }

    // **Submenu Toggle with Improved Behavior**
    const submenus = document.querySelectorAll(".has-submenu > a");

    submenus.forEach(submenu => {
        submenu.addEventListener("click", function (event) {
            event.preventDefault();

            const nextSubmenu = this.nextElementSibling;

            document.querySelectorAll(".submenu, .sub-dropdown").forEach(menu => {
                if (menu !== nextSubmenu) {
                    menu.style.display = "none";
                }
            });

            nextSubmenu.style.display = nextSubmenu.style.display === "block" ? "none" : "block";
        });
    });

    // **Close dropdowns if clicking outside**
    window.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown") && !event.target.closest(".has-submenu")) {
            dropContent?.classList.remove("show");
            document.querySelectorAll(".submenu, .sub-dropdown").forEach(menu => {
                menu.style.display = "none";
            });
        }
    });
});