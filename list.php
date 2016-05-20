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
        <button class="btn btn-default" type="button" onclick="refresh()">Refresh</button>
    </span>
</div>

<!-- Alerts -->
<div id="alInfo" class="alert alert-info" role="alert" hidden="true">
    Adding to the <?php getFullName(); ?>...
</div>
<div id="alSuccess" class="alert alert-success" role="alert" hidden="true">
    Success! The list will refresh.
</div>
<div id="alFailure" class="alert alert-danger" role="alert" hidden="true">
    Failure! Something went wrong.
</div>

<!-- Domain List -->
<ul class="list-group" id="list"></ul>

<?php
require "footer.php";
?>

<script>
    window.onload = refresh;
    $.ajaxSetup({cache: false});
    
    function refresh() {
        $.ajax({
            url: "php/get.php",
            method: "get",
            data: {"list":"<?php echo $list ?>"},
            success: function(response) {
                var list = $("#list");
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
        
        $("#alInfo").show();
        $("#alSuccess").hide();
        $("#alFailure").hide();
        $.ajax({
            url: "php/add.php",
            method: "post",
            data: {"domain":domain.val(), "list":"<?php echo $list ?>", "token":"<?php echo $token ?>"},
            success: function(response) {
                if(response.length !== 0)
                    return;
                $("#alSuccess").show();
                domain.val("");
                refresh();
            },
            error: function(jqXHR, exception) {
                $("#alFailure").show();
            }
        });
    }
    
    function sub(index, entry) {
        $("#"+index).hide("highlight");
        $.ajax({
            url: "php/sub.php",
            method: "post",
            data: {"domain":entry, "list":"<?php echo $list ?>", "token":"<?php echo $token ?>"},
            success: function(response) {
                if(response.length !== 0)
                    return;
                $("#list #"+index+"").remove();
            },
            error: function(jqXHR, exception) {
                alert("Failed to remove the domain!");
            }
        });
    }
</script>
