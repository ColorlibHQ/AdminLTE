<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Pi-hole Admin Console</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.4 -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- FontAwesome 4.3.0 -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 -->
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link href="dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
    <!-- iCheck -->
    <link href="plugins/iCheck/flat/blue.css" rel="stylesheet" type="text/css" />
    <!-- Morris chart -->
    <link href="plugins/morris/morris.css" rel="stylesheet" type="text/css" />
    <!-- jvectormap -->
    <link href="plugins/jvectormap/jquery-jvectormap-1.2.2.css" rel="stylesheet" type="text/css" />
    <!-- Date Picker -->
    <link href="plugins/datepicker/datepicker3.css" rel="stylesheet" type="text/css" />
    <!-- Daterange picker -->
    <link href="plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" />
    <!-- bootstrap wysihtml5 - text editor -->
    <link href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
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
          <span class="logo-lg"><b>Pi</b>-Hole</span>
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
                  <img src="dist/img/pihole-160x160.jpg" class="user-image" alt="Pi-hole logo" />
                  <span class="hidden-xs">Pi-hole</span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-header">
                    <img src="dist/img/pihole-160x160.jpg" alt="User Image" />
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
              <img src="dist/img/pihole-160x160.jpg" class="img-circle" alt="Pi-hole logo" />
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
            <li>
                <?php
                if ($_GET['run']) {
                # This code will run if ?run=true is set.
                shell_exec("sudo /usr/local/bin/gravity.sh");
                }
                ?>

                <!-- This link will add ?run=true to your URL, myfilename.php?run=true -->
                <a href="?run=true">
		<i class="fa fa-download"></i> <span>Update</span>
              </a>
            </li>
            <li>
		<a href="#">
                <i class="fa fa-spinner"></i>
                <span>Reload DNS</span>
              </a>
            </li>
           <li>
		<a href="#">
                <i class="fa fa-power-off"></i>
                <span>Restart Everything</span>
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
			<?php
		        $ads_blocked = exec("today=$(date \"+%b %e\");cat /var/log/pihole.log | awk '/\/etc\/hosts/ {print $7}' | wc -l");
		        $formatted_number = number_format($ads_blocked);
		        echo "<h3>$formatted_number</h3>";
			?>
                  <p>Ads Blocked Today</p>
                </div>
                <div class="icon">
                  <i class="ion ion-android-hand"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-green">
                <div class="inner">
			<?php
		        $queries = exec("today=$(date \"+%b %e\");cat /var/log/pihole.log | awk '/query/ {print $7}' | wc -l");
       			$formatted_number = number_format($queries);
       			echo "<h3>$formatted_number</h3>";
			?>
                  <p>DNS Queries Today</p>
                </div>
                <div class="icon">
                  <i class="ion ion-earth"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-yellow">
                <div class="inner">
            <?php
		        $queries = exec("today=$(date \"+%b %e\");cat /var/log/pihole.log | awk '/query/ {print $7}' | wc -l");
		        $ads_blocked = exec("today=$(date \"+%b %e\");cat /var/log/pihole.log | awk '/\/etc\/hosts/ {print $7}' | wc -l");
		        $percent = ($ads_blocked / $queries * 100);
       			$formatted_number = number_format($percent, 2, '.', '');
       			echo "<h3>$formatted_number<sup style=\"font-size: 20px\">%</sup></h3>";
			?>
                  <p>Of Today's Traffic Is Ads</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-red">
                <div class="inner">
		  <?php
		        $amount_of_domains = exec("wc -l /etc/hosts | awk '{print $1}'");
		        $formatted_number = number_format($amount_of_domains);
       			echo "<h3>$formatted_number</h3>";
		  ?>
                  <p>Domains Being Blocked</p>
                </div>
                <div class="icon">
                  <i class="ion ion-ios-list"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
          </div><!-- /.row -->
        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Pi-hole Version</b> 2.0
        </div>
        <i class="fa fa-github"></i> <strong><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3J2L3Z4DHW9UY">Donate</a></strong> if you found this useful.
      </footer>c
    </div><!-- ./wrapper -->

    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script type="text/javascript">
      $.widget.bridge('uibutton', $.ui.button);
    </script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- Morris.js charts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="plugins/morris/morris.min.js" type="text/javascript"></script>
    <!-- Sparkline -->
    <script src="plugins/sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
    <!-- jvectormap -->
    <script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js" type="text/javascript"></script>
    <script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
    <!-- jQuery Knob Chart -->
    <script src="plugins/knob/jquery.knob.js" type="text/javascript"></script>
    <!-- daterangepicker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js" type="text/javascript"></script>
    <script src="plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>
    <!-- datepicker -->
    <script src="plugins/datepicker/bootstrap-datepicker.js" type="text/javascript"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
    <!-- Slimscroll -->
    <script src="plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <!-- FastClick -->
    <script src="plugins/fastclick/fastclick.min.js" type="text/javascript"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/app.min.js" type="text/javascript"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script src="dist/js/pages/dashboard.js" type="text/javascript"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="dist/js/demo.js" type="text/javascript"></script>
  </body>
</html>
