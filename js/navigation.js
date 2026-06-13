/**
 * @file
 * JS for Siempre theme navigation menu toggle.
 */

(function (Drupal, once) {
  Drupal.behaviors.siempreNavigation = {
    attach: function (context) {
      const toggles = once('siempre-nav-toggle', '.mobile-menu-toggle', context);
      toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          const header = toggle.closest('.site-header');
          if (!header) return;

          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', String(!isExpanded));
          header.classList.toggle('mobile-menu-active');
        });
      });
    }
  };
})(Drupal, once);
