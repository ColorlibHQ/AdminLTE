module('Events on initialization', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
            .appendTo('#qunit-fixture')
    }
});

test('When initializing the datepicker, it should trigger no change or changeDate events', function(){
    var triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        change: function(){
            triggered_change++;
        },
        changeDate: function(){
            triggered_changeDate++;
        }
    });

    this.input.datepicker({format: 'dd-mm-yyyy'});

    equal(triggered_change, 0);
    equal(triggered_changeDate, 0);
});

module('Events', {
    setup: function(){
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

test('Selecting a year from decade view triggers changeYear', function(){
    var target,
        triggered = 0;

    this.input.on('changeYear', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    target = this.picker.find('.datepicker-months thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-years').is(':visible'), 'Year picker is visible');
    equal(this.dp.viewMode, 2);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    // Change years to test internal state changes
    target = this.picker.find('.datepicker-years tbody span:contains(2010)');
    target.click();
    equal(this.dp.viewMode, 1);
    // Only viewDate modified
    datesEqual(this.dp.viewDate, UTCDate(2010, 2, 1));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));
    equal(triggered, 1);
});

test('Navigating forward/backward from month view triggers changeYear', function(){
    var target,
        triggered = 0;

    this.input.on('changeYear', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);

    target = this.picker.find('.datepicker-months thead th.prev');
    ok(target.is(':visible'), 'Prev switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(triggered, 1);

    target = this.picker.find('.datepicker-months thead th.next');
    ok(target.is(':visible'), 'Next switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(triggered, 2);
});

test('Selecting a month from year view triggers changeMonth', function(){
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    ok(target.is(':visible'), 'View switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');
    equal(this.dp.viewMode, 1);
    // Not modified when switching modes
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));

    target = this.picker.find('.datepicker-months tbody span:contains(Apr)');
    target.click();
    equal(this.dp.viewMode, 0);
    // Only viewDate modified
    datesEqual(this.dp.viewDate, UTCDate(2011, 3, 1));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 31));
    equal(triggered, 1);
});

test('Navigating forward/backward from month view triggers changeMonth', function(){
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.prev');
    ok(target.is(':visible'), 'Prev switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Day picker is visible');
    equal(triggered, 1);

    target = this.picker.find('.datepicker-days thead th.next');
    ok(target.is(':visible'), 'Next switcher is visible');

    target.click();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Day picker is visible');
    equal(triggered, 2);
});

test('format() returns a formatted date string', function(){
    var target,
        error, out;

    this.input.on('changeDate', function(e){
        try{
            out = e.format();
        }
        catch(e){
            error = e;
        }
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    target.click();

    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 14));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 14));
    equal(error, undefined);
    equal(out, '14-03-2011');
});

test('format(altformat) returns a formatted date string', function(){
    var target,
        error, out;

    this.input.on('changeDate', function(e){
        try{
            out = e.format('m/d/yy');
        }
        catch(e){
            error = e;
        }
    });

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    target.click();

    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 14));
    datesEqual(this.dp.dates[0], UTCDate(2011, 2, 14));
    equal(error, undefined);
    equal(out, '3/14/11');
});

test('format(ix) returns a formatted date string of the ix\'th date selected', function(){
    var target,
        error, out;

    this.dp._process_options({multidate: true});

    this.input.on('changeDate', function(e){
        try{
            out = e.format(2);
        }
        catch(e){
            error = e;
        }
    });

    target = this.picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '6'); // Mar 6
    target.click();

    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '14'); // Mar 16
    target.click();

    equal(this.dp.dates.length, 3);

    equal(error, undefined);
    equal(out, '14-03-2011');
});

test('format(ix, altformat) returns a formatted date string', function(){
    var target,
        error, out;

    this.dp._process_options({multidate: true});

    this.input.on('changeDate', function(e){
        try{
            out = e.format(2, 'm/d/yy');
        }
        catch(e){
            error = e;
        }
    });

    target = this.picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '6'); // Mar 6
    target.click();

    target = this.picker.find('.datepicker-days tbody td:nth(15)');
    equal(target.text(), '14'); // Mar 16
    target.click();

    equal(this.dp.dates.length, 3);

    equal(error, undefined);
    equal(out, '3/14/11');
});

test('Clear button: triggers change and changeDate events', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy",
                        clearBtn: true
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        changeDate: function(){
            triggered_changeDate++;
        },
        change: function(){
            triggered_change++;
        }
    });

    this.input.focus();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Days view visible');
    ok(this.picker.find('.datepicker-days tfoot .clear').is(':visible'), 'Clear button visible');

    target = this.picker.find('.datepicker-days tfoot .clear');
    target.click();

    equal(triggered_change, 1);
    equal(triggered_changeDate, 1);
});

