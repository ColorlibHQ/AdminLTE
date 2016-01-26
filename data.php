<?php
    $domains = file("/etc/pihole/gravity.list");
    $log = file("/var/log/pihole.log");
    $domains_being_blocked = count($domains);

    $dns_queries = array_filter($log, "findQueries");
    $dns_queries_today = count($dns_queries);

    $ads_blocked= array_filter($log, "findAds");
    $ads_blocked_today = count($ads_blocked);

    $ads_percentage_today = $ads_blocked_today / $dns_queries_today * 100;

    $domains_over_time = overTime($dns_queries);
    $ads_over_time = overTime($ads_blocked);
    alignTimeArrays($ads_over_time, $domains_over_time);

    function topItems($queries) {
        $splitQueries = array();
        foreach ($queries as $query) {
            $exploded = explode(" ", $query);
            $domain = trim($exploded[5]);
            if (isset($splitQueries[$domain])) {
                $splitQueries[$domain]++;
            }
            else {
                $splitQueries[$domain] = 1;
            }
        }
        arsort($splitQueries);
        return array_slice($splitQueries, 0, 10);
    }

    function overTime($entries) {
        $byTime = array();
        foreach ($entries as $entry) {
            $time = date_create(substr($entry, 0, 16), new DateTimeZone('GMT'))->SetTimeZone(new DateTimeZone(date_default_timezone_get()));
            $hour = $time->format('G');

            if (isset($byTime[$hour])) {
                $byTime[$hour]++;
            }
            else {
                $byTime[$hour] = 1;
            }
        }
        return $byTime;
    }

    function alignTimeArrays(&$times1, &$times2) {
        foreach (array_keys($times1) as $time) {
            if (!isset($times2[$time])) {
                $times2[$time] = 0;
            }
        }
        foreach (array_keys($times2) as $time) {
            if (!isset($times1[$time])) {
                $times1[$time] = 0;
            }
        }
        ksort($times1);
        ksort($times2);
    }

    function findQueries($var) {
        return strpos($var, "query") != false;
    }

    function findAds($var) {
        return strpos($var, "gravity.list") != false;
    }

    $data = array(
        'domains_being_blocked' => $domains_being_blocked,
        'dns_queries_today' => $dns_queries_today,
        'ads_blocked_today' => $ads_blocked_today,
        'ads_percentage_today' => $ads_percentage_today,
        'top_queries' => topItems($dns_queries),
        'top_ads' => topItems($ads_blocked),
        'domains_over_time' => $domains_over_time,
        'ads_over_time' => $ads_over_time,
    );

?>
