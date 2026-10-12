(function () {
  "use strict";

  // ---- Mobile nav ----
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---- Header shadow on scroll ----
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Gallery ----
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = PHOTOS.map((p, i) => `
    <figure class="tile${p.tall ? " tall" : ""}" data-category="${p.category}" data-index="${i}">
      <button type="button" aria-label="View ${p.alt}">
        <img src="${p.src}" alt="${p.alt}" loading="lazy">
        <span class="tile-label">${p.caption || ""}</span>
      </button>
    </figure>`).join("");

  let visible = PHOTOS.map((_, i) => i);
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      const f = btn.dataset.filter;
      visible = [];
      gallery.querySelectorAll(".tile").forEach((tile) => {
        const show = f === "all" || tile.dataset.category === f;
        tile.hidden = !show;
        if (show) visible.push(Number(tile.dataset.index));
      });
    });
  });

  // ---- Lightbox ----
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCap = document.getElementById("lb-caption");
  let current = 0;
  let lastFocus = null;

  function show(idx) {
    current = idx;
    const p = PHOTOS[idx];
    lbImg.src = p.src;
    lbImg.alt = p.alt;
    lbCap.textContent = p.caption || "";
  }
  function open(idx) {
    lastFocus = document.activeElement;
    show(idx);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    const pos = visible.indexOf(current);
    show(visible[(pos + dir + visible.length) % visible.length]);
  }

  gallery.addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile) open(Number(tile.dataset.index));
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // ---- "Enquire" buttons preselect the session type ----
  const select = document.getElementById("session-select");
  document.querySelectorAll("[data-package]").forEach((btn) => {
    btn.addEventListener("click", () => { select.value = btn.dataset.package; });
  });

  // ---- Contact form ----
  // With the default mailto: action the browser opens the visitor's email app.
  // If you switch to a Formspree-style endpoint, submit via fetch instead:
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    if (form.action.startsWith("mailto:")) {
      status.textContent = "Opening your email app…";
      return;
    }
    e.preventDefault();
    status.textContent = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!res.ok) throw new Error();
      form.reset();
      status.textContent = "Thank you! I'll be in touch within 48 hours.";
    } catch {
      status.textContent = "Something went wrong. Please email me directly.";
    }
  });

  // ---- Fade-in on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section").forEach((s) => { s.classList.add("reveal"); io.observe(s); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
