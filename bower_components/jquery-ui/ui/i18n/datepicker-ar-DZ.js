/* Algerian Arabic Translation for jQuery UI date picker plugin.
/* Used in most of Maghreb countries, primarily in Algeria, Tunisia, Morocco.
/* Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */
/* Mohamed Amine HADDAD -- zatamine@gmail.com */

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional[ "ar-DZ" ] = {
	closeText: "إغلاق",
	prevText: "&#x3C;السابق",
	nextText: "التالي&#x3E;",
	currentText: "اليوم",
	monthNames: [ "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان",
	"جويلية", "أوت", "سبتمبر","أكتوبر", "نوفمبر", "ديسمبر" ],
	monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
	dayNames: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
	dayNamesShort: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
	dayNamesMin: [ "ح", "ن", "ث", "ر", "خ", "ج", "س" ],
	weekHeader: "أسبوع",
	dateFormat: "dd/mm/yy",
	firstDay: 6,
		isRTL: true,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional[ "ar-DZ" ] );

return datepicker.regional[ "ar-DZ" ];

} ) );
