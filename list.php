<?php
session_start();
require "header.html";

$list = $_GET['l'];

function getFullName() {
    global $list;
    if($list == "white")
        echo "Whitelist";
    else
        echo "Blacklist";
}

// Generate CSRF token
if(empty($_SESSION['token'])) {
    $_SESSION['token'] = base64_encode(openssl_random_pseudo_bytes(32));
}
$token = $_SESSION['token'];
?>

<!-- Title -->
<div class="page-header">
    <h1><?php getFullName(); ?></h1>
</div>

<!-- Domain Input -->
<div class="form-group input-group">
    <input id="domain" type="text" class="form-control" placeholder="Add a domain (example.com or sub.example.com)">
    <span class="input-group-btn">
        <button class="btn btn-default" type="button" onclick="add()">Add</button>
        <button class="btn btn-default" type="button" onclick="refresh(true)">Refresh</button>
    </span>
</div>

<!-- Alerts -->
<div id="alInfo" class="alert alert-info alert-dismissible fade in" role="alert" hidden="true">
    <button type="button" class="close" data-hide="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    Adding to the <?php getFullName(); ?>...
</div>
<div id="alSuccess" class="alert alert-success alert-dismissible fade in" role="alert" hidden="true">
    <button type="button" class="close" data-hide="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    Success! The list will refresh.
</div>
<div id="alFailure" class="alert alert-danger alert-dismissible fade in" role="alert" hidden="true">
    <button type="button" class="close" data-hide="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    Failure! Something went wrong.
</div>

<!-- Domain List -->
<ul class="list-group" id="list"></ul>

<?php
require "footer.php";
?>

<script>
    window.onload = refresh(false);
    $.ajaxSetup({cache: false});
    $(document).keypress(function(e) {
        if(e.which === 13 && $("#domain").is(":focus")) {
            // Enter was pressed, and the input has focus
            add();
        }
    });
    $(function(){
        $("[data-hide]").on("click", function(){
            $(this).closest("." + $(this).attr("data-hide")).hide();
        });
    });
    
    function refresh(fade) {
        var list = $("#list");
        if(fade) {
            list.fadeOut(100);
        }
        $.ajax({
            url: "php/get.php",
            method: "get",
            data: {"list":"<?php echo $list ?>"},
            success: function(response) {
                list.html("");
                var data = JSON.parse(response);
                
                if(data.length === 0) {
                    list.html('<div class="alert alert-info" role="alert">Your <?php getFullName(); ?> is empty!</div>');
                }
                else {
                    data.forEach(function (entry, index) {
                        list.append(
                            '<li id="' + index + '" class="list-group-item clearfix">' + entry +
                            '<button class="btn btn-danger btn-xs pull-right" type="button" onclick="sub(\'' + index + '\', \'' + entry + '\')">' +
                            '<span class="glyphicon glyphicon-trash"></span></button></li>'
                        );
                    });
                    list.fadeIn("fast");
                }
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
            data: {"domain":domain.val(), "list":"<?php echo $list ?>", "token":"<?php echo $token ?>"},
            success: function(response) {
                if(response.length !== 0)
                    return;
                alSuccess.show();
                alSuccess.delay(1000).fadeOut(2000, function() {
                    alSuccess.hide();
                });
                alInfo.delay(1000).fadeOut(2000, function() {
                    alInfo.hide();
                });
                domain.val("");
                refresh(true);
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
            data: {"domain":entry, "list":"<?php echo $list ?>", "token":"<?php echo $token ?>"},
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
</script>
