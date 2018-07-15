module('Options', {
    setup: function(){},
    teardown: function(){
        $('#qunit-fixture *').each(function(){
            var t = $(this);
            if ('datepicker' in t.data())
                t.datepicker('remove');
        });
    }
});

test('Autoclose', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;


    input.focus();
    ok(picker.is(':visible'), 'Picker is visible');
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    ok(picker.is(':not(:visible)'), 'Picker is hidden');
    datesEqual(dp.dates[0], UTCDate(2012, 2, 4));
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
});

test('Custom date formatter functions', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2015-09-18T00:00:00.000Z')
                .datepicker({
                    format: {
                        /*
                        Say our UI should display a week ahead,
                        but textbox should store the actual date.
                        This is useful if we need UI to select local dates,
                        but store in UTC
                        */
                        toDisplay: function (date, format, language) {
                            var d = new Date(date);
                            d.setDate(d.getDate() - 7);
                            return d.toISOString();
                        },
                        toValue: function (date, format, language) {
                            var d = new Date(date);
                            d.setDate(d.getDate() + 7);
                            return new Date(d);
                        }
                    },
                    autoclose: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;
    //Value is ISO format and is 7 days older than UI
    equal(input.val(), '2015-09-18T00:00:00.000Z');
    datesEqual(dp.dates[0], UTCDate(2015, 8, 25));
    datesEqual(dp.viewDate, UTCDate(2015, 8, 25));

    input.focus();
    ok(picker.is(':visible'), 'Picker is visible');
    target = picker.find('.datepicker-days tbody td:nth(5)');
    equal(target.text(), '4'); // Sep 4

    target.click();
    ok(picker.is(':not(:visible)'), 'Picker is hidden');
    //Value is now 28th Aug 2015 in ISO format
    //and is 7 days older than UI
    equal(input.val(), '2015-08-28T00:00:00.000Z');
    datesEqual(dp.dates[0], UTCDate(2015, 8, 4));
    datesEqual(dp.viewDate, UTCDate(2015, 8, 4));
});

test('Startview: year view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 1
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: year view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'year'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: decade view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 2
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: decade view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'decade'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: century view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 3
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':visible'), 'Decades view visible');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: century view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'century'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':visible'), 'Decades view visible');
    ok(picker.find('.datepicker-centuries').is(':not(:visible)'), 'Centuries view hidden');
});

test('Startview: millennium view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 4
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':visible'), 'Centuries view visible');
});

test('Startview: millennium view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'millennium'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
    ok(picker.find('.datepicker-decades').is(':not(:visible)'), 'Decades view hidden');
    ok(picker.find('.datepicker-centuries').is(':visible'), 'Centuries view visible');
});

test('Today Button: today button not default', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .today').is(':not(:visible)'), 'Today button not visible');
});

test('Today Button: today visibility when enabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

    picker.find('.datepicker-days thead th.datepicker-switch').click();
    ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
    ok(picker.find('.datepicker-months tfoot .today').is(':visible'), 'Today button visible');

    picker.find('.datepicker-months thead th.datepicker-switch').click();
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
    ok(picker.find('.datepicker-years tfoot .today').is(':visible'), 'Today button visible');
});

test('Today Button: data-api', function(){
    var input = $('<input data-date-today-btn="true" />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');
});

test('Today Button: moves to today\'s date', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

    target = picker.find('.datepicker-days tfoot .today');
    target.click();

    var d = new Date(),
        today = UTCDate(d.getFullYear(), d.getMonth(), d.getDate());
    datesEqual(dp.viewDate, today);
    datesEqual(dp.dates[0], UTCDate(2012, 2, 5));
});

test('Today Button: moves to days view', function(){
    var viewModes = $.fn.datepicker.DPGlobal.viewModes;
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: viewModes.length - 1,
                    todayBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('tfoot .today').filter(':visible');

    target.click();
    ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');
});

test('Today Button: "linked" selects today\'s date', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: "linked"
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

    target = picker.find('.datepicker-days tfoot .today');
    target.click();

    var d = new Date(),
        today = UTCDate(d.getFullYear(), d.getMonth(), d.getDate());
    datesEqual(dp.viewDate, today);
    datesEqual(dp.dates[0], today);
});

test('Today Highlight: today\'s date is not highlighted by default', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'March 2012', 'Title is "March 2012"');

    target = picker.find('.datepicker-days tbody td:contains(15)');
    ok(!target.hasClass('today'), 'Today is not marked with "today" class');
    target = picker.find('.datepicker-days tbody td:contains(14)');
    ok(!target.hasClass('today'), 'Yesterday is not marked with "today" class');
    target = picker.find('.datepicker-days tbody td:contains(16)');
    ok(!target.hasClass('today'), 'Tomorrow is not marked with "today" class');
}));

