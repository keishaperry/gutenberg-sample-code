/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _registerBlockType;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var classNames = __webpack_require__(0);
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock;
var Fragment = wp.element.Fragment;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl,
    TextControl = _wp$components.TextControl;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    InnerBlocks = _wp$editor.InnerBlocks,
    MediaUpload = _wp$editor.MediaUpload,
    RichText = _wp$editor.RichText;


var blockStyle = {};

registerBlockType('cmwblocks/uk-container', (_registerBlockType = {
	title: 'Breeze: Featured Video Section',
	icon: 'format-video',
	category: 'widgets'
}, _defineProperty(_registerBlockType, 'title', __('UK: Container', 'cmwblocks')), _defineProperty(_registerBlockType, 'icon', 'align-center'), _defineProperty(_registerBlockType, 'category', 'layout'), _defineProperty(_registerBlockType, 'description', __('Add a uk-container based block')), _defineProperty(_registerBlockType, 'attributes', {
	size: {
		type: 'select',
		default: 'large'

	}
}), _defineProperty(_registerBlockType, 'edit', function edit(props) {
	var size = props.attributes.size,
	    className = props.className,
	    isSelected = props.isSelected,
	    setAttributes = props.setAttributes;

	var sectionClasses = 'uk-container ';
	sectionClasses += 'uk-container-' + size + ' ';
	var classes = classNames(sectionClasses, className);

	return wp.element.createElement(
		'div',
		null,
		wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					PanelBody,
					null,
					wp.element.createElement(SelectControl, {
						label: __('Container Size'),
						value: size,
						options: [{ value: 'expand', label: __('Expand') }, { value: 'large', label: __('Large') }, { value: 'small', label: __('Small') }, { value: 'xsmall', label: __('X-Small') }],
						onChange: function onChange(value) {
							return setAttributes({ size: value });
						}
					})
				)
			)
		),
		wp.element.createElement(
			'div',
			{ 'class': classes, style: blockStyle },
			wp.element.createElement(InnerBlocks, null)
		)
	);
}), _defineProperty(_registerBlockType, 'save', function save(props) {
	return wp.element.createElement(InnerBlocks.Content, null);
}), _registerBlockType));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var classNames = __webpack_require__(0);
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock;
var Fragment = wp.element.Fragment;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl,
    TextControl = _wp$components.TextControl;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    InnerBlocks = _wp$editor.InnerBlocks,
    MediaUpload = _wp$editor.MediaUpload,
    RichText = _wp$editor.RichText;


var blockStyle = {};

