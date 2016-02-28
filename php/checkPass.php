<?php
if(!isset($_GET['pass']))
    die("No password entered");

include "functions.php";

if(checkPass($_GET['pass']))
    echo "Correct";
else
    echo "Wrong";