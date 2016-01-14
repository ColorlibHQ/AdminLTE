<?php
if(!isset($_GET['list']))
    die();

$type = $_GET['list'];
$rawList = file_get_contents("/etc/pihole/${type}list.txt");
$list = explode("\n", $rawList);

// Get rid of empty lines
for($i = sizeof($list)-1; $i >= 0; $i--) {
    if($list[$i] == "")
        unset($list[$i]);
}

echo json_encode(array_values($list));