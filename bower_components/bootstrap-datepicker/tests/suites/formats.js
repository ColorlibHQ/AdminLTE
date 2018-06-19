module('Formats', {
    setup: function(){
        this.input = $('<input type="text">').appendTo('#qunit-fixture');
        this.date = UTCDate(2012, 2, 15, 0, 0, 0, 0); // March 15, 2012
    },
    teardown: function(){
        this.input.data('datepicker').picker.remove();
    }
});

test('d: Day of month, no leading zero.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-d'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[2], '5');
});

test('dd: Day of month, leading zero.', function(){
    this.input
        .val('2012-03-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[2], '05');
});

test('D: Day of week, short.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-dd-D'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[3], 'Mon');
});

test('DD: Day of week, long.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-mm-dd-DD'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[3], 'Monday');
});

test('m: Month, no leading zero.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yyyy-m-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], '3');
});

test('mm: Month, leading zero.', function(){
    this.input
        .val('2012-3-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], '03');
});

test('M: Month shortname.', function(){
    this.input
        .val('2012-Mar-05')
        .datepicker({format: 'yyyy-M-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'Mar');
});

test('M: Month shortname case insensitive.', function(){
    this.input
        .val('2012-MAR-05')
        .datepicker({format: 'yyyy-M-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'Mar');
});

test('MM: Month full name.', function(){
    this.input
        .val('2012-March-5')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'March');
});

test('M: Month fullname case insensitive.', function(){
    this.input
        .val('2012-MARCH-05')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[1], 'March');
});

test('yy: Year, two-digit.', function(){
    this.input
        .val('2012-03-05')
        .datepicker({format: 'yy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[0], '12');
});

test('yyyy: Year, four-digit.', function(){
    this.input
        .val('2012-03-5')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val().split('-')[0], '2012');
});

test('dd-mm-yyyy: Regression: Prevent potential month overflow in small-to-large formats (Mar 31, 2012 -> Mar 01, 2012)', function(){
    this.input
        .val('31-03-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '31-03-2012');
});

test('dd-mm-yyyy: Leap day', function(){
    this.input
        .val('29-02-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '29-02-2012');
});

test('yyyy-mm-dd: Alternative format', function(){
    this.input
        .val('2012-02-12')
        .datepicker({format: 'yyyy-mm-dd'})
        .datepicker('setValue');
    equal(this.input.val(), '2012-02-12');
});

test('yyyy-MM-dd: Regression: Infinite loop when numbers used for month', function(){
    this.input
        .val('2012-02-12')
        .datepicker({format: 'yyyy-MM-dd'})
        .datepicker('setValue');
    equal(this.input.val(), '2012-February-12');
});

test('+1d: Tomorrow', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('+1d')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '16-03-2012');
}));

test('tomorrow (alias for +1d): Tomorrow', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('tomorrow')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '16-03-2012');
}));

test('-1d: Yesterday', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('-1d')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '14-03-2012');
}));

test('yesterday (alias for -1d): Yesterday', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('yesterday')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '14-03-2012');
}));

test('+1w: Next week', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('+1w')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '22-03-2012');
}));

test('-1w: Last week', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('-1w')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '08-03-2012');
}));

test('+1m: Next month', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('+1m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-04-2012');
}));

test('-1m: Last month', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('-1m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-02-2012');
}));

test('+1y: Next year', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('+1y')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-03-2013');
}));

test('-1y: Last year', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('-1y')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-03-2011');
}));

test('-1y +2m: Multiformat', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    this.input
        .val('-1y +2m')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '15-05-2011');
}));

test('Regression: End-of-month bug', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('29-02-2012')
        .datepicker({format: 'dd-mm-yyyy'})
        .datepicker('setValue');
    equal(this.input.val(), '29-02-2012');
}));

test('Invalid formats are force-parsed into a valid date on tab', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('44-44-4444')
        .datepicker({format: 'yyyy-MM-dd'})
        .focus();

    this.input.trigger({
        type: 'keydown',
        keyCode: 9
    });

    equal(this.input.val(), '56-September-30');
}));

test('Trailing separators', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('29.02.2012.')
        .datepicker({format: 'dd.mm.yyyy.'})
        .datepicker('setValue');
    equal(this.input.val(), '29.02.2012.');
}));

test('Assume nearby year - last century', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('02/14/91')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/1991');
}));

test('Assume nearby year - this century (- 1 year)', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('02/14/01')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2001');
}));

test('Assume nearby year - this century (+ 7 years)', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('02/14/19')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2019');
}));

test('Assume nearby year - this century (+ 13 years)', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('02/14/23')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: true})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/1923');
}));

test('Assume nearby year - this century (+ 13 years, threshold = 30)', patch_date(function(Date){
    Date.now = UTCDate(2012, 4, 31);
    this.input
        .val('02/14/23')
        .datepicker({format: 'mm/dd/yyyy', assumeNearbyYear: 30})
        .datepicker('setValue');
    equal(this.input.val(), '02/14/2023');
}));
