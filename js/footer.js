/**
 * footer.js - Study Upbroad
 * Direct init — newsletter form + copyright year
 */
(function () {
  'use strict';

  function initHomeLinks() {
    var quickLinks = document.querySelector('.site-footer .footer-links');
    if (!quickLinks) return;

    var home1Link = quickLinks.querySelector('a[href="index.html"]');
    if (!home1Link) return;
    home1Link.textContent = 'Home 1';

    var home2Link = quickLinks.querySelector('a[href="home2.html"]');
    if (home2Link) {
      home2Link.textContent = 'Home 2';
      return;
    }

    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = 'home2.html';
    link.textContent = 'Home 2';
    item.appendChild(link);
    home1Link.parentNode.parentNode.insertBefore(item, home1Link.parentNode.nextSibling);
  }

  function initFooter() {
    // Set copyright year
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initHomeLinks();

    // Newsletter form
    var form      = document.getElementById('newsletterForm');
    var emailInput = document.getElementById('newsletterEmail');
    var submitBtn  = document.getElementById('newsletterSubmitBtn');
    var messageEl  = document.getElementById('newsletterMessage');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      messageEl.className = 'newsletter-message';
      messageEl.textContent = '';

      var email = emailInput.value.trim();
      if (!email) {
        show('error', 'Please enter your email address.');
        emailInput.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show('error', 'Please enter a valid email address (e.g. name@domain.com).');
        emailInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing…';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
        emailInput.value = '';
        show('success', 'You\'re subscribed! Welcome to the Study Upbroad community.');
      }, 1300);
    });

    function show(type, text) {
      messageEl.className = 'newsletter-message ' + type;
      messageEl.textContent = text;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }

})();
