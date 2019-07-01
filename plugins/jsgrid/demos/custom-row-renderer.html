<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Custom Row Renderer</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <script src="../external/jquery/jquery-1.8.3.js"></script>

    <script src="../src/jsgrid.core.js"></script>
    <script src="../src/jsgrid.load-indicator.js"></script>
    <script src="../src/jsgrid.load-strategies.js"></script>
    <script src="../src/jsgrid.sort-strategies.js"></script>
    <script src="../src/jsgrid.field.js"></script>

    <style>
        .client-photo { float: left; margin: 0 20px 0 10px; }
        .client-photo img { border-radius: 50%; border: 1px solid #ddd; }
        .client-info { margin-top: 10px; }
        .client-info p { line-height: 25px; }
    </style>
</head>
<body>
    <h1>Custom Row Renderer</h1>
    <div id="jsGrid"></div>

    <script>
        $(function() {

            $("#jsGrid").jsGrid({
                height: "80%",
                width: "50%",
                autoload: true,
                paging: true,
                controller: {
                    loadData: function() {
                        var deferred = $.Deferred();

                        $.ajax({
                            url: 'http://api.randomuser.me/?results=40',
                            dataType: 'jsonp',
                            success: function(data){
                                deferred.resolve(data.results);
                            }
                        });

                        return deferred.promise();
                    }
                },
                rowRenderer: function(item) {
                    var user = item;
                    var $photo = $("<div>").addClass("client-photo").append($("<img>").attr("src", user.picture.large));
                    var $info = $("<div>").addClass("client-info")
                        .append($("<p>").append($("<strong>").text(user.name.first.capitalize() + " " + user.name.last.capitalize())))
                        .append($("<p>").text("Location: " + user.location.city.capitalize() + ", " + user.location.street))
                        .append($("<p>").text("Email: " + user.email))
                        .append($("<p>").text("Phone: " + user.phone))
                        .append($("<p>").text("Cell: " + user.cell));

                    return $("<tr>").append($("<td>").append($photo).append($info));
                },
                fields: [
                    { title: "Clients" }
                ]
            });


            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            };

        });
    </script>
</body>
</html>
