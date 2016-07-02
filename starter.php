<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">

  <title>AdminLTE 2 | Starter</title>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
  <!-- Google Font: Roboto -->
  <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,400italic,500' rel='stylesheet' type='text/css'>
</head>
<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to get the
desired effect
|---------------------------------------------------------|
| SKINS         | skin-blue                               |
|               | skin-black                              |
|               | skin-purple                             |
|               | skin-yellow                             |
|               | skin-red                                |
|               | skin-green                              |
|---------------------------------------------------------|
|LAYOUT OPTIONS | layout-fixed                            |
|               | layout-boxed                            |
|               | layout-top-nav                          |
|               | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->
<body class="hold-transition skin-blue">
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-static-top bg-primary navbar-dark">
    <!-- Logo -->
    <a class="navbar-brand text-center hidden-md-down" href="#">
      <span class="logo">
        <b>Admin</b>LTE
      </span>
      <span class="logo-mini">
        <b>A</b>LT
      </span>
    </a>
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
    </ul>

    <ul class="nav navbar-nav pull-right">
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fa fa-comments-o"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fa fa-bell"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="fa fa-user"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar">

    <!-- Sidebar -->
    <section class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Alexander Pierce</p>
          <!-- Status -->
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

      <form action="#" method="get" class="sidebar-form">
        <input type="search" name="q" class="form-control" placeholder="Search" data-widget="treeview-search" data-target="#searchable-treeview">
      </form>

      <!-- Sidebar Menu -->
      <ul class="nav nav-pills nav-sidebar nav-stacked" id="searchable-treeview" data-widget="treeview" role="menu">
        <li class="nav-header">Navigation</li>
        <!-- Optionally, you can add icons to the links using the .nav-icon class -->
        <li class="nav-item active">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-link"></i> <span class="text">Link</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-link"></i> <span class="text">Another Link</span>
          </a>
        </li>
        <?php for($i = 0; $i < 6; $i++):?>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-link"></i> <span class="text">Multilevel</span>
            <i class="fa fa-angle-left pull-right"></i></a>
          <ul class="nav nav-treeview">
            <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
            <li class="nav-item">
              <a href="#" class="nav-link"><span>Link in level 2</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="nav nav-treeview">
                <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
                <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link"><span>Link in level 2</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="nav nav-treeview">
                <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Link in level 2</a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Link in level 2</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <?php endfor; ?>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header container-fluid">
      <div class="row">
        <div class="col-xs-6">
          <h1>Page Header</h1>
        </div><!-- /.col -->
        <div class="col-xs-6">
          <ol class="breadcrumb pull-right">
            <li><a href="#">Home</a></li>
            <li class="active">Dashboard</li>
          </ol>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content container-fluid">
      <?php for($i = 0; $i < 1; $i++): ?>
      <div class="row">
        <div class="col-lg-6">
          <!-- Your Page Content Here -->
          <div class="card card-block">
            <h5 class="card-title">Card title</h5>

            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="no-margin">Featured</h5>
            </div>
            <div class="card-block">
              <h6 class="card-title">Special title treatment</h6>

              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <!-- /.col-md-6 -->
      </div>
      <!-- /.row -->
      <?php endfor; ?>

      <div class="row">
        <div class="col-lg-6">
          <!-- Your Page Content Here -->
          <div class="card card-block">
            <h5 class="card-title">Card title</h5>

            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
        <!-- /.col-md-6 -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="no-margin">Featured</h5>
            </div>
            <div class="card-block">
              <h6 class="card-title">Special title treatment</h6>

              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <!-- /.col-md-6 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <div class="clearfix"></div>
  <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="pull-right hidden-xs">
      Anything you want
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2015 <a href="#">Company</a>.</strong> All rights reserved.
  </footer>
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Create the tabs -->
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li class="nav-item" class="active">
        <a class="nav-link" href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a>
      </li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <!-- Home tab content -->
      <div class="tab-pane active" id="control-sidebar-home-tab">
        <h3 class="control-sidebar-heading">Recent Activity</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:;">
              <i class="menu-icon fa fa-birthday-cake bg-red"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                <p>Will be 23 on April 24th</p>
              </div>
            </a>
          </li>
        </ul>
        <!-- /.control-sidebar-menu -->

        <h3 class="control-sidebar-heading">Tasks Progress</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:;">
              <h4 class="control-sidebar-subheading">
                Custom Template Design
                <span class="label label-danger pull-right">70%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
              </div>
            </a>
          </li>
        </ul>
        <!-- /.control-sidebar-menu -->

      </div>
      <!-- /.tab-pane -->
      <!-- Stats tab content -->
      <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
      <!-- /.tab-pane -->
      <!-- Settings tab content -->
      <div class="tab-pane" id="control-sidebar-settings-tab">
        <form method="post">
          <h3 class="control-sidebar-heading">General Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Report panel usage
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Some information about this general settings option
            </p>
          </div>
          <!-- /.form-group -->
        </form>
      </div>
      <!-- /.tab-pane -->
    </div>
  </aside>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->

<!-- jQuery -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!-- Tether -->
<script src="bower_components/tether/dist/js/tether.min.js"></script>
<!-- Bootstrap -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.js"></script>

<!-- OPTIONAL SCRIPTS -->
<script src="dist/js/app.min.js"></script>
<script src="dist/js/demo.js"></script>

</body>
</html>