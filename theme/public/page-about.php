<?php
/**
 * Template Name: About
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$templates = array( 'pages/about.html.twig' );

$context = Timber::get_context();
$context['page'] = new TimberPost();

Timber::render( $templates, $context );