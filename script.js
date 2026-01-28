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
    const themeToggle = document.getElementById("themeToggle");

    // Theme functionality
    function initializeTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    function toggleTheme(event) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Get click position for animation
      const rect = event.target.getBoundingClientRect();
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      
      // Set CSS custom properties for animation origin
      document.documentElement.style.setProperty('--click-x', `${x}%`);
      document.documentElement.style.setProperty('--click-y', `${y}%`);
      
      // Add transition overlay
      const overlay = document.getElementById('themeTransitionOverlay');
      if (overlay) {
        // Add a subtle scale animation to the toggle button
        event.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          event.target.style.transform = '';
        }, 150);
        
        overlay.classList.add('active');
        
        // Change theme after the overlay reaches peak visibility
        setTimeout(() => {
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
        }, 400);
        
        // Remove overlay after animation completes
        setTimeout(() => {
          overlay.classList.remove('active');
        }, 1200);
      } else {
        // Fallback if overlay doesn't exist
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
    }

    // Initialize theme on page load
    initializeTheme();

    // Theme toggle button event listener
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

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

    // Skill badge descriptions (tooltip)
    (function() {
      const badges = document.querySelectorAll('.skill-badges .badge');
      if (!badges.length) return;
      
      let tooltipEl = null;
      let currentActiveBadge = null; // Track which badge is currently showing tooltip
      
      function ensureTooltip() {
        if (tooltipEl) return tooltipEl;
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'skill-tooltip hidden';
        tooltipEl.setAttribute('role', 'tooltip');
        document.body.appendChild(tooltipEl);
        return tooltipEl;
      }
      
      function hideTooltip() {
        if (tooltipEl) {
          tooltipEl.classList.add('hidden');
          tooltipEl.innerHTML = '';
        }
        // Remove active state from current badge
        if (currentActiveBadge) {
          currentActiveBadge.classList.remove('tooltip-active');
          currentActiveBadge = null;
        }
      }
      
      function showTooltip(target, html) {
        const tip = ensureTooltip();
        tip.innerHTML = html;
        tip.classList.remove('hidden');
        
        const rect = target.getBoundingClientRect();
        const tipRect = tip.getBoundingClientRect();
        const padding = 8;
        
        let top = rect.bottom + padding + window.scrollY;
        let left = rect.left + (rect.width / 2) - (tipRect.width / 2) + window.scrollX;
        
        if (top + tipRect.height > window.scrollY + window.innerHeight) {
          top = rect.top - tipRect.height - padding + window.scrollY;
        }
        if (left < window.scrollX + padding) {
          left = window.scrollX + padding;
        }
        if (left + tipRect.width > window.scrollX + window.innerWidth - padding) {
          left = window.scrollX + window.innerWidth - tipRect.width - padding;
        }
        
        tip.style.top = `${top}px`;
        tip.style.left = `${left}px`;
        
        // Set active state
        currentActiveBadge = target;
        target.classList.add('tooltip-active');
      }
      
      function toggleTooltip(badge, html) {
        // If clicking the same badge that's currently active, hide tooltip
        if (currentActiveBadge === badge) {
          hideTooltip();
        } else {
          // Hide current tooltip and show new one
          hideTooltip();
          showTooltip(badge, html);
        }
      }
      
      badges.forEach(badge => {
        const isSpring = badge.id === 'springBadge';
        const isDSA = badge.id === 'dsaBadge';
        const desc = badge.getAttribute('data-description');
        if (!desc || isSpring || isDSA) return;
        
        function buildHeadingHTML() {
          const icon = badge.querySelector('i, svg');
          let name = badge.textContent.trim();
          name = name.replace(/\s+Learning.*$/i, '').trim();
          const iconHTML = icon ? icon.outerHTML : '';
          return `<div class="skill-tooltip-header">${iconHTML}<span class="skill-tooltip-title">${name}</span></div>`;
        }
        
        badge.setAttribute('tabindex', '0');
        badge.setAttribute('role', 'button');
        badge.setAttribute('aria-expanded', 'false');
        
        // Click handler with toggle functionality
        badge.addEventListener('click', (e) => {
          e.stopPropagation();
          const html = buildHeadingHTML() + `<div class="skill-tooltip-body">${desc}</div>`;
          toggleTooltip(badge, html);
          
          // Update aria-expanded
          badge.setAttribute('aria-expanded', currentActiveBadge === badge ? 'true' : 'false');
        });
        
        // Keyboard handler with toggle functionality
        badge.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const html = buildHeadingHTML() + `<div class="skill-tooltip-body">${desc}</div>`;
            toggleTooltip(badge, html);
            
            // Update aria-expanded
            badge.setAttribute('aria-expanded', currentActiveBadge === badge ? 'true' : 'false');
          }
          if (e.key === 'Escape') {
            hideTooltip();
            badge.setAttribute('aria-expanded', 'false');
          }
        });
      });
      
      // Close tooltip when clicking outside
      document.addEventListener('click', (e) => {
        if (tooltipEl && !tooltipEl.contains(e.target) && currentActiveBadge && !currentActiveBadge.contains(e.target)) {
          hideTooltip();
          if (currentActiveBadge) {
            currentActiveBadge.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      // Close tooltip on scroll and resize
      window.addEventListener('scroll', () => {
        hideTooltip();
        if (currentActiveBadge) {
          currentActiveBadge.setAttribute('aria-expanded', 'false');
        }
      }, { passive: true });
      
      window.addEventListener('resize', () => {
        hideTooltip();
        if (currentActiveBadge) {
          currentActiveBadge.setAttribute('aria-expanded', 'false');
        }
      });
    })();

// Coming Soon Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const comingSoonModal = document.getElementById('comingSoonModal');
  const comingSoonOverlay = document.getElementById('comingSoonOverlay');
  const comingSoonClose = document.getElementById('comingSoonClose');
  const visitProjectButtons = document.querySelectorAll('.project-links .btn-primary');

  // Function to show coming soon modal
  function showComingSoonModal() {
    comingSoonModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Function to hide coming soon modal
  function hideComingSoonModal() {
    comingSoonModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Add click event listeners to all "Visit Project" buttons
  visitProjectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      showComingSoonModal();
    });
  });

  // Close modal when clicking the close button
  comingSoonClose.addEventListener('click', hideComingSoonModal);

  // Close modal when clicking the overlay
  comingSoonOverlay.addEventListener('click', hideComingSoonModal);

  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !comingSoonModal.classList.contains('hidden')) {
      hideComingSoonModal();
    }
  });
});

