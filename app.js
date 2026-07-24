(function () {
  // ---- Theme toggle ----
  var themeBtn = document.getElementById('themeBtn');
  var root = document.documentElement;

  function currentTheme() {
    var stored = root.getAttribute('data-theme');
    if (stored) return stored;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function labelTheme() {
    if (!themeBtn) return;
    themeBtn.textContent = currentTheme() === 'dark' ? 'Light' : 'Dark';
  }

  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      labelTheme();
    });
  }

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navPanel = document.getElementById('navPanel');

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', function () {
      var isOpen = navPanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile panel after a link is tapped
    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navPanel.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
