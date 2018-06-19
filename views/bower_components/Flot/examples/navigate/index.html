<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Flot Examples: Navigation</title>
	<link href="../examples.css" rel="stylesheet" type="text/css">
	<style type="text/css">

	#placeholder .button {
		position: absolute;
		cursor: pointer;
	}

	#placeholder div.button {
		font-size: smaller;
		color: #999;
		background-color: #eee;
		padding: 2px;
	}
	.message {
		padding-left: 50px;
		font-size: smaller;
	}

	</style>
	<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="../../excanvas.min.js"></script><![endif]-->
	<script language="javascript" type="text/javascript" src="../../jquery.js"></script>
	<script language="javascript" type="text/javascript" src="../../jquery.flot.js"></script>
	<script language="javascript" type="text/javascript" src="../../jquery.flot.navigate.js"></script>
	<script type="text/javascript">

	$(function() {

		// generate data set from a parametric function with a fractal look

		function sumf(f, t, m) {
			var res = 0;
			for (var i = 1; i < m; ++i) {
				res += f(i * i * t) / (i * i);
			}
			return res;
		}

		var d1 = [];
		for (var t = 0; t <= 2 * Math.PI; t += 0.01) {
			d1.push([sumf(Math.cos, t, 10), sumf(Math.sin, t, 10)]);
		}

		var data = [ d1 ],
			placeholder = $("#placeholder");

		var plot = $.plot(placeholder, data, {
			series: {
				lines: {
					show: true
				},
				shadowSize: 0
			},
			xaxis: {
				zoomRange: [0.1, 10],
				panRange: [-10, 10]
			},
			yaxis: {
				zoomRange: [0.1, 10],
				panRange: [-10, 10]
			},
			zoom: {
				interactive: true
			},
			pan: {
				interactive: true
			}
		});

		// show pan/zoom messages to illustrate events 

		placeholder.bind("plotpan", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		placeholder.bind("plotzoom", function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		// add zoom out button 

		$("<div class='button' style='right:20px;top:20px'>zoom out</div>")
			.appendTo(placeholder)
			.click(function (event) {
				event.preventDefault();
				plot.zoomOut();
			});

		// and add panning buttons

		// little helper for taking the repetitive work out of placing
		// panning arrows

		function addArrow(dir, right, top, offset) {
			$("<img class='button' src='arrow-" + dir + ".gif' style='right:" + right + "px;top:" + top + "px'>")
				.appendTo(placeholder)
				.click(function (e) {
					e.preventDefault();
					plot.pan(offset);
				});
		}

		addArrow("left", 55, 60, { left: -100 });
		addArrow("right", 25, 60, { left: 100 });
		addArrow("up", 40, 45, { top: -100 });
		addArrow("down", 40, 75, { top: 100 });

		// Add the Flot version string to the footer

		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
	});

	</script>
</head>
<body>

	<div id="header">
		<h2>Navigation</h2>
	</div>

	<div id="content">

		<div class="demo-container">
			<div id="placeholder" class="demo-placeholder"></div>
		</div>

		<p class="message"></p>

		<p>With the navigate plugin it is easy to add panning and zooming. Drag to pan, double click to zoom (or use the mouse scrollwheel).</p>

		<p>The plugin fires events (useful for synchronizing several plots) and adds a couple of public methods so you can easily build a little user interface around it, like the little buttons at the top right in the plot.</p>

	</div>

	<div id="footer">
		Copyright &copy; 2007 - 2014 IOLA and Ole Laursen
	</div>

</body>
</html>
