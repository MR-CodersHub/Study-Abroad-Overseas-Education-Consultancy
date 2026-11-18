(function () {
  'use strict';

  var theme = localStorage.getItem('sub_theme') || 'light';
  var direction = localStorage.getItem('sub_dir') || 'ltr';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');

  var form = document.getElementById('signupForm');
  if (!form) return;

  var fields = {
    name: document.getElementById('signupName'),
    email: document.getElementById('signupEmail'),
    mobile: document.getElementById('signupMobile'),
    destination: document.getElementById('signupDestination'),
    studyLevel: document.getElementById('signupLevel'),
    password: document.getElementById('signupPassword'),
    confirmPassword: document.getElementById('signupConfirmPassword'),
    terms: document.getElementById('signupTerms')
  };
  var strength = document.getElementById('passwordStrength');
  var strengthLabel = strength.querySelector('.password-strength-label');
  var socialStatus = document.getElementById('signupSocialStatus');
  var confirmation = document.getElementById('signupConfirmation');
  var submitButton = form.querySelector('button[type="submit"]');
  var submitLabel = submitButton.querySelector('span');

  function setError(name, message) {
    var field = fields[name];
    var error = document.getElementById(field.id + 'Error');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validMobile(value) {
    var digits = value.replace(/\D/g, '');
    return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
  }

  function updatePasswordStrength() {
    var value = fields.password.value;
    var checks = [
      value.length >= 8,
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value)
    ];
    var score = checks.filter(Boolean).length;
    strength.setAttribute('data-strength', value ? String(score || 1) : '0');
    if (!value) {
      strengthLabel.textContent = 'Use 8 or more characters';
    } else if (score <= 1) {
      strengthLabel.textContent = 'Weak password';
    } else if (score === 2) {
      strengthLabel.textContent = 'Fair password';
    } else if (score === 3) {
      strengthLabel.textContent = 'Good password';
    } else {
      strengthLabel.textContent = 'Strong password';
    }
  }

  function validateField(name) {
    var field = fields[name];
    var value = field.type === 'checkbox' ? field.checked : field.value.trim();
    var message = '';

    if (name === 'name' && !value) {
      message = 'Enter your full name.';
    } else if (name === 'name' && value.length < 2) {
      message = 'Enter at least 2 characters.';
    } else if (name === 'email' && !value) {
      message = 'Enter your email address.';
    } else if (name === 'email' && !validEmail(value)) {
      message = 'Enter a valid email address.';
    } else if (name === 'mobile' && !value) {
      message = 'Enter your mobile number.';
    } else if (name === 'mobile' && !validMobile(value)) {
      message = 'Enter a valid number with 7 to 15 digits.';
    } else if ((name === 'destination' || name === 'studyLevel') && !value) {
      message = 'Choose an option to continue.';
    } else if (name === 'password' && !value) {
      message = 'Choose a password.';
    } else if (name === 'password' && (value.length < 8 || !/[A-Za-z]/.test(value) || !/\d/.test(value))) {
      message = 'Use at least 8 characters, including a letter and a number.';
    } else if (name === 'confirmPassword' && !value) {
      message = 'Confirm your password.';
    } else if (name === 'confirmPassword' && value !== fields.password.value) {
      message = 'The passwords do not match.';
    } else if (name === 'terms' && !value) {
      message = 'Accept the Terms and Privacy Policy to continue.';
    }

    setError(name, message);
    return message;
  }

  form.querySelectorAll('[data-password-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var input = document.getElementById(toggle.getAttribute('data-password-toggle'));
      var showing = input.type === 'password';
      input.type = showing ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', showing ? 'true' : 'false');
      toggle.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
    });
  });

  form.querySelectorAll('[data-social-provider]').forEach(function (button) {
    button.addEventListener('click', function () {
      socialStatus.textContent = button.getAttribute('data-social-provider') + ' sign-up is not connected in this demo.';
    });
  });

  fields.password.addEventListener('input', function () {
    updatePasswordStrength();
    if (fields.password.getAttribute('aria-invalid') === 'true') validateField('password');
    if (fields.confirmPassword.value) validateField('confirmPassword');
  });

  Object.keys(fields).forEach(function (name) {
    var field = fields[name];
    field.addEventListener('blur', function () {
      validateField(name);
    });
    field.addEventListener(field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var order = ['name', 'email', 'mobile', 'destination', 'studyLevel', 'password', 'confirmPassword', 'terms'];
    var invalidFields = [];
    order.forEach(function (name) {
      if (validateField(name)) invalidFields.push(fields[name]);
    });

    if (invalidFields.length) {
      invalidFields[0].focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Preparing preview...';
    window.setTimeout(function () {
      form.reset();
      updatePasswordStrength();
      form.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    }, 400);
  });
})();
