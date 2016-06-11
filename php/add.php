<?php
if(!isset($_POST['domain'], $_POST['list'], $_POST['token']))
    die("Missing POST variables");

// Check CORS
if($_SERVER['HTTP_ORIGIN'] == "http://pi.hole" || $_SERVER['HTTP_ORIGIN'] == "http://${_SERVER['SERVER_ADDR']}")
    header("Access-Control-Allow-Origin: ${_SERVER['HTTP_ORIGIN']}");
else if($_SERVER['HTTP_HOST'] == $_SERVER['SERVER_ADDR'] || $_SERVER['HTTP_HOST'] == "pi.hole")
    header("Access-Control-Allow-Origin: ${_SERVER['HTTP_HOST']}");
else
    die("Failed CORS");

session_start();

// Check CSRF token
if(!hash_equals($_SESSION['token'], $_POST['token']))
    die("Wrong token");

switch($_POST['list']) {
    case "white":        
        echo exec("sudo pihole -w -q ${_POST['domain']}");
        break;
    case "black":
        echo exec("sudo pihole -b -q ${_POST['domain']}");
        break;
}
