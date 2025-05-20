document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded successfully!");

    if (typeof Swiper !== "undefined") {
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 10000, // ✅ Each video plays for 10 seconds before switching
                disableOnInteraction: false
            },
            effect: "fade",
            speed: 1000,
            slidesPerView: 1,
            allowTouchMove: false,
            on: {
                slideChange: function () {
                    console.log(`✅ Switching to slide ${swiper.activeIndex}`);

                    // ✅ Pause all videos first
                    const videos = document.querySelectorAll(".background-video");
                    videos.forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                    });

                    // ✅ Play only the active slide's video after a small delay
                    setTimeout(() => {
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
    console.log("✅ Menu script loaded successfully!");

    const menuButton = document.querySelector(".dropbtn");
    const menuContent = document.querySelector(".dropdown-content");
    const submenuItems = document.querySelectorAll(".has-submenu > a");

    if (menuButton && menuContent) {
        // ✅ Toggle main menu visibility on click
        menuButton.addEventListener("click", (event) => {
            event.stopPropagation();
            menuContent.classList.toggle("open");
        });

        // ✅ Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
                menuContent.classList.remove("open");
                document.querySelectorAll(".submenu, .sub-dropdown").forEach(sub => sub.classList.remove("open"));
            }
        });

        // ✅ Toggle only the clicked submenu instead of opening all
        submenuItems.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                // ✅ Close all other submenus before opening a new one
                document.querySelectorAll(".submenu, .sub-dropdown").forEach(sub => {
                    if (sub !== this.nextElementSibling) {
                        sub.classList.remove("open");
                    }
                });

                // ✅ Open the specific submenu
                const submenu = this.nextElementSibling;
                submenu.classList.toggle("open");
            });
        });

        console.log("✅ Dropdown functionality refined.");
    } else {
        console.error("⚠️ Dropdown elements not found. Check your HTML structure.");
    }
});
