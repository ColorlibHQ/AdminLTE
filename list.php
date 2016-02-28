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
    Success! The list will refresh.
</div>
<div id="alFailure" class="alert alert-danger" role="alert" hidden="true">
    Failure! Something went wrong.
</div>

<!-- Password Modal -->
<div id="passModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Enter Your Pi-hole Password</h4>
            </div>
            <div class="modal-body">
                Please enter your Pi-hole password to proceed.
                <div id="alPassword" class="alert alert-danger" role="alert" hidden="true">
                    Wrong Password! Please try again.
                </div>
                <div class="form-group">
                    <label for="passInput">Password:</label>
                    <input id="passInput" type="password" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="$('#alPassword').hide()">Cancel</button>
                <button id="passBtn" type="button" class="btn btn-primary">Enter</button>
            </div>
        </div>
    </div>
</div>

<!-- Domain List -->
<ul class="list-group" id="list"></ul>

<?php
require "footer.php";
?>

<script>
    window.onload = refresh;
    var password = "";
    $("#passModal").on("shown.bs.modal", function() {
       $("#passInput").focus();
    });
    
    function refresh() {
        $.ajax({
            url: "php/get.php",
            method: "get",
            data: {"list":"<?php echo $list ?>"},
            success: function(response) {
                var list = document.getElementById("list");
                list.innerHTML = "";
                var data = JSON.parse(response);
                
                if(data.length === 0) {
                    list.innerHTML =
                        '<div class="alert alert-info" role="alert">Your <?php getFullName(); ?> is empty!</div>';
                }
                else {
                    data.forEach(function (entry, index) {
                        list.innerHTML +=
                            '<li id="' + index + '" class="list-group-item clearfix">' + entry +
                            '<button class="btn btn-danger btn-xs pull-right" type="button" onclick="sub(\'' + index + '\', \'' + entry + '\')">' +
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
        if(domain.length === 0)
            return;
        
        getPassword(function() {
            document.getElementById("alInfo").hidden = false;
            document.getElementById("alSuccess").hidden = true;
            document.getElementById("alFailure").hidden = true;
            $.ajax({
                url: "php/add.php",
                method: "get",
                data: {"domain":domain, "list":"<?php echo $list ?>", "pass":password},
                success: function(response) {
                    if(response.length !== 0)
                        return;
                    document.getElementById("alSuccess").hidden = false;
                    refresh();
                },
                error: function(jqXHR, exception) {
                    document.getElementById("alFailure").hidden = false;
                }
            });
        })
    }
    
    function sub(index, entry) {
        getPassword(function() {
            $("#"+index).hide("highlight");
            $.ajax({
                url: "php/sub.php",
                method: "get",
                data: {"domain":entry, "list":"<?php echo $list ?>", "pass":password},
                success: function(response) {
                    if(response.length !== 0)
                        return;
                    document.getElementById("list").removeChild(document.getElementById(index));
                },
                error: function(jqXHR, exception) {
                    alert("Failed to remove the domain!");
                }
            });
        });
    }
    
    function getPassword(callback) {
        // Check password and return
        if(password.length !== 0) {
            $.ajax({
                url: "php/checkPass.php",
                method: "get",
                data: {"pass":password},
                success: function(response) {
                    if(response === "Correct")
                        callback();
                },
                error: function(jqXHR, exception) {
                    alert("Failed to check password!");
                }
            });
            return;
        }
        
        // Prompt the user for password
        var modal = $("#passModal");
        modal.modal();
        
        // Handle enter button
        $("#passBtn").on("click", function() {
            var passInput = $("#passInput");
            var passAlert = $("#alPassword");
            password = passInput.val();
            
            // Execute callback if entered
            if(password.length !== 0) {
                // Check if password is correct
                $.ajax({
                    url: "php/checkPass.php",
                    method: "get",
                    data: {"pass":password},
                    success: function(response) {
                        if(response === "Correct") {
                            passInput.html("");
                            passAlert.hide();
                            modal.modal("hide");
                            callback();
                        }
                        else {
                            passAlert.show();
                            password = "";
                        }
                    },
                    error: function(jqXHR, exception) {
                        alert("Failed to check password!");
                        password = "";
                    }
                });
            }
            else {
                passAlert.show()
            }
        });
    }
</script>
