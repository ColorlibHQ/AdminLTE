// IE likes to cache too much :P
$.ajaxSetup({cache: false});

// Handle enter button for adding domains
$(document).keypress(function(e) {
    if(e.which === 13 && $("#domain").is(":focus")) {
        // Enter was pressed, and the input has focus
        add();
    }
});

// Handle buttons
$("#btnAdd").on("click", function() {
    add();
});
$("#btnRefresh").on("click", function() {
    refresh(true);
});

// Handle hiding of alerts
$(function(){
    $("[data-hide]").on("click", function(){
        $(this).closest("." + $(this).attr("data-hide")).hide();
    });
});

// Get PHP info
var token = $("#token").html();
var list_type = $("#list-type").html();
var fullName = list_type === "white" ? "Whitelist" : "Blacklist";

window.onload = refresh(false);

function refresh(fade) {
    var list = $("#list");
    if(fade) {
        list.fadeOut(100);
    }
    $.ajax({
        url: "php/get.php",
        method: "get",
        data: {"list":list_type},
        success: function(response) {
            list.html("");
            var data = JSON.parse(response);

            if(data.length === 0) {
                list.html('<div class="alert alert-info" role="alert">Your ' + fullName + ' is empty!</div>');
            }
            else {
                data.forEach(function (entry, index) {
                    list.append(
                        '<li id="' + index + '" class="list-group-item clearfix">' + entry +
                        '<button class="btn btn-danger btn-xs pull-right" type="button">' +
                        '<span class="glyphicon glyphicon-trash"></span></button></li>'
                    );

                    // Handle button
                    $("#list #"+index+"").on("click", "button", function() {
                        sub(index, entry)
                    });
                });
            }
            list.fadeIn("fast");
        },
        error: function(jqXHR, exception) {
            $("#alFailure").show();
        }
    });
}

function add() {
    var domain = $("#domain");
    if(domain.val().length === 0)
        return;

    var alInfo = $("#alInfo");
    var alSuccess = $("#alSuccess");
    var alFailure = $("#alFailure");
    alInfo.show();
    alSuccess.hide();
    alFailure.hide();
    $.ajax({
        url: "php/add.php",
        method: "post",
        data: {"domain":domain.val(), "list":list_type, "token":token},
        success: function(response) {
          if (response.indexOf("not a valid argument")>=0) {
            alFailure.show();
            alFailure.delay(1000).fadeOut(2000, function() {
                alFailure.hide();
            });
            alInfo.delay(1000).fadeOut(2000, function() {
                alInfo.hide();
            });
          } else {
            alSuccess.show();
            alSuccess.delay(1000).fadeOut(2000, function() {
                alSuccess.hide();
            });
            alInfo.delay(1000).fadeOut(2000, function() {
                alInfo.hide();
            });
            domain.val("");
            refresh(true);
          }
        },
        error: function(jqXHR, exception) {
            alFailure.show();
            alFailure.delay(1000).fadeOut(2000, function() {
                alFailure.hide();
            });
            alInfo.delay(1000).fadeOut(2000, function() {
                alInfo.hide();
            });
        }
    });
}

function sub(index, entry) {
    var domain = $("#"+index);
    domain.hide("highlight");
    $.ajax({
        url: "php/sub.php",
        method: "post",
        data: {"domain":entry, "list":list_type, "token":token},
        success: function(response) {
            if(response.length !== 0)
                return;
            domain.remove();
        },
        error: function(jqXHR, exception) {
            alert("Failed to remove the domain!");
        }
    });
}
