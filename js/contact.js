/**
 * contact.js - Study Upbroad
 * Comprehensive Client-Side Form Validation, Demo Submission & Interactive Enhancements
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initSmoothAnchors();
  });

  /**
   * Initializes the Student Enquiry Form validation and demo submission
   */
  function initContactForm() {
    var form = document.getElementById('studentEnquiryForm');
    var confirmationCard = document.getElementById('enquiryConfirmationCard');
    var clearBtn = document.getElementById('enquiryClearBtn');
    var submitAnotherBtn = document.getElementById('submitAnotherBtn');

    if (!form) return;

    var fields = {
      fullName: document.getElementById('fullName'),
      emailAddress: document.getElementById('emailAddress'),
      mobileNumber: document.getElementById('mobileNumber'),
      countryResidence: document.getElementById('countryResidence'),
      highestQualification: document.getElementById('highestQualification'),
      preferredDestination: document.getElementById('preferredDestination'),
      preferredStudyLevel: document.getElementById('preferredStudyLevel'),
      preferredCourse: document.getElementById('preferredCourse'),
      interestedService: document.getElementById('interestedService'),
      expectedIntake: document.getElementById('expectedIntake'),
      enquiryMessage: document.getElementById('enquiryMessage'),
      consentCheckbox: document.getElementById('consentCheckbox')
    };

    // Attach real-time validation listeners
    Object.keys(fields).forEach(function (key) {
      var el = fields[key];
      if (!el) return;

      var eventType = el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(eventType, function () {
        validateField(key, el);
      });
      el.addEventListener('blur', function () {
        validateField(key, el);
      });
    });

    // Form Submit Event
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var firstInvalidField = null;

      // Validate all required fields
      ['fullName', 'emailAddress', 'mobileNumber', 'countryResidence',
       'highestQualification', 'preferredDestination', 'preferredStudyLevel',
       'interestedService', 'enquiryMessage', 'consentCheckbox'].forEach(function (key) {
        var el = fields[key];
        if (!validateField(key, el)) {
          isValid = false;
          if (!firstInvalidField) {
            firstInvalidField = el;
          }
        }
      });

      if (!isValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      // Valid demo submission
      var submitBtn = document.getElementById('enquirySubmitBtn');
      var originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing...</span>';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Populate summary box
        setSafeText('summaryFullName', fields.fullName.value);
        setSafeText('summaryEmail', fields.emailAddress.value);
        setSafeText('summaryPhone', fields.mobileNumber.value);
        setSafeText('summaryDestination', fields.preferredDestination.value);
        setSafeText('summaryService', fields.interestedService.value);

        // Transition UI to Confirmation
        form.style.display = 'none';
        if (confirmationCard) {
          confirmationCard.style.display = 'block';
          confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 700);
    });

    // Clear Form Event
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        form.reset();
        Object.keys(fields).forEach(function (key) {
          var el = fields[key];
          if (el) {
            el.classList.remove('is-invalid');
          }
        });
      });
    }

    // Submit Another Enquiry Event
    if (submitAnotherBtn) {
      submitAnotherBtn.addEventListener('click', function () {
        form.reset();
        Object.keys(fields).forEach(function (key) {
          var el = fields[key];
          if (el) {
            el.classList.remove('is-invalid');
          }
        });
        if (confirmationCard) {
          confirmationCard.style.display = 'none';
        }
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /**
   * Validates an individual field by its identifier
   */
  function validateField(key, el) {
    if (!el) return true;

    var valid = true;
    var value = el.value ? el.value.trim() : '';

    switch (key) {
      case 'fullName':
        valid = value.length >= 2;
        break;
      case 'emailAddress':
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'mobileNumber':
        valid = /^[0-9+\-\s()]{7,20}$/.test(value);
        break;
      case 'countryResidence':
        valid = value.length >= 2;
        break;
      case 'highestQualification':
      case 'preferredDestination':
      case 'preferredStudyLevel':
      case 'interestedService':
        valid = value !== '' && value !== null;
        break;
      case 'enquiryMessage':
        valid = value.length >= 20;
        break;
      case 'consentCheckbox':
        valid = el.checked;
        break;
      default:
        valid = true;
    }

    if (!valid) {
      el.classList.add('is-invalid');
    } else {
      el.classList.remove('is-invalid');
    }

    return valid;
  }

  /**
   * Helper to set text safely in an element
   */
  function setSafeText(id, text) {
    var elem = document.getElementById(id);
    if (elem) {
      elem.textContent = text || '-';
    }
  }

  /**
   * Smoothly scrolls to section anchors like #enquiryFormSection or #consultation
   */
  function initSmoothAnchors() {
    var hash = window.location.hash;
    if (hash === '#consultation' || hash === '#enquiryFormSection') {
      var target = document.getElementById('enquiryFormSection');
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }

    // Support smooth clicks on internal hash links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        if (this.classList.contains('navbar-consult-btn') || this.classList.contains('mobile-consult-btn')) {
          return;
        }
        var href = this.getAttribute('href');
        if (href.length > 1) {
          var el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

})();
