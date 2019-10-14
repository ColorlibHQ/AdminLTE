/*!
 * jQuery UI Effects Scale 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Scale Effect
//>>group: Effects
//>>description: Grows or shrinks an element and its content.
//>>docs: http://api.jqueryui.com/scale-effect/
//>>demos: http://jqueryui.com/effect/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../version",
			"../effect",
			"./effect-size"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

return $.effects.define( "scale", function( options, done ) {

	// Create element
	var el = $( this ),
		mode = options.mode,
		percent = parseInt( options.percent, 10 ) ||
			( parseInt( options.percent, 10 ) === 0 ? 0 : ( mode !== "effect" ? 0 : 100 ) ),

		newOptions = $.extend( true, {
			from: $.effects.scaledDimensions( el ),
			to: $.effects.scaledDimensions( el, percent, options.direction || "both" ),
			origin: options.origin || [ "middle", "center" ]
		}, options );

	// Fade option to support puff
	if ( options.fade ) {
		newOptions.from.opacity = 1;
		newOptions.to.opacity = 0;
	}

	$.effects.effect.size.call( this, newOptions, done );
} );

} ) );
