<?php
if(!isset($_GET['domain'], $_GET['list']))
    return;

if($_GET['list'] == "white")
    exec("/usr/local/bin/whitelist.sh ${_GET['domain']}");
else {
    exec("echo '${_GET['domain']}' | sudo tee -a /etc/pihole/blacklist.txt");
    exec("/usr/local/bin/gravity.sh");
}