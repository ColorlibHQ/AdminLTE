<?php
$arg = $_GET['li00'];
$shell_cmd = "/usr/local/bin/whitelist.sh ".$arg;
$to_show = exec($shell_cmd);
print_r($to_show);
?>
