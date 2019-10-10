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
 * Locale: MK (Macedonian; македонски јазик)
 */
$.extend( $.validator.messages, {
	required: "Полето е задолжително.",
	remote: "Поправете го ова поле",
	email: "Внесете правилна e-mail адреса",
	url: "Внесете правилен URL.",
	date: "Внесете правилен датум",
	dateISO: "Внесете правилен датум (ISO).",
	number: "Внесете правилен број.",
	digits: "Внесете само бројки.",
	creditcard: "Внесете правилен број на кредитната картичка.",
	equalTo: "Внесете ја истата вредност повторно.",
	extension: "Внесете вредност со соодветна екстензија.",
	maxlength: $.validator.format( "Внесете максимално {0} знаци." ),
	minlength: $.validator.format( "Внесете барем {0} знаци." ),
	rangelength: $.validator.format( "Внесете вредност со должина помеѓу {0} и {1} знаци." ),
	range: $.validator.format( "Внесете вредност помеѓу {0} и {1}." ),
	max: $.validator.format( "Внесете вредност помала или еднаква на {0}." ),
	min: $.validator.format( "Внесете вредност поголема или еднаква на {0}" )
} );
return $;
}));