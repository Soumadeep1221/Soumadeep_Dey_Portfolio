// DOM Elements
    const header = document.getElementById("header");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const menuIcon = document.getElementById("menuIcon");
    const closeIcon = document.getElementById("closeIcon");
    const mobileNav = document.getElementById("mobileNav");
    const scrollToTopBtn = document.getElementById("scrollToTop");
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const yearSpan = document.getElementById("year");

    // Set current year
    yearSpan.textContent = new Date().getFullYear();

    // Header scroll effect
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Scroll to top button visibility
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", function() {
      const isOpen = !mobileNav.classList.contains("hidden");

      if (isOpen) {
        mobileNav.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      } else {
        mobileNav.classList.remove("hidden");
        menuIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-link-mobile").forEach(function(link) {
      link.addEventListener("click", function() {
        mobileNav.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });

    // Scroll to top
    scrollToTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    // Contact form submission -> send via Formspree/endpoint
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const endpoint = contactForm.dataset.endpoint;
      const errorMessage = document.getElementById("formError");
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      if (!endpoint || endpoint === "YOUR_FORMSPREE_ENDPOINT") {
        alert("Form endpoint is not configured.");
        return;
      }

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      errorMessage.classList.add("hidden");
      submitBtn.innerHTML = "Sending...";
      submitBtn.disabled = true;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message })
        });

        if (!res.ok) throw new Error("Request failed");

        contactForm.classList.add("hidden");
        successMessage.classList.remove("hidden");
      } catch (err) {
        errorMessage.classList.remove("hidden");
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    });