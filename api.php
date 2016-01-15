<?php
    function findQueries($var) {
        return strpos($var, "query") != false;
    }
    function findAds($var) {
        return strpos($var, "gravity.list") != false;
    }

    $domains = file("/etc/pihole/gravity.list");
    $log = file("/var/log/pihole.log");
    $domains_being_blocked = count($domains);

    $dns_queries = array_filter($log, "findQueries");
    $dns_queries_today = count($dns_queries);

    $ads_blocked= array_filter($log, "findAds");
    $ads_blocked_today = count($ads_blocked);

    $ads_percentage_today = $ads_blocked_today / $dns_queries_today * 100;

    function topItems($queries) {
        $splitQueries = array();
        foreach ($queries as $query) {
            $exploded = explode(" ", $query);
            $domain = trim($exploded[5]);
            if (isset($splitQueries[$domain])) {
                $splitQueries[$domain] = $splitQueries[$domain] + 1;
            }
            else {
                $splitQueries[$domain] = 1;
            }
        }
        arsort($splitQueries);
        return array_slice($splitQueries, 0, 10);
    }

    $arr = array(
        'domains_being_blocked' => $domains_being_blocked,
        'dns_queries_today' => $dns_queries_today,
        'ads_blocked_today' => $ads_blocked_today,
        'ads_percentage_today' => $ads_percentage_today,
        'top_queries' => topItems($dns_queries),
        'top_ads' => topItems($ads_blocked),
    );

    header('Content-type: application/json');
    echo json_encode($arr);
?>
