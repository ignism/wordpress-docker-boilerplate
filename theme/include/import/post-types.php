<?php
// Register post types

// Register Custom Post Type Global
function create_global_cpt() {

	$labels = array(
		'name' => _x( 'Globals', 'Post Type General Name', 'textdomain' ),
		'singular_name' => _x( 'Global', 'Post Type Singular Name', 'textdomain' ),
		'menu_name' => _x( 'Globals', 'Admin Menu text', 'textdomain' ),
		'name_admin_bar' => _x( 'Global', 'Add New on Toolbar', 'textdomain' ),
		'archives' => __( 'Global Archives', 'textdomain' ),
		'attributes' => __( 'Global Attributes', 'textdomain' ),
		'parent_item_colon' => __( 'Parent Global:', 'textdomain' ),
		'all_items' => __( 'All Globals', 'textdomain' ),
		'add_new_item' => __( 'Add New Global', 'textdomain' ),
		'add_new' => __( 'Add New', 'textdomain' ),
		'new_item' => __( 'New Global', 'textdomain' ),
		'edit_item' => __( 'Edit Global', 'textdomain' ),
		'update_item' => __( 'Update Global', 'textdomain' ),
		'view_item' => __( 'View Global', 'textdomain' ),
		'view_items' => __( 'View Globals', 'textdomain' ),
		'search_items' => __( 'Search Global', 'textdomain' ),
		'not_found' => __( 'Not found', 'textdomain' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
		'featured_image' => __( 'Featured Image', 'textdomain' ),
		'set_featured_image' => __( 'Set featured image', 'textdomain' ),
		'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
		'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
		'insert_into_item' => __( 'Insert into Global', 'textdomain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Global', 'textdomain' ),
		'items_list' => __( 'Globals list', 'textdomain' ),
		'items_list_navigation' => __( 'Globals list navigation', 'textdomain' ),
		'filter_items_list' => __( 'Filter Globals list', 'textdomain' ),
	);
	$args = array(
		'label' => __( 'Global', 'textdomain' ),
		'description' => __( 'Global site Globals', 'textdomain' ),
		'labels' => $labels,
		'menu_icon' => 'dashicons-megaphone',
		'supports' => array('title'),
		'taxonomies' => array(),
		'public' => false,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 5,
		'show_in_admin_bar' => false,
		'show_in_nav_menus' => false,
		'can_export' => true,
		'has_archive' => false,
		'hierarchical' => false,
		'exclude_from_search' => true,
		'show_in_rest' => true,
		'publicly_queryable' => false,
		'capability_type' => 'post',
	);
	register_post_type( 'Global', $args );

}
create_global_cpt();

// function create_course_cpt() {

// 	$labels = array(
// 		'name' => _x( 'Courses', 'Post Type General Name', 'textdomain' ),
// 		'singular_name' => _x( 'Course', 'Post Type Singular Name', 'textdomain' ),
// 		'menu_name' => _x( 'Courses', 'Admin Menu text', 'textdomain' ),
// 		'name_admin_bar' => _x( 'Course', 'Add New on Toolbar', 'textdomain' ),
// 		'archives' => __( 'Course Archives', 'textdomain' ),
// 		'attributes' => __( 'Course Attributes', 'textdomain' ),
// 		'parent_item_colon' => __( 'Parent Course:', 'textdomain' ),
// 		'all_items' => __( 'All Courses', 'textdomain' ),
// 		'add_new_item' => __( 'Add New Course', 'textdomain' ),
// 		'add_new' => __( 'Add New', 'textdomain' ),
// 		'new_item' => __( 'New Course', 'textdomain' ),
// 		'edit_item' => __( 'Edit Course', 'textdomain' ),
// 		'update_item' => __( 'Update Course', 'textdomain' ),
// 		'view_item' => __( 'View Course', 'textdomain' ),
// 		'view_items' => __( 'View Courses', 'textdomain' ),
// 		'search_items' => __( 'Search Course', 'textdomain' ),
// 		'not_found' => __( 'Not found', 'textdomain' ),
// 		'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
// 		'featured_image' => __( 'Featured Image', 'textdomain' ),
// 		'set_featured_image' => __( 'Set featured image', 'textdomain' ),
// 		'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
// 		'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
// 		'insert_into_item' => __( 'Insert into Course', 'textdomain' ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this Course', 'textdomain' ),
// 		'items_list' => __( 'Courses list', 'textdomain' ),
// 		'items_list_navigation' => __( 'Courses list navigation', 'textdomain' ),
// 		'filter_items_list' => __( 'Filter Courses list', 'textdomain' ),
// 	);
// 	$args = array(
// 		'label' => __( 'Course', 'textdomain' ),
// 		'description' => __( '', 'textdomain' ),
// 		'labels' => $labels,
// 		'menu_icon' => 'dashicons-welcome-learn-more',
// 		'supports' => array('title', 'custom-fields'),
// 		'taxonomies' => array(),
// 		'public' => true,
// 		'show_ui' => true,
// 		'show_in_menu' => true,
// 		'menu_position' => 5,
// 		'show_in_admin_bar' => true,
// 		'show_in_nav_menus' => true,
// 		'can_export' => true,
// 		'has_archive' => true,
// 		'hierarchical' => false,
// 		'exclude_from_search' => false,
// 		'show_in_rest' => true,
// 		'publicly_queryable' => true,
// 		'capability_type' => 'post',
// 	);
// 	register_post_type( 'course', $args );

// }
// create_course_cpt();


// // Register Custom Post Type Lecture
// function create_lecture_cpt() {

// 	$labels = array(
// 		'name' => _x( 'Lectures', 'Post Type General Name', 'textdomain' ),
// 		'singular_name' => _x( 'Lecture', 'Post Type Singular Name', 'textdomain' ),
// 		'menu_name' => _x( 'Lectures', 'Admin Menu text', 'textdomain' ),
// 		'name_admin_bar' => _x( 'Lecture', 'Add New on Toolbar', 'textdomain' ),
// 		'archives' => __( 'Lecture Archives', 'textdomain' ),
// 		'attributes' => __( 'Lecture Attributes', 'textdomain' ),
// 		'parent_item_colon' => __( 'Parent Lecture:', 'textdomain' ),
// 		'all_items' => __( 'All Lectures', 'textdomain' ),
// 		'add_new_item' => __( 'Add New Lecture', 'textdomain' ),
// 		'add_new' => __( 'Add New', 'textdomain' ),
// 		'new_item' => __( 'New Lecture', 'textdomain' ),
// 		'edit_item' => __( 'Edit Lecture', 'textdomain' ),
// 		'update_item' => __( 'Update Lecture', 'textdomain' ),
// 		'view_item' => __( 'View Lecture', 'textdomain' ),
// 		'view_items' => __( 'View Lectures', 'textdomain' ),
// 		'search_items' => __( 'Search Lecture', 'textdomain' ),
// 		'not_found' => __( 'Not found', 'textdomain' ),
// 		'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
// 		'featured_image' => __( 'Featured Image', 'textdomain' ),
// 		'set_featured_image' => __( 'Set featured image', 'textdomain' ),
// 		'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
// 		'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
// 		'insert_into_item' => __( 'Insert into Lecture', 'textdomain' ),
// 		'uploaded_to_this_item' => __( 'Uploaded to this Lecture', 'textdomain' ),
// 		'items_list' => __( 'Lectures list', 'textdomain' ),
// 		'items_list_navigation' => __( 'Lectures list navigation', 'textdomain' ),
// 		'filter_items_list' => __( 'Filter Lectures list', 'textdomain' ),
// 	);
// 	$args = array(
// 		'label' => __( 'Lecture', 'textdomain' ),
// 		'description' => __( '', 'textdomain' ),
// 		'labels' => $labels,
// 		'menu_icon' => 'dashicons-welcome-learn-more',
// 		'supports' => array(),
// 		'taxonomies' => array(),
// 		'public' => true,
// 		'show_ui' => true,
// 		'show_in_menu' => true,
// 		'menu_position' => 5,
// 		'show_in_admin_bar' => true,
// 		'show_in_nav_menus' => true,
// 		'can_export' => true,
// 		'has_archive' => true,
// 		'hierarchical' => false,
// 		'exclude_from_search' => false,
// 		'show_in_rest' => true,
// 		'publicly_queryable' => true,
// 		'capability_type' => 'post',
// 	);
// 	register_post_type( 'lecture', $args );

// }
// create_lecture_cpt();