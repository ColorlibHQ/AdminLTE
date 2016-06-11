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
    <div class="col-md-6">
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
    <div class="col-md-6">
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
        <div class="col-md-4">
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
    <div class="col-md-4">
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
    <div class="col-md-4">
      <div class="box" id="client-frequency">
        <div class="box-header with-border">
          <h3 class="box-title">Top Clients</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table table-bordered">
            <tbody><tr>
              <th>Client</th>
              <th>Requests</th>
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
</div>
<!-- /.row -->

<?php
    require "footer.php";
?>

<script src="js/pihole/index.js"></script>
