<?php
    require "header.html";
?>

<!-- Small boxes (Stat box) -->
<div class="row">
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-aqua">
            <div class="inner">
                <h3 class="statistic" id="ads_blocked_today">---</h3>
                <p>Ads Blocked Today</p>
            </div>
            <div class="icon">
                <i class="ion ion-android-hand"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-green">
            <div class="inner">
                <h3 class="statistic" id="dns_queries_today">---</h3>
                <p>DNS Queries Today</p>
            </div>
            <div class="icon">
                <i class="ion ion-earth"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-yellow">
            <div class="inner">
                <h3 class="statistic" id="ads_percentage_today">---</h3>
                <p>Of Today's Traffic Is Ads</p>
            </div>
            <div class="icon">
                <i class="ion ion-pie-graph"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-red">
            <div class="inner">
                <h3 class="statistic" id="domains_being_blocked"><sup style="font-size: 30px">---</sup></h3>
                <p>Domains Being Blocked</p>
            </div>
            <div class="icon">
                <i class="ion ion-ios-list"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
</div>

<div class="row">
    <div class="col-md-12">
    <div class="box" id="queries-over-time">
        <div class="box-header with-border">
          <h3 class="box-title">Queries over time</h3>
        </div>
        <div class="box-body">
          <div class="chart">
            <canvas id="queryOverTimeChart" style="height: 247px; width: 466px;" width="932" height="494"></canvas>
          </div>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
</div>

<div class="row">
    <div class="col-md-4">
    <div class="box" id="query-types">
        <div class="box-header with-border">
          <h3 class="box-title">Query Types</h3>
        </div>
        <div class="box-body">
          <div class="chart">
            <canvas id="queryTypeChart" style="height: 247px; width: 466px;" width="932" height="494"></canvas>
          </div>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <div class="col-md-4">
    <div class="box" id="top-clients">
        <div class="box-header with-border">
          <h3 class="box-title">Top Clients</h3>
        </div>
        <div class="box-body">
          <div class="chart">
            <canvas id="topClientsChart" style="height: 247px; width: 466px;" width="932" height="494"></canvas>
          </div>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <div class="col-md-4">
    <div class="box" id="forward-destinations">
        <div class="box-header with-border">
          <h3 class="box-title">Forward Destinations</h3>
        </div>
        <div class="box-body">
          <div class="chart">
            <canvas id="forwardDestinationChart" style="height: 247px; width: 466px;" width="932" height="494"></canvas>
          </div>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
      <div class="box" id="domain-frequency">
        <div class="box-header with-border">
          <h3 class="box-title">Top Domains</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered">
            <tbody><tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
            </tr>
          </tbody></table>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
    <div class="col-md-6">
      <div class="box" id="ad-frequency">
        <div class="box-header with-border">
          <h3 class="box-title">Top Advertisers</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered">
            <tbody>
              <tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="overlay">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->

<?php
    require "footer.php";
?>

