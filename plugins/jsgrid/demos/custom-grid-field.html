<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Custom Grid Field Scenario</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css' />

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <script src="db.js"></script>

    <script src="../src/jsgrid.core.js"></script>
    <script src="../src/jsgrid.load-indicator.js"></script>
    <script src="../src/jsgrid.load-strategies.js"></script>
    <script src="../src/jsgrid.sort-strategies.js"></script>
    <script src="../src/jsgrid.field.js"></script>
    <script src="../src/fields/jsgrid.field.text.js"></script>
    <script src="../src/fields/jsgrid.field.control.js"></script>

    <style>
        .hasDatepicker {
            width: 100px;
            text-align: center;
        }

        .ui-datepicker * {
            font-family: 'Helvetica Neue Light', 'Open Sans', Helvetica;
            font-size: 14px;
            font-weight: 300 !important;
        }
    </style>
</head>
<body>
    <h1>Custom Grid DateField</h1>
    <div id="jsGrid"></div>

    <script>
        $(function() {

            var MyDateField = function(config) {
                jsGrid.Field.call(this, config);
            };

            MyDateField.prototype = new jsGrid.Field({
                sorter: function(date1, date2) {
                    return new Date(date1) - new Date(date2);
                },

                itemTemplate: function(value) {
                    return new Date(value).toDateString();
                },

                insertTemplate: function(value) {
                    return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
                },

                editTemplate: function(value) {
                    return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
                },

                insertValue: function() {
                    return this._insertPicker.datepicker("getDate").toISOString();
                },

                editValue: function() {
                    return this._editPicker.datepicker("getDate").toISOString();
                }
            });

            jsGrid.fields.myDateField = MyDateField;

            $("#jsGrid").jsGrid({
                height: "70%",
                width: "100%",
                inserting: true,
                editing: true,
                sorting: true,
                paging: true,
                fields: [
                    { name: "Account", width: 150, align: "center" },
                    { name: "Name", type: "text" },
                    { name: "RegisterDate", type: "myDateField", width: 100, align: "center" },
                    { type: "control", editButton: false, modeSwitchButton: false }
                ],
                data: db.users
            });

        });
    </script>
</body>
</html>
