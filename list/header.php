<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Pi-Hole List">
    <meta name="author" content="Mark Drobnak">
    
    <title>Pi-hole List</title>
    
    <!-- Bootstrap core CSS -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom styles for this template -->
    <link href="index.css" rel="stylesheet">
    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
    <div class="container">
        <div class="header clearfix">
            <nav>
                <ul class="nav nav-pills pull-right">
                    <li role="presentation"><a href="../index.php">Back to Admin Console</a></li>
                    <li role="presentation" <?php if(basename($_SERVER['PHP_SELF']) == "index.php") echo 'class="active"'; ?>><a href="index.php">Home</a></li>
                    <li role="presentation" <?php if(basename($_SERVER['PHP_SELF']) == "list.php" && $_GET['l'] == "white") echo 'class="active"'; ?>><a href="list.php?l=white">Whitelist</a></li>
                    <li role="presentation" <?php if(basename($_SERVER['PHP_SELF']) == "list.php" && $_GET['l'] == "black") echo 'class="active"'; ?>><a href="list.php?l=black">Blacklist</a></li>
                </ul>
            </nav>
            <h3 class="text-muted">Pi-hole List</h3>
        </div>