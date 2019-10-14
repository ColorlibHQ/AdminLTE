/* Afrikaans initialisation for the jQuery UI date picker plugin. */
/* Written by Renier Pretorius. */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.af = {
	closeText: "Selekteer",
	prevText: "Vorige",
	nextText: "Volgende",
	currentText: "Vandag",
	monthNames: [ "Januarie","Februarie","Maart","April","Mei","Junie",
	"Julie","Augustus","September","Oktober","November","Desember" ],
	monthNamesShort: [ "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun",
	"Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
	dayNames: [ "Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag" ],
	dayNamesShort: [ "Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat" ],
	dayNamesMin: [ "So","Ma","Di","Wo","Do","Vr","Sa" ],
	weekHeader: "Wk",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.af );

return datepicker.regional.af;

} ) );
