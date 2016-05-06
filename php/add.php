<?php
if(!isset($_POST['domain'], $_POST['list'], $_POST['token']))
    die("Missing POST variables");

// Check CORS
if($_SERVER['HTTP_ORIGIN'] != "http://pi.hole" && $_SERVER['HTTP_ORIGIN'] != "http://${_SERVER['SERVER_ADDR']}")
    die("Failed CORS");

header("Access-Control-Allow-Origin: ${_SERVER['HTTP_ORIGIN']}");

session_start();

// Check CSRF token
if(!hash_equals($_SESSION['token'], $_POST['token']))
    die("Wrong token");

switch($_POST['list']) {
    case "white":
        exec("sudo pihole -w -q ${_POST['domain']}");
        break;
    case "black":
        exec("sudo pihole -b -q ${_POST['domain']}");
        break;
}
