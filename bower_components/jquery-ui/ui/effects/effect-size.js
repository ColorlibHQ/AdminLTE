/*!
 * jQuery UI Effects Size 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Size Effect
//>>group: Effects
//>>description: Resize an element to a specified width and height.
//>>docs: http://api.jqueryui.com/size-effect/
//>>demos: http://jqueryui.com/effect/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../version",
			"../effect"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

return $.effects.define( "size", function( options, done ) {

	// Create element
	var baseline, factor, temp,
		element = $( this ),

		// Copy for children
		cProps = [ "fontSize" ],
		vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
		hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],

		// Set options
		mode = options.mode,
		restore = mode !== "effect",
		scale = options.scale || "both",
		origin = options.origin || [ "middle", "center" ],
		position = element.css( "position" ),
		pos = element.position(),
		original = $.effects.scaledDimensions( element ),
		from = options.from || original,
		to = options.to || $.effects.scaledDimensions( element, 0 );

	$.effects.createPlaceholder( element );

	if ( mode === "show" ) {
		temp = from;
		from = to;
		to = temp;
	}

	// Set scaling factor
	factor = {
		from: {
			y: from.height / original.height,
			x: from.width / original.width
		},
		to: {
			y: to.height / original.height,
			x: to.width / original.width
		}
	};

	// Scale the css box
	if ( scale === "box" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			from = $.effects.setTransition( element, vProps, factor.from.y, from );
			to = $.effects.setTransition( element, vProps, factor.to.y, to );
		}

		// Horizontal props scaling
		if ( factor.from.x !== factor.to.x ) {
			from = $.effects.setTransition( element, hProps, factor.from.x, from );
			to = $.effects.setTransition( element, hProps, factor.to.x, to );
		}
	}

	// Scale the content
	if ( scale === "content" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			from = $.effects.setTransition( element, cProps, factor.from.y, from );
			to = $.effects.setTransition( element, cProps, factor.to.y, to );
		}
	}

	// Adjust the position properties based on the provided origin points
	if ( origin ) {
		baseline = $.effects.getBaseline( origin, original );
		from.top = ( original.outerHeight - from.outerHeight ) * baseline.y + pos.top;
		from.left = ( original.outerWidth - from.outerWidth ) * baseline.x + pos.left;
		to.top = ( original.outerHeight - to.outerHeight ) * baseline.y + pos.top;
		to.left = ( original.outerWidth - to.outerWidth ) * baseline.x + pos.left;
	}
	element.css( from );

	// Animate the children if desired
	if ( scale === "content" || scale === "both" ) {

		vProps = vProps.concat( [ "marginTop", "marginBottom" ] ).concat( cProps );
		hProps = hProps.concat( [ "marginLeft", "marginRight" ] );

		// Only animate children with width attributes specified
		// TODO: is this right? should we include anything with css width specified as well
		element.find( "*[width]" ).each( function() {
			var child = $( this ),
				childOriginal = $.effects.scaledDimensions( child ),
				childFrom = {
					height: childOriginal.height * factor.from.y,
					width: childOriginal.width * factor.from.x,
					outerHeight: childOriginal.outerHeight * factor.from.y,
					outerWidth: childOriginal.outerWidth * factor.from.x
				},
				childTo = {
					height: childOriginal.height * factor.to.y,
					width: childOriginal.width * factor.to.x,
					outerHeight: childOriginal.height * factor.to.y,
					outerWidth: childOriginal.width * factor.to.x
				};

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				childFrom = $.effects.setTransition( child, vProps, factor.from.y, childFrom );
				childTo = $.effects.setTransition( child, vProps, factor.to.y, childTo );
			}

			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				childFrom = $.effects.setTransition( child, hProps, factor.from.x, childFrom );
				childTo = $.effects.setTransition( child, hProps, factor.to.x, childTo );
			}

			if ( restore ) {
				$.effects.saveStyle( child );
			}

			// Animate children
			child.css( childFrom );
			child.animate( childTo, options.duration, options.easing, function() {

				// Restore children
				if ( restore ) {
					$.effects.restoreStyle( child );
				}
			} );
		} );
	}

	// Animate
	element.animate( to, {
		queue: false,
		duration: options.duration,
		easing: options.easing,
		complete: function() {

			var offset = element.offset();

			if ( to.opacity === 0 ) {
				element.css( "opacity", from.opacity );
			}

			if ( !restore ) {
				element
					.css( "position", position === "static" ? "relative" : position )
					.offset( offset );

				// Need to save style here so that automatic style restoration
				// doesn't restore to the original styles from before the animation.
				$.effects.saveStyle( element );
			}

			done();
		}
	} );

} );

} ) );
