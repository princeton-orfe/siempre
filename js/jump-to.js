/**
 * @file
 * Auto-populated "Jump to:" secondary nav.
 *
 * On any page whose main content contains 2 or more visible <h2>
 * elements, inserts a sticky horizontal nav bar directly below the
 * site header with anchor links to each H2. H2s missing an id get a
 * slug-based id assigned. Headings that are visually hidden or live
 * inside nav/form/aside ancestors are excluded.
 *
 * A MutationObserver re-scans main.main-content for H2s after AJAX
 * block inserts so views/blocks that arrive late (e.g. "Submissions")
 * still get a Jump to entry.
 *
 * Once the user has scrolled past BACK_TO_TOP_THRESHOLD pixels the
 * nav reveals a "Back to Top" link that smooth-scrolls to the top.
 */
(function (Drupal, once) {
  'use strict';

  var BACK_TO_TOP_THRESHOLD = 400;

  function isVisible(h, main) {
    if (!h.textContent.trim()) return false;
    if (h.classList.contains('visually-hidden')) return false;
    if (h.classList.contains('sr-only')) return false;
    for (var el = h.parentElement; el && el !== main; el = el.parentElement) {
      var tag = el.tagName;
      if (tag === 'NAV' || tag === 'FORM' || tag === 'ASIDE') return false;
      if (el.classList && el.classList.contains('visually-hidden')) return false;
    }
    return true;
  }

  function slugify(text, idx) {
    return 'jump-' + idx + '-' + text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }

  function collectHeadings(main) {
    var all = Array.prototype.slice.call(main.querySelectorAll('h2'));
    return all.filter(function (h) { return isVisible(h, main); });
  }

  function createNav() {
    var nav = document.createElement('nav');
    nav.className = 'jump-to-nav';
    nav.setAttribute('aria-label', Drupal.t('Jump to section'));

    var label = document.createElement('span');
    label.className = 'jump-to-nav__label';
    label.textContent = Drupal.t('Jump to:');
    nav.appendChild(label);

    var list = document.createElement('ul');
    list.className = 'jump-to-nav__list';
    nav.appendChild(list);

    // Back-to-Top item is kept at the end of the list and shown/hidden
    // via the .jump-to-nav--scrolled modifier on the parent nav.
    var backLi = document.createElement('li');
    backLi.className = 'jump-to-nav__item jump-to-nav__item--back-to-top';
    var backA = document.createElement('a');
    backA.className = 'jump-to-nav__link jump-to-nav__link--back-to-top';
    backA.href = '#';
    backA.textContent = Drupal.t('Back to Top');
    backA.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    backLi.appendChild(backA);
    list.appendChild(backLi);

    return nav;
  }

  function renderItems(list, headings) {
    var existing = list.querySelectorAll(
      '.jump-to-nav__item:not(.jump-to-nav__item--back-to-top)'
    );
    Array.prototype.forEach.call(existing, function (el) { el.remove(); });

    var backLi = list.querySelector('.jump-to-nav__item--back-to-top');
    headings.forEach(function (h, idx) {
      if (!h.id) {
        h.id = slugify(h.textContent.trim(), idx);
      }
      var li = document.createElement('li');
      li.className = 'jump-to-nav__item';
      var a = document.createElement('a');
      a.className = 'jump-to-nav__link';
      a.href = '#' + h.id;
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      list.insertBefore(li, backLi);
    });
  }

  function placeNav(main, nav) {
    // Prefer: insert right after the site header so the nav sits below the
    // brand row AND every menu region (header / pre_content) rather than
    // inside <main>. Fall back to inserting as a sibling immediately before
    // <main>.
    //
    // The lookup priority below is significant. siempre's page.html.twig
    // renders the brand block inside <div class="region region-header header">
    // AND the page.header region (which contains the main navigation block)
    // also produces a <div class="region region-header"> wrapper. Selecting on
    // .region-header therefore matches the brand wrapper first, and inserting
    // after it lands the jump-to nav between the brand and the main menu —
    // exactly where we don't want it. Always prefer the outer <header> element
    // by role / class first; the .region-header fallback only fires when no
    // <header> element exists at all.
    var header = document.querySelector('header[role="banner"]') ||
                 document.querySelector('header.site-header') ||
                 document.querySelector('header.header') ||
                 document.querySelector('header') ||
                 document.querySelector('.region-header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(nav, header.nextSibling);
      return;
    }
    if (main.parentNode) {
      main.parentNode.insertBefore(nav, main);
      return;
    }
    main.insertBefore(nav, main.firstChild);
  }

  function attachScrollToggle(nav) {
    var update = function () {
      if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
        nav.classList.add('jump-to-nav--scrolled');
      }
      else {
        nav.classList.remove('jump-to-nav--scrolled');
      }
    };
    var queued = false;
    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        update();
        queued = false;
      });
    }, { passive: true });
    update();
  }

  Drupal.behaviors.siempreJumpTo = {
    attach: function (context) {
      once('siempre-jump-to', 'main.main-content', context).forEach(function (main) {
        var nav = null;
        var list = null;

        function ensureNav() {
          if (nav) return;
          nav = createNav();
          list = nav.querySelector('.jump-to-nav__list');
          placeNav(main, nav);
          attachScrollToggle(nav);
        }

        function refresh() {
          var headings = collectHeadings(main);
          if (headings.length < 2) return;
          ensureNav();
          renderItems(list, headings);
        }

        refresh();

        // AJAX-inserted blocks (e.g. Views that render a new H2 after
        // initial load) won't be in the DOM when attach() first runs.
        // Re-scan on subtree changes, debounced to coalesce bursts.
        var debounce = null;
        var observer = new MutationObserver(function () {
          if (debounce) clearTimeout(debounce);
          debounce = setTimeout(refresh, 100);
        });
        observer.observe(main, { childList: true, subtree: true });
      });
    }
  };
})(Drupal, once);
