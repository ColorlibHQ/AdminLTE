<?php
if(!isset($_GET['domain'], $_GET['list']))
    return;

exec("ex +g/${_GET['domain']}/d -cwq /etc/pihole/${_GET['list']}list.txt");