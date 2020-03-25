<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Custom Load Indicator</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <script src="http://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.1/spin.min.js"></script>
    <script src="../external/jquery/jquery-1.8.3.js"></script>

    <script src="../src/jsgrid.core.js"></script>
    <script src="../src/jsgrid.load-indicator.js"></script>
    <script src="../src/jsgrid.load-strategies.js"></script>
    <script src="../src/jsgrid.sort-strategies.js"></script>
    <script src="../src/jsgrid.field.js"></script>
    <script src="../src/fields/jsgrid.field.text.js"></script>
    <script src="../src/fields/jsgrid.field.textarea.js"></script>
    <script src="../src/fields/jsgrid.field.number.js"></script>

    <style>
        .rating {
            color: #F8CA03;
        }
    </style>
</head>
<body>
    <h1>Custom Load Indicator</h1>
    <div id="jsGrid"></div>

    <script>
        $(function() {

            $("#jsGrid").jsGrid({
                height: "50%",
                width: "100%",
                sorting: true,
                paging: false,
                autoload: true,
                controller: {
                    loadData: function() {
                        var d = $.Deferred();

                        $.ajax({
                            url: "http://services.odata.org/V3/(S(3mnweai3qldmghnzfshavfok))/OData/OData.svc/Products",
                            dataType: "json"
                        }).done(function(response) {
                            setTimeout(function() {
                                d.resolve(response.value);
                            }, 2000);
                        });

                        return d.promise();
                    }
                },
                loadIndicator: function(config) {
                    var container = config.container[0];
                    var spinner = new Spinner();

                    return {
                        show: function() {
                            spinner.spin(container);
                        },
                        hide: function() {
                            spinner.stop();
                        }
                    };
                },
                fields: [
                    { name: "Name", type: "text" },
                    { name: "Description", type: "textarea", width: 150 },
                    { name: "Rating", type: "number", width: 50, align: "center",
                        itemTemplate: function(value) {
                            return $("<div>").addClass("rating").append(Array(value + 1).join("&#9733;"));
                        }
                    },
                    { name: "Price", type: "number", width: 50,
                        itemTemplate: function(value) {
                            return value.toFixed(2) + "$"; }
                    }
                ]
            });

        });
    </script>
</body>
</html>
