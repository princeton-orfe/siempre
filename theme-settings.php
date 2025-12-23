<?php

/**
 * @file
 * Theme settings form for the Siempre theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function siempre_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  $form['siempre_settings'] = [
    '#type' => 'details',
    '#title' => t('Siempre Theme Settings'),
    '#open' => TRUE,
  ];

  $form['siempre_settings']['accent_color'] = [
    '#type' => 'color',
    '#title' => t('Accent Color'),
    '#default_value' => theme_get_setting('accent_color') ?? '#0036b1',
    '#description' => t('Select the primary accent color for the theme. This color will be used for links, menu backgrounds, and other accent elements. Complementary colors will be automatically derived.'),
  ];
}
