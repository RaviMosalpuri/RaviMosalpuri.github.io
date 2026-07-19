/* ============================================================
   Ravi Mosalpuri — Portfolio scripts
   ------------------------------------------------------------
   1. Mobile navigation toggle
   2. Close mobile menu on link click
   3. Scroll-reveal animations (IntersectionObserver)
   4. Active nav link highlighting on scroll
   5. Contact form -> mailto: handler
   6. Footer year
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1. Mobile navigation toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    /* ---------- 2. Close menu when a link is clicked ---------- */
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 3. Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support -> show everything
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 4. Active nav link highlighting ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- 5. Contact form -> mailto handler ----------
     No backend on GitHub Pages, so we open the visitor's mail
     client with a pre-filled message. Swap this out for a
     Formspree action if you want inbox delivery without mailto. */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const EMAIL = "ravinmosalpuri@gmail.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showStatus("Please fill in all fields.", true);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus("Please enter a valid email address.", true);
        return;
      }

      const subject = encodeURIComponent("Portfolio enquiry from " + name);
      const body = encodeURIComponent(
        message + "\n\n— " + name + " (" + email + ")"
      );
      window.location.href =
        "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;

      showStatus("Opening your email app…");
      form.reset();
    });
  }

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle("is-error", Boolean(isError));
  }

  /* ---------- 6. Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
