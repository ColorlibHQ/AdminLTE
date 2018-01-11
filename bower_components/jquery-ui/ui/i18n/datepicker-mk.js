/* Macedonian i18n for the jQuery UI date picker plugin. */
/* Written by Stojce Slavkovski. */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "../datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}(function( datepicker ) {

datepicker.regional['mk'] = {
	closeText: 'Затвори',
	prevText: '&#x3C;',
	nextText: '&#x3E;',
	currentText: 'Денес',
	monthNames: ['Јануари','Февруари','Март','Април','Мај','Јуни',
	'Јули','Август','Септември','Октомври','Ноември','Декември'],
	monthNamesShort: ['Јан','Фев','Мар','Апр','Мај','Јун',
	'Јул','Авг','Сеп','Окт','Ное','Дек'],
	dayNames: ['Недела','Понеделник','Вторник','Среда','Четврток','Петок','Сабота'],
	dayNamesShort: ['Нед','Пон','Вто','Сре','Чет','Пет','Саб'],
	dayNamesMin: ['Не','По','Вт','Ср','Че','Пе','Са'],
	weekHeader: 'Сед',
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''};
datepicker.setDefaults(datepicker.regional['mk']);

return datepicker.regional['mk'];

}));
