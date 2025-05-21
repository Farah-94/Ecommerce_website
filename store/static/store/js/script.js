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




document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the links and footer
  const aboutLink = document.getElementById('about-link');
  const contactLink = document.getElementById('contact-link');
  const footer = document.getElementById('info-footer');

  // Function to show the footer
  function showFooter() {
    footer.classList.add('active');
  }

  // Add click event listeners to About Us and Contact Us links
  if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior
      e.stopPropagation(); // Stop the event from bubbling up
      showFooter();
    });
  }

  if (contactLink) {
    contactLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      showFooter();
    });
  }

  // Hide the footer by removing the "active" class when clicking anywhere else outside the footer
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#info-footer')) {
      footer.classList.remove('active');
    }
  });

  // Prevent clicks inside the footer from closing it immediately
  footer.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});
