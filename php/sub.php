<?php
if(!isset($_GET['domain'], $_GET['list']))
    die();

switch($_GET['list']) {
    case "white":
        exec("/usr/local/bin/whitelist.sh -q -d ${_GET['domain']}");
        break;
    case "black":
        exec("/usr/local/bin/blacklist.sh -q -d ${_GET['domain']}");
        break;
}