test('Today Highlight: today\'s date is highlighted when not active', patch_date(function(Date){
    Date.now = new Date(2012, 2, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayHighlight: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'March 2012', 'Title is "March 2012"');

    target = picker.find('.datepicker-days tbody td:contains(15)');
    ok(target.hasClass('today'), 'Today is marked with "today" class');
    target = picker.find('.datepicker-days tbody td:contains(14)');
    ok(!target.hasClass('today'), 'Yesterday is not marked with "today" class');
    target = picker.find('.datepicker-days tbody td:contains(16)');
    ok(!target.hasClass('today'), 'Tomorrow is not marked with "today" class');
}));

test('Clear Button: clear visibility when enabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    clearBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .clear').is(':visible'), 'Clear button visible');

    picker.find('.datepicker-days thead th.datepicker-switch').click();
    ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
    ok(picker.find('.datepicker-months tfoot .clear').is(':visible'), 'Clear button visible');

    picker.find('.datepicker-months thead th.datepicker-switch').click();
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
    ok(picker.find('.datepicker-years tfoot .clear').is(':visible'), 'Clear button visible');
});

test('Clear Button: clears input value', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    clearBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .clear').is(':visible'), 'Today button visible');

    target = picker.find('.datepicker-days tfoot .clear');
    target.click();

    equal(input.val(),'',"Input value has been cleared.");
    ok(picker.is(':visible'), 'Picker is visible');
});

test('Clear Button: hides datepicker if autoclose is on', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    clearBtn: true,
                    autoclose: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(picker.find('.datepicker-days tfoot .clear').is(':visible'), 'Today button visible');

    target = picker.find('.datepicker-days tfoot .clear');
    target.click();

    equal(input.val(),'',"Input value has been cleared.");
    ok(picker.is(':not(:visible)'), 'Picker is hidden');
});

test('Active Toggle Default: when active date is selected it is not unset', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    // open our datepicker
    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 selected');

    // click on our active date
    target = picker.find('.datepicker-days .day.active');
    target.click();

    // make sure it's still set
    equal(input.val(), '2012-03-05', "Input value has not been cleared.");
});

test('Active Toggle Enabled (single date): when active date is selected it is unset', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    toggleActive: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    // open our datepicker
    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 selected');

    // click on our active date
    target = picker.find('.datepicker-days .day.active');
    target.click();

    // make sure it's no longer set
    equal(input.val(), '', "Input value has been cleared.");
});

test('Active Toggle Multidate Default: when one of the active dates is selected it is unset', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    multidate: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    // open our datepicker
    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 in dates');

    // Select additional date
    target = picker.find('.datepicker-days tbody td:nth(7)');
    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 4), '2012-03-04 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05,2012-03-04');

    // Unselect additional date
    target = picker.find('.datepicker-days tbody td:nth(7)');
    target.click();
    ok(dp.dates.contains(UTCDate(2012, 2, 4)) === -1, '2012-03-04 no longer in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05');
});

test('Active Toggle Disabled: when active date is selected it remains', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    toggleActive: false
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    // open our datepicker
    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 selected');

    // click on our active date
    target = picker.find('.datepicker-days .day.active');
    target.click();

    // make sure it's still set
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 still selected');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 5));
    equal(input.val(), '2012-03-05');
});

test('Active Toggle Multidate Disabled: when activeToggle is set to false, but multidate is set, the option is ignored and selecting an active date it is unset', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    multidate: true,
                    toggleActive: false
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    // open our datepicker
    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 in dates');

    // Select additional date
    target = picker.find('.datepicker-days tbody td:nth(7)');
    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 4), '2012-03-04 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05,2012-03-04');

    // Unselect additional date
    target = picker.find('.datepicker-days tbody td:nth(7)');
    target.click();
    ok(dp.dates.contains(UTCDate(2012, 2, 4)) === -1, '2012-03-04 no longer in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05');
});

test('DaysOfWeekDisabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    daysOfWeekDisabled: '1,5'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(22)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    target = picker.find('.datepicker-days tbody td:nth(24)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
    target = picker.find('.datepicker-days tbody td:nth(26)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
});

