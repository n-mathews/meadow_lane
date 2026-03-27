/**
 * @file navigation.js
 * Meadow Lane Park — mobile navigation toggle and accessibility.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.meadowLaneNavigation = {
    attach(context) {
      once('mobile-nav', '.nav__toggle', context).forEach((toggle) => {
        const menu = document.getElementById(
          toggle.getAttribute('aria-controls')
        );

        if (!menu) return;

        // Open / close.
        toggle.addEventListener('click', () => {
          const isOpen = toggle.getAttribute('aria-expanded') === 'true';
          setMenuState(!isOpen);
        });

        // Close on Escape.
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setMenuState(false);
            toggle.focus();
          }
        });

        // Close when clicking outside.
        document.addEventListener('click', (e) => {
          if (
            toggle.getAttribute('aria-expanded') === 'true' &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)
          ) {
            setMenuState(false);
          }
        });

        // Trap focus inside open menu on mobile.
        menu.addEventListener('keydown', (e) => {
          if (e.key !== 'Tab') return;
          const focusable = menu.querySelectorAll(
            'a, button, [tabindex="0"]'
          );
          const first = focusable[0];
          const last  = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        });

        function setMenuState(open) {
          toggle.setAttribute('aria-expanded', String(open));
          menu.classList.toggle('is-open', open);
          document.body.classList.toggle('nav-is-open', open);
          // Prevent body scroll when menu is open on mobile.
          document.body.style.overflow = open ? 'hidden' : '';
        }
      });
    },
  };

})(Drupal, once);
