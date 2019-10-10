(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: DA (Danish; dansk)
 */
$.extend( $.validator.messages, {
	required: "Dette felt er påkrævet.",
	remote: "Ret venligst dette felt",
	email: "Indtast en gyldig email-adresse.",
	url: "Indtast en gyldig URL.",
	date: "Indtast en gyldig dato.",
	number: "Indtast et tal.",
	digits: "Indtast kun cifre.",
	creditcard: "Indtast et gyldigt kreditkortnummer.",
	equalTo: "Indtast den samme værdi igen.",
	time: "Angiv en gyldig tid mellem kl. 00:00 og 23:59.",
	ipv4: "Angiv venligst en gyldig IPv4-adresse.",
	ipv6: "Angiv venligst en gyldig IPv6-adresse.",
	require_from_group:  $.validator.format( "Angiv mindst {0} af disse felter." ),
	extension: "Indtast venligst en værdi med en gyldig endelse",
	pattern: "Ugyldigt format",
	lettersonly: "Angiv venligst kun bogstaver.",
	nowhitespace: "Må ikke indholde mellemrum",
	maxlength: $.validator.format( "Indtast højst {0} tegn." ),
	minlength: $.validator.format( "Indtast mindst {0} tegn." ),
	rangelength: $.validator.format( "Indtast mindst {0} og højst {1} tegn." ),
	range: $.validator.format( "Angiv en værdi mellem {0} og {1}." ),
	max: $.validator.format( "Angiv en værdi der højst er {0}." ),
	min: $.validator.format( "Angiv en værdi der mindst er {0}." ),
	minWords: $.validator.format( "Indtast venligst mindst {0} ord" ),
	maxWords:  $.validator.format( "Indtast venligst højst {0} ord" ),
	step: $.validator.format( "Angiv en værdi gange {0}." ),
	notEqualTo: "Angiv en anden værdi, værdierne må ikke være det samme.",
	integer: "Angiv et ikke-decimaltal, der er positivt eller negativt."
} );
return $;
}));