test('DaysOfWeekHighlighted', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startDate: '2012-10-02',
                    daysOfWeekHighlighted: '1,5'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(0)');
    ok(!target.hasClass('highlighted'), 'Day of week is not highlighted');
    target = picker.find('.datepicker-days tbody td:nth(22)');
    ok(target.hasClass('highlighted'), 'Day of week is highlighted');
    target = picker.find('.datepicker-days tbody td:nth(24)');
    ok(!target.hasClass('highlighted'), 'Day of week is not highlighted');
    target = picker.find('.datepicker-days tbody td:nth(26)');
    ok(target.hasClass('highlighted'), 'Day of week is highlighted');
});

test('DatesDisabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    datesDisabled: ['2012-10-1', '2012-10-10', '2012-10-20']
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(1)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(2)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
    target = picker.find('.datepicker-days tbody td:nth(10)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(11)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
    target = picker.find('.datepicker-days tbody td:nth(20)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(21)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
});

test('DatesDisabled as attribute', function(){
    var input = $('<input data-date-dates-disabled="2012-10-1,2012-10-10,2012-10-20" />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(1)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(2)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
    target = picker.find('.datepicker-days tbody td:nth(10)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(11)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
    target = picker.find('.datepicker-days tbody td:nth(20)');
    ok(target.hasClass('disabled'), 'Day of week is disabled');
    ok(target.hasClass('disabled-date'), 'Date is disabled');
    target = picker.find('.datepicker-days tbody td:nth(21)');
    ok(!target.hasClass('disabled'), 'Day of week is enabled');
});

test('BeforeShowDay', function(){

    var beforeShowDay = function(date) {
        switch (date.getDate()){
            case 25:
                return {
                    tooltip: 'Example tooltip',
                    classes: 'active'
                };
            case 26:
                return "test26";
            case 27:
                return {enabled: false, classes: 'test27'};
            case 28:
                return false;
            case 30:
                return { content: "foo" + date.getDate() }
        }
    };

    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    beforeShowDay: beforeShowDay
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(25)');
    equal(target.attr('title'), 'Example tooltip', '25th has tooltip');
    ok(!target.hasClass('disabled'), '25th is enabled');
    target = picker.find('.datepicker-days tbody td:nth(26)');
    ok(target.hasClass('test26'), '26th has test26 class');
    ok(!target.hasClass('disabled'), '26th is enabled');
    target = picker.find('.datepicker-days tbody td:nth(27)');
    ok(target.hasClass('test27'), '27th has test27 class');
    ok(target.hasClass('disabled'), '27th is disabled');
    target = picker.find('.datepicker-days tbody td:nth(28)');
    ok(target.hasClass('disabled'), '28th is disabled');
    target = picker.find('.datepicker-days tbody td:nth(29)');
    ok(!target.hasClass('disabled'), '29th is enabled');
    target = picker.find('.datepicker-days tbody td:nth(30)');
    ok(target.text() == "foo30", '30th has custom content');
});

test('BeforeShowMonth regress .day content', function() {
    var input = $('<input />')
        .appendTo('#qunit-fixture')
        .val('2012-10-26')
        .datepicker({
            format: 'yyyy-mm-dd',
            beforeShowDay: function(date) {
                return {
                    content: '<strong>foo123</strong>'
                };
            }
        }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(30)');
    target.trigger('click');
    datesEqual(dp.viewDate, UTCDate(2012, 9, 30));
});

test('BeforeShowMonth', function () {

    var beforeShowMonth = function (date) {
        switch (date.getMonth()) {
            case 0:
                return {
                    tooltip: 'Example tooltip',
                    classes: 'active'
                };
            case 2:
                return "testMarch";
            case 4:
                return {enabled: false, classes: 'testMay'};
            case 5:
                return false;
        }
    };

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2012-10-26')
            .datepicker({
                format: 'yyyy-mm-dd',
                beforeShowMonth: beforeShowMonth
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-months tbody span:nth(0)');
    equal(target.attr('title'), 'Example tooltip', '1st has tooltip');
    ok(!target.hasClass('disabled'), 'January is enabled');
    target = picker.find('.datepicker-months tbody span:nth(2)');
    ok(target.hasClass('testMarch'), 'March has testMarch class');
    ok(!target.hasClass('disabled'), 'March enabled');
    target = picker.find('.datepicker-months tbody span:nth(4)');
    ok(target.hasClass('testMay'), 'May has testMay class');
    ok(target.hasClass('disabled'), 'May is disabled');
    target = picker.find('.datepicker-months tbody span:nth(5)');
    ok(target.hasClass('disabled'), 'June is disabled');
    target = picker.find('.datepicker-months tbody span:nth(6)');
    ok(!target.hasClass('disabled'), 'July is enabled');
});


test('BeforeShowYear', function () {

    var beforeShowYear = function (date) {
        switch (date.getFullYear()) {
            case 2013:
                return {
                    tooltip: 'Example tooltip',
                    classes: 'active'
                };
            case 2014:
                return "test2014";
            case 2015:
                return {enabled: false, classes: 'test2015'};
            case 2016:
                return false;
        }
    };

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2012-10-26')
            .datepicker({
                format: 'yyyy-mm-dd',
                beforeShowYear: beforeShowYear
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-years tbody span:nth(4)');
    equal(target.attr('title'), 'Example tooltip', '5th has tooltip');
    ok(!target.hasClass('disabled'), '2013, 5th is enabled');
    target = picker.find('.datepicker-years tbody span:nth(5)');
    ok(target.hasClass('test2014'), '6th has test2014 class');
    ok(!target.hasClass('disabled'), '2014, 6th is enabled');
    target = picker.find('.datepicker-years tbody span:nth(6)');
    ok(target.hasClass('test2015'), '2015, 7th has test2015 class');
    ok(target.hasClass('disabled'), '2015, 7th is disabled');
    target = picker.find('.datepicker-years tbody span:nth(7)');
    ok(target.hasClass('disabled'), '2016, 8th is disabled');
    target = picker.find('.datepicker-years tbody span:nth(8)');
    ok(!target.hasClass('disabled'), '2017, 9th is enabled');
});

test('beforeShowDecade', function () {
    var beforeShowDecade = function (date) {
        switch (date.getFullYear()) {
            case 2030:
                return {
                    tooltip: 'Example tooltip',
                    classes: 'active'
                };
            case 2040:
                return "test2040";
            case 2050:
                return {enabled: false, classes: 'test2050'};
            case 2060:
                return false;
        }
    };

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('03/05/2012')
            .datepicker({ beforeShowDecade: beforeShowDecade }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-decades tbody span:nth(4)');
    equal(target.attr('title'), 'Example tooltip', '5th has tooltip');
    ok(!target.hasClass('disabled'), '2030, 5th is enabled');

    target = picker.find('.datepicker-decades tbody span:nth(5)');
    ok(target.hasClass('test2040'), '6th has test2040 class');
    ok(!target.hasClass('disabled'), '2040, 6th is enabled');

    target = picker.find('.datepicker-decades tbody span:nth(6)');
    ok(target.hasClass('test2050'), '2050, 7th has test2050 class');
    ok(target.hasClass('disabled'), '2050, 7th is disabled');

    target = picker.find('.datepicker-decades tbody span:nth(7)');
    ok(target.hasClass('disabled'), '2060, 8th is disabled');

    target = picker.find('.datepicker-decades tbody span:nth(8)');
    ok(!target.hasClass('disabled'), '2070, 9th is enabled');
});

test('beforeShowCentury', function () {
    var beforeShowCentury = function (date) {
        switch (date.getFullYear()) {
            case 2300:
                return {
                    tooltip: 'Example tooltip',
                    classes: 'active'
                };
            case 2400:
                return "test2400";
            case 2500:
                return {enabled: false, classes: 'test2500'};
            case 2600:
                return false;
        }
    };

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('03/05/2012')
            .datepicker({ beforeShowCentury: beforeShowCentury }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-centuries tbody span:nth(4)');
    equal(target.attr('title'), 'Example tooltip', '5th has tooltip');
    ok(!target.hasClass('disabled'), '2300, 5th is enabled');

    target = picker.find('.datepicker-centuries tbody span:nth(5)');
    ok(target.hasClass('test2400'), '6th has test2400 class');
    ok(!target.hasClass('disabled'), '2400, 6th is enabled');

    target = picker.find('.datepicker-centuries tbody span:nth(6)');
    ok(target.hasClass('test2500'), '2500, 7th has test2500 class');
    ok(target.hasClass('disabled'), '2500, 7th is disabled');

    target = picker.find('.datepicker-centuries tbody span:nth(7)');
    ok(target.hasClass('disabled'), '2600, 8th is disabled');

    target = picker.find('.datepicker-centuries tbody span:nth(8)');
    ok(!target.hasClass('disabled'), '2700, 9th is enabled');
});

test('Orientation: values are parsed correctly', function(){

    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker');

    equal(dp.o.orientation.x, 'auto');
    equal(dp.o.orientation.y, 'auto');

    dp._process_options({orientation: ''});
    equal(dp.o.orientation.x, 'auto', 'Empty value');
    equal(dp.o.orientation.y, 'auto', 'Empty value');

    dp._process_options({orientation: 'left'});
    equal(dp.o.orientation.x, 'left', '"left"');
    equal(dp.o.orientation.y, 'auto', '"left"');

    dp._process_options({orientation: 'right'});
    equal(dp.o.orientation.x, 'right', '"right"');
    equal(dp.o.orientation.y, 'auto', '"right"');

    dp._process_options({orientation: 'top'});
    equal(dp.o.orientation.x, 'auto', '"top"');
    equal(dp.o.orientation.y, 'top', '"top"');

    dp._process_options({orientation: 'bottom'});
    equal(dp.o.orientation.x, 'auto', '"bottom"');
    equal(dp.o.orientation.y, 'bottom', '"bottom"');

    dp._process_options({orientation: 'left top'});
    equal(dp.o.orientation.x, 'left', '"left top"');
    equal(dp.o.orientation.y, 'top', '"left top"');

    dp._process_options({orientation: 'left bottom'});
    equal(dp.o.orientation.x, 'left', '"left bottom"');
    equal(dp.o.orientation.y, 'bottom', '"left bottom"');

    dp._process_options({orientation: 'right top'});
    equal(dp.o.orientation.x, 'right', '"right top"');
    equal(dp.o.orientation.y, 'top', '"right top"');

    dp._process_options({orientation: 'right bottom'});
    equal(dp.o.orientation.x, 'right', '"right bottom"');
    equal(dp.o.orientation.y, 'bottom', '"right bottom"');

    dp._process_options({orientation: 'left right'});
    equal(dp.o.orientation.x, 'left', '"left right"');
    equal(dp.o.orientation.y, 'auto', '"left right"');

    dp._process_options({orientation: 'right left'});
    equal(dp.o.orientation.x, 'right', '"right left"');
    equal(dp.o.orientation.y, 'auto', '"right left"');

    dp._process_options({orientation: 'top bottom'});
    equal(dp.o.orientation.x, 'auto', '"top bottom"');
    equal(dp.o.orientation.y, 'top', '"top bottom"');

    dp._process_options({orientation: 'bottom top'});
    equal(dp.o.orientation.x, 'auto', '"bottom top"');
    equal(dp.o.orientation.y, 'bottom', '"bottom top"');

    dp._process_options({orientation: 'foo bar'});
    equal(dp.o.orientation.x, 'auto', '"foo bar"');
    equal(dp.o.orientation.y, 'auto', '"foo bar"');

    dp._process_options({orientation: 'foo left'});
    equal(dp.o.orientation.x, 'left', '"foo left"');
    equal(dp.o.orientation.y, 'auto', '"foo left"');

    dp._process_options({orientation: 'top bar'});
    equal(dp.o.orientation.x, 'auto', '"top bar"');
    equal(dp.o.orientation.y, 'top', '"top bar"');
});

test('startDate', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startDate: new Date(2012, 9, 26)
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(25)');
    ok(target.hasClass('disabled'), 'Previous day is disabled');
    target = picker.find('.datepicker-days tbody td:nth(26)');
    ok(!target.hasClass('disabled'), 'Specified date is enabled');
    target = picker.find('.datepicker-days tbody td:nth(27)');
    ok(!target.hasClass('disabled'), 'Next day is enabled');
});

test('endDate', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    endDate: new Date(2012, 9, 26)
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-days tbody td:nth(25)');
    ok(!target.hasClass('disabled'), 'Previous day is enabled');
    target = picker.find('.datepicker-days tbody td:nth(26)');
    ok(!target.hasClass('disabled'), 'Specified date is enabled');
    target = picker.find('.datepicker-days tbody td:nth(27)');
    ok(target.hasClass('disabled'), 'Next day is disabled');
});

test('Multidate', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    multidate: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 (initial date) in dates');

    // Select first
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 4), '2012-03-04 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05,2012-03-04');

    // Select second
    target = picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '12'); // Mar 12

    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 12), '2012-03-12 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 12));
    equal(input.val(), '2012-03-05,2012-03-04,2012-03-12');

    // Deselect first
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    ok(dp.dates.contains(UTCDate(2012, 2, 4)) === -1, '2012-03-04 no longer in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05,2012-03-12');
});

test('Multidate with limit', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    multidate: 2
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    // Initial value is selected
    ok(dp.dates.contains(UTCDate(2012, 2, 5)) !== -1, '2012-03-05 (initial date) in dates');

    // Select first
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 4), '2012-03-04 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
    equal(input.val(), '2012-03-05,2012-03-04');

    // Select second
    target = picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '12'); // Mar 12

    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 12), '2012-03-12 in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 12));
    equal(input.val(), '2012-03-04,2012-03-12');

    // Select third
    target = picker.find('.datepicker-days tbody td:nth(20)');
    equal(target.text(), '17'); // Mar 17

    target.click();
    datesEqual(dp.dates.get(-1), UTCDate(2012, 2, 17), '2012-03-17 in dates');
    ok(dp.dates.contains(UTCDate(2012, 2, 4)) === -1, '2012-03-04 no longer in dates');
    datesEqual(dp.viewDate, UTCDate(2012, 2, 17));
    equal(input.val(), '2012-03-12,2012-03-17');
});

