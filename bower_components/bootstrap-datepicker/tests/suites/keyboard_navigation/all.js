module('Keyboard Navigation (All)', {
    setup: function(){
        this.input = $('<input type="text">')
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

test('TAB hides picker', function(){
    var target;

    ok(this.picker.is(':visible'), 'Picker is visible');

    this.input.trigger({
        type: 'keydown',
        keyCode: 9
    });

    ok(this.picker.is(':not(:visible)'), 'Picker is hidden');
});

test('by day (right/left arrows) with daysOfWeekDisabled', function(){
    var target;

    this.input.val('04-03-2013');
    this.dp.setDaysOfWeekDisabled('0,6');
    this.dp.update();

    this.input.focus();

    // Navigation: -1 day left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });

    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 1));
});

test('by day (right/left arrows) with datesDisabled', function(){
    var target;

    this.input.val('04-03-2013');
    this.dp.setDatesDisabled(['05-03-2013']);
    this.dp.update();

    this.input.focus();

    // Navigation: +1 day right arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 39
    });

    datesEqual(this.dp.viewDate, UTCDate(2013, 2, 6));
});
