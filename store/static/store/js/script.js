document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ JavaScript loaded successfully!");

  // 🎥 Background video logic
  const mainVideo = document.getElementById("backgroundVideo");
  if (mainVideo) {
    mainVideo.play()
      .then(() => console.log("✅ Video playing successfully!"))
      .catch(error => console.warn("⚠️ Autoplay blocked. Waiting for user interaction:", error));

    document.addEventListener("click", () => {
      mainVideo.play();
      console.log("✅ Video manually played by user.");
    });

    mainVideo.addEventListener("ended", () => {
      mainVideo.currentTime = 0;
      mainVideo.play();
    });

    console.log("✅ Video playback logic initialized.");
  } else {
    console.error("⚠️ Video element not found!");
  }

  // --------------------- Menu logic ----------------------------------
  const menuBtn = document.getElementById("menu-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (menuBtn && dropdownMenu) {
    // 🔽 Toggle main menu visibility
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });

    // 🔁 Submenu toggle on mobile/touch devices
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = this.parentElement;
        const isOpen = parent.classList.contains('open');

        // Close other open submenus at this level
        const openItems = parent.parentElement.querySelectorAll('.has-submenu.open');
        openItems.forEach(item => {
          if (item !== parent) item.classList.remove('open');
        });

        parent.classList.toggle('open', !isOpen);
      });
    });

    // 🔒 Close both menu and submenus if clicking outside
    document.addEventListener("click", function (e) {
      const isMenuClick = dropdownMenu.contains(e.target) || e.target === menuBtn;
      const isSubmenuClick = e.target.classList.contains("submenu-toggle");

      if (!isMenuClick) {
        dropdownMenu.classList.remove("active");
      }
      if (!isSubmenuClick) {
        document.querySelectorAll('.has-submenu.open').forEach(item =>
          item.classList.remove('open')
        );
      }
    });
  }

  // --------------------- Footer logic ----------------------------------
  const footer = document.getElementById('info-footer');
  const aboutLink = document.getElementById('about-link');
  const contactLink = document.getElementById('contact-link');

  if (footer) {
    function showFooter() {
      footer.classList.add('active');
    }
    function hideFooter() {
      footer.classList.remove('active');
    }

    [aboutLink, contactLink].forEach(link => {
      if (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          showFooter();
        });
      }
    });

    ['click', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, function (e) {
        if (!footer.contains(e.target) &&
            e.target !== aboutLink &&
            e.target !== contactLink) {
          hideFooter();
        }
      });
    });

    footer.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
});
