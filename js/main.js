/**
 * main.js - Study Upbroad
 * Handles: scroll reveal, stat counters, testimonial slider, smooth scroll,
 *          destination cards, hero parallax, intersection observers
 */

(function () {
  'use strict';

  /* ============================================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ============================================================
     ANIMATED STAT COUNTERS
     ============================================================ */
  function initStatCounters() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.stat-count').forEach(el => {
        el.textContent = el.getAttribute('data-target');
      });
      return;
    }

    const counters = document.querySelectorAll('.stat-count');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  /* ============================================================
     TESTIMONIAL SLIDER
     ============================================================ */
  function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    let autoplayInterval = null;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    }, { passive: true });

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('mainNavbar') ? document.getElementById('mainNavbar').offsetHeight : 70;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     UNIVERSITIES MARQUEE PAUSE ON FOCUS
     ============================================================ */
  function initMarqueePause() {
    const track = document.querySelector('.universities-marquee-track');
    if (!track) return;

    track.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('focus', () => { track.style.animationPlayState = 'paused'; });
      el.addEventListener('blur', () => { track.style.animationPlayState = 'running'; });
    });
  }

  /* ============================================================
     DESTINATION CARD HOVER ACCESSIBILITY
     ============================================================ */
  function initDestinationCards() {
    document.querySelectorAll('.destination-card').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const link = card.querySelector('.destination-explore-link');
          if (link) link.click();
        }
      });
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function init() {
    initScrollReveal();
    initStatCounters();
    initTestimonialSlider();
    initSmoothScroll();
    initMarqueePause();
    initDestinationCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
