<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Batch Delete</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <script src="../external/jquery/jquery-1.8.3.js"></script>
    <script src="db.js"></script>

    <script src="../src/jsgrid.core.js"></script>
    <script src="../src/jsgrid.load-indicator.js"></script>
    <script src="../src/jsgrid.load-strategies.js"></script>
    <script src="../src/jsgrid.sort-strategies.js"></script>
    <script src="../src/jsgrid.field.js"></script>
    <script src="../src/fields/jsgrid.field.text.js"></script>
    <script src="../src/fields/jsgrid.field.number.js"></script>
    <script src="../src/fields/jsgrid.field.control.js"></script>
</head>
<body>
    <h1>Batch Delete</h1>

    <div id="jsGrid"></div>

    <script>
        $(function() {

            $("#jsGrid").jsGrid({
                height: "50%",
                width: "100%",
                autoload: true,
                confirmDeleting: false,
                paging: true,
                controller: {
                    loadData: function() {
                        return db.clients;
                    }
                },
                fields: [
                    {
                        headerTemplate: function() {
                            return $("<button>").attr("type", "button").text("Delete")
                                    .on("click", function () {
                                        deleteSelectedItems();
                                    });
                        },
                        itemTemplate: function(_, item) {
                            return $("<input>").attr("type", "checkbox")
                                    .prop("checked", $.inArray(item, selectedItems) > -1)
                                    .on("change", function () {
                                        $(this).is(":checked") ? selectItem(item) : unselectItem(item);
                                    });
                        },
                        align: "center",
                        width: 50
                    },
                    { name: "Name", type: "text", width: 150 },
                    { name: "Age", type: "number", width: 50 },
                    { name: "Address", type: "text", width: 200 }
                ]
            });


            var selectedItems = [];

            var selectItem = function(item) {
                selectedItems.push(item);
            };

            var unselectItem = function(item) {
                selectedItems = $.grep(selectedItems, function(i) {
                    return i !== item;
                });
            };

            var deleteSelectedItems = function() {
                if(!selectedItems.length || !confirm("Are you sure?"))
                    return;

                deleteClientsFromDb(selectedItems);

                var $grid = $("#jsGrid");
                $grid.jsGrid("option", "pageIndex", 1);
                $grid.jsGrid("loadData");

                selectedItems = [];
            };

            var deleteClientsFromDb = function(deletingClients) {
                db.clients = $.map(db.clients, function(client) {
                    return ($.inArray(client, deletingClients) > -1) ? null : client;
                });
            };

        });
    </script>
</body>
</html>
