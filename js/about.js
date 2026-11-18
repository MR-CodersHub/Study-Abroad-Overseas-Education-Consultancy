/**
 * about.js - Study Upbroad
 * Testimonial slider, scroll reveal animations, smooth anchor scrolling,
 * and responsive interaction handling for About Us page.
 */

(function () {
  'use strict';

  /* ============================================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     TESTIMONIAL SLIDER
     ============================================================ */
  function initTestimonialSlider() {
    var track = document.getElementById('aboutTestimonialTrack');
    var slides = document.querySelectorAll('.about-testimonial-slide');
    var prevBtn = document.getElementById('aboutTestimonialPrev');
    var nextBtn = document.getElementById('aboutTestimonialNext');
    var dotsContainer = document.getElementById('aboutTestimonialDots');

    if (!track || !slides.length) return;

    var currentIndex = 0;
    var totalSlides = slides.length;

    // Create dot buttons
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'about-testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', function () {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll('.about-testimonial-dot');
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      var offsetMultiplier = isRTL ? 100 : -100;
      track.style.transform = 'translateX(' + (currentIndex * offsetMultiplier) + '%)';

      slides.forEach(function (slide, i) {
        slide.classList.toggle('active-slide', i === currentIndex);
      });

      updateDots();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
      });
    }

    // Touch/swipe navigation
    var touchStartX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var delta = touchStartX - e.changedTouches[0].clientX;
      var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (Math.abs(delta) > 40) {
        if (delta > 0) {
          goToSlide(isRTL ? currentIndex - 1 : currentIndex + 1);
        } else {
          goToSlide(isRTL ? currentIndex + 1 : currentIndex - 1);
        }
      }
    }, { passive: true });

    // Update position if text direction (RTL/LTR) switches
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'dir') {
          goToSlide(currentIndex);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
  }

  /* ============================================================
     SMOOTH SCROLL FOR IN-PAGE ANCHORS
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var nav = document.getElementById('mainNavbar');
          var navHeight = nav ? nav.offsetHeight : 70;
          var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  function init() {
    initScrollReveal();
    initTestimonialSlider();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
