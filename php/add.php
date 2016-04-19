<?php
if(!isset($_GET['domain'], $_GET['list']))
    die();

switch($_GET['list']) {
    case "white":
        exec("/usr/local/bin/whitelist.sh -q ${_GET['domain']}");
        break;
    case "black":
        exec("/usr/local/bin/blacklist.sh -q ${_GET['domain']}");
        break;
}
