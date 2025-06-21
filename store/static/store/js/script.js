

// ——— Build “mobile-panels” for horizontal scroll on mobile ———
function buildMobilePanels() {
  // only on mobile
  if (window.innerWidth > 768) return;
  const dd = document.getElementById("dropdown-menu");
  if (!dd) return;
  // don’t rebuild if already built
  if (dd.querySelector(".mobile-panels")) return;

  // collect every nested <ul> in document order
  const uls = Array.from(dd.querySelectorAll("ul"));
  const panels = document.createElement("div");
  panels.className = "mobile-panels";

  uls.forEach(ul => {
    // clone each <ul> so original submenu toggles still work if you ever revisit desktop
    panels.appendChild(ul.cloneNode(true));
  });

  // replace dropdown content with our panels container
  dd.innerHTML = "";
  dd.appendChild(panels);
}

// Rebuild panels on resize
window.addEventListener("resize", buildMobilePanels);

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded successfully!");

  // ——— Initialize mobile panels if needed ———
  buildMobilePanels();

  // ——— Background video logic ———
  const mainVideo = document.getElementById("backgroundVideo");
  if (mainVideo) {
    mainVideo
      .play()
      .then(() => console.log("✅ Video autoplayed."))
      .catch(err =>
        console.warn("⚠️ Autoplay blocked; waiting for user tap.", err)
      );

    document.addEventListener("click", () => {
      mainVideo.play();
    });

    mainVideo.addEventListener("ended", () => {
      mainVideo.currentTime = 0;
      mainVideo.play();
    });
  } else {
    console.warn("⚠️ #backgroundVideo not found.");
  }

  // ——— Menu & Submenus ———
  const menuBtn      = document.getElementById("menu-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (menuBtn && dropdownMenu) {
    // initialize aria-state
    menuBtn.setAttribute("aria-expanded", "false");

    // Toggle main menu open/close
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);

      // on close, reset mobile-panels position
      const panelsWrap = dropdownMenu.querySelector(".mobile-panels");
      if (!isOpen && panelsWrap) panelsWrap.style.transform = "";
    });

    // — Desktop fallback: nested submenus (only if >768px) —
    const submenuToggles = dropdownMenu.querySelectorAll(".submenu-toggle");
    submenuToggles.forEach(link => {
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", e => {
        if (window.innerWidth <= 768) return; // skip on mobile-panels
        e.preventDefault();
        e.stopPropagation();

        const parentLi = link.parentElement;
        const willOpen  = !parentLi.classList.contains("open");

        // close sibling opens
        parentLi
          .closest("ul")
          .querySelectorAll(".has-submenu.open")
          .forEach(li => {
            li.classList.remove("open");
            const t = li.querySelector(".submenu-toggle");
            if (t) t.setAttribute("aria-expanded", "false");
          });

        // toggle this one
        parentLi.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen);
      });
    });

    // — Mobile-panels horizontal nav ——
    const panelsWrap = dropdownMenu.querySelector(".mobile-panels");
    if (panelsWrap) {
      panelsWrap.addEventListener("click", e => {
        const link = e.target.closest(".submenu-toggle");
        if (!link) return;
        e.preventDefault();

        // find all panels (<ul> children)
        const panels = Array.from(panelsWrap.children).filter(
          c => c.tagName === "UL"
        );
        // find which panel contains the clicked link
        const thisUL = link.closest("ul");
        const idx    = panels.findIndex(p => p.isSameNode(thisUL));
        if (idx > -1) {
          panelsWrap.style.transform = `translateX(-${idx * 100}%)`;
        }
      });
    }

    // — Click outside to close everything —
    document.addEventListener("click", e => {
      if (
        !dropdownMenu.contains(e.target) &&
        e.target !== menuBtn
      ) {
        // close main
        if (dropdownMenu.classList.contains("active")) {
          dropdownMenu.classList.remove("active");
          menuBtn.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        }
        // reset desktop opens
        dropdownMenu
          .querySelectorAll(".has-submenu.open")
          .forEach(li => li.classList.remove("open"));
        // reset mobile-panels
        if (panelsWrap) panelsWrap.style.transform = "";
      }
    });
  } else {
    console.warn("⚠️ menu-btn or dropdown-menu not found!");
  }

  // ——— Footer slide-up logic ———
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
