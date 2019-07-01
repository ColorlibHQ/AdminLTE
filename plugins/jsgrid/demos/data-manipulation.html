<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>jsGrid - Data Manipulation</title>
    <link rel="stylesheet" type="text/css" href="demos.css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,600,400' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="../css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css" />

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.2/themes/cupertino/jquery-ui.css">
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>

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
        .ui-widget *, .ui-widget input, .ui-widget select, .ui-widget button {
            font-family: 'Helvetica Neue Light', 'Open Sans', Helvetica;
            font-size: 14px;
            font-weight: 300 !important;
        }

        .details-form-field input,
        .details-form-field select {
            width: 250px;
            float: right;
        }

        .details-form-field {
            margin: 30px 0;
        }

        .details-form-field:first-child {
            margin-top: 10px;
        }

        .details-form-field:last-child {
            margin-bottom: 10px;
        }

        .details-form-field button {
            display: block;
            width: 100px;
            margin: 0 auto;
        }

        input.error, select.error {
            border: 1px solid #ff9999;
            background: #ffeeee;
        }

        label.error {
            float: right;
            margin-left: 100px;
            font-size: .8em;
            color: #ff6666;
        }
    </style>
</head>
<body>
    <h1>Data Manipulation</h1>
    <div id="jsGrid"></div>

    <div id="detailsDialog">
        <form id="detailsForm">
            <div class="details-form-field">
                <label for="name">Name:</label>
                <input id="name" name="name" type="text" />
            </div>
            <div class="details-form-field">
                <label for="age">Age:</label>
                <input id="age" name="age" type="number" />
            </div>
            <div class="details-form-field">
                <label for="address">Address:</label>
                <input id="address" name="address" type="text" />
            </div>
            <div class="details-form-field">
                <label for="country">Country:</label>
                <select id="country" name="country">
                    <option value="">(Select)</option>
                    <option value="1">United States</option>
                    <option value="2">Canada</option>
                    <option value="3">United Kingdom</option>
                    <option value="4">France</option>
                    <option value="5">Brazil</option>
                    <option value="6">China</option>
                    <option value="7">Russia</option>
                </select>
            </div>
            <div class="details-form-field">
                <label for="married">Is Married</label>
                <input id="married" name="married" type="checkbox" />
            </div>
            <div class="details-form-field">
                <button type="submit" id="save">Save</button>
            </div>
        </form>
    </div>

    <script>
        $(function() {

            $("#jsGrid").jsGrid({
                height: "70%",
                width: "100%",
                editing: true,
                autoload: true,
                paging: true,
                deleteConfirm: function(item) {
                    return "The client \"" + item.Name + "\" will be removed. Are you sure?";
                },
                rowClick: function(args) {
                    showDetailsDialog("Edit", args.item);
                },
                controller: db,
                fields: [
                    { name: "Name", type: "text", width: 150 },
                    { name: "Age", type: "number", width: 50 },
                    { name: "Address", type: "text", width: 200 },
                    { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
                    { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
                    {
                        type: "control",
                        modeSwitchButton: false,
                        editButton: false,
                        headerTemplate: function() {
                            return $("<button>").attr("type", "button").text("Add")
                                .on("click", function () {
                                    showDetailsDialog("Add", {});
                                });
                        }
                    }
                ]
            });

            $("#detailsDialog").dialog({
                autoOpen: false,
                width: 400,
                close: function() {
                    $("#detailsForm").validate().resetForm();
                    $("#detailsForm").find(".error").removeClass("error");
                }
            });

            $("#detailsForm").validate({
                rules: {
                    name: "required",
                    age: { required: true, range: [18, 150] },
                    address: { required: true, minlength: 10 },
                    country: "required"
                },
                messages: {
                    name: "Please enter name",
                    age: "Please enter valid age",
                    address: "Please enter address (more than 10 chars)",
                    country: "Please select country"
                },
                submitHandler: function() {
                    formSubmitHandler();
                }
            });

            var formSubmitHandler = $.noop;

            var showDetailsDialog = function(dialogType, client) {
                $("#name").val(client.Name);
                $("#age").val(client.Age);
                $("#address").val(client.Address);
                $("#country").val(client.Country);
                $("#married").prop("checked", client.Married);

                formSubmitHandler = function() {
                    saveClient(client, dialogType === "Add");
                };

                $("#detailsDialog").dialog("option", "title", dialogType + " Client")
                    .dialog("open");
            };

            var saveClient = function(client, isNew) {
                $.extend(client, {
                    Name: $("#name").val(),
                    Age: parseInt($("#age").val(), 10),
                    Address: $("#address").val(),
                    Country: parseInt($("#country").val(), 10),
                    Married: $("#married").is(":checked")
                });

                $("#jsGrid").jsGrid(isNew ? "insertItem" : "updateItem", client);

                $("#detailsDialog").dialog("close");
            };

        });
    </script>
</body>
</html>
