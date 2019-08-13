<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Custom View Scenario</title>
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
    <script src="../src/fields/jsgrid.field.select.js"></script>
    <script src="../src/fields/jsgrid.field.checkbox.js"></script>
    <script src="../src/fields/jsgrid.field.control.js"></script>

    <style>
        .config-panel {
            padding: 10px;
            margin: 10px 0;
            background: #fcfcfc;
            border: 1px solid #e9e9e9;
            display: inline-block;
        }

        .config-panel label {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>Custom View</h1>
    <div class="config-panel">
        <label><input id="heading" type="checkbox" checked /> Heading</label>
        <label><input id="filtering" type="checkbox" checked /> Filtering</label>
        <label><input id="inserting" type="checkbox" /> Inserting</label>
        <label><input id="editing" type="checkbox" checked /> Editing</label>
        <label><input id="paging" type="checkbox" checked /> Paging</label>
        <label><input id="sorting" type="checkbox" checked /> Sorting</label>
        <label><input id="selecting" type="checkbox" checked /> Selecting</label>
    </div>

    <div id="jsGrid"></div>

    <script>
        $(function() {

            $("#jsGrid").jsGrid({
                height: "70%",
                width: "100%",
                filtering: true,
                editing: true,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: 15,
                pageButtonCount: 5,
                controller: db,
                fields: [
                    { name: "Name", type: "text", width: 150 },
                    { name: "Age", type: "number", width: 50 },
                    { name: "Address", type: "text", width: 200 },
                    { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
                    { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
                    { type: "control", modeSwitchButton: false, editButton: false }
                ]
            });

            $(".config-panel input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#jsGrid").jsGrid("option", $cb.attr("id"), $cb.is(":checked"));
            });
        });
    </script>
</body>
</html>
