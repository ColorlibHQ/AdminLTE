<?php
    require "header.html";
?>

<!--
<div class="row">
    <div class="col-md-12">
        <button class="btn btn-info margin-bottom pull-right">Refresh Data</button>
    </div>
</div>
-->
<div class="row">
    <div class="col-md-12">
      <div class="box" id="recent-queries">
        <div class="box-header with-border">
          <h3 class="box-title">Recent Queries</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <table id="all-queries" class="display table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Domain</th>
                        <th>Client</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Domain</th>
                        <th>Client</th>
                    </tr>
                </tfoot>
            </table>
       </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
</div>
<!-- /.row -->

<?php
    require "footer.php";
?>

<script type="text/javascript">
    $(document).ready(function() {
        tableApi = $('#all-queries').DataTable( {
            "ajax": "api.php?getAllQueries",
            "autoWidth" : false,
            "order" : [[0, "desc"]],
            "columns": [
                { "width" : "20%", "type": "date" },
                { "width" : "10%" },
                { "width" : "40%" },
                { "width" : "15%" },
              ]
            })
    } );

    function refreshData() {
        tableApi.ajax.url("api.php?getAllQueries").load();
    }
</script>


