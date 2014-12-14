/*
 * We are gonna initialize all checkbox and radio inputs to 
 * iCheck plugin in.
 * You can find the documentation at http://fronteed.com/iCheck/
 */
$(function () {
    "use strict";
    $("input[type='checkbox']:not(.simple), input[type='radio']:not(.simple)").icheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
});