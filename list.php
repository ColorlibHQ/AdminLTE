<?php
require "header.html";

$list = $_GET['l'];

function getFullName() {
    global $list;
    if($list == "white")
        echo "Whitelist";
    else
        echo "Blacklist";
}
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
    Success! It will probably take 2-10 minutes until the changes take effect. The list will refresh.
</div>
<div id="alFailure" class="alert alert-danger" role="alert" hidden="true">
    Failure! Something went wrong.
</div>

<!-- Domain List -->
<ul class="list-group" id="list"></ul>

<?php
require "footer.html";
?>

<script>
    window.onload = refresh;
    
    function refresh() {
        $.ajax({
            url: "php/get.php",
            method: "get",
            data: {"list":"<?php echo $list ?>"},
            success: function(response) {
                var list = document.getElementById("list");
                list.innerHTML = "";
                var data = JSON.parse(response);
                
                if(data.length == 0) {
                    list.innerHTML =
                        '<div class="alert alert-info" role="alert">Your <?php getFullName(); ?> is empty!</div>';
                }
                else {
                    data.forEach(function (entry) {
                        list.innerHTML +=
                            '<li id="' + entry + '" class="list-group-item clearfix">' + entry +
                            '<button class="btn btn-danger btn-xs pull-right" type="button" onclick="sub(\'' + entry + '\')">' +
                            '<span class="glyphicon glyphicon-trash"></span></button></li>';
                    })
                }
            },
            error: function(jqXHR, exception) {
                document.getElementById("alFailure").hidden = false;
            }
        });
    }
    
    function add() {
        var domain = document.getElementById("domain").value;
        if(domain == "")
            return;
        
        document.getElementById("alInfo").hidden = false;
        document.getElementById("alSuccess").hidden = true;
        document.getElementById("alFailure").hidden = true;
        $.ajax({
            url: "php/add.php",
            method: "get",
            data: {"domain":domain, "list":"<?php echo $list ?>"},
            success: function(response) {
                document.getElementById("alSuccess").hidden = false;
                refresh();
            },
            error: function(jqXHR, exception) {
                document.getElementById("alFailure").hidden = false;
            }
        });
    }
    
    function sub(entry) {
        $.ajax({
            url: "php/sub.php",
            method: "get",
            data: {"domain":entry, "list":"<?php echo $list ?>"},
            success: function(response) {
                document.getElementById("list").removeChild(document.getElementById(entry));
            },
            error: function(jqXHR, exception) {
                alert("Failed to remove the domain!");
            }
        });
    }
</script>
