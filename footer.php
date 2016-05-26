        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <?php
            $piholeVersion = exec("cd /etc/.pihole/ && git describe --tags --abbrev=0");
            $webVersion = exec("cd /var/www/html/admin/ && git describe --tags --abbrev=0");
            ?>
            <b>Pi-hole Version </b> <div id="piholeVersion" style="display: inline"><?php echo $piholeVersion; ?></div>
            <b>Web Interface Version </b> <div id="webVersion" style="display: inline"><?php echo $webVersion; ?></div>
        </div>
        <i class="fa fa-github"></i> <strong><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=3J2L3Z4DHW9UY">Donate</a></strong> if you found this useful.
    </footer>
</div>
<!-- ./wrapper -->
<script src="js/other/jquery.min.js"></script>
<script src="js/other/jquery-ui.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/other/app.min.js"></script>

<script src="js/other/jquery.dataTables.min.js"></script>
<script src="js/other/dataTables.bootstrap.min.js"></script>
<script src="js/other/Chart.min.js"></script>

<script src="js/pihole/footer.js"></script>

</body>
</html>
