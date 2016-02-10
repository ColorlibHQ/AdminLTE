<?php
    $domains = Array();
    $log = Array();
    $ipv6 = file_exists("/etc/pihole/.useIPv6");

    /*******   Public Members ********/
    function getSummaryData() {
        global $ipv6;
        $domains = readInBlockList();
        $log = readInLog();
        $domains_being_blocked = count($domains) / ($ipv6 ? 2 : 1);

        $dns_queries_today = count(getDnsQueries($log));

        $ads_blocked_today = count(getBlockedQueries($log));

        $ads_percentage_today = $ads_blocked_today / $dns_queries_today * 100;

        return array(
            'domains_being_blocked' => $domains_being_blocked,
            'dns_queries_today' => $dns_queries_today,
            'ads_blocked_today' => $ads_blocked_today,
            'ads_percentage_today' => $ads_percentage_today,
        );
    }

    function getOverTimeData() {
        $domains = readInBlockList();
        $log = readInLog();
        $dns_queries = getDnsQueries($log);
        $ads_blocked = getBlockedQueries($log);

        $domains_over_time = overTime($dns_queries);
        $ads_over_time = overTime($ads_blocked);
        alignTimeArrays($ads_over_time, $domains_over_time);
        return Array(
            'domains_over_time' => $domains_over_time,
            'ads_over_time' => $ads_over_time,
        );
    }

    function getTopItems() {
        $domains = readInBlockList();
        $log = readInLog();
        $dns_queries = getDnsQueries($log);
        $ads_blocked = getBlockedQueries($log);

        $topAds = topItems($ads_blocked);
        $topQueries = topItems($dns_queries, $topAds);

        return Array(
            'top_queries' => $topQueries,
            'top_ads' => $topAds,
        );
    }

    function getRecentItems($qty) {
        $log = readInLog();
        $dns_queries = getDnsQueries($log);
        return Array(
            'recent_queries' => getRecent($dns_queries, $qty)
        );
    }

    /******** Private Members ********/
    function readInBlockList() {
        global $domains;
        return count($domains) > 1 ? $domains :
            file("/etc/pihole/gravity.list");
    }
    function readInLog() {
        global $log;
        return count($log) > 1 ? $log :
            file("/var/log/pihole.log");
    }
    function getDnsQueries($log) {
        return array_filter($log, "findQueries");
    }
    function getBlockedQueries($log) {
        return array_filter($log, "findAds");
    }


    function topItems($queries, $exclude = array(), $qty=10) {
        $splitQueries = array();
        foreach ($queries as $query) {
            $exploded = explode(" ", $query);
            $domain = trim($exploded[count($exploded) - 3]);
            if (!isset($exclude[$domain])) {
                if (isset($splitQueries[$domain])) {
                    $splitQueries[$domain]++;
                }
                else {
                    $splitQueries[$domain] = 1;
                }
            }
        }
        arsort($splitQueries);
        return array_slice($splitQueries, 0, $qty);
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

    function getRecent($queries, $qty){
        $recent = array();
        foreach (array_slice($queries, -$qty) as $query) {
            $queryArray = array();
            $exploded = explode(" ", $query);
            $time = date_create(substr($query, 0, 16), new DateTimeZone('GMT'))->SetTimeZone(new DateTimeZone(date_default_timezone_get()));

            $queryArray['time'] = $time->format('h:i:s a');
            $queryArray['domain'] = trim($exploded[count($exploded) - 3]);
            $queryArray['ip'] = trim($exploded[count($exploded)-1]);
            array_push($recent, $queryArray);

        }
        return array_reverse($recent);
    }

    function findQueries($var) {
        return strpos($var, "query") != false;
    }

    function findAds($var) {
        return strpos($var, "gravity.list") != false;
    }
/*
    $data = array(
        'domains_being_blocked' => $domains_being_blocked,
        'dns_queries_today' => $dns_queries_today,
        'ads_blocked_today' => $ads_blocked_today,
        'ads_percentage_today' => $ads_percentage_today,
        'top_queries' => $topQueries,
        'top_ads' => $topAds,
        'domains_over_time' => $domains_over_time,
        'ads_over_time' => $ads_over_time,
        'recent_queries' => getRecent($dns_queries, 20),
    );

 */
?>