registerBlockType('cmwblocks/uk-accordion', {
	title: 'UK: Accordion',
	icon: 'format-video',
	category: 'layout',
	description: __('Add a uk-accordion based block'),
	attributes: {
		title: {
			type: 'string'
		}
	},
	edit: function edit(props) {
		var title = props.attributes.title,
		    className = props.className,
		    isSelected = props.isSelected,
		    setAttributes = props.setAttributes;

		var blockClasses = '';
		var classes = classNames(blockClasses, className);

		return wp.element.createElement(
			'div',
			null,
			wp.element.createElement(
				'div',
				{ 'class': classes, style: blockStyle },
				wp.element.createElement(RichText, {
					identifier: 'title',
					tagName: 'p',
					className: 'uk-text-bold',
					value: title,
					placeholder: "Accordion title",
					onChange: function onChange(value) {
						return setAttributes({ title: value });
					}
				}),
				wp.element.createElement(InnerBlocks, null)
			)
		);
	},
	save: function save(props) {
		return wp.element.createElement(InnerBlocks.Content, null);
	}
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var classNames = __webpack_require__(0);
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock;
var Fragment = wp.element.Fragment;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    ToggleControl = _wp$components.ToggleControl;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    InnerBlocks = _wp$editor.InnerBlocks,
    MediaUpload = _wp$editor.MediaUpload;


var blockStyle = {};

registerBlockType('cmwblocks/uk-grid', {
	title: __('UK: Grid', 'cmwblocks'),
	icon: 'schedule',
	category: 'layout',
	description: __('Add a uk-grid block'),
	attributes: {
		size: {
			type: 'select',
			default: 'collapse'

		}
	},
	edit: function edit(props) {
		var size = props.attributes.size,
		    className = props.className,
		    setAttributes = props.setAttributes;


		var gridClasses = 'uk-grid ';
		//gridClasses += 'uk-grid-'+size+' ';
		var classes = classNames(gridClasses, className);

		return wp.element.createElement(
			'div',
			null,
			wp.element.createElement(
				Fragment,
				null,
				wp.element.createElement(
					InspectorControls,
					null,
					wp.element.createElement(
						PanelBody,
						null,
						wp.element.createElement(SelectControl, {
							label: __('Grid Size (Gutters)'),
							value: size,
							options: [{ value: 'collapse', label: __('Collapse') }, { value: 'large', label: __('Large') }, { value: 'medium', label: __('Medium') }, { value: 'small', label: __('Small') }],
							onChange: function onChange(value) {
								return setAttributes({ size: value });
							}
						})
					)
				)
			),
			wp.element.createElement(
				'div',
				{ 'class': classes, style: blockStyle },
				wp.element.createElement(InnerBlocks, null)
			)
		);
	},
	save: function save(props) {
		var size = props.attributes.size,
		    className = props.className;


		var gridClasses = 'uk-grid ';
		gridClasses += 'uk-grid-' + size + ' ';

		var classes = classNames(gridClasses, className);

		return wp.element.createElement(
			'div',
			{ 'class': classes, style: blockStyle, 'uk-grid': true },
			wp.element.createElement(InnerBlocks.Content, null)
		);
	}
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var classNames = __webpack_require__(0);
var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    createBlock = _wp$blocks.createBlock;
var Fragment = wp.element.Fragment;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    RangeControl = _wp$components.RangeControl,
    SelectControl = _wp$components.SelectControl,
    TextControl = _wp$components.TextControl,
    ToggleControl = _wp$components.ToggleControl,
    Button = _wp$components.Button;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    InnerBlocks = _wp$editor.InnerBlocks,
    MediaUpload = _wp$editor.MediaUpload;


var blockStyle = {};

registerBlockType('cmwblocks/uk-section', {
	title: __('UK: Section', 'cmwblocks'),
	icon: 'editor-table',
	category: 'layout',
	description: __('Add a uk-section class based block'),
	attributes: {
		style: {
			type: 'select',
			default: 'default'
		},
		size: {
			type: 'select',
			default: 'large'
		},
		background_image: {
			type: 'toggle',
			default: false
		},
		background_repeat: {
			type: 'toggle',
			default: false
		},
		background_size: {
			type: 'select',
			default: 'cover'
		},
		background_advanced_size: {
			type: 'string',
			default: ''
		},
		background_advanced_pos: {
			type: 'string',
			default: ''
		},
		background_media_id: {
			type: 'number'
		},
		background_media_url: {
			type: 'string'
		}
		/* 		mediaID: {
  			type: 'number',
  		},
  		mediaURL: {
  			type: 'string',
  		},
  		backgroundSize:{
  			type: 'select',
              default: 'cover',
  		},
  		backgroundRepeat: {
  			type: 'toggle',
  			default: false,
  		}, */
	},
	edit: function edit(props) {
		var _props$attributes = props.attributes,
		    size = _props$attributes.size,
		    style = _props$attributes.style,
		    background_image = _props$attributes.background_image,
		    background_repeat = _props$attributes.background_repeat,
		    background_size = _props$attributes.background_size,
		    background_advanced_size = _props$attributes.background_advanced_size,
		    background_advanced_pos = _props$attributes.background_advanced_pos,
		    background_media_id = _props$attributes.background_media_id,
		    background_media_url = _props$attributes.background_media_url,
		    className = props.className,
		    setAttributes = props.setAttributes;


		var sectionClasses = 'uk-section ';
		sectionClasses += 'uk-padding-small uk-background-' + style + ' ';

		var backgroundClasses = '';
		var backgroundStyle = {};
		if (background_image) {
			backgroundClasses += 'uk-background-image@s uk-background-' + background_size + ' uk-background-norepeat uk-background-top-center';
			backgroundStyle = { backgroundImage: "url('" + background_media_url + "')" };
		}
		var classes = classNames(sectionClasses, backgroundClasses);

		return wp.element.createElement(
			'div',
			null,
			wp.element.createElement(
				Fragment,
				null,
				wp.element.createElement(
					InspectorControls,
					null,
					wp.element.createElement(
						PanelBody,
						null,
						wp.element.createElement(SelectControl, {
							label: __('Section Size'),
							value: size,
							options: [{ value: 'large', label: __('Large') }, { value: 'medium', label: __('Medium') }, { value: 'small', label: __('Small') }],
							onChange: function onChange(value) {
								return setAttributes({ size: value });
							}
						}),
						wp.element.createElement(SelectControl, {
							label: __('Section Style'),
							value: style,
							options: [{ value: 'default', label: __('Default') }, { value: 'muted', label: __('Muted') }, { value: 'primary', label: __('Primary') }, { value: 'secondary', label: __('Secondary') }],
							onChange: function onChange(value) {
								return setAttributes({ style: value });
							}
						})
					),
					wp.element.createElement(
						PanelBody,
						{ title: __('Background Settings'), initialOpen: false },
						wp.element.createElement(ToggleControl, {
							label: __('Toggle background image'),
							checked: !!background_image,
							onChange: function onChange(value) {
								return setAttributes({ background_image: value });
							}
						}),
						wp.element.createElement(ToggleControl, {
							label: __('Toggle background repeat'),
							checked: !!background_repeat,
							onChange: function onChange(value) {
								return setAttributes({ background_repeat: value });
							}
						}),
						wp.element.createElement(SelectControl, {
							label: __('Background Size'),
							value: background_size,
							options: [{ value: 'cover', label: __('Cover') }, { value: 'contain', label: __('Contain') }, { value: 'auto', label: __('Auto') }, { value: 'advanced', label: __('Advanced') }],
							onChange: function onChange(value) {
								return setAttributes({ background_size: value });
							}
						}),
						wp.element.createElement(TextControl, {
							label: __('Advanced background size'),
							value: background_advanced_size,
							onChange: function onChange(value) {
								return setAttributes({ background_advanced_size: value });
							}
						}),
						wp.element.createElement(TextControl, {
							label: __('Advanced background position'),
							value: background_advanced_pos,
							onChange: function onChange(value) {
								return setAttributes({ background_advanced_pos: value });
							}
						}),
						wp.element.createElement(
							'label',
							{ 'class': 'blocks-base-control__label' },
							'Background Image'
						),
						wp.element.createElement(MediaUpload, {
							onSelect: function onSelect(media) {
								return setAttributes({ background_media_url: media.url, background_media_id: media.id });
							},
							type: 'image',
							value: background_media_id,
							render: function render(_ref) {
								var open = _ref.open;
								return wp.element.createElement(
									Button,
									{ className: background_media_id ? 'image-button' : 'button button-large', onClick: open },
									!background_media_id ? __('Upload Image') : wp.element.createElement('img', { src: background_media_url })
								);
							}
						})
					)
				)
			),
			wp.element.createElement(
				'div',
				{ className: classes, style: backgroundStyle },
				wp.element.createElement(InnerBlocks, null)
			)
		);
	},
	save: function save(props) {
		var _props$attributes2 = props.attributes,
		    size = _props$attributes2.size,
		    style = _props$attributes2.style,
		    background_image = _props$attributes2.background_image,
		    background_repeat = _props$attributes2.background_repeat,
		    background_size = _props$attributes2.background_size,
		    background_advanced_size = _props$attributes2.background_advanced_size,
		    background_advanced_pos = _props$attributes2.background_advanced_pos,
		    background_media_url = _props$attributes2.background_media_url,
		    className = props.className;


		var sectionClasses = 'uk-position-relative uk-section ';
		sectionClasses += 'uk-section-' + size + ' ';
		sectionClasses += 'uk-section-' + style + ' ';

		var backgroundClasses = '';
		var backgroundStyle = '';
		var backgroundImage = "";
		var backgroundSize = "100%";
		var backgroundPosition = "50% 50%";
		var backgroundImage = "";
		if (background_image) {
			backgroundClasses += 'uk-position-cover uk-background-image@s uk-background-' + background_size + ' uk-background-norepeat uk-background-top-center';
			backgroundImage = "url('" + background_media_url + "')";
		}
		if (background_size == "advanced" && background_advanced_size != "") {
			backgroundSize = background_advanced_size;
		}
		if (background_size == "advanced" && background_advanced_pos != "") {
			backgroundPosition = background_advanced_pos;
		}

		if (background_size != "advanced") {
			backgroundStyle = { backgroundImage: backgroundImage };
		} else {
			backgroundStyle = { backgroundImage: backgroundImage, backgroundSize: backgroundSize, backgroundPosition: backgroundPosition };
		}

		var classes = classNames(sectionClasses, backgroundClasses, className);

		return wp.element.createElement(
			'div',
			{ className: classes, style: backgroundStyle },
			wp.element.createElement(InnerBlocks.Content, null)
		);
	}
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var _wp$i18n = wp.i18n,
    __ = _wp$i18n.__,
    setLocaleData = _wp$i18n.setLocaleData;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    unregisterBlockStyle = _wp$blocks.unregisterBlockStyle,
    registerBlockStyle = _wp$blocks.registerBlockStyle;


var blockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px'
};

registerBlockType('cmwblocks/tester', {
	title: __('Example: Tester', 'cmwblocks'),
	icon: 'money',
	category: 'layout',
	description: __('Add a test block'),
	edit: function edit() {
		return wp.element.createElement(
			'div',
			{ style: blockStyle },
			'Basic example with JSX (editor)'
		);
	},
	save: function save() {
		return wp.element.createElement(
			'div',
			{ style: blockStyle },
			'Basic example with JSX (front)'
		);
	}
});

/* 
// Our filter function
function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/button' ?
        'cmw-uikit-filter uk-button ' :
        className;
}

// Adding the filter
wp.hooks.addFilter(
    'blocks.getBlockDefaultClassName',
    'cmw-uikit/set-block-custom-class-name',
    setBlockCustomClassName
); */

function setButtonBlockSaveEle(element, blockType, attributes) {
	if (blockType.name !== 'core/button') {
		return element;
	}

	var btnClass;
	if (attributes.className && attributes.className.indexOf("is-style-uikit-secondary") > -1) {
		btnClass = "uk-button-secondary";
	} else {
		btnClass = "uk-button-primary";
	}
	var alignclass = "align" + attributes.align;
	return wp.element.createElement(
		'div',
		{ className: "wp-block-button " + alignclass + " " + attributes.className },
		wp.element.createElement(
			'a',
			{ className: 'uk-button ' + btnClass, href: attributes.url },
			attributes.text
		)
	);
	//return newElement
}
wp.hooks.addFilter('blocks.getSaveElement', 'cmw-uikit/set-block-custom-save', setButtonBlockSaveEle);

wp.blocks.registerBlockStyle('core/button', {
	name: 'uikit-primary',
	label: 'Primary'
});

wp.blocks.registerBlockStyle('core/button', {
	name: 'uikit-secondary',
	label: 'Secondary',
	isDefault: true

});

wp.domReady(function () {
	wp.blocks.unregisterBlockStyle('core/button', 'default');
	wp.blocks.unregisterBlockStyle('core/button', 'outline');
	wp.blocks.unregisterBlockStyle('core/button', 'squared');
});

/***/ })
/******/ ]);