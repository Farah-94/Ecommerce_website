// static/store/js/script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded.");

  // — Background video — unchanged —
  const mainVideo = document.getElementById("backgroundVideo");
  if (mainVideo) {
    mainVideo.play().catch(() => {});
    document.addEventListener("click", () => mainVideo.play());
    mainVideo.addEventListener("ended", () => {
      mainVideo.currentTime = 0;
      mainVideo.play();
    });
  }

  // — Menu & Submenus —
  const menuBtn      = document.getElementById("menu-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (menuBtn && dropdownMenu) {
    menuBtn.setAttribute("aria-expanded", "false");

    // Toggle main dropdown
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);
    });

    // Only look for toggles inside the dropdown
    const submenuToggles = dropdownMenu.querySelectorAll(".submenu-toggle");
    submenuToggles.forEach(link => {
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();

        const li       = link.parentElement;
        const willOpen = !li.classList.contains("open");

        // close siblings at same level
        li.closest("ul")
          .querySelectorAll(".has-submenu.open")
          .forEach(openLi => {
            openLi.classList.remove("open");
            const t = openLi.querySelector(".submenu-toggle");
            if (t) t.setAttribute("aria-expanded", "false");
          });

        // toggle this one
        li.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen);
      });
    });

    // Click outside to close
    document.addEventListener("click", e => {
      // if dropdown isn’t open, skip
      if (!dropdownMenu.classList.contains("active")) return;

      const outside = !dropdownMenu.contains(e.target) && e.target !== menuBtn;
      if (outside) {
        dropdownMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");

        // close all submenus
        dropdownMenu
          .querySelectorAll(".has-submenu.open")
          .forEach(li => li.classList.remove("open"));
      }
    });
  } else {
    console.warn("⚠️ menu-btn or dropdown-menu not found!");
  }

  // — Footer slide-up — unchanged —
  const footer      = document.getElementById("info-footer");
  const aboutLink   = document.getElementById("about-link");
  const contactLink = document.getElementById("contact-link");
  if (footer) {
    const show = () => footer.classList.add("active");
    const hide = () => footer.classList.remove("active");

    [aboutLink, contactLink].forEach(link => {
      if (link) {
        link.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          show();
        });
      }
    });

    ["click", "touchstart"].forEach(evt =>
      document.addEventListener(evt, e => {
        if (
          !footer.contains(e.target) &&
          e.target !== aboutLink &&
          e.target !== contactLink
        ) {
          hide();
        }
      })
    );

    footer.addEventListener("click", e => e.stopPropagation());
  }
});
