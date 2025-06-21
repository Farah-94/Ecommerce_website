// Build “mobile-panels” for horizontal swipe on mobile
function buildMobilePanels() {
  const dd = document.getElementById("dropdown-menu");
  if (!dd) return;
  // only once and only on mobile
  if (window.innerWidth > 768 || dd.querySelector(".mobile-panels")) return;

  // grab every <ul> in document order
  const uls = Array.from(dd.querySelectorAll("ul"));
  const panels = document.createElement("div");
  panels.className = "mobile-panels";

  uls.forEach(ul => {
    // clone so original toggles remain untouched
    panels.appendChild(ul.cloneNode(true));
  });

  // replace dropdown content with the panels wrapper
  dd.innerHTML = "";
  dd.appendChild(panels);
}

// rebuild on resize
window.addEventListener("resize", buildMobilePanels);

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS loaded.");

  // init mobile panels if needed
  buildMobilePanels();

  // —— background video logic (unchanged) ——
  const mainVideo = document.getElementById("backgroundVideo");
  if (mainVideo) {
    mainVideo.play().catch(() => {});
    document.addEventListener("click", () => mainVideo.play());
    mainVideo.addEventListener("ended", () => {
      mainVideo.currentTime = 0;
      mainVideo.play();
    });
  }

  // —— menu toggle ——  
  const menuBtn      = document.getElementById("menu-btn");
  const dropdownMenu = document.getElementById("dropdown-menu");
  if (menuBtn && dropdownMenu) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = dropdownMenu.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("no-scroll", open);
      // reset panels position when closing
      const pan = dropdownMenu.querySelector(".mobile-panels");
      if (!open && pan) pan.style.transform = "";
    });

    // Desktop submenu fallback (unchanged)
    dropdownMenu.querySelectorAll(".submenu-toggle").forEach(link => {
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", e => {
        if (window.innerWidth <= 768) return;
        e.preventDefault(); e.stopPropagation();
        const li = link.parentElement;
        const willOpen = !li.classList.contains("open");
        li.closest("ul")
          .querySelectorAll(".has-submenu.open")
          .forEach(sib => {
            sib.classList.remove("open");
            const t = sib.querySelector(".submenu-toggle");
            if (t) t.setAttribute("aria-expanded", "false");
          });
        li.classList.toggle("open", willOpen);
        link.setAttribute("aria-expanded", willOpen);
      });
    });

    // mobile-panels horizontal nav
    const panelsWrap = dropdownMenu.querySelector(".mobile-panels");
    if (panelsWrap) {
      panelsWrap.addEventListener("click", e => {
        const link = e.target.closest(".submenu-toggle");
        if (!link) return;
        e.preventDefault();
        const all = Array.from(panelsWrap.children).filter(
          c => c.tagName === "UL"
        );
        const thisUL = link.closest("ul");
        const idx = all.findIndex(p => p.isSameNode(thisUL));
        if (idx > -1) panelsWrap.style.transform = `translateX(-${idx * 100}%)`;
      });
    }

    // click outside closes
    document.addEventListener("click", e => {
      if (!dropdownMenu.contains(e.target) && e.target !== menuBtn) {
        dropdownMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
        if (panelsWrap) panelsWrap.style.transform = "";
        dropdownMenu
          .querySelectorAll(".has-submenu.open")
          .forEach(li => li.classList.remove("open"));
      }
    });
  }

  // —— footer slide-up (unchanged) ——
  const footer      = document.getElementById("info-footer");
  const aboutLink   = document.getElementById("about-link");
  const contactLink = document.getElementById("contact-link");
  if (footer) {
    const show = () => footer.classList.add("active");
    const hide = () => footer.classList.remove("active");
    [aboutLink, contactLink].forEach(link => {
      if (link) link.addEventListener("click", e => {
        e.preventDefault(); e.stopPropagation(); show();
      });
    });
    ["click", "touchstart"].forEach(evt =>
      document.addEventListener(evt, e => {
        if (
          !footer.contains(e.target) &&
          e.target !== aboutLink &&
          e.target !== contactLink
        ) hide();
      })
    );
    footer.addEventListener("click", e => e.stopPropagation());
  }
});
