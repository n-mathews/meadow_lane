<?php

/**
 * @file
 * Theme settings for Meadow Lane Park.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function meadow_lane_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state): void {

  $form['meadow_lane_settings'] = [
    '#type' => 'details',
    '#title' => t('Meadow Lane Park Theme Settings'),
    '#open' => TRUE,
  ];

  // Community tagline shown in hero.
  $form['meadow_lane_settings']['hero_tagline'] = [
    '#type' => 'textfield',
    '#title' => t('Hero tagline'),
    '#default_value' => theme_get_setting('hero_tagline') ?? 'Life on the Thousand Islands',
    '#description' => t('Main headline displayed in the homepage hero section.'),
  ];

  $form['meadow_lane_settings']['hero_subtext'] = [
    '#type' => 'textarea',
    '#title' => t('Hero subtext'),
    '#rows' => 3,
    '#default_value' => theme_get_setting('hero_subtext') ?? 'A welcoming, resident-owned community nestled along the shores of the St. Lawrence River in the heart of the 1000 Islands region, New York.',
    '#description' => t('Supporting text shown beneath the hero headline.'),
  ];

  // Contact details.
  $form['meadow_lane_settings']['contact'] = [
    '#type' => 'details',
    '#title' => t('Contact information'),
    '#open' => TRUE,
  ];

  $form['meadow_lane_settings']['contact']['contact_phone'] = [
    '#type' => 'tel',
    '#title' => t('Phone number'),
    '#default_value' => theme_get_setting('contact_phone') ?? '',
  ];

  $form['meadow_lane_settings']['contact']['contact_email'] = [
    '#type' => 'email',
    '#title' => t('Email address'),
    '#default_value' => theme_get_setting('contact_email') ?? '',
  ];

  $form['meadow_lane_settings']['contact']['contact_address'] = [
    '#type' => 'textfield',
    '#title' => t('Street address'),
    '#default_value' => theme_get_setting('contact_address') ?? 'Alexandria Bay, New York',
  ];

  // Social links.
  $form['meadow_lane_settings']['social'] = [
    '#type' => 'details',
    '#title' => t('Social media links'),
    '#open' => FALSE,
  ];

  $form['meadow_lane_settings']['social']['social_facebook'] = [
    '#type' => 'url',
    '#title' => t('Facebook URL'),
    '#default_value' => theme_get_setting('social_facebook') ?? '',
  ];

  // Footer text.
  $form['meadow_lane_settings']['footer_tagline'] = [
    '#type' => 'textfield',
    '#title' => t('Footer tagline'),
    '#default_value' => theme_get_setting('footer_tagline') ?? 'A seasonal, resident-owned community on the St. Lawrence River — incorporated 2018.',
  ];

  // Member area toggle.
  $form['meadow_lane_settings']['show_member_login'] = [
    '#type' => 'checkbox',
    '#title' => t('Show "Member Login" button in navigation'),
    '#default_value' => theme_get_setting('show_member_login') ?? TRUE,
    '#description' => t('When enabled, a Member Login button appears in the primary navigation. Disable until your secure member area is ready.'),
  ];
}
