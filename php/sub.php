<?php
if(!isset($_GET['domain'], $_GET['list']))
    die();

switch($_GET['list']) {
    case "white":
        exec("sudo pihole -w -q -d ${_GET['domain']}");
        break;
    case "black":
        exec("sudo pihole -b -q -d ${_GET['domain']}");
        break;
}
