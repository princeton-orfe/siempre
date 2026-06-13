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
    '#default_value' => theme_get_setting('accent_color') ?? '#e77500',
    '#description' => t('Select the primary accent color for the theme. This color will be used for links, menu backgrounds, and other accent elements. Complementary colors will be automatically derived.'),
  ];

  // Ensure the Page element display section exists and expose Site Name / Slogan.
  if (!isset($form['theme_settings'])) {
    $form['theme_settings'] = [
      '#type' => 'details',
      '#title' => t('Page element display'),
      '#open' => TRUE,
    ];
  }

  $form['theme_settings']['toggle_name'] = [
    '#type' => 'checkbox',
    '#title' => t('Site name'),
    '#default_value' => theme_get_setting('features.name'),
  ];

  $form['theme_settings']['toggle_slogan'] = [
    '#type' => 'checkbox',
    '#title' => t('Site slogan'),
    '#default_value' => theme_get_setting('features.slogan'),
  ];
}

