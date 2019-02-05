<?php

function kpdemo_render_block_uk_accordion( $attributes, $content ) {
	if (!is_admin()){
		$clean_content = trim($content);
		$title = $attributes['title'];
		ob_start();
		include( plugin_dir_path (__FILE__ ) . 'partials/accordion.php');
        return ob_get_clean();
	}
}

function register_block_kpdemo_uk_accordion(){

	register_block_type( 'kpdemo-blocks/uk-accordion', array(
		'attributes'      => array(
			'size'  => array(
				'type' => 'select',
				'default' => 'large',
			),
			'title' => array(
				'type' => 'string',
				'source' => 'children',
				'selector' => 'p',
			),
			
		),
		
		'render_callback' => 'kpdemo_render_block_uk_accordion',
	) );
}
add_action( 'init', 'register_block_kpdemo_uk_accordion' );