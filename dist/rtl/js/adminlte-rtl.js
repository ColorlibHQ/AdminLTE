$(document).ready(function(){

    // Fixing Error when RTL knob
    var translateX = $('input.knob').css('margin-left').charAt(0) == '-' ? $('input.knob').css('margin-left').substring(1) : '-'+$('input.knob').css('margin-left');
    $('input.knob').css('transform', 'translateX('+translateX+')');
    // Fixing Error when RTL knob

})