<?php
    # adds $data variable
    include('data.php');
    $data = getSummaryData();
    require "header.html";
?>

<!-- Small boxes (Stat box) -->
<div class="row">
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-aqua">
            <div class="inner">
                <h3><?php echo number_format($data['ads_blocked_today']) ?></h3>
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
                <h3><?php echo number_format($data['dns_queries_today']) ?></h3>
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
                <h3><?php echo number_format($data['ads_percentage_today'], 2, '.', '') ?><sup style="font-size: 20px">%</sup></h3>
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
                <h3><sup style="font-size: 30px"><?php echo number_format($data['domains_being_blocked']) ?></sup></h3>
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
    <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Queries over time</h3>
        </div>
        <div class="box-body">
          <div class="chart">
            <canvas id="queryOverTimeChart" style="height: 247px; width: 466px;" width="932" height="494"></canvas>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Top Domains</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered" id="domain-frequency">
            <tbody><tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
            </tr>
          </tbody></table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
    <div class="col-md-6">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Top Advertisers</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered" id="ad-frequency">
            <tbody><tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
            </tr>
          </tbody></table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
  </div>
    <!-- /.row -->
<div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Recent Queries</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered" id="recent-queries">
            <tbody><tr>
              <th>Time</th>
              <th>Domain</th>
              <th>Source Ip</th>
            </tr>
          </tbody></table>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
</div>
<!-- /.row -->

<?php
    require "footer.html";
?>

<script type="text/javascript">
    summaryData = <?=json_encode($data)?>;

    $(document).ready(function() {
        // Populate queries over time
        $.getJSON("api.php?overTimeData", function(data) {
            for (hour in data.ads_over_time) {
                myLineChart.addData([data.domains_over_time[hour], data.ads_over_time[hour]], hour + ":00");
            }
        });

        // Populate 'Top' lists
        $.getJSON("api.php?topItems", function(data) {
            var domaintable = $('#domain-frequency').find('tbody:last');
            var adtable = $('#ad-frequency').find('tbody:last');
            for (domain in data.top_queries) {
                domaintable.append('<tr> <td>' + domain + 
                    '</td> <td>' + data.top_queries[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-yellow" style="width: ' +
                     data.top_queries[domain] / summaryData.dns_queries_today * 100 + '%"></div> </div> </td> </tr> ');
            }
            for (domain in data.top_ads) {
                adtable.append('<tr> <td>' + domain + 
                    '</td> <td>' + data.top_ads[domain] + '</td> <td> <div class="progress progress-sm"> <div class="progress-bar progress-bar-yellow" style="width: ' +
                     data.top_ads[domain] / summaryData.ads_blocked_today * 100 + '%"></div> </div> </td> </tr> ');
            }

        });

        // Populate recent queries
        $.getJSON("api.php?recentItems=10", function(data) {
            var recenttable = $('#recent-queries').find('tbody:last');
            for (query in data.recent_queries) {
                recenttable.append('<tr> <td>' + data.recent_queries[query].time + '</td> <td>' + data.recent_queries[query].domain + '</td> <td>' + data.recent_queries[query].ip + '</td> </tr> ');
            }
        });

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
        var ctx = document.getElementById("queryOverTimeChart").getContext("2d");
        var myLineChart = new Chart(ctx).Line(chartData, {pointDot : false });
    });


</script>
