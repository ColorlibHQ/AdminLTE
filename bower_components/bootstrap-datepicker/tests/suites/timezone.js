module('Component', {
    setup: function(){
        this.component = $('<div class="input-append date" id="datepicker">'+
                               '<input type="text">'+
                           '</div>')
                        .appendTo('#qunit-fixture')
                        .datepicker();
        this.dp = this.component.data('datepicker');
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Check title with timezone', function(){
    var target;

    this.dp.viewDate = UTCDate(2015, 7, 1);
    this.dp.fill();

    target = this.picker.find('.datepicker-days .datepicker-switch');
    equal(target.text(), 'August 2015', 'Title is "August 2015"');
});
