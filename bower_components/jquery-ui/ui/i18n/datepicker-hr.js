/* Croatian i18n for the jQuery UI date picker plugin. */
/* Written by Vjekoslav Nesek. */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.hr = {
	closeText: "Zatvori",
	prevText: "&#x3C;",
	nextText: "&#x3E;",
	currentText: "Danas",
	monthNames: [ "Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj",
	"Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac" ],
	monthNamesShort: [ "Sij","Velj","Ožu","Tra","Svi","Lip",
	"Srp","Kol","Ruj","Lis","Stu","Pro" ],
	dayNames: [ "Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota" ],
	dayNamesShort: [ "Ned","Pon","Uto","Sri","Čet","Pet","Sub" ],
	dayNamesMin: [ "Ne","Po","Ut","Sr","Če","Pe","Su" ],
	weekHeader: "Tje",
	dateFormat: "dd.mm.yy.",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.hr );

return datepicker.regional.hr;

} ) );
