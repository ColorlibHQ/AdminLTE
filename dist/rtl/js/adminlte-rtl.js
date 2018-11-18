$(document).ready(function(){

    // Fixing Error when RTL knob
    $('input.knob').each(function(){
        var translateX = $(this).css('margin-left').charAt(0) == '-' ? $(this).css('margin-left').substring(1) : '-'+$(this).css('margin-left');
        $(this).css('transform', 'translateX('+translateX+')');
    })
    // Fixing Error when RTL knob

})