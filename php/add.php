<?php
if(!isset($_GET['domain'], $_GET['list']))
    die();

if($_GET['list'] == "white")
    exec("/usr/local/bin/whitelist.sh ${_GET['domain']}");
else {
    exec("echo '${_GET['domain']}' >> /etc/pihole/blacklist.txt");
    exec("sudo /usr/local/bin/gravity.sh");
}
