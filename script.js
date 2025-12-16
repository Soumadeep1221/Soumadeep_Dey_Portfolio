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

    // Add animation classes to cards on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card, .project-card, .achievement-card, .cert-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    // Professional typing animation for animated skills display
    const animatedSkills = document.getElementById("animatedSkills");
    if (animatedSkills) {
      const skills = [
        "Core Java",
        "Advance Java",
        "JDBC",
        "Hibernate ORM",
        "Spring Core",
        "Spring JDBC",
        "Spring Boot Web",
        "Spring MVC",
        "RESTful APIs",
        "Spring Data JPA",
        "Spring AOP",
        "Spring Security",
        "JWT & OAuth2",
        "Docker",
        "Spring AI",
        "Microservices Basics"
      ];
      
      let currentSkillIndex = 0;
      const typingSpeed = 80; // milliseconds per character
      const deleteSpeed = 60; // milliseconds per character when deleting
      const delayBetweenSkills = 2000; // milliseconds before switching to next skill
      const initialDelay = 800; // milliseconds before starting
      
      function typeSkill(skillIndex) {
        const skill = skills[skillIndex];
        let charIndex = 0;
        
        function type() {
          if (charIndex < skill.length) {
            animatedSkills.innerHTML = skill.substring(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
            charIndex++;
            setTimeout(type, typingSpeed);
          } else {
            // Skill typing complete, wait before deleting
            setTimeout(() => deleteSkill(skillIndex), delayBetweenSkills);
          }
        }
        
        type();
      }
      
      function deleteSkill(skillIndex) {
        const skill = skills[skillIndex];
        let charIndex = skill.length;
        
        function deleteChar() {
          if (charIndex > 0) {
            animatedSkills.innerHTML = skill.substring(0, charIndex - 1) + '<span class="typing-cursor">|</span>';
            charIndex--;
            setTimeout(deleteChar, deleteSpeed);
          } else {
            // Deletion complete, move to next skill
            const nextSkillIndex = (skillIndex + 1) % skills.length;
            setTimeout(() => typeSkill(nextSkillIndex), 200);
          }
        }
        
        deleteChar();
      }
      
      // Start typing animation after initial delay
      setTimeout(() => typeSkill(0), initialDelay);
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

    // ============================================
    // Certification Slideshow Functionality
    // ============================================
    const certSlides = document.querySelectorAll('.cert-slide');
    const certDotsContainer = document.getElementById('certDots');
    const certPrevBtn = document.getElementById('certPrevBtn');
    const certNextBtn = document.getElementById('certNextBtn');
    const certLinks = document.querySelectorAll('.cert-link');
    let currentCertIndex = 0;

    // Initialize dots
    function initializeCertDots() {
      certSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('cert-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showCertSlide(index));
        certDotsContainer.appendChild(dot);
      });
    }

    // Show specific certificate slide
    function showCertSlide(index) {
      if (index < 0) {
        currentCertIndex = certSlides.length - 1;
      } else if (index >= certSlides.length) {
        currentCertIndex = 0;
      } else {
        currentCertIndex = index;
      }

      // Update slides
      certSlides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentCertIndex) {
          slide.classList.add('active');
        }
      });

      // Update dots
      document.querySelectorAll('.cert-dot').forEach((dot, idx) => {
        dot.classList.remove('active');
        if (idx === currentCertIndex) {
          dot.classList.add('active');
        }
      });
    }

    // Next button
    if (certNextBtn) {
      certNextBtn.addEventListener('click', () => {
        showCertSlide(currentCertIndex + 1);
      });
    }

    // Previous button
    if (certPrevBtn) {
      certPrevBtn.addEventListener('click', () => {
        showCertSlide(currentCertIndex - 1);
      });
    }

    // Certificate link click handler
    certLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pdfFile = link.getAttribute('data-pdf');
        if (pdfFile) {
          // Open the PDF file
          // Make sure to replace the path with your actual PDF location
          window.open(pdfFile, '_blank');
        }
      });
    });

    // Initialize certification slideshow
    initializeCertDots();

    // Visitor Counter using localStorage as fallback
    async function updateVisitorCount() {
      const visitCount = document.getElementById('visitCount');
      
      // Start animated dots
      let dotCount = 1;
      const dotInterval = setInterval(() => {
        if (visitCount) {
          visitCount.textContent = '.'.repeat(dotCount);
          dotCount = dotCount === 4 ? 1 : dotCount + 1;
        }
      }, 400);
      
      try {
        // Using CountAPI - direct GET request (no hit endpoint needed initially)
        const namespace = 'soumadeep_dey';
        const key = 'portfolio_visits';
        const apiUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;
        
        // Make request with no-cache to force update
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log('Visitor count response:', data);
        clearInterval(dotInterval);
        
        if (visitCount) {
          const count = data.value || 1;
          visitCount.textContent = count.toLocaleString();
          visitCount.classList.remove('loading-dots');
        }
      } catch (error) {
        console.error('Primary API failed:', error);
        clearInterval(dotInterval);
        
        // Fallback to localStorage
        try {
          let localCount = parseInt(localStorage.getItem('portfolio_visits') || '0');
          localCount += 1;
          localStorage.setItem('portfolio_visits', localCount.toString());
          
          if (visitCount) {
            visitCount.textContent = localCount.toLocaleString();
            visitCount.classList.remove('loading-dots');
          }
        } catch (storageError) {
          console.error('Storage also failed:', storageError);
          if (visitCount) {
            visitCount.textContent = '1';
            visitCount.classList.remove('loading-dots');
          }
        }
      }
    }

    // Call visitor counter on page load
    updateVisitorCount();