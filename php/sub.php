<?php
if(!isset($_POST['domain'], $_POST['list'], $_POST['token']))
    die();

session_start();

// Check CSRF token
if(!hash_equals($_SESSION['token'], $_POST['token']))
    die("Wrong token!");

switch($_POST['list']) {
    case "white":
        exec("sudo pihole -w -q -d ${_POST['domain']}");
        break;
    case "black":
        exec("sudo pihole -b -q -d ${_POST['domain']}");
        break;
}
