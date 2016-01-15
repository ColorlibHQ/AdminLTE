<?php
if(!isset($_GET['domain'], $_GET['list']))
    die();

exec("ex +g/${_GET['domain']}/d -cwq /etc/pihole/${_GET['list']}list.txt");
exec("sudo /usr/local/bin/gravity.sh");