test('setDate: triggers change and changeDate events', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy"
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered_change = 0,
        triggered_changeDate = 0;

    this.input.on({
        changeDate: function(){
            triggered_changeDate++;
        },
        change: function(){
            triggered_change++;
        }
    });

    this.input.focus();
    ok(this.picker.find('.datepicker-days').is(':visible'), 'Days view visible');

    this.dp.setDate(new Date(2011, 2, 5));

    equal(triggered_change, 1);
    equal(triggered_changeDate, 1);
});

test('paste must update the date', function() {
    var dateToPaste = '22-07-2015';
    var evt = {
        type: 'paste',
        originalEvent: {
            clipboardData: {
                types: ['text/plain'],
                getData: function() { return dateToPaste; }
            },
            preventDefault: function() { evt.originalEvent.isDefaultPrevented = true; },
            isDefaultPrevented: false
        }
    };
    this.input.trigger(evt);
    datesEqual(this.dp.dates[0], UTCDate(2015, 6, 22));

    ok(evt.originalEvent.isDefaultPrevented, 'prevented original event');
});

test('clicking outside datepicker triggers \'hide\' event', function(){
    var $otherelement = $('<div />');
    $('body').append($otherelement);

    var isHideTriggered;
    this.input.on('hide', function() { isHideTriggered = true; });

    $otherelement.trigger('mousedown');

    ok(isHideTriggered, '\'hide\' event is not triggered');

    $otherelement.remove();
});

test('Selecting date from previous month triggers changeMonth', function() {
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:first');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});

test('Selecting date from previous month in january triggers changeMonth/changeYear', function() {
    var target,
        triggeredM = 0,
        triggeredY = 0;

    this.input.val('01-01-2011');
    this.dp.update();

    this.input.on('changeMonth', function(){
        triggeredM++;
    });

    this.input.on('changeYear', function(){
        triggeredY++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:first');
    target.click();

    // ensure event has been triggered
    equal(triggeredM, 1);
    equal(triggeredY, 1);
});

test('Selecting date from next month triggers changeMonth', function() {
    var target,
        triggered = 0;

    this.input.on('changeMonth', function(){
        triggered++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:last');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});

test('Selecting date from next month in december triggers changeMonth/changeYear', function() {
    var target,
        triggeredM = 0,
        triggeredY = 0;

    this.input.val('01-12-2011');
    this.dp.update();

    this.input.on('changeMonth', function(){
        triggeredM++;
    });

    this.input.on('changeYear', function(){
        triggeredY++;
    });

    // find first day of previous month
    target = this.picker.find('.datepicker-days tbody td:last');
    target.click();

    // ensure event has been triggered
    equal(triggeredM, 1);
    equal(triggeredY, 1);
});

test('Changing view mode triggers changeViewMode', function () {
  var viewMode = -1,
    triggered = 0;

  this.input.val('22-07-2016');
  this.dp.update();

  this.input.on('changeViewMode', function (e) {
    viewMode = e.viewMode;
    triggered++;
  });

  // change from days to months
  this.picker.find('.datepicker-days .datepicker-switch').click();
  equal(triggered, 1);
  equal(viewMode, 1);

  // change from months to years
  this.picker.find('.datepicker-months .datepicker-switch').click();
  equal(triggered, 2);
  equal(viewMode, 2);

  // change from years to decade
  this.picker.find('.datepicker-years .datepicker-switch').click();
  equal(triggered, 3);
  equal(viewMode, 3);

  // change from decades to centuries
  this.picker.find('.datepicker-decades .datepicker-switch').click();
  equal(triggered, 4);
  equal(viewMode, 4);

});

test('Clicking inside content of date with custom beforeShowDay content works', function(){
    this.input = $('<input type="text" value="31-03-2011">')
                    .appendTo('#qunit-fixture')
                    .datepicker({
                        format: "dd-mm-yyyy",
                        beforeShowDay: function (date) { return { content: '<div><div>' + date.getDate() + '</div></div>' }; }
                    })
                    .focus(); // Activate for visibility checks
    this.dp = this.input.data('datepicker');
    this.picker = this.dp.picker;

    var target,
        triggered = 0;

    this.input.on('changeDate', function(){
        triggered++;
    });

    // find deepest date
    target = this.picker.find('.datepicker-days tbody td:first div div');
    target.click();

    // ensure event has been triggered
    equal(triggered, 1);
});
