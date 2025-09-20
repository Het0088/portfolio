/*
 * Portfolio Website - Main JavaScript
 * Author: Het Patel
 * Features: Smooth Scrolling, Animations, Interactive Elements
 */

// ===== CONFIGURATION =====
const CONFIG = {
  animation: {
    duration: 1000,
    easing: 'ease-out-cubic',
    offset: 120,
    delay: 150
  },
  smoothScroll: {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    mouseMultiplier: 1,
    touchMultiplier: 2
  }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Initializing portfolio website...');
  
  // Initialize all features
  initSmoothScrolling();
  initAnimations();
  initTypewriter();
  initLaserFlow();
  initNavigation();
  initProjectFiltering();
  initContactForm();
  initScrollEffects();
  init3DTilt();
  
  console.log('✅ Portfolio website initialized successfully');
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: CONFIG.smoothScroll.duration,
      easing: CONFIG.smoothScroll.easing,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: CONFIG.smoothScroll.mouseMultiplier,
      smoothTouch: false,
      touchMultiplier: CONFIG.smoothScroll.touchMultiplier,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Store for external access
    window.lenis = lenis;
  }
}

// ===== ANIMATIONS =====
function initAnimations() {
  setTimeout(() => {
    console.log('🎨 Initializing AOS animations...');
    
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: CONFIG.animation.duration,
        easing: CONFIG.animation.easing,
        once: true,
        mirror: false,
        delay: CONFIG.animation.delay,
        offset: CONFIG.animation.offset,
        disable: false
      });
      
      console.log('✅ AOS animations ready');
    }
  }, 300);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const typeTarget = document.querySelector('.typewriter');
  if (!typeTarget) return;

  const roles = JSON.parse(typeTarget.getAttribute('data-roles') || '["Full Stack Developer", "Software Engineer", "Web Developer"]');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typeTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex >= currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1000);
}

// ===== LASER FLOW EFFECT =====
function initLaserFlow() {
  const container = document.getElementById('laserFlow');
  if (!container) return;

  function createLaserBeam() {
    const beam = document.createElement('div');
    beam.className = 'laser-beam';
    beam.style.left = `${Math.random() * 100}%`;
    beam.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(beam);

    const glow = document.createElement('div');
    glow.className = 'laser-glow';
    glow.style.left = `${Math.random() * 100}%`;
    glow.style.top = `${Math.random() * 100}%`;
    glow.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(glow);

    setTimeout(() => {
      if (beam.parentNode) beam.remove();
      if (glow.parentNode) glow.remove();
    }, 8000);
  }

  function spawnLasers() {
    if (Math.random() > 0.3) createLaserBeam();
    setTimeout(spawnLasers, Math.random() * 3000 + 2000);
  }

  setTimeout(spawnLasers, 1000);

  // Keyboard shortcut (L key)
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'l') {
      createLaserBeam();
      console.log('🚀 Manual laser beam created!');
    }
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (header) {
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 100) {
        header.style.background = 'var(--nav-bg-scrolled)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Smooth scroll for navigation links
  const navLinksAll = document.querySelectorAll('nav a[href^="#"]');
  navLinksAll.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('#name')?.value;
    const email = formData.get('email') || contactForm.querySelector('#email')?.value;
    const subject = formData.get('subject') || contactForm.querySelector('#subject')?.value;
    const message = formData.get('message') || contactForm.querySelector('#message')?.value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Show success message (you can integrate with a backend service here)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    
    console.log('📧 Form submitted:', { name, email, subject, message });
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  const backToTopBtn = document.querySelector('.back-to-top');

  // Back to top button
  if (backToTopBtn) {
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll progress indicator
  createScrollProgress();
}

// ===== SCROLL PROGRESS INDICATOR =====
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
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = progressStyles;
  document.head.appendChild(styleSheet);
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  const handleScroll = Utils.throttle(() => {
    const scrollY = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollY / documentHeight) * 100;
    
    const progressBarElement = progressBar.querySelector('.scroll-progress-bar');
    progressBarElement.style.width = `${Math.min(scrollPercentage, 100)}%`;
    
    if (scrollY > 100) {
      progressBar.classList.add('visible');
    } else {
      progressBar.classList.remove('visible');
    }
  }, 16);
  
  window.addEventListener('scroll', handleScroll);
}

// ===== 3D TILT EFFECT =====
function init3DTilt() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Add mouse move event listener
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = (e.clientY - cardCenterY) / rect.height * -20;
      const rotateY = (e.clientX - cardCenterX) / rect.width * 20;
      
      // Apply 3D transformation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.classList.add('tilt');
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.classList.remove('tilt');
    });
    
    // Add smooth transition when entering
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
}

// ===== IMMEDIATE VISIBILITY FIX =====
// Ensure page is visible from the start
(function() {
  const ensureVisibility = () => {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.background = '#0a0a0a';
    
    // Make critical sections visible
    const criticalSelectors = ['.hero', '#hero', 'section'];
    criticalSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
      });
    });
  };

  if (document.body) {
    ensureVisibility();
  } else {
    document.addEventListener('DOMContentLoaded', ensureVisibility);
  }
})();