<script type="text/javascript">
    $(document).ready(function() {
        // Pull in data via AJAX
        
        updateSummaryData();
        
        updateQueriesOverTime();
        
        updateQueryTypes();
        
        updateTopClientsChart();
        
        updateForwardDestinations();
        
        updateTopLists();
        
        // Create charts
        var chartData = {
            labels: [],
            datasets: [
                {
                    label: "All Queries",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(0, 166, 90,.8)",
                },
                {
                    label: "Ad Queries",
                    fillColor: "rgba(243,156,18,0.5)",
                    strokeColor: "rgba(243,156,18,1)",
                    pointColor: "rgba(243,156,18,1)",
                }
            ]
        };
        var isMobile = {
                Windows: function() {
                        return /IEMobile/i.test(navigator.userAgent);
                },
                Android: function() {
                        return /Android/i.test(navigator.userAgent);
                },
                BlackBerry: function() {
                        return /BlackBerry/i.test(navigator.userAgent);
                },
                iOS: function() {
                        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
                },
                any: function() {
                        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
                }
        };
        var animate = !isMobile.any();
        var ctx = document.getElementById("queryOverTimeChart").getContext("2d");
        timeLineChart = new Chart(ctx).Line(chartData,
            {
                pointDot : false,
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
                animation : animate
            }
        );
        
        ctx = document.getElementById("queryTypeChart").getContext("2d");
        queryTypeChart = new Chart(ctx).Doughnut([],
            {
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].strokeColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
                animation : animate
            }
        );
        
        ctx = document.getElementById("forwardDestinationChart").getContext("2d");
        forwardDestinationChart = new Chart(ctx).Doughnut([],
            {
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].strokeColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
                animation : animate
            }
        );
        
        var radarChartData = {
            labels: [],
            datasets: [
                {
                    label: "Top Clients",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(0, 166, 90,.8)",
                    data: []
                }
            ]
        };
        ctx = document.getElementById("topClientsChart").getContext("2d");
        topClientsChart = new Chart(ctx).Radar(radarChartData, {animation : animate});
    });
    
    // Functions to oupdate data in page
    
    function updateSummaryData(runOnce) {
        $.getJSON("api.php?summary", function LoadSummaryData(data) {
            //$("h3.statistic").addClass("glow");
            if ($("h3#ads_blocked_today").text() != data.ads_blocked_today) {
                $("h3#ads_blocked_today").addClass("glow");
            }
            if ($("h3#dns_queries_today").text() != data.dns_queries_today) {
                $("h3#dns_queries_today").addClass("glow");
            }
            if ($("h3#ads_percentage_today").text() != data.ads_percentage_today) {
                $("h3#ads_percentage_today").addClass("glow");
            }
            
            window.setTimeout(function(){
                $("h3#ads_blocked_today").text(data.ads_blocked_today);
                $("h3#dns_queries_today").text(data.dns_queries_today);
                $("h3#domains_being_blocked").text(data.domains_being_blocked);
                $("h3#ads_percentage_today").text(data.ads_percentage_today + "%");
                $("h3.statistic.glow").removeClass("glow")
            }, 500);
        }).done(function() {
            if (runOnce !== true) {
                setTimeout(updateSummaryData, 10000);
            }
        }).fail(function() {
            if (runOnce !== true) {
                setTimeout(updateSummaryData, (1000 * 60 * 5));
            }
        });;
    }
    
    function updateQueriesOverTime() {
        $.getJSON("api.php?overTimeData", function(data) {
            for (hour in data.ads_over_time) {
                timeLineChart.addData([data.domains_over_time[hour], data.ads_over_time[hour]], hour + ":00");
            }
           $('#queries-over-time .overlay').remove();
           //$('#queries-over-time').append(timeLineChart.generateLegend());
        });
    }
    
    function updateTopClientsChart() {
        $.getJSON("api.php?getQuerySources", function(data) {
            console.log(data);
            $.each(data, function(key, value) {
                topClientsChart.addData([value], key);
            });

           $('#top-clients .overlay').remove();
           //$('#queries-over-time').append(timeLineChart.generateLegend());
        });
    }
    
    function updateQueryTypes() {
        $.getJSON("api.php?getQueryTypes", function(data) {
            var colors = [];
            $.each($.AdminLTE.options.colors, function(key, value) { colors.push(value); });
            $.each(data, function(key , value) {
                queryTypeChart.addData({
                    value: value,
                    color: colors.shift(),
                    label: key
                });
            });
            $('#query-types .overlay').remove();
            //$('#query-types').append(queryTypeChart.generateLegend());
        });
    }
    
    function updateForwardDestinations() {
        $.getJSON("api.php?getForwardDestinations", function(data) {
            var colors = [];
            $.each($.AdminLTE.options.colors, function(key, value) { colors.push(value); });
            $.each(data, function(key , value) {
                forwardDestinationChart.addData({
                    value: value,
                    color: colors.shift(),
                    label: key
                });
            });
            $('#forward-destinations .overlay').remove();
            //$('#forward-destinations').append(forwardDestinationChart.generateLegend());
        });
    }
    
    function updateTopLists() {
        $.getJSON("api.php?summaryRaw&topItems", function(data) {
            var domaintable = $('#domain-frequency').find('tbody:last');
            var adtable = $('#ad-frequency').find('tbody:last');
            for (domain in data.top_queries) {
                domaintable.append('<tr> <td>' + domain + 
                    '</td> <td>' + data.top_queries[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-green" style="width: ' +
                     data.top_queries[domain] / data.dns_queries_today * 100 + '%"></div> </div> </td> </tr> ');
            }
            for (domain in data.top_ads) {
                adtable.append('<tr> <td>' + domain + 
                    '</td> <td>' + data.top_ads[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-yellow" style="width: ' +
                     data.top_ads[domain] / data.ads_blocked_today * 100 + '%"></div> </div> </td> </tr> ');
            }

            $('#domain-frequency .overlay').remove();
            $('#ad-frequency .overlay').remove();
        });
    }
</script>
