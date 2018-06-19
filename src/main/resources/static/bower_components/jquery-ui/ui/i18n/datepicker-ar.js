/* Arabic Translation for jQuery UI date picker plugin. */
/* Used in most of Arab countries, primarily in Bahrain, Kuwait, Oman, Qatar, Saudi Arabia and the United Arab Emirates, Egypt, Sudan and Yemen. */
/* Written by Mohammed Alshehri -- m@dralshehri.com */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "../datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}(function( datepicker ) {

datepicker.regional['ar'] = {
	closeText: 'إغلاق',
	prevText: '&#x3C;السابق',
	nextText: 'التالي&#x3E;',
	currentText: 'اليوم',
	monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
	'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
	monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
	dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
	dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
	weekHeader: 'أسبوع',
	dateFormat: 'dd/mm/yy',
	firstDay: 0,
		isRTL: true,
	showMonthAfterYear: false,
	yearSuffix: ''};
datepicker.setDefaults(datepicker.regional['ar']);

return datepicker.regional['ar'];

}));
