const classNames = require('classnames');
const { __, setLocaleData } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { Fragment } = wp.element;
const { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl } = wp.components;
const {
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	RichText
} = wp.editor;


const blockStyle = {};


registerBlockType('kpdemo-blocks/uk-accordion', {
    title: 'UK: Accordion',
    icon: 'format-video',
	category: 'layout',
	description: __( 'Add a uk-accordion based block' ),
	attributes: {
		title: {
			type: 'string',
		},
	},
	edit(props) {
		const {
			attributes: {
				title
			},
			className,
			isSelected,
			setAttributes,
		} = props;
		var blockClasses = '';
		var classes = classNames(blockClasses, className);

		return (
			<div>
		
			<div class={ classes } style={ blockStyle }>
			<RichText
					identifier="title"
					tagName="p"
					className="uk-text-bold"
					value={ title }
					placeholder={ "Accordion title" }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>	
			<InnerBlocks />
			</div>
			
		</div>
		);
	},
	save(props) {
		return <InnerBlocks.Content />; 

	},
} );