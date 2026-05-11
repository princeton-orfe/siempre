/**
 * @file
 * Confirm before the Submission File Remove button fires.
 *
 * The Remove button on the managed_file widget is wired to Drupal's
 * ajax framework and unhooks the file the moment it's clicked (the
 * underlying record isn't deleted until the form is saved, but the
 * UI state changes immediately and an inattentive click could lose
 * the upload reference before the user realizes). Listen on the
 * capture phase so we run before Drupal's ajax click handler, and
 * stop propagation when the user cancels.
 */
(function (Drupal, once) {
  'use strict';

  var MESSAGE = 'Remove the uploaded file from this submission?\n\n' +
    'The file will be detached when you save the form. ' +
    'Click OK to proceed, or Cancel to keep the existing file.';

  Drupal.behaviors.siempreFileRemoveConfirm = {
    attach: function (context) {
      once(
        'siempre-file-remove-confirm',
        '.form-managed-file .remove-button',
        context
      ).forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          if (!window.confirm(Drupal.t(MESSAGE))) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }, true);
      });
    }
  };
})(Drupal, once);
