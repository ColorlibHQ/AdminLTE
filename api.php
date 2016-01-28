<<<<<<< HEAD
<?php
    include('data.php');

    header('Content-type: application/json');
    echo json_encode($data);
=======
<?php 
    echo exec("/usr/local/bin/chronometer.sh -j"); 
>>>>>>> 4b0e1d9ca21302104fe9bca06d9b21a20f938caf
?>
