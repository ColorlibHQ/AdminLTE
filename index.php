<?php
    # adds $data variable
    include('data.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pi-hole Admin Console</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />

        <link href="./css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
        <link href="./css/skin-blue.min.css" rel="stylesheet" type="text/css" />

        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
    <script type="text/javascript">
        var chartData = {
            labels: [<?php foreach($data['domains_over_time'] as $time=>$qty) {echo $time . ", ";} ?>],
            datasets: [
                {
                    label: "All Queries",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(0, 166, 90,.8)",
                    data: [<?= implode(', ', $data['domains_over_time']) ?>],
                },
                {
                    label: "Ad Queries",
                    fillColor: "rgba(243,156,18,0.5)",
                    strokeColor: "rgba(243,156,18,1)",
                    pointColor: "rgba(243,156,18,1)",
                    data: [<?= implode(', ', $data['ads_over_time']) ?>],
                }
            ]
        };

        $(document).ready(function() {
            var ctx = document.getElementById("queryOverTimeChart").getContext("2d");
            var myLineChart = new Chart(ctx).Line(chartData, {pointDot : false });
        });


    </script>
    </head>
    <body class="skin-blue sidebar-mini">
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="http://pi-hole.net" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>P</b>H</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>Pi</b>-hole</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top" role="navigation">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="./img/pihole-160x160.jpg" class="user-image" alt="Pi-hole logo" />
                                <span class="hidden-xs">Pi-hole</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <!-- User image -->
                                    <li class="user-header">
                                        <img src="./img/pihole-160x160.jpg" alt="User Image" />
                                        <p>
                                            Open Source Ad Blocker
                                            <small>Designed For Raspberry Pi</small>
                                        </p>
                                    </li>
                                    <!-- Menu Body -->
                                    <li class="user-body">
                                        <div class="col-xs-4 text-center">
                                            <a href="https://github.com/jacobsalmela/pi-hole">Free</a>
                                        </div>
                                        <div class="col-xs-4 text-center">
                                            <a href="http://jacobsalmela.com/block-millions-ads-network-wide-with-a-raspberry-pi-hole-2-0/">Details</a>
                                        </div>
                                        <div class="col-xs-4 text-center">
                                            <a href="#">Updates</a>
                                        </div>
                                    </li>
                                    <!-- Menu Footer-->
                                    <li class="user-footer">
                                        <div>
                                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                                <input type="hidden" name="cmd" value="_s-xclick">
                                                <input type="hidden" name="hosted_button_id" value="3J2L3Z4DHW9UY">
                                                <input style="display: block; margin: 0 auto;" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                                                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                                            </form>
                                        </div>
                                        <div style="text-align:center">
                                            <a class="coinbase-button" data-code="c851bab4454421aa35bc789526207381" data-button-style="donation_small" href="https://www.coinbase.com/checkouts/c851bab4454421aa35bc789526207381">Donate Bitcoins</a><script src="https://www.coinbase.com/assets/button.js" type="text/javascript"></script>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the logo and sidebar -->
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="./img/pihole-160x160.jpg" class="img-circle" alt="Pi-hole logo" />
                        </div>
                        <div class="pull-left info">
                            <p>Status</p>
                            <a href="#"><i class="fa fa-circle text-success"></i> Nominal</a>
                        </div>
                    </div>
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu">
                        <li class="header">MAIN NAVIGATION</li>
                        <li>
                            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3J2L3Z4DHW9UY">
                            <i class="fa fa-paypal pull-left"></i> <span>Donate</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Main content -->
                <section class="content">
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
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer">
                <div class="pull-right hidden-xs">
                    <b>Pi-hole Version</b> 2.1
                </div>
                <i class="fa fa-github"></i> <strong><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=3J2L3Z4DHW9UY">Donate</a></strong> if you found this useful.
            </footer>
        </div>
        <!-- ./wrapper -->
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="./js/app.min.js" type="text/javascript"></script>
    </body>
</html>
