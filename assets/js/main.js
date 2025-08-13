/*
 * Enhanced Main JavaScript for Portfolio Website
 * Includes: Advanced Scrolling Animations, Parallax Effects, Progress Indicators, Staggered Reveals
 */

// ===== IMMEDIATE VISIBILITY FIX =====
// This runs immediately to prevent any black screen
(function() {
  console.log('⚡ IMMEDIATE: Preventing black screen...');
  
  // Set basic styles immediately
  if (document.body) {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.background = '#0a0a0a';
  }
  
  // If body doesn't exist yet, wait for it
  const observer = new MutationObserver((mutations, obs) => {
    if (document.body) {
      document.body.style.opacity = '1';
      document.body.style.visibility = 'visible';
      document.body.style.background = '#0a0a0a';
      obs.disconnect();
    }
  });
  
  if (document.documentElement) {
    observer.observe(document.documentElement, {childList: true});
  }
  
  console.log('✅ IMMEDIATE: Visibility protection active');
})();

document.addEventListener('DOMContentLoaded', () => {
  // ===== Fix Page Visibility Issues =====
  console.log('🎬 Ensuring page visibility...');
  
  // Force initial visibility
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  document.body.style.background = '#0a0a0a';
  
  // Ensure all content is visible immediately
  const heroSection = document.querySelector('.hero, #hero');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.visibility = 'visible';
    heroSection.style.transform = 'none';
  }
  
  // Make all sections visible initially
  const allSections = document.querySelectorAll('section');
  allSections.forEach(section => {
    section.style.opacity = '1';
    section.style.visibility = 'visible';
    section.style.transform = 'translateY(0)';
  });
  
  // Make all AOS elements visible initially
  const aosElements = document.querySelectorAll('[data-aos]');
  aosElements.forEach(element => {
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'none';
  });
  
  console.log('✅ All content made visible on load');
  
  // Fix initial page load and scroll position
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = 'auto';
  
  // Initialize Lenis Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Lenis animation frame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ===== Initialize AOS with Proper Timing =====
  // Delay AOS initialization to ensure page is visible first
  setTimeout(() => {
    console.log('🎨 Initializing AOS animations...');
    
    // Mark body as ready for animations
    document.body.classList.add('animations-ready');
    
    // Initialize AOS Animation Library with enhanced settings
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      delay: 150,
      offset: 120,
      disable: false
    });
    
    console.log('✅ AOS animations ready');
  }, 300); // Give enough time for page to be visible

  // DOM Elements
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const themeSwitcher = document.querySelector('.theme-switcher');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const backToTopBtn = document.querySelector('.back-to-top');
  const contactForm = document.querySelector('.contact-form');

  // Removed preview modal elements

  // Animation Elements
  let animationFrameId;
  let ticking = false;

    // Project URLs for preview (with case variations for safety)
  // Removed live demo URL mappings

  // Project GitHub URLs (with case variations for safety)
  const projectGithubUrls = {
    'SmartScope': 'https://github.com/Het0088/Smartscope',
    'Smartscope': 'https://github.com/Het0088/Smartscope',
    'smartscope': 'https://github.com/Het0088/Smartscope',
    '3D Car Showcase': 'https://github.com/Het0088/3D-Car-Showcase',
    '3D Pepsi Store Management': 'https://github.com/Het0088/Store-Management',
    'Super Website': 'https://github.com/Het0088/Super-Website',
    'Pet Adoption Website': 'https://github.com/Het0088/Pet-Adoption-Website',
    'E-commerce Website': 'https://github.com/Het0088/E-commerce-Website',
    'Timetable Manager': 'https://github.com/Het0088/Timetable-Manager',
    'School Management': 'https://github.com/Het0088/School-Management',
    'Automation Dashboard': 'https://github.com/Het0088/Automation-Dashboard',
    'Freelancer Platform': 'https://github.com/Het0088/Freelancer-Platform',
    'Animated Website': 'https://github.com/Het0088/Animated-Website',
    'Chatbot': 'https://github.com/Het0088/Chatbot',
    'Coca Cola Website': 'https://github.com/Het0088/Coca-Cola-Website'
  };

  // ===== Enhanced Scroll Progress Indicator =====
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    const progressStyles = `
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .scroll-progress.visible {
        opacity: 1;
      }
      
      .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #6c63ff, #00c7b7);
        width: 0%;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(108, 99, 255, 0.5);
      }
      
      body.dark-mode .scroll-progress {
        background: rgba(0, 0, 0, 0.2);
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = progressStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(progressBar);
    
    return progressBar;
  }

  const scrollProgress = createScrollProgress();

  // ===== Parallax and Advanced Scroll Effects =====
  function handleAdvancedScrollEffects() {
    if (ticking) return;
    
    requestAnimationFrame(() => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollPercentage = (scrollY / documentHeight) * 100;
      
      // Update progress bar
      const progressBar = scrollProgress.querySelector('.scroll-progress-bar');
      progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
      
      // Show/hide progress bar
      if (scrollY > 100) {
        scrollProgress.classList.add('visible');
      } else {
        scrollProgress.classList.remove('visible');
      }
      
      // Parallax effect for hero section
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const heroOffset = scrollY * 0.5;
        heroSection.style.transform = `translateY(${heroOffset}px)`;
      }
      
      // Parallax for background elements
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
      });
      
      // Floating animation for project cards
      floatingAnimation();
      
      // Update section visibility with advanced animations
      updateSectionVisibility();
      
      ticking = false;
    });
    
    ticking = true;
  }

  // ===== Floating Animation for Cards =====
  function floatingAnimation() {
    const cards = document.querySelectorAll('.project-card');
    const scrollY = window.pageYOffset;
    
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = Math.abs(cardCenter - windowCenter);
      const maxDistance = window.innerHeight;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const floatAmount = Math.sin((scrollY + index * 100) * 0.002) * 10;
        const scaleAmount = 1 + (1 - distance / maxDistance) * 0.05;
        
        card.style.transform = `translateY(${floatAmount}px) scale(${scaleAmount})`;
        card.style.boxShadow = `0 ${20 + floatAmount}px ${40 + floatAmount * 2}px rgba(0,0,0,0.1)`;
      }
    });
  }

  // ===== Advanced Section Visibility with Staggered Animations =====
  function updateSectionVisibility() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, sectionIndex) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible && !section.classList.contains('animated')) {
        section.classList.add('animated');
        
        // Staggered animation for child elements
        const animatableElements = section.querySelectorAll('h2, h3, p, .project-card, .skill-item, .service-card');
        animatableElements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
          }, index * 100);
        });
      }
    });
  }

  // ===== Enhanced Smooth Scrolling with Lenis =====
  function smoothScrollTo(target, duration = 1000) {
    // Safety check: ensure target is a valid CSS selector
    if (!target || typeof target !== 'string' || target.startsWith('http')) {
      console.warn('Invalid scroll target:', target);
      return;
    }
    
    try {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;
      
      // Use Lenis for smooth scrolling
      lenis.scrollTo(targetElement, {
        duration: duration / 1000, // Convert to seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } catch (error) {
      console.warn('Scroll error:', error, 'Target:', target);
    }
  }

  // ===== Initialize Project Links =====
  function initializeProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');
    console.log(`🔍 Found ${projectCards.length} project cards`);
    
    projectCards.forEach((card, index) => {
      const projectTitle = card.querySelector('h4')?.textContent;
      const projectLinks = card.querySelectorAll('.project-links a');
      
      console.log(`📋 Card ${index + 1}: "${projectTitle}", Links found: ${projectLinks.length}`);
      
      // Log each link's current href
      projectLinks.forEach((link, linkIndex) => {
        console.log(`  Link ${linkIndex + 1}: href="${link.href}", target="${link.target}"`);
      });
      
      if (projectTitle && projectLinks.length >= 1) {
        const githubLink = projectLinks[0]; // Only GitHub remains

        if (projectGithubUrls[projectTitle]) {
          githubLink.href = projectGithubUrls[projectTitle];
          githubLink.target = '_blank';
          githubLink.rel = 'noopener noreferrer';
          console.log(`✅ UPDATED GitHub: ${projectTitle} → ${githubLink.href}`);
          githubLink.onclick = function(e) {
            console.log(`🖱️ GitHub button clicked for ${projectTitle}`);
            window.open(projectGithubUrls[projectTitle], '_blank');
            return false;
          };
        } else {
          console.log(`❌ No GitHub URL found for: ${projectTitle}`);
        }
      } else {
        console.log(`⚠️ Skipping card: missing title or insufficient links`);
      }
    });
    
    console.log(`📊 GitHub URLs available:`, Object.keys(projectGithubUrls));
    
    // Removed SmartScope direct live demo fix
  }

  // ===== Manual Test Function (for debugging) =====
  window.testSmartScopeLink = function() {
    console.log('🧪 Testing SmartScope link manually...');
    const smartScopeCard = Array.from(document.querySelectorAll('.project-card')).find(card => {
      const title = card.querySelector('h4')?.textContent;
      return title && title.toLowerCase().includes('smartscope');
    });
    
    if (smartScopeCard) {
      const links = smartScopeCard.querySelectorAll('.project-links a');
      console.log(`Found SmartScope card with ${links.length} links:`);
      links.forEach((link, i) => {
        console.log(`  Link ${i + 1}: href="${link.href}", target="${link.target}"`);
        console.log(`  Link ${i + 1}: onclick=`, link.onclick);
      });
      
      if (links[0]) {
        console.log('🔗 Manually clicking GitHub link...');
        links[0].click();
      }
    } else {
      console.log('❌ SmartScope card not found!');
    }
  };
  
  console.log('💡 Run testSmartScopeLink() in console to manually test the link!');

  // ===== Text Reveal Animations =====
  function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.animate-text');
    
    textElements.forEach(element => {
      const text = element.textContent;
      const letters = text.split('');
      
      element.innerHTML = letters.map((letter, index) => 
        `<span class="letter" style="animation-delay: ${index * 50}ms">${letter}</span>`
      ).join('');
    });
    
    // Add CSS for text animation
    const textAnimationStyles = `
      .animate-text .letter {
        display: inline-block;
        opacity: 0;
        transform: translateY(50px) rotateX(90deg);
        animation: letterReveal 0.8s ease forwards;
      }
      
      @keyframes letterReveal {
        to {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = textAnimationStyles;
    document.head.appendChild(styleSheet);
  }

  // ===== Counter Animation =====
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  // ===== Enhanced Header Scroll Effect =====
  function headerScrollEffect() {
    const scrollY = window.pageYOffset;
    
    if (scrollY > 50) {
      header.classList.add('scrolled');
      header.style.transform = 'translateY(0)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.classList.remove('scrolled');
      header.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide header on scroll down, show on scroll up
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    this.lastScrollY = currentScrollY;
  }
  headerScrollEffect.lastScrollY = 0;

  // ===== Mobile Menu Toggle =====
  function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    
    // Change the hamburger icon to X
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      bar.classList.toggle('active');
      if (bar.classList.contains('active')) {
        if (index === 0) {
          bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
        } else if (index === 1) {
          bar.style.opacity = '0';
        } else if (index === 2) {
          bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
      } else {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
      }
    });
  }

  // ===== Dark Mode Toggle =====
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Enhanced animation for theme switcher
    if (themeSwitcher.querySelector('i').classList.contains('fa-moon')) {
      themeSwitcher.querySelector('i').classList.remove('fa-moon');
      themeSwitcher.querySelector('i').classList.add('fa-sun');
      themeSwitcher.style.transform = 'rotate(360deg)';
    } else {
      themeSwitcher.querySelector('i').classList.remove('fa-sun');
      themeSwitcher.querySelector('i').classList.add('fa-moon');
      themeSwitcher.style.transform = 'rotate(0deg)';
    }
    
    // Save user preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Apply specific dark mode styles for project cards
    applyDarkModeStyles();
  }
  
  // ===== Apply specific dark mode styles =====
  function applyDarkModeStyles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Apply styles to project tags for better visibility in dark mode
    const projectTags = document.querySelectorAll('.project-tags span');
    projectTags.forEach(tag => {
      if (isDarkMode) {
        tag.style.backgroundColor = 'rgba(65, 105, 225, 0.2)';
        tag.style.color = '#6c63ff';
      } else {
        tag.style.backgroundColor = 'rgba(65, 105, 225, 0.1)';
        tag.style.color = '#4169e1';
      }
    });
    
    // Enhance form fields contrast in dark mode
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      if (isDarkMode) {
        input.style.borderColor = '#333';
        input.style.backgroundColor = '#1a1a1a';
      } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
      }
    });
  }

  // ===== Check for Saved Theme Preference =====
  function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check saved preference or use system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
      themeSwitcher.querySelector('i').classList.remove('fa-moon');
      themeSwitcher.querySelector('i').classList.add('fa-sun');
    } else {
      themeSwitcher.querySelector('i').classList.remove('fa-sun');
      themeSwitcher.querySelector('i').classList.add('fa-moon');
    }
    
    // Apply specific dark mode styles
    applyDarkModeStyles();
  }

  // ===== Enhanced Project Filtering with Animations =====
  function filterProjects() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button with animation
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      btn.style.transform = 'scale(1)';
    });
    this.classList.add('active');
    this.style.transform = 'scale(1.05)';
    
    // Filter projects with staggered animation
    projectCards.forEach((card, index) => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        setTimeout(() => {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 600);
      }
    });
  }

  // ===== Enhanced Back to Top Button =====
  function scrollFunction() {
    const scrollY = window.pageYOffset;
    
    if (scrollY > 500) {
      backToTopBtn.classList.add('active');
      backToTopBtn.style.transform = 'translateY(0) rotate(0deg)';
    } else {
      backToTopBtn.classList.remove('active');
      backToTopBtn.style.transform = 'translateY(100px) rotate(180deg)';
    }
  }

  function scrollToTop() {
    lenis.scrollTo(0, { duration: 1.2 });
  }

  // ===== Smooth Scrolling for Navigation Links =====
  function smoothScroll(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
      toggleMobileMenu();
    }
    
    const targetId = this.getAttribute('href');
    smoothScrollTo(targetId, 1000);
  }

  // ===== Highlight Active Navigation Link on Scroll =====
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  }

  // ===== Form Validation =====
  function validateForm(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Check name
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      removeError(nameInput);
    }
    
    // Check email
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      removeError(emailInput);
    }
    
    // Check subject
    if (subjectInput.value.trim() === '') {
      showError(subjectInput, 'Subject is required');
      isValid = false;
    } else {
      removeError(subjectInput);
    }
    
    // Check message
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      removeError(messageInput);
    }
    
    // If all valid, submit the form
    if (isValid) {
      // Here you would normally send the form data to a server
      // For now, we'll just show a success message
      showSuccessMessage();
      contactForm.reset();
    }
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4d4d';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    errorElement.style.transition = 'all 0.3s ease';
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    
    input.style.borderColor = '#ff4d4d';
    input.style.boxShadow = '0 0 0 3px rgba(255, 77, 77, 0.2)';
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        formGroup.removeChild(errorElement);
      }, 300);
    }
    
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }

  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Your message has been sent successfully!';
    successMsg.style.backgroundColor = 'rgba(0, 199, 183, 0.1)';
    successMsg.style.color = '#00c7b7';
    successMsg.style.padding = '15px';
    successMsg.style.borderRadius = '8px';
    successMsg.style.marginBottom = '20px';
    successMsg.style.textAlign = 'center';
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translateY(-10px)';
    successMsg.style.transition = 'all 0.3s ease';
    
    contactForm.insertBefore(successMsg, contactForm.firstChild);
    
    // Animate the success message
    setTimeout(() => {
      successMsg.style.opacity = '1';
      successMsg.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
      successMsg.style.opacity = '0';
      successMsg.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        contactForm.removeChild(successMsg);
      }, 300);
    }, 5000);
  }

  // ===== Enhanced Typing Effect for Hero Section =====
  function initTypewriter() {
    const typeTarget = document.querySelector('.typewriter');
    
    if (typeTarget) {
      let roles;
      try {
        roles = JSON.parse(typeTarget.getAttribute('data-roles'));
      } catch (e) {
        roles = ["Full Stack Developer", "Software Engineer", "Windows App Developer"];
      }
      
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typeDelay = 100;
      
      function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
          typeTarget.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
          typeDelay = 50;
        } else {
          typeTarget.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
          typeDelay = 200;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
          isDeleting = true;
          typeDelay = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typeDelay = 500; // Pause before typing new role
        }
        
        setTimeout(type, typeDelay);
      }
      
      type();
    }
  }

  // ===== Initialize Advanced Animations =====
  function initAdvancedAnimations() {
    // Add initial styles for animations
    const animationStyles = `
      section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      section.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .project-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
      }
      
      .project-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      }
      
      .back-to-top {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .filter-btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      header {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize text reveals
    initTextRevealAnimations();
    
    // Initialize counters when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounters();
        }
      });
    });
    
    document.querySelectorAll('[data-count]').forEach(counter => {
      observer.observe(counter);
    });
  }

  // ===== Event Listeners =====
  // Use Lenis scroll event for better performance
  lenis.on('scroll', (e) => {
    headerScrollEffect();
    scrollFunction();
    highlightNavOnScroll();
    handleAdvancedScrollEffects();
  });
  
  // Fallback for browsers that don't support Lenis
  window.addEventListener('scroll', () => {
    headerScrollEffect();
    scrollFunction();
    highlightNavOnScroll();
    handleAdvancedScrollEffects();
  }, { passive: true });
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', toggleDarkMode);
    // Add transition for smooth rotation
    themeSwitcher.style.transition = 'transform 0.5s ease';
  }
  
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', filterProjects);
    });
  }
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
  }
  
  // Add smooth scrolling to all navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', smoothScroll);
  });

  // Listen for changes to color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        themeSwitcher.querySelector('i').classList.remove('fa-moon');
        themeSwitcher.querySelector('i').classList.add('fa-sun');
      } else {
        document.body.classList.remove('dark-mode');
        themeSwitcher.querySelector('i').classList.remove('fa-sun');
        themeSwitcher.querySelector('i').classList.add('fa-moon');
      }
      
      applyDarkModeStyles();
    }
  });

  // Initialize everything
  checkThemePreference();
  initTypewriter();
  initAdvancedAnimations();
  
  // Initialize project links immediately
  console.log('🚀 Starting project link initialization...');
  initializeProjectLinks();
  
  // Initialize again with delay as backup
  setTimeout(() => {
    console.log('🔄 Re-initializing project links (100ms delay)...');
    initializeProjectLinks();
  }, 100);
  
  // Initialize again after longer delay
  setTimeout(() => {
    console.log('🔄 Re-initializing project links (500ms delay)...');
    initializeProjectLinks();
  }, 500);
  
  // Enable smooth scrolling for anchor links with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Only handle internal hash links, not external URLs
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        try {
          const target = document.querySelector(href);
          if (target) {
            lenis.scrollTo(target, { duration: 1.2 });
          }
        } catch (error) {
          console.warn('Anchor scroll error:', error, 'href:', href);
        }
      }
    });
  });
  
  // Preload project images
  function preloadImages() {
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        const newImg = new Image();
        newImg.src = src;
      }
    });
  }
  
  // Call preload function after page loads
  window.addEventListener('load', () => {
    console.log('🚀 Page fully loaded, ensuring visibility...');
    
    // Force visibility again after full load
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Ensure all content is still visible
    const allElements = document.querySelectorAll('section, .hero, [data-aos]');
    allElements.forEach(element => {
      if (element.style.opacity === '0' || element.style.opacity === '') {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
      }
    });
    
    preloadImages();
    
    // Mark body as loaded and ensure links work
    document.body.classList.add('loaded');
    
    // Re-initialize project links on window load for safety
    setTimeout(() => {
      initializeProjectLinks();
    }, 200);
    
    console.log('✅ Page fully visible and loaded');
  });

  // Removed: click-to-open live preview modal

  // Removed: preview modal close handlers
}); 