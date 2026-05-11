/**
 * @file
 * Auto-populated "Jump to:" secondary nav.
 *
 * On any page whose main content contains 2 or more visible <h2>
 * elements, prepends a sticky horizontal nav bar with anchor links to
 * each H2. H2s missing an id attribute get a slug-based id assigned so
 * they can be linked. Headings that are visually hidden (block titles,
 * sr-only) are excluded.
 */
(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.siempreJumpTo = {
    attach: function (context) {
      once('siempre-jump-to', 'main.main-content', context).forEach(function (main) {
        var headings = Array.prototype.slice.call(main.querySelectorAll('h2'));

        // Filter out visually-hidden, empty, or in-form/in-nav headings —
        // we only want content section headings.
        var visible = headings.filter(function (h) {
          if (!h.textContent.trim()) return false;
          if (h.classList.contains('visually-hidden')) return false;
          if (h.classList.contains('sr-only')) return false;
          // Walk ancestors; skip if we're inside a nav, form, or aside.
          for (var el = h.parentElement; el && el !== main; el = el.parentElement) {
            var tag = el.tagName;
            if (tag === 'NAV' || tag === 'FORM' || tag === 'ASIDE') return false;
            if (el.classList && el.classList.contains('visually-hidden')) return false;
          }
          return true;
        });

        if (visible.length < 2) return;

        var nav = document.createElement('nav');
        nav.className = 'jump-to-nav';
        nav.setAttribute('aria-label', Drupal.t('Jump to section'));

        var label = document.createElement('span');
        label.className = 'jump-to-nav__label';
        label.textContent = Drupal.t('Jump to:');
        nav.appendChild(label);

        var list = document.createElement('ul');
        list.className = 'jump-to-nav__list';

        visible.forEach(function (h, idx) {
          if (!h.id) {
            h.id = 'jump-' + idx + '-' + h.textContent.trim()
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .substring(0, 60);
          }
          var li = document.createElement('li');
          li.className = 'jump-to-nav__item';
          var a = document.createElement('a');
          a.className = 'jump-to-nav__link';
          a.href = '#' + h.id;
          a.textContent = h.textContent.trim();
          li.appendChild(a);
          list.appendChild(li);
        });

        nav.appendChild(list);
        main.insertBefore(nav, main.firstChild);
      });
    }
  };
})(Drupal, once);
