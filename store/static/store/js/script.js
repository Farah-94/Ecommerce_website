document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded successfully!");

    const mainVideo = document.getElementById("mainVideo");

    if (mainVideo) {
        mainVideo.play().then(() => {
            console.log("✅ Video playing successfully!");
        }).catch(error => {
            console.warn("⚠️ Autoplay blocked. Waiting for user interaction:", error);
        });

        // ✅ Allow manual playback when user clicks anywhere
        document.addEventListener("click", () => {
            mainVideo.play();
            console.log("✅ Video manually played by user.");
        });

        // ✅ Restart video when it ends
        mainVideo.addEventListener("ended", () => {
            mainVideo.currentTime = 0;
            mainVideo.play();
        });

        console.log("✅ Video playback logic initialized.");
    } else {
        console.error("⚠️ Video element not found!");
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

            // ✅ Enable hover effect for submenu expansion
            item.addEventListener("mouseenter", function () {
                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.add("open");
                }
            });

            item.addEventListener("mouseleave", function () {
                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.classList.remove("open");
                }
            });
        });

        console.log("✅ Dropdown functionality refined.");
    } else {
        console.error("⚠️ Dropdown elements not found. Check your HTML structure.");
    }
});
