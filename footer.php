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
            <b>Pi-hole Version </b> <?php echo $piholeVersion; ?>
            <b>Web Interface Version </b> <?php echo $webVersion; ?>
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

<script>
    // User menu toggle
    $("#dropdown-menu a").on("click", function(event) {
        $(this).parent().toggleClass("open");
    });
    $("body").on("click", function(event) {
        if(!$("#dropdown-menu").is(event.target) && $("#dropdown-menu").has(event.target).length === 0) {
            $("#dropdown-menu").removeClass("open");
        }
    });
    
    // Credit for following function: https://gist.github.com/alexey-bass/1115557
    function versionCompare(left, right) {
        if (typeof left + typeof right != 'stringstring')
            return false;

        var a = left.split('.')
            ,   b = right.split('.')
            ,   i = 0, len = Math.max(a.length, b.length);

        for (; i < len; i++) {
            if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
                return 1;
            } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
                return -1;
            }
        }

        return 0;
    }
    
    // Update check
    $.getJSON("https://api.github.com/repos/pi-hole/pi-hole/releases/latest", function(json) {
        if(versionCompare("<?php echo substr($piholeVersion, 1); ?>", json.tag_name.slice(1)) < 0) {
            // Alert user
            $("#alPiholeUpdate").show();
            if(!$("#dropdown-menu").hasClass("open")) {
                $("#dropdown-menu").addClass("open");
            }
        }
    });
    $.getJSON("https://api.github.com/repos/pi-hole/AdminLTE/releases/latest", function(json) {
        if(versionCompare("<?php echo substr($webVersion, 1); ?>", json.tag_name.slice(1)) < 0) {
            // Alert user
            $("#alWebUpdate").show();
            if(!$("#dropdown-menu").hasClass("open")) {
                $("#dropdown-menu").addClass("open");
            }
        }
    });
</script>

</body>
</html>
