module('Keyboard Navigation 2012', {
    setup: function(){
        /*
            Tests start with picker on March 31, 2012.  Fun facts:

            * February 1, 2012 was on a Wednesday
            * February 29, 2012 was on a Wednesday
            * March 1, 2012 was on a Thursday
            * March 31, 2012 was on a Saturday
        */
        this.input = $('<input type="text" value="31-03-2012">')
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


test('by day (right/left arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 2, 30));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: +1 day, right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39
        });
    datesEqual(this.dp.viewDate, UTCDate(2012, 3, 1));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 3, 1));
    // Month changed: April 1 (this is not a joke!)
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by week (up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 week, up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 24));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 2, 24));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: +1 week, down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40
        });
    datesEqual(this.dp.viewDate, UTCDate(2012, 3, 7));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 3, 7));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by month, v1 (shift + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 month, shift + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        shiftKey: true
    });
    // view and focus updated on keyboard navigation w/ graceful date ends, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 1, 29));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 1, 29));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 month, shift + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            shiftKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2012, 3, 29));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 3, 29));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by month, v2 (shift + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 month, shift + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        shiftKey: true
    });
    // view and focus updated on keyboard navigation w/ graceful date ends, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 1, 29));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 1, 29));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 month, shift + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            shiftKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2012, 3, 29));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 3, 29));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by year, v1 (ctrl + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2011, 2, 31));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            ctrlKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2013, 2, 31));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v2 (ctrl + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        ctrlKey: true
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2011, 2, 31));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            ctrlKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2013, 2, 31));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v3 (ctrl + shift + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true,
        shiftKey: true
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2011, 2, 31));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            ctrlKey: true,
            shiftKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2013, 2, 31));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v4 (ctrl + shift + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        ctrlKey: true,
        shiftKey: true
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2011, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2011, 2, 31));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            ctrlKey: true,
            shiftKey: true
        });
    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2013, 2, 31));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, from leap day', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');

    this.input.val('29-02-2012').datepicker('update');
    datesEqual(this.dp.viewDate, UTCDate(2012, 1, 29));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 1, 29));
    equal(this.dp.focusDate, null);
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: -1 year
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true
    });
    // view and focus updated on keyboard navigation w/ graceful month ends, not selected
    datesEqual(this.dp.viewDate, UTCDate(2011, 1, 28));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 1, 29));
    datesEqual(this.dp.focusDate, UTCDate(2011, 1, 28));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2011', 'Title is "February 2011"');

    // Navigation: +1 year, back to leap year
    this.input.trigger({
        type: 'keydown',
        keyCode: 39,
        ctrlKey: true
    });
    // view and focus updated on keyboard navigation w/ graceful month ends, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 1, 28));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 1, 29));
    datesEqual(this.dp.focusDate, UTCDate(2012, 1, 28));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 year
    this.input.trigger({
        type: 'keydown',
        keyCode: 39,
        ctrlKey: true
    });
    // view and focus updated on keyboard navigation w/ graceful month ends, not selected
    datesEqual(this.dp.viewDate, UTCDate(2013, 1, 28));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 1, 29));
    datesEqual(this.dp.focusDate, UTCDate(2013, 1, 28));
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'February 2013', 'Title is "February 2013"');
});

test('Selection (enter)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 2, 30));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Selection: Enter
    this.input.trigger({
        type: 'keydown',
        keyCode: 13
    });
    // view and selection updated, focus cleared
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 30));
    equal(this.dp.focusDate, null);
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    ok(this.picker.is(':visible'), 'Picker is not hidden');
});

test('Selection + hide (enter)', function(){
    var target;

    this.dp._process_options({autoclose: true});
    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    // view and focus updated on keyboard navigation, not selected
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));
    datesEqual(this.dp.focusDate, UTCDate(2012, 2, 30));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Selection: Enter
    this.input.trigger({
        type: 'keydown',
        keyCode: 13
    });
    // view and selection updatedfocus cleared
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 30));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 30));
    equal(this.dp.focusDate, null);
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    ok(this.picker.is(':not(:visible)'), 'Picker is hidden');
});

test('Toggle hide/show (escape); navigation while hidden is suppressed', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.datepicker-switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    ok(this.picker.is(':visible'), 'Picker is visible');

    // Hide
    this.input.trigger({
        type: 'keydown',
        keyCode: 27
    });

    ok(this.picker.is(':not(:visible)'), 'Picker is hidden');
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));

    // left arrow key, *doesn't* navigate
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });

    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));

    // Show - with escape key
    this.input.trigger({
        type: 'keydown',
        keyCode: 27
    });

    ok(this.picker.is(':visible'), 'Picker is visible');
    datesEqual(this.dp.viewDate, UTCDate(2012, 2, 31));
    datesEqual(this.dp.dates.get(-1), UTCDate(2012, 2, 31));

    // Hide
    this.input.trigger({
        type: 'keydown',
        keyCode: 27
    });

    // Show - with down key
    this.input.trigger({
        type: 'keydown',
        keyCode: 40
    });

    ok(this.picker.is(':visible'), 'Picker is visible');
});

