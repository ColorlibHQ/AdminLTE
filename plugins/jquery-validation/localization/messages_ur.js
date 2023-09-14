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
 * Locale: UR (Urdu; اردو)
 */
$.extend( $.validator.messages, {
	required: "ان معلومات کا اندراج ضروری ہے",
	remote: "ان معلومات کا اندراج ضروری ہے",
	email: "درج کی ہوئی ای میل درست نہیں ہے",
	url: "درج کیا گیا پتہ درست نہیں ہے",
	date: "درج کی گئی تاریخ درست نہیں ہے",
	dateISO: "معیار کے مطابق نہیں ہے (ISO) درج کی گئی تاریخ",
	number: "درج کیےگئے ہندسے درست نہیں ہیں",
	digits: "صرف ہندسے اندراج کئے جاسکتے ہیں",
	creditcard: "درج کیا گیا کارڈ نمبر درست نہیں ہے",
	equalTo: "اندراج کا موازنہ درست نہیں ہے",
	extension: "اندراج درست نہیں ہے",
	maxlength: $.validator.format( "زیادہ سے زیادہ {0} کا اندراج کر سکتے ہیں" ),
	minlength: $.validator.format( "کم سے کم {0} کا اندراج کرنا ضروری ہے" ),
	rangelength: $.validator.format( "اندراج کا {0} اور {1}کے درمیان ہونا ضروری ہے" ),
	range: $.validator.format( "اندراج کا {0} اور {1} کے درمیان ہونا ضروری ہے" ),
	max: $.validator.format( "زیادہ سے زیادہ {0} کا اندراج کر سکتے ہیں" ),
	min: $.validator.format( "کم سے کم {0} کا اندراج کرنا ضروری ہے" )
} );
return $;
}));