// Mobile-specific enhancements
(function() {
  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Add mobile class to body for CSS targeting
  if (isMobile || isTouch) {
    document.body.classList.add('mobile-device');
  }

  // Improve touch interactions
  if (isTouch) {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .badge, .card, .nav-link-mobile, .theme-toggle');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    });

    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('.btn, .theme-toggle, .mobile-menu-btn');
    buttons.forEach(button => {
      button.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.click();
      });
    });

    // Improve skill badge tooltip behavior on mobile
    const skillBadges = document.querySelectorAll('.skill-badges .badge');
    skillBadges.forEach(badge => {
      // Add longer touch feedback for skill badges
      badge.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, { passive: true });
      
      badge.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 200); // Slightly longer for skill badges
      }, { passive: true });
      
      // Prevent context menu on long press for skill badges
      badge.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
    });
  }

  // Optimize animations for mobile
  if (isMobile) {
    // Reduce motion for better performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }

    // Disable floating orbs on mobile for better performance
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    floatingOrbs.forEach(orb => {
      orb.style.display = 'none';
    });
  }

  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    // Close mobile menu on orientation change
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (mobileNav && !mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }

    // Recalculate viewport height for mobile browsers
    setTimeout(() => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 500);
  });

  // Set initial viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Handle viewport resize for mobile browsers
  window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // Improve scroll performance on mobile
  let ticking = false;
  
  function updateScrollEffects() {
    const scrollY = window.scrollY;
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
    
    ticking = false;
  }

  // Throttled scroll handler for better performance
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });

  // Improve form validation for mobile
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add better mobile keyboard types
      if (input.type === 'email') {
        input.setAttribute('inputmode', 'email');
      }
      if (input.name === 'name') {
        input.setAttribute('inputmode', 'text');
        input.setAttribute('autocomplete', 'name');
      }
      
      // Improve focus handling on mobile
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        
        // Scroll input into view on mobile
        if (isMobile) {
          setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    });
  }

  // Improve modal handling for mobile
  const comingSoonModal = document.getElementById('comingSoonModal');
  if (comingSoonModal) {
    // Prevent background scroll when modal is open
    const originalShowModal = window.showComingSoonModal;
    const originalHideModal = window.hideComingSoonModal;
    
    window.showComingSoonModal = function() {
      if (originalShowModal) originalShowModal();
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    };
    
    window.hideComingSoonModal = function() {
      if (originalHideModal) originalHideModal();
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }

  // Add swipe gestures for mobile navigation
  if (isTouch) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 100;
      
      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        const mobileNav = document.getElementById('mobileNav');
        const menuIcon = document.getElementById('menuIcon');
        const closeIcon = document.getElementById('closeIcon');
        
        // Swipe right to open menu (from left edge)
        if (deltaX > 0 && startX < 50 && mobileNav.classList.contains('hidden')) {
          mobileNav.classList.remove('hidden');
          menuIcon.classList.add('hidden');
          closeIcon.classList.remove('hidden');
        }
        // Swipe left to close menu
        else if (deltaX < 0 && !mobileNav.classList.contains('hidden')) {
          mobileNav.classList.add('hidden');
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      }
    }, { passive: true });
  }

  // Optimize images for mobile
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading="lazy" for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add error handling
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });

  // Add pull-to-refresh indicator (visual feedback only)
  if (isTouch) {
    let pullStartY = 0;
    let pullCurrentY = 0;
    let pulling = false;
    
    document.addEventListener('touchstart', function(e) {
      if (window.scrollY === 0) {
        pullStartY = e.touches[0].clientY;
        pulling = true;
      }
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
      if (pulling && window.scrollY === 0) {
        pullCurrentY = e.touches[0].clientY;
        const pullDistance = pullCurrentY - pullStartY;
        
        if (pullDistance > 0) {
          const header = document.getElementById('header');
          const opacity = Math.min(pullDistance / 100, 0.5);
          header.style.backgroundColor = `rgba(212, 196, 176, ${0.9 + opacity})`;
        }
      }
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
      if (pulling) {
        pulling = false;
        const header = document.getElementById('header');
        header.style.backgroundColor = '';
      }
    }, { passive: true });
  }
})();

// Add CSS for mobile touch feedback
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  .mobile-device .touch-active {
    transform: scale(0.98);
    opacity: 0.8;
    transition: transform 0.1s ease, opacity 0.1s ease;
  }
  
  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .focused {
    z-index: 10;
    position: relative;
  }
  
  /* Use CSS custom property for viewport height */
  .hero {
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  @media (max-width: 767px) {
    .hero {
      min-height: calc(var(--vh, 1vh) * 100);
    }
  }
`;
document.head.appendChild(mobileStyles);