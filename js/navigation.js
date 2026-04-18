/**
 * @file navigation.js
 * Meadow Lane Park — mobile navigation toggle.
 */
(function () {
  'use strict';

  function init() {
    var toggle = document.querySelector('.nav__toggle');
    var menu   = document.getElementById('primary-nav');

    if (!toggle || !menu) return;

    // Remove any data-once attribute set by a previous Drupal behavior
    // so we have clean sole ownership of this element.
    toggle.removeAttribute('data-once');

    // Replace the node to strip all previously attached event listeners.
    var fresh = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(fresh, toggle);
    toggle = fresh;

    function open()  {
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('data-open', 'true');
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.removeAttribute('data-open');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// ── Member portal nav toggle (mobile) ──────────────────
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.member-nav-toggle');
  if (!toggle) return;

  var collapse = document.getElementById('member-nav-collapse');
  if (!collapse) return;

  toggle.addEventListener('click', function () {
    var open = toggle.classList.contains('is-open');
    if (open) {
      toggle.classList.remove('is-open');
      collapse.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.classList.add('is-open');
      collapse.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when a nav link is tapped
  collapse.querySelectorAll('.member-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('is-open');
      collapse.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Drupal behaviors fallback for member nav toggle
if (typeof Drupal !== 'undefined') {
  Drupal.behaviors.memberNavToggle = {
    attach: function (context) {
      var toggle = context.querySelector ? context.querySelector('.member-nav-toggle') : null;
      if (!toggle || toggle.dataset.memberNavInit) return;
      toggle.dataset.memberNavInit = '1';

      var collapse = document.getElementById('member-nav-collapse');
      if (!collapse) return;

      toggle.addEventListener('click', function () {
        var open = toggle.classList.contains('is-open');
        toggle.classList.toggle('is-open', !open);
        collapse.classList.toggle('is-open', !open);
        toggle.setAttribute('aria-expanded', String(!open));
      });

      collapse.querySelectorAll('.member-nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
          toggle.classList.remove('is-open');
          collapse.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  };
}
