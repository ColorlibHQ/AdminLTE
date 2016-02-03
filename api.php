<?php
    include('data.php');
    header('Content-type: application/json');

    $data = array();

    if (isset($_GET['summary'])) {
        $data = array_merge($data,  getSummaryData());
    }

    if (isset($_GET['overTimeData'])) {
        $data = array_merge($data,  getOverTimeData());
    }

    if (isset($_GET['topItems'])) {
        $data = array_merge($data,  getTopItems());
    }

    if (isset($_GET['recentItems'])) {
        if (is_numeric($_GET['recentItems'])) {
            $data = array_merge($data,  getRecentItems($_GET['recentItems']));
        }
    }


    echo json_encode($data);
?>
