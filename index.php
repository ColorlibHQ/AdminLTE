<?php
    # adds $data variable
    include('data.php');
    require "header.html";
?>

<!-- Small boxes (Stat box) -->
<div class="row">
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-aqua">
            <div class="inner">
                <h3><?php echo number_format($ads_blocked_today) ?></h3>
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
                <h3><?php echo number_format($dns_queries_today) ?></h3>
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
                <h3><?php echo number_format($ads_percentage_today, 2, '.', '') ?><sup style="font-size: 20px">%</sup></h3>
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
                <h3><sup style="font-size: 30px"><?php echo number_format($domains_being_blocked) ?></sup></h3>
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
          <table class="table table-bordered">
            <tbody><tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
            </tr>
            <?php foreach($data['top_queries'] as $key=>$value): ?>
            <tr>
                <td><?php echo $key ?></td>
                <td><?php echo $value ?></td>
                <td>
                <div class="progress progress-sm">
                <div class="progress-bar progress-bar-green" style="width: <?php echo number_format(($value/$data['dns_queries_today']), 2, '.', '') * 100?>%"></div>
                </div>
                </td>
            </tr>
            <?php endforeach; ?>
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
          <table class="table table-bordered">
            <tbody><tr>
              <th>Domain</th>
              <th>Hits</th>
              <th>Frequency</th>
            </tr>
            <?php foreach($data['top_ads'] as $key=>$value): ?>
            <tr>
                <td><?php echo $key ?></td>
                <td><?php echo $value ?></td>
                <td>
                <div class="progress progress-sm">
                <div class="progress-bar progress-bar-yellow" style="width: <?php echo number_format(($value/$data['ads_blocked_today']), 2, '.', '') * 100?>%"></div>
                </div>
                </td>
            </tr>
            <?php endforeach; ?>
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
          <table class="table table-bordered">
            <tbody><tr>
              <th>Time</th>
              <th>Domain</th>
              <th>Source Ip</th>
            </tr>
            <?php foreach($data['recent_queries'] as $key=>$value): ?>
            <tr>
                <td><?php echo $value['time'] ?></td>
                <td><?php echo $value['domain'] ?></td>
                <td><?php echo $value['ip'] ?></td>
            </tr>
            <?php endforeach; ?>
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
