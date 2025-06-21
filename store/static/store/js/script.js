document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded.");

  // ——— Background video ———
  const mainVideo = document.getElementById("backgroundVideo");
  if (mainVideo) {
    mainVideo
      .play()
      .then(() => console.log("✅ Video autoplayed."))
      .catch(err =>
        console.warn("⚠️ Autoplay blocked; waiting for tap.", err)
      );

    document.addEventListener("click", () => {
      mainVideo.play();
      console.log("▶️ Video played on user interaction.");
    });

    mainVideo.addEventListener("ended", () => {
      mainVideo.currentTime = 0;
      mainVideo.play();
    });
  } else {
    console.error("⚠️ #backgroundVideo not found.");
  }

  // ——— Menu & Submenus ———
  const menuBtn       = document.getElementById("menu-btn");
  const dropdownRoot  = document.querySelector(".dropdown-content");
  const submenuToggles = Array.from(document.querySelectorAll(".submenu-toggle"));

  if (menuBtn && dropdownRoot) {
    // init aria
    menuBtn.setAttribute("aria-expanded", "false");

    // Toggle main menu
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = dropdownRoot.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("no-scroll", open); // lock scrolling
    });

    // Toggle submenus (only one open per level)
    submenuToggles.forEach(link => {
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = link.parentElement;
        const willOpen  = !parentLi.classList.contains("open");

        // close all siblings at this level
        parentLi
          .closest("ul")
          .querySelectorAll(".has-submenu.open")
          .forEach(li => {
            li.classList.remove("open");
            const toggle = li.querySelector(".submenu-toggle");
            toggle && toggle.setAttribute("aria-expanded", "false");
          });

        // toggle this one
        parentLi.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen);
      });
    });

    // Global click to close everything
    document.addEventListener("click", e => {
      if (!dropdownRoot.contains(e.target) && e.target !== menuBtn) {
        // main menu
        if (dropdownRoot.classList.contains("active")) {
          dropdownRoot.classList.remove("active");
          menuBtn.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        }
        // submenus
        document.querySelectorAll(".has-submenu.open").forEach(li => {
          li.classList.remove("open");
          const toggle = li.querySelector(".submenu-toggle");
          toggle && toggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  } else {
    console.warn("⚠️ menuBtn or .dropdown-content not found.");
  }

  // ——— Footer slide-up ———
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

    ["click", "touchstart"].forEach(ev =>
      document.addEventListener(ev, e => {
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
