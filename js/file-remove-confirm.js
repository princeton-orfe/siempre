/**
 * @file
 * Confirm before the Submission File Remove button fires.
 *
 * The Remove button on the managed_file widget is wired to Drupal's
 * AJAX framework, which binds its trigger to mousedown (not click)
 * for submit inputs — so a click-only listener fires too late. Hook
 * mousedown and keydown (Enter/Space) in capture phase, with a short
 * memo per button so we don't double-prompt when click follows the
 * same user gesture.
 */
(function (Drupal, once) {
  'use strict';

  var MESSAGE = 'Remove the uploaded file from this submission?\n\n' +
    'The file will be detached when you save the form. ' +
    'Click OK to proceed, or Cancel to keep the existing file.';

  function attachConfirm(btn) {
    var lastAnswer = null;
    var lastTime = 0;

    function intercept(e) {
      var now = Date.now();
      if (lastAnswer !== null && now - lastTime < 500) {
        if (!lastAnswer) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }
      lastAnswer = window.confirm(Drupal.t(MESSAGE));
      lastTime = now;
      if (!lastAnswer) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }

    btn.addEventListener('mousedown', function (e) {
      if (e.button === 0) {
        intercept(e);
      }
    }, true);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
        intercept(e);
      }
    }, true);
    btn.addEventListener('click', intercept, true);
  }

  Drupal.behaviors.siempreFileRemoveConfirm = {
    attach: function (context) {
      once(
        'siempre-file-remove-confirm',
        '.form-managed-file .remove-button',
        context
      ).forEach(attachConfirm);
    }
  };
})(Drupal, once);
