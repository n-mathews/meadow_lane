/**
 * @file listing-signup.js
 * Meadow Lane Park — email signup for new listing notifications.
 *
 * Posts the subscriber's email directly to the Kit (ConvertKit) API
 * using their public form subscription endpoint. No server-side code
 * or Drupal module required.
 *
 * Kit API endpoint (public, no auth needed):
 *   POST https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe
 *   Body: { api_key: "YOUR_PUBLIC_API_KEY", email: "user@example.com" }
 *
 * Configuration:
 *   Set your Kit Form ID in Appearance → Settings → Meadow Lane Park.
 *   Set your Kit public API key in the same settings form.
 *   Both values are output as data attributes on .listing-signup.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.meadowLaneListingSignup = {
    attach(context) {
      once('listing-signup', '.listing-signup', context).forEach((widget) => {
        const formId  = widget.dataset.kitFormId;
        const apiKey  = widget.dataset.kitApiKey;
        const form    = widget.querySelector('.listing-signup__form');
        const success = widget.querySelector('.listing-signup__success');
        const errorEl = widget.querySelector('.listing-signup__error');
        const btn     = widget.querySelector('.listing-signup__btn');
        const input   = widget.querySelector('.listing-signup__input');

        if (!form || !formId || !apiKey) {
          // Missing config — show a quiet warning in the console only.
          if (!formId || !apiKey) {
            console.warn(
              'Meadow Lane listing signup: Kit Form ID or API key not set. ' +
              'Configure at Appearance → Settings → Meadow Lane Park.'
            );
          }
          return;
        }

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          clearError();

          const email = input.value.trim();

          if (!email || !isValidEmail(email)) {
            showError(Drupal.t('Please enter a valid email address.'));
            input.focus();
            return;
          }

          setLoading(true);

          try {
            const response = await fetch(
              `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                  api_key: apiKey,
                  email: email,
                }),
              }
            );

            const data = await response.json();

            if (!response.ok || data.error) {
              // Kit returns 200 even for some errors; check both.
              throw new Error(data.message || `HTTP ${response.status}`);
            }

            // Success — swap form for confirmation message.
            form.hidden = true;
            success.hidden = false;

            // Persist so the signup doesn't re-appear on next page load.
            try {
              sessionStorage.setItem('mlp_listing_signup_done', '1');
            } catch (_) {}

          } catch (err) {
            console.error('Listing signup error:', err);
            showError(
              Drupal.t('Something went wrong — please try again in a moment.')
            );
          } finally {
            setLoading(false);
          }
        });

        // If already signed up this session, show success state immediately.
        try {
          if (sessionStorage.getItem('mlp_listing_signup_done')) {
            form.hidden = true;
            success.hidden = false;
          }
        } catch (_) {}

        // ── Helpers ──────────────────────────────────────────

        function setLoading(loading) {
          btn.disabled = loading;
          btn.classList.toggle('is-loading', loading);
          input.disabled = loading;
        }

        function showError(message) {
          errorEl.textContent = message;
          errorEl.hidden = false;
        }

        function clearError() {
          errorEl.textContent = '';
          errorEl.hidden = true;
        }

        function isValidEmail(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
      });
    },
  };

})(Drupal, once);
