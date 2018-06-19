module('Mouse Navigation 2011', {
    setup: function(){
        /*
            Tests start with picker on March 31, 2011.
        */
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"})
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker');
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Selecting date from previous month while in January changes month and year displayed', function(){
    var target;

    this.input.val('01-01-2011');
    this.dp.update();
    datesEqual(this.dp.viewDate, UTCDate(2011, 0, 1));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 0, 1));

    // Rendered correctly
    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '26'); // Should be Dec 26
    equal(this.picker.find('.datepicker-days thead th.datepicker-switch').text(), 'January 2011');

    // Updated internally on click
    target.click();
    equal(this.picker.find('.datepicker-days thead th.datepicker-switch').text(), 'December 2010');
    datesEqual(this.dp.viewDate, UTCDate(2010, 11, 26));
    datesEqual(this.dp.dates.get(-1), UTCDate(2010, 11, 26));

    // Re-rendered on click
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '28'); // Should be Nov 28
});

test('Selecting date from next month while in December changes month and year displayed', function(){
    var target;

    this.input.val('01-12-2010');
    this.dp.update();
    datesEqual(this.dp.viewDate, UTCDate(2010, 11, 1));
    datesEqual(this.dp.dates.get(-1), UTCDate(2010, 11, 1));

    // Rendered correctly
    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:last');
    equal(target.text(), '8'); // Should be Jan 8
    equal(this.picker.find('.datepicker-days thead th.datepicker-switch').text(), 'December 2010');

    // Updated internally on click
    target.click();
    equal(this.picker.find('.datepicker-days thead th.datepicker-switch').text(), 'January 2011');
    datesEqual(this.dp.viewDate, UTCDate(2011, 0, 8));
    datesEqual(this.dp.dates.get(-1), UTCDate(2011, 0, 8));

    // Re-rendered on click
    target = this.picker.find('.datepicker-days tbody td:first');
    equal(target.text(), '26'); // Should be Dec 26
});
