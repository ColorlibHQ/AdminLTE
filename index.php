<?php
    $domains_being_blocked = exec("wc -l /etc/pihole/gravity.list | awk '{print $1}'");
    $dns_queries_today = exec("cat /var/log/pihole.log | awk '/query/ {print $6}' | wc -l");
    $ads_blocked_today = exec("cat /var/log/pihole.log | awk '/\/etc\/pihole\/gravity.list/ && !/address/ {print $6}' | wc -l");
    $ads_percentage_today = $ads_blocked_today / $dns_queries_today * 100;
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
        <!-- Whitelist sidebar code -->
        <script src="js/jquery.min.js" type="text/javascript"></script>
        <script type='text/javascript'>
          function runSearchShellScript(charCodeEntered) {
              // If Enter is pressed
              if (charCodeEntered.keyCode == 13) {
                  $(document).ready(function(){
                      var searchLi = $('#get_whitelist').val();
                      var commandArguments = "li00="+searchLi;
                      $.get("php/whitelist.php", commandArguments, function (data){
                          // Delimiter to split the last echo command from the script
                          dataSplitted = data.split(';');
                          $("#li01").html(dataSplitted[0]);
                          $("#li02").html(dataSplitted[1]);
                          $("#li03").html(dataSplitted[2]);
                          $("#li04").html(dataSplitted[3]);
                          $("#li05").html(dataSplitted[4]);
                          $("#li06").html(dataSplitted[5]);
                          $("#li07").html(dataSplitted[6]);
                          $("#li08").html(dataSplitted[7]);
                          $("#li09").html(dataSplitted[8]);
                          $("#li10").html(dataSplitted[9]);
                      });
                  });
              }
          }
        </script>
        <!-- /.Whitelist sidebar code -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
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
                        <!-- Expandable whitelist button -->
                        <li>
                          <a href="#" name="exec_whitelist">
                            <i class="fa fa-pencil-square-o"></i> <span>Whitelist</span>
                          </a>
                          <ul class="treeview-menu">
                            <!-- Press Enter to run the script and then show no more than 10 lines of output -->
                            <ul class="sidebar-menu"><li><a href="list/index.php"><i class="fa fa-cogs"></i> Advanced (Whitelist/Blacklist)</a></li></ul>
                            <a href="#" disabled><li id="li00"></li>Add:  <input type="text" id='get_whitelist' onkeypress="runSearchShellScript(event)" placeholder="ad.example.com"></a>
                            <a href="#" disabled><li id="li01"></li></a>
                            <a href="#" disabled><li id="li02"></li></a>
                            <a href="#" disabled><li id="li03"></li></a>
                            <a href="#" disabled><li id="li04"></li></a>
                            <a href="#" disabled><li id="li05"></li></a>
                            <a href="#" disabled><li id="li06"></li></a>
                            <a href="#" disabled><li id="li07"></li></a>
                            <a href="#" disabled><li id="li08"></li></a>
                            <a href="#" disabled><li id="li09"></li></a>
                            <a href="#" disabled><li id="li10"></li></a>
                          </ul>
                        </li>
                        <!-- /.Expandable whitelist button -->
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
                                    <h3><?php echo number_format($ads_blocked_today) ?></h3>
                                    <p>Ads Blocked Today</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-android-hand"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
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
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
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
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
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
                                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
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
