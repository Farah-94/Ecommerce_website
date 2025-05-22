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


// ---------------------menu----------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");

    // Toggle dropdown visibility when menu button is clicked
    menuBtn.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent clicks inside from closing
        dropdownMenu.classList.toggle("active");
    });

    // Close dropdown when clicking anywhere else on the page
    document.addEventListener("click", function(event) {
        if (!dropdownMenu.contains(event.target) && event.target !== menuBtn) {
            dropdownMenu.classList.remove("active");
        }
    });
});

//---------------------footer----------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const footer = document.getElementById('info-footer');
  const aboutLink = document.getElementById('about-link');
  const contactLink = document.getElementById('contact-link');

  // Ensure footer starts hidden on page load
  footer.style.bottom = "-300px"; // Directly setting this prevents flickering

  function showFooter() {
    footer.style.bottom = "0"; // Moves footer up
  }

  function hideFooter() {
    footer.style.bottom = "-300px"; // Moves footer down
  }

  // Ensure About Us and Contact Us trigger the footer display
  [aboutLink, contactLink].forEach(link => {
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showFooter();
      });
    }
  });

  // Hide footer when clicking anywhere else on the page
  document.addEventListener('click', function(e) {
    if (!footer.contains(e.target)) {
      hideFooter();
    }
  });

  // Prevent clicks inside the footer from closing it
  footer.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

