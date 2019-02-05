<?php
/**
 * Plugin Name: KP Demo Blocks
 * Plugin URI: 
 * Description: example blocks
 * Author: Keisha Perry
 * Version: 0.0.1

 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Enqueue the blocks' assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function kpdemo_enqueue_block_editor_assets() {
	// Block Script - build (editor).
	wp_enqueue_script( 'kpdemo-blocks', plugin_dir_url( __FILE__ ) . 'dist/blocks/blocks.build.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-dom' ),	"0.0.1", true	);

	//Block core UIkit
	wp_enqueue_style(
		'uikit-core-editor', // Handle.
		plugin_dir_url( __FILE__ ) . 'dist/assets/css/uikit.min.css', // File.
		array( 'wp-edit-blocks' ), // Dependency.
		filemtime( plugin_dir_path( __FILE__ ) . 'dist/assets/css/uikit.min.css' )
	);
	//Block core UIkit
	wp_enqueue_style(
		'cmw-uikit-blocks-editor', // Handle.
		plugin_dir_url( __FILE__ ) . 'dist/assets/css/uikit.admin-block-editor.css', // File.
		array( 'wp-edit-blocks' ), // Dependency.
		"1.0.1"
	);
	/* wp_enqueue_script(
		'uikit-core-editor', // Handle.
		plugin_dir_url( __FILE__ ) . 'dist/assets/js/uikit.min.js', // File.
		array( 'jquery' ), // Dependency.
		filemtime( plugin_dir_path( __FILE__ ) . 'dist/assets/js/uikit.min.js' )
	);

    // Block Styles (editor).
	wp_enqueue_style(
		'careers-blocks-editor', // Handle.
		plugin_dir_url( __FILE__ ) . 'dist/assets/css/editor.css', // File.
		array( 'wp-edit-blocks' ), // Dependency.
		filemtime( plugin_dir_path( __FILE__ ) . 'dist/assets/css/editor.css' )
	); */

	
}
add_action( 'enqueue_block_editor_assets', 'kpdemo_enqueue_block_editor_assets' );



/**
 * No frontend styles to enqueue. If we had them we'd add them here.
 * Blocks to inherit styles from active uikit theme.
 *
 * @since 1.0.0
 */


 
 
/**
 * Register server-side code for individual blocks.
 * 
 *
 * @since 1.0.0
 */
foreach ( glob( plugin_dir_path( __FILE__ ) . 'resources/blocks/*/index.php' ) as $block_logic ) {
	require $block_logic;
}








