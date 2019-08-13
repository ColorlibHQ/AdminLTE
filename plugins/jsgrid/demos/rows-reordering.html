<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Rows Reordering Scenario</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
    <script src="db.js"></script>

    <script src="../src/jsgrid.core.js"></script>
    <script src="../src/jsgrid.load-indicator.js"></script>
    <script src="../src/jsgrid.load-strategies.js"></script>
    <script src="../src/jsgrid.sort-strategies.js"></script>
    <script src="../src/jsgrid.field.js"></script>
    <script src="../src/fields/jsgrid.field.text.js"></script>
    <script src="../src/fields/jsgrid.field.number.js"></script>
    <script src="../src/fields/jsgrid.field.select.js"></script>
    <script src="../src/fields/jsgrid.field.checkbox.js"></script>
    <script src="../src/fields/jsgrid.field.control.js"></script>
</head>
<body>
<h1>Rows Reordering Scenario</h1>
<div id="jsGrid"></div>

<script>
    $(function() {

        $("#jsGrid").jsGrid({
            height: "70%",
            width: "100%",
            autoload: true,

            rowClass: function(item, itemIndex) {
                return "client-" + itemIndex;
            },

            controller: {
                loadData: function() {
                    return db.clients.slice(0, 15);
                }
            },

            fields: [
                { name: "Name", type: "text", width: 150 },
                { name: "Age", type: "number", width: 50 },
                { name: "Address", type: "text", width: 200 },
                { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
                { name: "Married", type: "checkbox", title: "Is Married", sorting: false }
            ],

            onRefreshed: function() {
                var $gridData = $("#jsGrid .jsgrid-grid-body tbody");

                $gridData.sortable({
                    update: function(e, ui) {
                        // array of indexes
                        var clientIndexRegExp = /\s*client-(\d+)\s*/;
                        var indexes = $.map($gridData.sortable("toArray", { attribute: "class" }), function(classes) {
                            return clientIndexRegExp.exec(classes)[1];
                        });
                        alert("Reordered indexes: " + indexes.join(", "));

                        // arrays of items
                        var items = $.map($gridData.find("tr"), function(row) {
                            return $(row).data("JSGridItem");
                        });
                        console && console.log("Reordered items", items);
                    }
                });
            }
        });

    });
</script>
</body>
</html>
