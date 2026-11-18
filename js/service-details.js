/**
 * service-details.js - Study Upbroad
 * Dynamically resolves URL parameter ?service=id and renders complete,
 * personalized service details from service-data.js.
 */

(function () {
  'use strict';

  function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
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

  function getFeatureIconSvg(iconName) {
    switch (iconName) {
      case 'academic':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`;
      case 'compass':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
      case 'award':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
      case 'map':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`;
      case 'globe':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
      case 'book-open':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
      case 'layers':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
      case 'clipboard-check':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 12 17 16 11"></polyline></svg>`;
      case 'briefcase':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
      case 'list':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
      case 'file-text':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      case 'folder':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
      case 'send':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
      case 'search':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
      case 'pie-chart':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`;
      case 'shield':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      case 'message-circle':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
      case 'plane':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`;
      case 'home':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
      case 'info':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`;
    }
  }

  function renderServiceDetails() {
    var rawServiceId = getQueryParam('service');
    var serviceId = rawServiceId ? rawServiceId.trim().toLowerCase() : '';

    var data = window.serviceData || (typeof serviceData !== 'undefined' ? serviceData : null);
    var notFoundEl = document.getElementById('serviceNotFoundState');
    var contentEl = document.getElementById('serviceDetailsDynamicContent');

    if (!data || !serviceId || !data[serviceId]) {
      // Show Not Found State
      if (contentEl) contentEl.classList.add('d-none');
      if (notFoundEl) notFoundEl.classList.remove('d-none');
      document.title = 'Service Not Found – Study Upbroad | International Education Consultancy';
      return;
    }

    var service = data[serviceId];

    // Ensure elements visibility
    if (notFoundEl) notFoundEl.classList.add('d-none');
    if (contentEl) contentEl.classList.remove('d-none');

    // 1. Meta & Title
    document.title = `${service.title} – Study Upbroad | International Education Consultancy`;
    var metaDesc = document.getElementById('serviceMetaDescription');
    if (metaDesc) {
      metaDesc.setAttribute('content', service.shortDescription || service.heroDescription);
    }

    // 2. Breadcrumb & Hero
    var bcTitle = document.getElementById('breadcrumbServiceTitle');
    if (bcTitle) bcTitle.textContent = service.title;

    var heroTag = document.getElementById('serviceHeroTag');
    if (heroTag) heroTag.textContent = `SERVICE ${service.number} • ${service.category.toUpperCase()}`;

    var heroTitle = document.getElementById('serviceHeroTitle');
    if (heroTitle) heroTitle.textContent = service.title;

    var heroDesc = document.getElementById('serviceHeroDescription');
    if (heroDesc) heroDesc.textContent = service.heroDescription;

    var heroImg = document.getElementById('serviceHeroImg');
    if (heroImg) {
      heroImg.src = service.heroImage;
      heroImg.alt = `${service.title} guidance session`;
    }

    var floatingIcon = document.getElementById('serviceFloatingIcon');
    if (floatingIcon && service.iconSvg) {
      floatingIcon.innerHTML = service.iconSvg;
    }

    // 3. Overview Section
    var overviewHeading = document.getElementById('serviceOverviewHeading');
    if (overviewHeading) overviewHeading.textContent = `Understanding Your ${service.title} Journey.`;

    var overviewText = document.getElementById('serviceOverviewText');
    if (overviewText && service.overview) {
      var paragraphs = service.overview.split(/\n\s*\n/);
      var phtml = '';
      paragraphs.forEach(function (p) {
        if (p.trim()) {
          phtml += `<p>${escapeHtml(p.trim())}</p>`;
        }
      });
      overviewText.innerHTML = phtml;
    }

    var overviewHighlights = document.getElementById('serviceOverviewHighlights');
    if (overviewHighlights && service.overviewHighlights) {
      var hlHtml = '';
      service.overviewHighlights.forEach(function (h) {
        hlHtml += `
          <li class="detail-overview-check-item">
            <svg class="detail-overview-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${escapeHtml(h)}</span>
          </li>
        `;
      });
      overviewHighlights.innerHTML = hlHtml;
    }

    // 4. Features & Benefits Section
    var featuresHeading = document.getElementById('serviceFeaturesHeading');
    if (featuresHeading) featuresHeading.textContent = `What You Get From Our ${service.title} Guidance.`;

    var featuresContainer = document.getElementById('serviceFeaturesContainer');
    if (featuresContainer && service.features) {
      var featHtml = '';
      service.features.forEach(function (f, idx) {
        var iconSvg = getFeatureIconSvg(f.icon);
        featHtml += `
          <div class="detail-feature-card reveal delay-${(idx % 3) + 1}">
            <div class="detail-feature-icon" aria-hidden="true">
              ${iconSvg}
            </div>
            <h3 class="detail-feature-title">${escapeHtml(f.title)}</h3>
            <p class="detail-feature-desc">${escapeHtml(f.description)}</p>
          </div>
        `;
      });
      featuresContainer.innerHTML = featHtml;
    }

    var benefitsContainer = document.getElementById('serviceBenefitsContainer');
    if (benefitsContainer && service.benefits) {
      var benHtml = '';
      service.benefits.forEach(function (b) {
        benHtml += `
          <div class="detail-benefit-item">
            <div class="detail-benefit-icon-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h4 class="detail-benefit-title">${escapeHtml(b.title)}</h4>
              <p class="detail-benefit-desc">${escapeHtml(b.description)}</p>
            </div>
          </div>
        `;
      });
      benefitsContainer.innerHTML = benHtml;
    }

    // 5. Process / How It Works
    var processHeading = document.getElementById('serviceProcessHeading');
    if (processHeading) processHeading.textContent = `How Our ${service.title} Process Works.`;

    var processContainer = document.getElementById('serviceProcessContainer');
    if (processContainer && service.process) {
      var procHtml = '';
      service.process.forEach(function (step, idx) {
        procHtml += `
          <div class="detail-process-card reveal delay-${(idx % 4) + 1}">
            <div class="detail-process-num">${escapeHtml(step.step)}</div>
            <h3 class="detail-process-title">${escapeHtml(step.title)}</h3>
            <p class="detail-process-desc">${escapeHtml(step.description)}</p>
          </div>
        `;
      });
      processContainer.innerHTML = procHtml;
    }

    // 6. Pricing / Plans Section
    var pricingHeading = document.getElementById('servicePricingHeading');
    if (pricingHeading) pricingHeading.textContent = `Guidance That Fits Your Needs.`;

    var pricingNote = document.getElementById('servicePricingNote');
    if (pricingNote && service.pricing && service.pricing.note) {
      pricingNote.textContent = service.pricing.note;
    }

    var pricingContainer = document.getElementById('servicePricingContainer');
    if (pricingContainer && service.pricing && service.pricing.packages) {
      var prHtml = '';
      service.pricing.packages.forEach(function (pkg, idx) {
        var isFeatured = idx === 1; // Middle package featured
        var featItems = '';
        if (pkg.features && pkg.features.length) {
          pkg.features.forEach(function (pf) {
            featItems += `
              <li class="detail-pricing-feature-item">
                <svg class="detail-pricing-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${escapeHtml(pf)}</span>
              </li>
            `;
          });
        }

        prHtml += `
          <div class="detail-pricing-card ${isFeatured ? 'featured' : ''} reveal delay-${idx + 1}">
            <div class="detail-pricing-badge">${escapeHtml(pkg.badge || 'Guidance')}</div>
            <h3 class="detail-pricing-name">${escapeHtml(pkg.name)}</h3>
            <p class="detail-pricing-tagline">${escapeHtml(pkg.tagline)}</p>
            <div class="detail-pricing-price">${escapeHtml(pkg.price)}</div>
            <ul class="detail-pricing-features">
              ${featItems}
            </ul>
            <a href="contact.html#consultation" class="detail-pricing-cta-btn">
              <span>${escapeHtml(pkg.cta || 'Inquire Now')}</span>
            </a>
          </div>
        `;
      });
      pricingContainer.innerHTML = prHtml;
    }

    // 7. Frequently Asked Questions Section
    var faqHeading = document.getElementById('serviceFaqHeading');
    if (faqHeading) faqHeading.textContent = `Questions About ${service.title}?`;

    var faqContainer = document.getElementById('serviceFaqAccordion');
    if (faqContainer && service.faqs) {
      var faqHtml = '';
      service.faqs.forEach(function (faq, idx) {
        var collapseId = `faqCollapse${idx + 1}`;
        var headerId = `faqHeading${idx + 1}`;
        var isOpen = idx === 0;

        faqHtml += `
          <div class="accordion-item">
            <h3 class="accordion-header" id="${headerId}">
              <button class="accordion-button ${isOpen ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isOpen ? 'true' : 'false'}" aria-controls="${collapseId}">
                ${escapeHtml(faq.q)}
              </button>
            </h3>
            <div id="${collapseId}" class="accordion-collapse collapse ${isOpen ? 'show' : ''}" aria-labelledby="${headerId}" data-bs-parent="#serviceFaqAccordion">
              <div class="accordion-body">
                ${escapeHtml(faq.a)}
              </div>
            </div>
          </div>
        `;
      });
      faqContainer.innerHTML = faqHtml;
    }

    // 8. Related Services Section
    var relatedContainer = document.getElementById('serviceRelatedContainer');
    if (relatedContainer && service.relatedServices) {
      var relHtml = '';
      service.relatedServices.forEach(function (relId, idx) {
        var relService = data[relId];
        if (!relService) return;

        relHtml += `
          <article class="service-card reveal delay-${idx + 1}">
            <div class="service-card-media">
              <img class="service-card-img" src="${relService.heroImage}" alt="${escapeHtml(relService.title)}" loading="lazy" width="600" height="375" />
              <div class="service-card-scrim" aria-hidden="true"></div>
              <div class="service-card-badges">
                <span class="service-card-num">Service ${relService.number}</span>
                <span class="service-card-cat-pill">${escapeHtml(relService.category)}</span>
              </div>
            </div>
            <div class="service-card-body">
              <h3 class="service-card-title">${escapeHtml(relService.title)}</h3>
              <p class="service-card-desc">${escapeHtml(relService.shortDescription)}</p>
              <a href="service-details.html?service=${encodeURIComponent(relService.id)}" class="service-card-btn" aria-label="Explore ${escapeHtml(relService.title)}">
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
      relatedContainer.innerHTML = relHtml;
    }

    // 9. Dynamic Final CTA Section
    var ctaTitle = document.getElementById('serviceCtaTitle');
    if (ctaTitle && service.ctaTitle) ctaTitle.textContent = service.ctaTitle;

    var ctaDesc = document.getElementById('serviceCtaDescription');
    if (ctaDesc && service.ctaDescription) ctaDesc.textContent = service.ctaDescription;

    // 10. Re-trigger Scroll Reveal Observer for dynamically injected content
    initScrollReveal();
  }

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
     ENSURE NAVBAR SERVICES LINK ACTIVE STATE
     ============================================================ */
  function ensureActiveNavLink() {
    var navLinks = document.querySelectorAll('#navbarCollapse .nav-link');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href === 'services.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function init() {
    renderServiceDetails();
    ensureActiveNavLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
