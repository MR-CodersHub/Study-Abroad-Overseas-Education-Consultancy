(function () {
  'use strict';

  var theme = localStorage.getItem('sub_theme') || 'light';
  var direction = localStorage.getItem('sub_dir') || 'ltr';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');

  var form = document.getElementById('loginForm');
  if (!form) return;

  var email = document.getElementById('loginEmail');
  var password = document.getElementById('loginPassword');
  var status = document.getElementById('loginStatus');
  var socialStatus = document.getElementById('loginSocialStatus');
  var submitButton = form.querySelector('button[type="submit"]');
  var submitLabel = submitButton.querySelector('span');

  function setError(field, message) {
    var error = document.getElementById(field.id + 'Error');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
      socialStatus.textContent = button.getAttribute('data-social-provider') + ' sign-in is not connected in this demo.';
    });
  });

  document.getElementById('forgotPasswordButton').addEventListener('click', function () {
    status.textContent = 'Password reset is not available in this demo.';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';
    setError(email, '');
    setError(password, '');

    var firstInvalid = null;
    if (!email.value.trim()) {
      setError(email, 'Enter your email address.');
      firstInvalid = email;
    } else if (!validEmail(email.value.trim())) {
      setError(email, 'Enter a valid email address.');
      firstInvalid = email;
    }

    if (!password.value) {
      setError(password, 'Enter your password.');
      if (!firstInvalid) firstInvalid = password;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Checking details...';
    window.setTimeout(function () {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitLabel.textContent = 'Sign in';
      status.textContent = 'Demo sign-in checked. Authentication is not connected, so you are not signed in.';
    }, 350);
  });
})();
