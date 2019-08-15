/* Luxembourgish initialisation for the jQuery UI date picker plugin. */
/* Written by Michel Weimerskirch <michel@weimerskirch.net> */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.lb = {
	closeText: "Fäerdeg",
	prevText: "Zréck",
	nextText: "Weider",
	currentText: "Haut",
	monthNames: [ "Januar","Februar","Mäerz","Abrëll","Mee","Juni",
	"Juli","August","September","Oktober","November","Dezember" ],
	monthNamesShort: [ "Jan", "Feb", "Mäe", "Abr", "Mee", "Jun",
	"Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
	dayNames: [
		"Sonndeg",
		"Méindeg",
		"Dënschdeg",
		"Mëttwoch",
		"Donneschdeg",
		"Freideg",
		"Samschdeg"
	],
	dayNamesShort: [ "Son", "Méi", "Dën", "Mët", "Don", "Fre", "Sam" ],
	dayNamesMin: [ "So","Mé","Dë","Më","Do","Fr","Sa" ],
	weekHeader: "W",
	dateFormat: "dd.mm.yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.lb );

return datepicker.regional.lb;

} ) );
