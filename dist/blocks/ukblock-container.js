( function( blocks, i18n, element ) {
    /* Set up variables */
    var el = element.createElement;
    var children = blocks.source.children;
    var BlockControls = wp.blocks.BlockControls;
    var AlignmentToolbar = wp.blocks.AlignmentToolbar;
    //var MediaUpload = wp.blocks.MediaUpload; //dont need on this block?
    var InspectorControls = wp.blocks.InspectorControls;
    var TextControl = wp.blocks.InspectorControls.TextControl;
    var SelectControl = wp.blocks.InspectorControls.SelectControl;
    
    
    /* Register block type */
    blocks.registerBlockType('ukblocks/container-block', {
        title: i18n.__( 'Container' ), // The title of our block.
        icon: 'info', // Dashicon icon for our block
        category: 'layout', // The category of the block.
        attributes: {
            size: {
                type: 'select',
                default: 'large'
            }
        },
        edit: function(props) {
            var attributes = props.attributes;
			var size = props.attributes.size;
            return el( 'div',  { className: 'ukblocks-container uk-container uk-container-'+size, style: {} }, 'Hello uk container!' );
        },
    
        save: function(props) {
            var attributes = props.attributes;
			var size = props.attributes.size;
            return el( 'div',  { className: 'ukblocks-container uk-container uk-container-'+size, style: {} }, 'Hello uk container saved!' );
        },
    })

  } )(
     window.wp.blocks,
     window.wp.i18n,
     window.wp.element,
  );

  ( function( blocks, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
	var Editable = blocks.Editable;
	var children = blocks.source.children;

	blocks.registerBlockType( 'gutenberg-examples/example-03-editable', {
		title: __( 'Example: Editable', 'gutenberg-examples' ),
		icon: 'universal-access-alt',
		category: 'layout',

		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
		},

		edit: function( props ) {
			var content = props.attributes.content;
			var focus = props.focus;
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			return el(
				Editable,
				{
					tagName: 'p',
					className: props.className,
					onChange: onChangeContent,
					value: content,
					focus: focus,
					onFocus: props.setFocus
				}
			);
		},

		save: function( props ) {
			return el( 'p', {}, props.attributes.content );
		},
	} );
} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);
