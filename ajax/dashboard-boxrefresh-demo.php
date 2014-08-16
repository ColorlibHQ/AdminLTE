<?php
sleep(1.2);
?>
<div class="pad">This data has been loaded via ajax using the custom boxResfresh plugin.</div>
<small id="dummy-time" class="pad pull-right text-muted"></small>
<small class="pull-right pad text-muted">Last update:</small>
<div class="row">
    <div class="col-sm-7">
        <!-- bar chart -->
        <div class="chart" id="bar-chart" style="height: 250px;"></div>
    </div>
    <div class="col-sm-5">
        <div class="pad">
            <!-- Progress bars -->
            <div class="clearfix">
                <span class="pull-left">Bandwidth</span>
                <small class="pull-right">10/200 GB</small>
            </div>
            <div class="progress xs">
                <div class="progress-bar progress-bar-green" style="width: 70%;"></div>
            </div>

            <div class="clearfix">
                <span class="pull-left">Transfered</span>
                <small class="pull-right">10 GB</small>
            </div>
            <div class="progress xs">
                <div class="progress-bar progress-bar-red" style="width: 70%;"></div>
            </div>

            <div class="clearfix">
                <span class="pull-left">Activity</span>
                <small class="pull-right">73%</small>
            </div>
            <div class="progress xs">
                <div class="progress-bar progress-bar-light-blue" style="width: 70%;"></div>
            </div>

            <div class="clearfix">
                <span class="pull-left">FTP</span>
                <small class="pull-right">30 GB</small>
            </div>
            <div class="progress xs">
                <div class="progress-bar progress-bar-aqua" style="width: 70%;"></div>
            </div>
            <!-- Buttons -->
            <p>
                <button class="btn btn-default btn-sm"><i class="fa fa-cloud-download"></i> Generate PDF</button>
            </p>
        </div><!-- /.pad -->
    </div><!-- /.col -->
</div><!-- /.row - inside box -->

<script type="text/javascript">
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

    //Pad given value to the left with "0"
    function AddZero(num) {
        return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    var x = document.getElementById("dummy-time");
    x.innerHTML = strDateTime;
</script>