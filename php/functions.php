<?php
function checkPass($pass) {
    // Check password
    return $pass == str_replace(array("\r", "\n"), '', file_get_contents("/etc/pihole/password.txt"));
}