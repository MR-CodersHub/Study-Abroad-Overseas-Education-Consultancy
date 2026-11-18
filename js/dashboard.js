(function () {
  'use strict';

  var root = document.documentElement;
  var theme = localStorage.getItem('sub_theme') || 'light';
  var direction = localStorage.getItem('sub_dir') || 'ltr';

  function applyTheme(value) {
    theme = value;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('sub_theme', theme);
  }

  function applyDirection(value) {
    direction = value;
    root.setAttribute('dir', direction);
    root.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');
    localStorage.setItem('sub_dir', direction);
    var directionButton = document.getElementById('dashboardDirectionToggle');
    if (directionButton) directionButton.textContent = direction.toUpperCase();
  }

  applyTheme(theme);
  applyDirection(direction);

  document.getElementById('dashboardThemeToggle').addEventListener('click', function () {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  });

  document.getElementById('dashboardDirectionToggle').addEventListener('click', function () {
    applyDirection(direction === 'ltr' ? 'rtl' : 'ltr');
  });
})();
