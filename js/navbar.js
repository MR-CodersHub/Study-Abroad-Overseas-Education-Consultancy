/**
 * navbar.js - Study Upbroad
 * Direct init (no fetch) — works with file:// and local servers
 */
(function () {
  'use strict';

  function configureProfileMenu(navbar) {
    var menu = navbar.querySelector('.profile-dropdown .dropdown-menu');
    if (!menu) return;

    menu.innerHTML =
      '<li><a class="dropdown-item profile-menu-link" href="login.html">' +
        '<svg class="profile-menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5v3H3v4h7v3zm9-14H9a2 2 0 00-2 2v2h2V5h10v14H9v-2H7v2a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"/></svg>Login' +
      '</a></li>' +
      '<li><a class="dropdown-item profile-menu-link" href="signup.html">' +
        '<svg class="profile-menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM5 10V7H3v3H0v2h3v3h2v-3h3v-2H5z"/></svg>Sign Up' +
      '</a></li>' +
      '<li><hr class="dropdown-divider profile-menu-divider"></li>' +
      '<li><a class="dropdown-item profile-menu-link" href="user/dashboard.html">' +
        '<svg class="profile-menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"/></svg>User Dashboard' +
      '</a></li>' +
      '<li><a class="dropdown-item profile-menu-link" href="admin/dashboard.html">' +
        '<svg class="profile-menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 4v5c0 5.2-3.4 9.4-8 11-4.6-1.6-8-5.8-8-11V6l8-4zm0 2.2L6 7v4c0 4 2.4 7.3 6 8.8 3.6-1.5 6-4.8 6-8.8V7l-6-2.8z"/></svg>Admin Dashboard' +
      '</a></li>';
  }

  function configureMobileAccountLinks(navbarCollapse) {
    if (!navbarCollapse) return;
    var footer = navbarCollapse.querySelector('.mobile-nav-footer');
    if (!footer) return;

    var loginLink = footer.querySelector('.mobile-login-btn');
    var signupLink = footer.querySelector('.mobile-signup-btn');
    if (loginLink) loginLink.setAttribute('href', 'login.html');
    if (signupLink) signupLink.setAttribute('href', 'signup.html');

    if (!footer.querySelector('.mobile-dashboard-link')) {
      var userLink = document.createElement('a');
      userLink.className = 'mobile-dashboard-link';
      userLink.href = 'user/dashboard.html';
      userLink.textContent = 'User Dashboard';

      var adminLink = document.createElement('a');
      adminLink.className = 'mobile-dashboard-link';
      adminLink.href = 'admin/dashboard.html';
      adminLink.textContent = 'Admin Dashboard';

      footer.insertBefore(userLink, footer.querySelector('.mobile-consult-btn'));
      footer.insertBefore(adminLink, footer.querySelector('.mobile-consult-btn'));
    }
  }

  function initConsultationModal(navbar) {
    var modal = document.getElementById('consultationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'consultationModal';
      modal.className = 'consultation-modal';
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML =
        '<div class="consultation-modal-card" role="dialog" aria-modal="true" aria-labelledby="consultationTitle" aria-describedby="consultationDescription" tabindex="-1">' +
          '<aside class="consultation-modal-intro" aria-hidden="true">' +
            '<div class="consultation-route-art"><span class="route-ring route-ring-one"></span><span class="route-ring route-ring-two"></span><span class="route-marker route-marker-start"></span><span class="route-marker route-marker-end"></span></div>' +
            '<p class="consultation-kicker">STUDY UPBROAD</p>' +
            '<h2>Make your next step clearer.</h2>' +
            '<p>Share your goals and explore a study plan that fits.</p>' +
          '</aside>' +
          '<section class="consultation-modal-content">' +
            '<button class="consultation-close" type="button" aria-label="Close consultation form" data-consultation-close>' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 00-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 101.4 1.4l4.9-4.9 4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"/></svg>' +
            '</button>' +
            '<div class="consultation-form-panel">' +
              '<p class="consultation-kicker">CONSULTATION</p>' +
              '<h2 id="consultationTitle">Tell us what you are planning</h2>' +
              '<p class="consultation-description" id="consultationDescription">This frontend demo does not send or book a consultation.</p>' +
              '<form class="consultation-form" novalidate>' +
                '<div class="consultation-field"><label for="consultationName">Full name <span aria-hidden="true">*</span></label><input id="consultationName" name="name" type="text" autocomplete="name" required aria-describedby="consultationNameError"><span class="consultation-error" id="consultationNameError" data-error-for="name"></span></div>' +
                '<div class="consultation-field"><label for="consultationEmail">Email address <span aria-hidden="true">*</span></label><input id="consultationEmail" name="email" type="email" autocomplete="email" required aria-describedby="consultationEmailError"><span class="consultation-error" id="consultationEmailError" data-error-for="email"></span></div>' +
                '<div class="consultation-field"><label for="consultationPhone">Mobile number <span aria-hidden="true">*</span></label><input id="consultationPhone" name="phone" type="tel" autocomplete="tel" required aria-describedby="consultationPhoneError"><span class="consultation-error" id="consultationPhoneError" data-error-for="phone"></span></div>' +
                '<div class="consultation-field"><label for="consultationDestination">Preferred destination <span aria-hidden="true">*</span></label><select id="consultationDestination" name="destination" required aria-describedby="consultationDestinationError"><option value="">Choose a destination</option><option>Australia</option><option>Canada</option><option>New Zealand</option><option>United Kingdom</option><option>United States</option><option>Not decided yet</option></select><span class="consultation-error" id="consultationDestinationError" data-error-for="destination"></span></div>' +
                '<div class="consultation-field"><label for="consultationLevel">Preferred study level <span aria-hidden="true">*</span></label><select id="consultationLevel" name="studyLevel" required aria-describedby="consultationLevelError"><option value="">Choose a study level</option><option>Undergraduate</option><option>Postgraduate</option><option>Doctoral</option><option>Vocational or pathway</option><option>Not decided yet</option></select><span class="consultation-error" id="consultationLevelError" data-error-for="studyLevel"></span></div>' +
                '<div class="consultation-field"><label for="consultationCourse">Course or subject of interest</label><input id="consultationCourse" name="course" type="text" autocomplete="off"></div>' +
                '<div class="consultation-field"><label for="consultationMode">Preferred consultation mode <span aria-hidden="true">*</span></label><select id="consultationMode" name="consultationMode" required aria-describedby="consultationModeError"><option value="">Choose a mode</option><option>Video call</option><option>Phone call</option><option>In person</option></select><span class="consultation-error" id="consultationModeError" data-error-for="consultationMode"></span></div>' +
                '<div class="consultation-field"><label for="consultationDate">Preferred date</label><input id="consultationDate" name="date" type="date"></div>' +
                '<div class="consultation-field"><label for="consultationTime">Preferred time</label><select id="consultationTime" name="time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>' +
                '<div class="consultation-field consultation-field-wide"><label for="consultationMessage">Anything else we should know?</label><textarea id="consultationMessage" name="message" rows="2"></textarea></div>' +
                '<p class="consultation-demo-note">Demo only. Your details are not saved or sent.</p>' +
                '<div class="consultation-actions"><button class="consultation-cancel" type="button" data-consultation-close>Cancel</button><button class="consultation-submit" type="submit"><span class="consultation-submit-label">Continue</span><span class="consultation-submit-spinner" aria-hidden="true"></span></button></div>' +
              '</form>' +
            '</div>' +
            '<div class="consultation-confirmation" hidden tabindex="-1">' +
              '<span class="consultation-confirmation-mark" aria-hidden="true">✓</span>' +
              '<p class="consultation-kicker">DETAILS CHECKED</p>' +
              '<h2>Thanks for sharing your plans.</h2>' +
              '<p>Your details are ready for a consultation. This is a frontend demo, so nothing has been sent or booked.</p>' +
              '<button class="consultation-submit consultation-confirm-done" type="button" data-consultation-close>Done</button>' +
            '</div>' +
          '</section>' +
        '</div>';
      document.body.appendChild(modal);
    }

    if (modal.dataset.initialized === 'true') return;
    modal.dataset.initialized = 'true';

    var form = modal.querySelector('.consultation-form');
    var formPanel = modal.querySelector('.consultation-form-panel');
    var confirmation = modal.querySelector('.consultation-confirmation');
    var submitButton = modal.querySelector('.consultation-submit[type="submit"]');
    var submitLabel = modal.querySelector('.consultation-submit-label');
    var activeTrigger = null;
    var previousBodyOverflow = '';

    function setFieldError(name, message) {
      var field = form.elements.namedItem(name);
      var error = modal.querySelector('[data-error-for="' + name + '"]');
      if (!field || !error) return;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      error.textContent = message;
    }

    function validateField(name) {
      var field = form.elements.namedItem(name);
      if (!field) return '';
      var value = field.value.trim();
      var message = '';

      if (field.required && !value) {
        message = 'This field is required.';
      } else if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email address.';
      } else if (name === 'phone' && value) {
        var digits = value.replace(/\D/g, '');
        if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
          message = 'Enter a valid mobile number with 7 to 15 digits.';
        }
      }

      setFieldError(name, message);
      return message;
    }

    function resetModal() {
      form.reset();
      formPanel.hidden = false;
      confirmation.hidden = true;
      form.querySelectorAll('[data-error-for]').forEach(function (error) {
        setFieldError(error.getAttribute('data-error-for'), '');
      });
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitLabel.textContent = 'Continue';
    }

    function closeModal() {
      if (modal.hidden) return;
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('consultation-modal-open');
      document.body.style.overflow = previousBodyOverflow;
      resetModal();
      if (activeTrigger && document.contains(activeTrigger)) activeTrigger.focus();
      activeTrigger = null;
    }

    function openModal(trigger) {
      activeTrigger = trigger;
      resetModal();
      previousBodyOverflow = document.body.style.overflow;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('consultation-modal-open');
      document.body.style.overflow = 'hidden';
      form.elements.namedItem('name').focus();
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal || event.target.closest('[data-consultation-close]')) {
        closeModal();
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalidFields = [];
      ['name', 'email', 'phone', 'destination', 'studyLevel', 'consultationMode'].forEach(function (name) {
        if (validateField(name)) invalidFields.push(form.elements.namedItem(name));
      });

      if (invalidFields.length) {
        invalidFields[0].focus();
        return;
      }

      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      submitLabel.textContent = 'Checking details...';
      window.setTimeout(function () {
        if (modal.hidden) return;
        form.reset();
        formPanel.hidden = true;
        confirmation.hidden = false;
        confirmation.focus();
      }, 350);
    });

    modal.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== 'Tab') return;

      var focusable = Array.prototype.slice.call(
        modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter(function (element) {
        return !element.hidden && element.offsetParent !== null;
      });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    document.addEventListener('click', function (event) {
      var target = event.target;
      var trigger = target && target.closest
        ? target.closest('.navbar-consult-btn, .mobile-consult-btn, a[href*="contact.html#consultation"]')
        : null;
      if (!trigger) return;
      event.preventDefault();
      openModal(trigger);
    });

    if (navbar) {
      navbar.querySelectorAll('.navbar-consult-btn, .mobile-consult-btn').forEach(function (trigger) {
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-controls', 'consultationModal');
      });
    }
  }

  function initNavbar() {
    var navbar         = document.getElementById('mainNavbar');
    if (!navbar) return;
    var navToggler     = document.getElementById('navToggler');
    var hamburgerIcon  = document.getElementById('hamburgerIcon');
    var navbarCollapse = document.getElementById('navbarCollapse');
    var themeToggle    = document.getElementById('themeToggle');
    var sunIcon        = document.getElementById('sunIcon');
    var moonIcon       = document.getElementById('moonIcon');
    var mobileThemeToggle = document.getElementById('mobileThemeToggle');
    var mobileSunIcon  = document.getElementById('mobileSunIcon');
    var mobileMoonIcon = document.getElementById('mobileMoonIcon');
    var rtlToggle      = document.getElementById('rtlToggle');
    var rtlLabel       = document.getElementById('rtlLabel');
    var mobileRtlToggle = document.getElementById('mobileRtlToggle');
    var mobileRtlLabel  = document.getElementById('mobileRtlLabel');
    configureProfileMenu(navbar);
    configureMobileAccountLinks(navbarCollapse);
    initConsultationModal(navbar);
    var navLinks = document.querySelectorAll('#navbarCollapse .nav-link');
    var mobileMenuOpen = false;

    // Read persisted state
    var currentTheme = localStorage.getItem('sub_theme') || 'light';
    var currentDir   = localStorage.getItem('sub_dir')   || 'ltr';

    // Apply on load
    applyTheme(currentTheme);
    applyDirection(currentDir);
    setActiveNavLink();

    /* ---- Scroll: transparent → solid ---- */
    function onScroll() {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile Menu ---- */
    if (navToggler) {
      navToggler.addEventListener('click', function () {
        mobileMenuOpen ? closeMobile() : openMobile();
      });
    }

    navbar.querySelectorAll('.mobile-consult-btn').forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileMenuOpen) closeMobile();
      });
    });

    function openMobile() {
      mobileMenuOpen = true;
      navbarCollapse.classList.add('show');
      if (hamburgerIcon) hamburgerIcon.classList.add('open');
      document.body.classList.add('mobile-menu-open');
      navToggler.setAttribute('aria-expanded', 'true');
    }

    function closeMobile() {
      mobileMenuOpen = false;
      navbarCollapse.classList.remove('show');
      if (hamburgerIcon) hamburgerIcon.classList.remove('open');
      document.body.classList.remove('mobile-menu-open');
      navToggler.setAttribute('aria-expanded', 'false');
    }

    // Close on nav link click
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () { if (mobileMenuOpen) closeMobile(); });
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenuOpen) closeMobile();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileMenuOpen && navbarCollapse && navToggler &&
          !navbarCollapse.contains(e.target) && !navToggler.contains(e.target)) {
        closeMobile();
      }
    });

    /* ---- Theme Toggle ---- */
    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      var isDark = theme === 'dark';
      if (sunIcon)       sunIcon.style.display       = isDark ? 'none'  : 'block';
      if (moonIcon)      moonIcon.style.display      = isDark ? 'block' : 'none';
      if (mobileSunIcon)  mobileSunIcon.style.display  = isDark ? 'none'  : 'block';
      if (mobileMoonIcon) mobileMoonIcon.style.display = isDark ? 'block' : 'none';
    }

    function toggleTheme() {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      localStorage.setItem('sub_theme', currentTheme);
    }

    if (themeToggle)       themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    /* ---- RTL Toggle ---- */
    function applyDirection(dir) {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      var label = dir === 'rtl' ? 'RTL' : 'LTR';
      if (rtlLabel)       rtlLabel.textContent       = label;
      if (mobileRtlLabel) mobileRtlLabel.textContent = label;
    }

    function toggleDir() {
      currentDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      applyDirection(currentDir);
      localStorage.setItem('sub_dir', currentDir);
    }

    if (rtlToggle)       rtlToggle.addEventListener('click', toggleDir);
    if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', toggleDir);

    /* ---- Active Nav Link ---- */
    function setActiveNavLink() {
      var page = window.location.pathname.split('/').pop() || 'index.html';
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        var href = link.getAttribute('href') || '';
        if (href === page || (page === '' && href === 'index.html') ||
            (page === 'index.html' && href === 'index.html') ||
            (page.indexOf('service-details') !== -1 && href === 'services.html') ||
            (page.indexOf('blog-detail') !== -1 && href === 'blog.html')) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  }

  // Boot after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }

})();
