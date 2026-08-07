(function () {


  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navPanel = document.getElementById('navPanel');

  if (navToggle && navPanel) {
    function setNav(open) {
      navPanel.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    navToggle.addEventListener('click', function () {
      setNav(!navPanel.classList.contains('open'));
    });

    // Close the mobile panel after a link is tapped
    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    // Escape closes it, and focus returns to the button that opened it
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navPanel.classList.contains('open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    // Tapping anywhere outside the panel closes it
    document.addEventListener('click', function (e) {
      if (!navPanel.classList.contains('open')) return;
      if (navPanel.contains(e.target) || navToggle.contains(e.target)) return;
      setNav(false);
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
