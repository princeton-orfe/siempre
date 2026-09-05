<?php

/**
 * @file
 * Cross-version compatibility helpers for the Siempre theme.
 *
 * This theme declares ^9 || ^10 || ^11 and is shared between more than one
 * site, so it must run unchanged on all of them. That rules out simply
 * switching to the newest API whenever core deprecates something: the sites do
 * not upgrade in lockstep, and a helper that only works on the newest core
 * would break the ones still behind.
 */

if (!function_exists('_siempre_theme_setting')) {

  /**
   * Read a theme setting, on any supported core version.
   *
   * theme_get_setting() is deprecated in Drupal 11.3 and removed in Drupal 13,
   * replaced by the Drupal\Core\Extension\ThemeSettingsProvider service. The
   * service does not exist before 11.3, and the function still works (loudly)
   * up to 13, so the only formulation that runs on 9, 10 and 11 alike is to
   * prefer the service and fall back to the function.
   *
   * Written this way deliberately rather than waiting for every consumer of
   * this theme to reach 11.3: waiting would have blocked the fix on an
   * unrelated repository's upgrade schedule, and left real deprecation warnings
   * in the meantime. This has no such dependency and can be deleted once every
   * consumer is on 11.3+, any time before Drupal 13.
   *
   * The signatures line up exactly — theme_get_setting($setting_name, $theme)
   * and ThemeSettingsProvider::getSetting(string $setting_name, ?string $theme)
   * — so this is a drop-in for both.
   *
   * @param string $setting_name
   *   The setting name, e.g. 'accent_color' or 'features.name'.
   * @param string|null $theme
   *   The theme to read from, or NULL for the active theme.
   *
   * @return mixed
   *   The setting value, or NULL when it is not set.
   */
  function _siempre_theme_setting(string $setting_name, ?string $theme = NULL): mixed {
    // Ask the container rather than testing the core version. A version check
    // would have to guess how the service is registered in versions this code
    // has never run against; has() answers the question that actually matters.
    if (\Drupal::hasService('Drupal\Core\Extension\ThemeSettingsProvider')) {
      return \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider')
        ->getSetting($setting_name, $theme);
    }

    // Drupal 9, 10, and 11.0–11.2.
    //
    // This is the one deliberate call to the deprecated function, and the whole
    // point of this file is that it is the ONLY one. Suppressed here rather than
    // in a consumer's phpstan config so the suppression travels with the theme:
    // a site that scans for deprecations should get a clean result from this
    // theme without having to know it needs an exception for it.
    // @phpstan-ignore-next-line
    return theme_get_setting($setting_name, $theme);
  }

}
