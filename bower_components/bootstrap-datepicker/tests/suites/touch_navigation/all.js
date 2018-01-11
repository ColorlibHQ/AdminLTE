module('Touch Navigation (All)', {
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

test('Tapping outside datepicker hides datepicker', function(){
    var $otherelement = $('<div />');
    $('body').append($otherelement);

    ok(this.picker.is(':visible'), 'Picker is visible');
    this.input.trigger('click');
    ok(this.picker.is(':visible'), 'Picker is still visible');

    $otherelement.trigger('touchstart');
    ok(this.picker.is(':not(:visible)'), 'Picker is hidden');

    $otherelement.remove();
});