test('Multidate Separator', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    multidate: true,
                    multidateSeparator: ' '
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    // Select first
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    equal(input.val(), '2012-03-05 2012-03-04');

    // Select second
    target = picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '12'); // Mar 12

    target.click();
    equal(input.val(), '2012-03-05 2012-03-04 2012-03-12');
});


test("Picker is shown on input focus when showOnFocus is not defined", function () {

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2014-01-01')
            .datepicker({
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();

    ok(picker.is(":visible"), "Datepicker is visible");

});

test("Picker is shown on input focus when showOnFocus is true", function () {

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2014-01-01')
            .datepicker({
                showOnFocus: true
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();

    ok(picker.is(":visible"), "Datepicker is visible");

});

test("Picker is hidden on input focus when showOnFocus is false", function () {

    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2014-01-01')
            .datepicker({
                showOnFocus: false
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();

    ok(picker.is(":hidden"), "Datepicker is hidden");

});

test('Container', function(){
    var testContainer = $('<div class="date-picker-container"/>')
            .appendTo('#qunit-fixture'),
        input = $('<input />')
            .appendTo('#qunit-fixture')
                .val('2012-10-26')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    container: '.date-picker-container',
                    startDate: new Date(2012, 9, 26)
                }),
        dp = input.data('datepicker'),
        target = dp.picker;
    input.focus();
    equal(target.parent()[0], testContainer[0], 'Container is not the testContainer that was specificed');
});

test('Default View Date (Object)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    defaultViewDate: { year: 1977, month: 04, day: 25 }
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'May 1977');
});

test('Default View Date (Date)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    defaultViewDate: new Date(1977, 4, 25)
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'May 1977');
});

