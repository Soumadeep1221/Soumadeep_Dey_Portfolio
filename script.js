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

    // Typing animation for hero subtitle
    const typingText = document.getElementById("typingText");
    if (typingText) {
      const fullText = "Aspiring Java Backend Development";
      typingText.textContent = "";
      typingText.innerHTML = '<span class="typing-cursor">|</span>';
      
      let charIndex = 0;
      const typingSpeed = 100; // milliseconds per character
      
      function typeText() {
        if (charIndex < fullText.length) {
          const currentText = fullText.substring(0, charIndex + 1);
          typingText.innerHTML = currentText + '<span class="typing-cursor">|</span>';
          charIndex++;
          setTimeout(typeText, typingSpeed);
        }
      }
      
      // Start typing animation after a short delay
      setTimeout(typeText, 500);
    }

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

    // Spring Framework dropdown and checkbox logic
    const springBadge = document.getElementById("springBadge");
    const springDropdown = document.getElementById("springDropdown");
    const springLearningBox = document.getElementById("springLearningBox");
    const springCheckboxes = document.querySelectorAll(".spring-checkbox");
    // Load saved Spring checkbox states from localStorage
    const springSaved = JSON.parse(localStorage.getItem("springSelections") || "{}");
    springCheckboxes.forEach(cb => {
      if (springSaved.hasOwnProperty(cb.value)) {
        cb.checked = !!springSaved[cb.value];
      }
    });

    // Data Structures & Algorithms dropdown and checkbox logic
    const dsaBadge = document.getElementById("dsaBadge");
    const dsaDropdown = document.getElementById("dsaDropdown");
    const dsaLearningBox = document.getElementById("dsaLearningBox");
    const dsaCheckboxes = document.querySelectorAll(".dsa-checkbox");
    // Load saved DSA checkbox states from localStorage
    const dsaSaved = JSON.parse(localStorage.getItem("dsaSelections") || "{}");
    dsaCheckboxes.forEach(cb => {
      if (dsaSaved.hasOwnProperty(cb.value)) {
        cb.checked = !!dsaSaved[cb.value];
      }
    });

    // Toggle Spring dropdown
    if (springBadge && springDropdown) {
      springBadge.addEventListener("click", function(e) {
        e.stopPropagation();
        springDropdown.classList.toggle("hidden");
        // Close DSA dropdown if open
        if (dsaDropdown) dsaDropdown.classList.add("hidden");
      });
    }

    // Toggle DSA dropdown
    if (dsaBadge && dsaDropdown) {
      dsaBadge.addEventListener("click", function(e) {
        e.stopPropagation();
        dsaDropdown.classList.toggle("hidden");
        // Close Spring dropdown if open
        if (springDropdown) springDropdown.classList.add("hidden");
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener("click", function(e) {
      if (springBadge && springDropdown && !springBadge.contains(e.target) && !springDropdown.contains(e.target)) {
        springDropdown.classList.add("hidden");
      }
      if (dsaBadge && dsaDropdown && !dsaBadge.contains(e.target) && !dsaDropdown.contains(e.target)) {
        dsaDropdown.classList.add("hidden");
      }
    });

    // Check all checkboxes logic
    function checkAllSpringCompleted() {
      if (!springCheckboxes.length) return;
      
      const allChecked = Array.from(springCheckboxes).every(cb => cb.checked);
      
      if (allChecked) {
        // All checked - remove learning box, add green checkmark
        springBadge.classList.add("completed");
      } else {
        // Not all checked - show learning box, remove checkmark
        springBadge.classList.remove("completed");
      }
    }

    // Add event listeners to all checkboxes
    springCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", function() {
        // Persist Spring checkbox state
        const saved = JSON.parse(localStorage.getItem("springSelections") || "{}");
        saved[checkbox.value] = checkbox.checked;
        localStorage.setItem("springSelections", JSON.stringify(saved));
        checkAllSpringCompleted();
      });
    });

    // Initial check
    checkAllSpringCompleted();

    // Check all checkboxes logic
    function checkAllDSACompleted() {
      if (!dsaCheckboxes.length) return;
      
      const allChecked = Array.from(dsaCheckboxes).every(cb => cb.checked);
      
      if (allChecked) {
        // All checked - remove learning box
        dsaBadge.classList.add("completed");
      } else {
        // Not all checked - show learning box
        dsaBadge.classList.remove("completed");
      }
    }

    // Add event listeners to all checkboxes
    dsaCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", function() {
        // Persist DSA checkbox state
        const saved = JSON.parse(localStorage.getItem("dsaSelections") || "{}");
        saved[checkbox.value] = checkbox.checked;
        localStorage.setItem("dsaSelections", JSON.stringify(saved));
        checkAllDSACompleted();
      });
    });

    // Initial check
    checkAllDSACompleted();