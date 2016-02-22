<?php
    include('data.php');
    header('Content-type: application/json');

    $data = array();

    if (isset($_GET['summaryRaw'])) {
        $data = array_merge($data,  getSummaryData());
    }

    if (isset($_GET['summary']) || !count($_GET)) {
        $sum = getSummaryData();
        $sum['ads_blocked_today'] = number_format( $sum['ads_blocked_today']);
        $sum['dns_queries_today'] = number_format( $sum['dns_queries_today']);
        $sum['ads_percentage_today'] = number_format( $sum['ads_percentage_today'], 1, '.', '');
        $sum['domains_being_blocked'] = number_format( $sum['domains_being_blocked']);
        $data = array_merge($data,  $sum);
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

    if (isset($_GET['getQueryTypes'])) {
        $data = array_merge($data, getIpvType());
    }

    if (isset($_GET['getForwardDestinations'])) {
        $data = array_merge($data, getForwardDestinations());
    }

    if (isset($_GET['getQuerySources'])) {
        $data = array_merge($data, getQuerySources());
    }

    if (isset($_GET['getAllQueries'])) {
        $data = array_merge($data, getAllQueries());
    }


    echo json_encode($data);
?>
