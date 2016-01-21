<?php
    require "header.html";
    
    $output = exec('/usr/local/bin/chronometer.sh -j');
    $outj = json_decode($output);
    $domains_being_blocked = $outj->domains_being_blocked;
    $dns_queries_today = $outj->dns_queries_today;
    $ads_blocked_today = $outj->ads_blocked_today;
    $ads_percentage_today = $outj->ads_percentage_today;
    exec('grep -F "query[A]" /var/log/pihole.log | cut -d " " -f 6 | sort | uniq -c | sort -nr | head -n 100', $frequent_queries);
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
            <a href="#frequent_queries_box" role="button" data-toggle="collapse" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
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
<div class="box box-success collapse" id="frequent_queries_box">
    <div class="box-header with-border">
        <h3 class="box-title">Frequent queries</h3>
        <div class="box-tools pull-right">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <!-- Here is a label for example -->
        </div><!-- /.box-tools -->
    </div><!-- /.box-header -->
    <div class="box-body">
        <table id="frequent_queries" class="table table-striped table-bordered" cellspacing="0">
            <thead><tr><th>N. of queries</th><th>Domain</th></tr></thead>
            <?php
                foreach ($frequent_queries as $key => $value) {
                    $a = explode(" ", trim($value));
                    echo "<tr><td>{$a[0]}</td><td>{$a[1]}</td></tr>";
                }
            ?>
        </table>
    </div><!-- /.box-body -->
</div><!-- /.box -->

<?php
    require "footer.html";
?>

<script src="https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.10.10/js/dataTables.bootstrap.min.js" type="text/javascript"></script>
<script>
    $(document).ready(function(){
        $('#frequent_queries').DataTable({"order": [[ 0, "desc" ]]});
    });
</script>
