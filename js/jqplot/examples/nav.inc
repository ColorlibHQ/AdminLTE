<div class="example-nav">
  <?php
    $tmpnames = scandir('./');
    $skip = array('opener.php', 'bodyOpener.php', 'nav.php', 'closer.html', 'commonScripts.html', 'topbanner.html');
    
    foreach( $tmpnames as $value) {
        if (preg_match('/^[a-z0-9][a-z0-9_\-]+\.(html|php)$/i', $value)) {
          if (! in_array($value, $skip)) {
            $files[] = $value;
          }
        }
    }
    $fcount = count($files);
    $parts = explode("/", $_SERVER['SCRIPT_NAME']);
    $curfile = end($parts);
    $prevfile = '';
    $nextfile = '';
    // print_r($files);
    
    for ($i=0; $i<$fcount; $i++) {
      if ($curfile == $files[$i]) {
        if ($i == 0) {
          $prevfile = $files[$fcount-1];
          $nextfile = $files[1];
        }
        elseif ($i == $fcount-1) {
          $prevfile = $files[$i-1];
          $nextfile = $files[0];
        }
        else {
          $prevfile = $files[$i-1];
          $nextfile = $files[$i+1];
        }
      }  
    }
    
    echo '<a href="'.$prevfile.'">Previous</a> <a href="./">Examples</a> <a href="'.$nextfile.'">Next</a>';
    
  ?>
</div>
