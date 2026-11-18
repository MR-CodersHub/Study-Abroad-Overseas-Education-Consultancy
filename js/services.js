/**
 * services.js - Study Upbroad
 * Dynamic card rendering from service-data.js, category filtering,
 * scroll reveals, and responsive interactions for services.html.
 */

(function () {
  'use strict';

  /* ============================================================
     RENDER SERVICES GRID FROM SERVICE-DATA.JS
     ============================================================ */
  function renderServicesGrid() {
    var container = document.getElementById('servicesGridContainer');
    if (!container) return;

    var data = window.serviceData || (typeof serviceData !== 'undefined' ? serviceData : null);
    if (!data) {
      console.error('Study Upbroad: serviceData not found.');
      return;
    }

    var keys = Object.keys(data);
    var html = '';

    keys.forEach(function (key, idx) {
      var item = data[key];
      var highlightsHtml = '';

      if (item.highlights && item.highlights.length) {
        highlightsHtml = '<ul class="service-card-highlights">';
        item.highlights.forEach(function (h) {
          highlightsHtml += `
            <li class="service-card-highlight-item">
              <svg class="service-card-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${escapeHtml(h)}</span>
            </li>
          `;
        });
        highlightsHtml += '</ul>';
      }

      html += `
        <article class="service-card reveal delay-${(idx % 3) + 1}" data-category="${escapeHtml(item.category)}" id="service-card-${item.id}">
          <div class="service-card-media">
            <img class="service-card-img" src="${item.heroImage}" alt="${escapeHtml(item.title)}" loading="lazy" width="600" height="375" />
            <div class="service-card-scrim" aria-hidden="true"></div>
            <div class="service-card-badges">
              <span class="service-card-num">Service ${item.number}</span>
              <span class="service-card-cat-pill">${escapeHtml(item.category)}</span>
            </div>
          </div>
          <div class="service-card-body">
            <div class="service-card-icon-wrap" aria-hidden="true">
              ${item.iconSvg || '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'}
            </div>
            <h3 class="service-card-title">${escapeHtml(item.title)}</h3>
            <p class="service-card-desc">${escapeHtml(item.shortDescription)}</p>
            ${highlightsHtml}
            <a href="service-details.html?service=${encodeURIComponent(item.id)}" class="service-card-btn" aria-label="Explore ${escapeHtml(item.title)}">
              <span>Explore Service</span>
              <svg class="service-card-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ============================================================
     INTERACTIVE CATEGORY FILTERING
     ============================================================ */
  function initCategoryFilters() {
    var buttons = document.querySelectorAll('.services-filter-btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        // Update active button state
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Filter cards smoothly
        var cards = document.querySelectorAll('.service-card');
        var container = document.getElementById('servicesGridContainer');
        if (container) {
          container.style.opacity = '0.4';
        }

        setTimeout(function () {
          cards.forEach(function (card) {
            var cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              card.classList.remove('filtered-out');
            } else {
              card.classList.add('filtered-out');
            }
          });
          if (container) {
            container.style.opacity = '1';
          }
        }, 150);
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ============================================================ */
  function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

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

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     SMOOTH SCROLLING FOR IN-PAGE ANCHORS
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
    renderServicesGrid();
    initCategoryFilters();
    initScrollReveal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
