        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Pi-hole Version </b> <?php echo exec("cd /etc/.pihole/ && git describe --tags --abbrev=0"); ?>
            <b>Web Interface Version </b> <?php echo exec("cd /var/www/html/admin/ && git describe --tags --abbrev=0"); ?>
        </div>
        <i class="fa fa-github"></i> <strong><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=3J2L3Z4DHW9UY">Donate</a></strong> if you found this useful.
    </footer>
</div>
<!-- ./wrapper -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="js/app.min.js" type="text/javascript"></script>

<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.min.js" type="text/javascript"></script>
<script src="js/Chart.min.js"></script>

</body>
</html>