test('Default View Date (String)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    defaultViewDate: "1977-05-24"
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'May 1977');
});

test('Immediate Updates', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2014-01-01')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    immediateUpdates: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    // Change month
    input.focus();
    picker.find('.datepicker-days .next').click();
    equal(input.val(), '2014-02-01');

    // Change year
    picker.find('.datepicker-days .datepicker-switch').click();
    picker.find('.datepicker-months .next').click();
    equal(input.val(), '2015-02-01');

    // Change decade set (doesn't update input)
    picker.find('.datepicker-months .datepicker-switch').click();
    picker.find('.datepicker-years .next').click();
    equal(input.val(), '2015-02-01');

    // Change century set (doesn't update input)
    picker.find('.datepicker-years .datepicker-switch').click();
    picker.find('.datepicker-decades .next').click();
    equal(input.val(), '2015-02-01');

    // Change millennium set (doesn't update input)
    picker.find('.datepicker-decades .datepicker-switch').click();
    picker.find('.datepicker-centuries .next').click();
    equal(input.val(), '2015-02-01');
});

test('forceParse: false on enter on invalid date', function () {
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('123456789')
                .datepicker({forceParse: false})
                .focus();

    input.trigger({
        type: 'keydown',
        keyCode: 13,
        shiftKey: false
    });

    equal(input.val(), '123456789', 'date not parsed');
});

