document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded successfully!");

    if (typeof Swiper !== "undefined") {
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 10000, // ✅ Ensures each video plays for 10 seconds
                disableOnInteraction: false
            },
            effect: "fade", // ✅ Smooth fade transition
            speed: 1000, // ✅ 1-second transition between slides
            slidesPerView: 1,
            allowTouchMove: false,
            on: {
                slideChange: function () {
                    console.log(`✅ Switching to slide ${swiper.activeIndex}`);

                    // ✅ Get all videos inside Swiper slides
                    const videos = document.querySelectorAll(".background-video");

                    // ✅ Pause all videos first and reset them
                    videos.forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                    });

                    // ✅ Play only the active slide's video
                    setTimeout(() => { // Small delay prevents autoplay glitch
                        const activeVideo = swiper.slides[swiper.activeIndex].querySelector("video");
                        if (activeVideo) {
                            activeVideo.play();
                            console.log("✅ Playing video:", activeVideo.src);
                        }
                    }, 500);
                }
            }
        });

        console.log("✅ Swiper initialized successfully.");
    } else {
        console.error("⚠️ Swiper.js not found. Ensure it's properly loaded.");
    }
});






    document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded successfully!");

    const menuButton = document.querySelector(".dropbtn");
    const menuContent = document.querySelector(".dropdown-content");
    const submenus = document.querySelectorAll(".has-submenu > a");

    if (menuButton && menuContent) {
        menuButton.addEventListener("click", (event) => {
            event.stopPropagation();
            menuContent.classList.toggle("open");
        });

        // ✅ Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
                menuContent.classList.remove("open");
                document.querySelectorAll(".submenu, .sub-dropdown").forEach(sub => sub.classList.remove("open"));
            }
        });

        // ✅ Handle submenu toggle on click
        submenus.forEach(item => {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                const submenu = item.nextElementSibling;

                if (submenu) {
                    submenu.classList.toggle("open");
                }
            });
        });

        // ✅ Handle submenu open on hover
        submenus.forEach(item => {
            item.addEventListener("mouseenter", () => {
                const submenu = item.nextElementSibling;
                if (submenu) {
                    submenu.classList.add("open");
                }
            });

            item.addEventListener("mouseleave", () => {
                const submenu = item.nextElementSibling;
                if (submenu) {
                    submenu.classList.remove("open");
                }
            });
        });

        console.log("✅ Dropdown functionality initialized.");
    } else {
        console.error("⚠️ Dropdown elements not found. Check your HTML structure.");
    }
});
