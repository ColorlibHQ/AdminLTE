<?php
    $domains_being_blocked = exec("wc -l /etc/pihole/gravity.list | awk '{print $1}'");
    $dns_queries_today = exec("cat /var/log/pihole.log | awk '/query/ {print $6}' | wc -l");
    $ads_blocked_today = exec("cat /var/log/pihole.log | awk '/\/etc\/pihole\/gravity.list/ && !/address/ {print $6}' | wc -l");
    $ads_percentage_today = $ads_blocked_today / $dns_queries_today * 100;
    $arr = array(
        'domains_being_blocked' => $domains_being_blocked,
        'dns_queries_today' => $dns_queries_today,
        'ads_blocked_today' => $ads_blocked_today,
        'ads_percentage_today' => $ads_percentage_today
    );

    header('Content-type: application/json');
    echo json_encode($arr);
?>