test('forceParse: false on mousedown on invalid date', function () {
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('123456789')
                .datepicker({forceParse: false})
                .focus();

    $(document).trigger({
        type: 'mousedown'
    });

    equal(input.val(), '123456789', 'date not parsed');
});

//datepicker-dropdown

test('Enable on readonly options (default)', function(){
    var input = $('<input readonly="readonly" />')
            .appendTo('#qunit-fixture')
            .datepicker({format: "dd-mm-yyyy"}),
        dp = input.data('datepicker'),
        picker = dp.picker;

    ok(!picker.is(':visible'));
    input.focus();
    ok(picker.is(':visible'));
});

test('Enable on readonly options (false)', function(){
    var input = $('<input readonly="readonly" />')
            .appendTo('#qunit-fixture')
            .datepicker({
                format: "dd-mm-yyyy",
                enableOnReadonly: false
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    ok(!picker.is(':visible'));
    input.focus();
    ok(!picker.is(':visible'));
});

test('Startview: year view visible after date pick', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker({
                startView: 2,
                minViewMode: 1,
                autoclose: true
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');

    target = picker.find('.datepicker-years tbody td:nth(7)');
    target.click();
    target = picker.find('.datepicker-years tbody td:nth(4)');
    target.click();
    target = picker.find('.datepicker-years tbody td:nth(20)');
    target.click();

    input.focus();
    ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
    ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
    ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
});

test('Title: none', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker({
                format: 'yyyy-mm-dd'
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.is(':visible'), 'Picker is visible');

    target = picker.find('.datepicker-days thead .datepicker-title');
    ok(target.is(':not(:visible)'), 'Title is hidden');
});

test('Title: with value', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker({
                format: 'yyyy-mm-dd',
                title: 'Some Title'
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.is(':visible'), 'Picker is visible');

    target = picker.find('.datepicker-days thead .datepicker-title');
    ok(target.is(':visible'), 'Title is visible');
    equal(target.text(), 'Some Title');
});

test('i18n: Leverage i18n titleFormat when available.', patch_date(function(Date){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2015年04月21日')
                .datepicker({
                    language: 'zh-CN'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();
    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), '2015年04月', 'Title is in Chinese: 2015年04月');
}));

test('i18n: Leverage English (default) i18n titleFormat when translation key for specified language is not available.', patch_date(function(Date){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('04/21/2015')
                .datepicker({
                    language: 'aa-BB'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();
    equal(picker.find('.datepicker-days thead .datepicker-switch').text(), 'April 2015', 'Title is in default format: April 2015');
}));

test('Z-index Offset: none', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker(),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.parent().css('z-index', 234);
    input.focus();

    equal(dp.o.zIndexOffset, 10, 'Z-index offset option defaults to 10.');
    equal(picker.css('z-index'), 244, 'Picker Z-index offset is respected.');
});

test('Z-index Offset: with value', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker({
                zIndexOffset: 1000
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.parent().css('z-index', 234);
    input.focus();

    equal(dp.o.zIndexOffset, 1000, 'Z-index offset option is accepted.');
    equal(picker.css('z-index'), 1234, 'Picker Z-index offset is respected.');
});

test('templates', function(){
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .datepicker({
                templates: {
                    leftArrow: '<span class="glyphicon glyphicon-arrow-left"></span>',
                    rightArrow: '</table>'
                }
            }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();
    equal(picker.find('.datepicker-days .prev').prop('innerHTML'), '<span class="glyphicon glyphicon-arrow-left"></span>');
    equal(picker.find('.datepicker-days .next').prop('innerHTML'), $('<div>').html('&raquo;').text());
});

test('Nav arrow html templates with span tag', function () {
    var input = $('<input />')
            .appendTo('#qunit-fixture')
            .val('2012-10-26')
            .datepicker({
                format: 'yyyy-mm-dd',
                templates: {
                    leftArrow: '<span></span>',
                    rightArrow: '<span></span>'
                }
            }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    target = picker.find('.datepicker-months tbody span:nth(9)');
    ok(target.hasClass('active'), 'Month is selected');
});

test('Nav arrow html templates .prev click', function () {
    var input = $('<input />')
        .appendTo('#qunit-fixture')
        .val('2012-10-26')
        .datepicker({
            format: 'yyyy-mm-dd',
            startView: 1,
            templates: {
                leftArrow: '<i></i>'
            }
        }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    picker.find('.datepicker-months thead .prev i').trigger('click');
    target = picker.find('.datepicker-months thead .datepicker-switch');
    equal(target.text(), '2011');
});

test('Visibility of the prev and next arrows for year/decade/century/millenium views with startDate and endDate', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('01/01/2015')
                .datepicker({
                    format: 'dd/mm/yyyy',
                    startView: 1,
                    startDate: '01/12/2014',
                    endDate: '01/12/2016'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();

    target = picker.find('.datepicker-months thead th.prev');
    ok(!target.hasClass('disabled'), 'Prev switcher is not hidden');
    target = picker.find('.datepicker-months thead th.next');
    ok(!target.hasClass('disabled'), 'Next switcher is not hidden');

    picker.find('.datepicker-months thead th.datepicker-switch').click();
    target = picker.find('.datepicker-years thead th.prev');
    ok(target.hasClass('disabled'), 'Prev switcher is hidden');
    target = picker.find('.datepicker-years thead th.next');
    ok(target.hasClass('disabled'), 'Next switcher is hidden');

    picker.find('.datepicker-years thead th.datepicker-switch').click();
    target = picker.find('.datepicker-decades thead th.prev');
    ok(target.hasClass('disabled'), 'Prev switcher is hidden');
    target = picker.find('.datepicker-decades thead th.next');
    ok(target.hasClass('disabled'), 'Next switcher is hidden');

    picker.find('.datepicker-decades thead th.datepicker-switch').click();
    target = picker.find('.datepicker-centuries thead th.prev');
    ok(target.hasClass('disabled'), 'Prev switcher is hidden');
    target = picker.find('.datepicker-centuries thead th.next');
    ok(target.hasClass('disabled'), 'Next switcher is hidden');
});

test('date cells (outdated)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .datepicker(),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();
    picker.find('.datepicker-days .day').each(function(){
        ok(this.hasAttribute('data-date'));
    });
});

test('keepEmptyValues: none (default is false)', function() {
    var proxy_element = $('<div />').appendTo('#qunit-fixture'),
        input_from = $('<input />').val('2016-04-01').appendTo('#qunit-fixture'),
        input_to = $('<input />').appendTo('#qunit-fixture'),
        dp = proxy_element.datepicker({
            format: 'yyyy-mm-dd',
            inputs: [input_from, input_to]
        }),
        input_from_dp = input_from.data('datepicker');

    input_from.focus();
    input_from_dp.picker.find('.old.day').eq(0).click();

    equal(input_from.val(), '2016-03-27');
    equal(input_to.val(), '2016-03-27', 'Input_from value should be distributed.');
});

test('keepEmptyValues: true', function() {
    var proxy_element = $('<div />').appendTo('#qunit-fixture'),
        input_from = $('<input />').val('2016-04-01').appendTo('#qunit-fixture'),
        input_to = $('<input />').appendTo('#qunit-fixture'),
        dp = proxy_element.datepicker({
            format: 'yyyy-mm-dd',
            inputs: [input_from, input_to],
            keepEmptyValues: true
        }),
        input_from_dp = input_from.data('datepicker');

    input_from.focus();
    input_from_dp.picker.find('.old.day').eq(0).click();

    equal(input_from.val(), '2016-03-27');
    equal(input_to.val(), '', 'Input_from value should not be distributed.');
});

test('maxViewMode and navigation switch', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .datepicker({
                    maxViewMode: 0
                }),
        dp = input.data('datepicker'),
        picker = dp.picker;

    input.focus();

    picker.find('.datepicker-days thead th.datepicker-switch').click();
    ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
});

test('updateViewDate', function() {
    expect(8);

    var input = $('<input value="08/03/1990"/>')
                .appendTo('#qunit-fixture')
                .datepicker({
                  defaultViewDate: {
                    year: 1945,
                    month: 4,
                    day: 8
                  },
                  updateViewDate: false
                })
                .on('changeMonth', function() {
                  var msg = shouldTriggerChangeMonth ? 'changeMonth must be triggered' : 'changeMonth must not be triggered';
                  ok(shouldTriggerChangeMonth, msg);
                })
                .on('changeYear', function() {
                  var msg = shouldTriggerChangeYear ? 'changeYear must be triggered' : 'changeYear must not be triggered';
                  ok(shouldTriggerChangeYear, msg);
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        shouldTriggerChangeMonth = false,
        shouldTriggerChangeYear = false,
        monthShown = picker.find('.datepicker-days thead th.datepicker-switch');

    equal(monthShown.text(), "May 1945", 'uses defaultViewDate on initialization');
    input.datepicker('setDate', new Date(1945, 8, 2));
    equal(monthShown.text(), "May 1945", 'does not change viewDate on `setDate` method');
    input.focus();
    picker.find('.datepicker-days tbody tr td.day.new:first').click();
    equal(monthShown.text(), "May 1945", 'does not change viewDate if a day in next month is selected');
    shouldTriggerChangeMonth = true;
    picker.find('.datepicker-days thead th.next').click();
    equal(monthShown.text(), 'June 1945', 'changing month must still be possible'); // and must trigger `changeMonth` event
    shouldTriggerChangeYear = true;
    picker.find('.datepicker-days thead th.datepicker-switch').click();
    picker.find('.datepicker-months thead th.next').click();
    picker.find('.datepicker-months tbody .month:first').click();
    equal(monthShown.text(), 'January 1946', 'changing year must still be possible'); // and must trigger `changeYear` and `changeMonth` events
});
test('Week Days: Week days default visibility (or enabled)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.dow').length > 0, 'Week days added to view');
});
test('Week Days: Week days visibility when disabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    showWeekDays: false
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

    input.focus();
    ok(picker.find('.dow').length === 0, 'Week days not added to view');
});
