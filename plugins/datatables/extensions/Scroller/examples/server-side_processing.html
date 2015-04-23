<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="shortcut icon" type="image/ico" href="http://www.datatables.net/favicon.ico">
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=2.0">

	<title>Scroller example - Server-side processing (5,000,000 rows)</title>
	<link rel="stylesheet" type="text/css" href="../../../media/css/jquery.dataTables.css">
	<link rel="stylesheet" type="text/css" href="../css/dataTables.scroller.css">
	<link rel="stylesheet" type="text/css" href="../../../examples/resources/syntax/shCore.css">
	<link rel="stylesheet" type="text/css" href="../../../examples/resources/demo.css">
	<style type="text/css" class="init">

	</style>
	<script type="text/javascript" language="javascript" src="../../../media/js/jquery.js"></script>
	<script type="text/javascript" language="javascript" src="../../../media/js/jquery.dataTables.js"></script>
	<script type="text/javascript" language="javascript" src="../js/dataTables.scroller.js"></script>
	<script type="text/javascript" language="javascript" src="../../../examples/resources/syntax/shCore.js"></script>
	<script type="text/javascript" language="javascript" src="../../../examples/resources/demo.js"></script>
	<script type="text/javascript" language="javascript" class="init">


$(document).ready(function() {
	$('#example').DataTable( {
		serverSide: true,
		ordering: false,
		searching: false,
		ajax: function ( data, callback, settings ) {
			var out = [];

			for ( var i=data.start, ien=data.start+data.length ; i<ien ; i++ ) {
				out.push( [ i+'-1', i+'-2', i+'-3', i+'-4', i+'-5' ] );
			}

			setTimeout( function () {
				callback( {
					draw: data.draw,
					data: out,
					recordsTotal: 5000000,
					recordsFiltered: 5000000
				} );
			}, 50 );
		},
		dom: "rtiS",
		scrollY: 200,
		scroller: {
			loadingIndicator: true
		}
	} );
} );


	</script>
</head>

<body class="dt-example">
	<div class="container">
		<section>
			<h1>Scroller example <span>Server-side processing (5,000,000 rows)</span></h1>

			<div class="info">
				<p>DataTables' server-side processing mode is a feature that naturally fits in with Scroller perfectly.
				Server-side processing can be used to show large data sets, with the server being used to do the data
				processing, and Scroller optimising the display of the data in a scrolling viewport.</p>

				<p>When using server-side processing, Scroller will wait a small amount of time to allow the scrolling
				to finish before requesting more data from the server (200mS by default). This prevents you from DoSing
				your own server!</p>

				<p>This example shows Scroller using server-side processing mode and 5 million rows.
				<strong>Important</strong> This particular example uses <a href=
				"//datatables.net/reference/option/ajax"><code class="option" title=
				"DataTables initialisation option">ajax<span>DT</span></code></a> as a function to 'fake' the data to
				show Scroller's ability to show large data sets. It does not have a real database behind it! You would
				normally not use <a href="//datatables.net/reference/option/ajax"><code class="option" title=
				"DataTables initialisation option">ajax<span>DT</span></code></a> as a function to generate data, but
				rather as a url for where to fetch the real data!</p>

				<p>In this example we also enable the <code>loadingIndicator</code> option of Scroller to show the end
				user what is happening when they scroll passed the currently loaded data.</p>
			</div>

			<table id="example" class="display" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>ID</th>
						<th>First name</th>
						<th>Last name</th>
						<th>ZIP / Post code</th>
						<th>Country</th>
					</tr>
				</thead>
			</table>

			<ul class="tabs">
				<li class="active">Javascript</li>
				<li>HTML</li>
				<li>CSS</li>
				<li>Ajax</li>
				<li>Server-side script</li>
			</ul>

			<div class="tabs">
				<div class="js">
					<p>The Javascript shown below is used to initialise the table shown in this
					example:</p><code class="multiline brush: js;">$(document).ready(function() {
	$('#example').DataTable( {
		serverSide: true,
		ordering: false,
		searching: false,
		ajax: function ( data, callback, settings ) {
			var out = [];

			for ( var i=data.start, ien=data.start+data.length ; i&lt;ien ; i++ ) {
				out.push( [ i+'-1', i+'-2', i+'-3', i+'-4', i+'-5' ] );
			}

			setTimeout( function () {
				callback( {
					draw: data.draw,
					data: out,
					recordsTotal: 5000000,
					recordsFiltered: 5000000
				} );
			}, 50 );
		},
		dom: &quot;rtiS&quot;,
		scrollY: 200,
		scroller: {
			loadingIndicator: true
		}
	} );
} );</code>

					<p>In addition to the above code, the following Javascript library files are loaded for use in this
					example:</p>

					<ul>
						<li><a href="../../../media/js/jquery.js">../../../media/js/jquery.js</a></li>
						<li><a href=
						"../../../media/js/jquery.dataTables.js">../../../media/js/jquery.dataTables.js</a></li>
						<li><a href="../js/dataTables.scroller.js">../js/dataTables.scroller.js</a></li>
					</ul>
				</div>

				<div class="table">
					<p>The HTML shown below is the raw HTML table element, before it has been enhanced by
					DataTables:</p>
				</div>

				<div class="css">
					<div>
						<p>This example uses a little bit of additional CSS beyond what is loaded from the library
						files (below), in order to correctly display the table. The additional CSS used is shown
						below:</p><code class="multiline brush: js;"></code>
					</div>

					<p>The following CSS library files are loaded for use in this example to provide the styling of the
					table:</p>

					<ul>
						<li><a href=
						"../../../media/css/jquery.dataTables.css">../../../media/css/jquery.dataTables.css</a></li>
						<li><a href="../css/dataTables.scroller.css">../css/dataTables.scroller.css</a></li>
					</ul>
				</div>

				<div class="ajax">
					<p>This table loads data by Ajax. The latest data that has been loaded is shown below. This data
					will update automatically as any additional data is loaded.</p>
				</div>

				<div class="php">
					<p>The script used to perform the server-side processing for this table is shown below. Please note
					that this is just an example script using PHP. Server-side processing scripts can be written in any
					language, using <a href="//datatables.net/manual/server-side">the protocol described in the
					DataTables documentation</a>.</p>
				</div>
			</div>
		</section>
	</div>

	<section>
		<div class="footer">
			<div class="gradient"></div>

			<div class="liner">
				<h2>Other examples</h2>

				<div class="toc">
					<div class="toc-group">
						<h3><a href="./index.html">Examples</a></h3>
						<ul class="toc active">
							<li><a href="./simple.html">Basic initialisation</a></li>
							<li><a href="./state_saving.html">State saving</a></li>
							<li><a href="./large_js_source.html">Client-side data source (50,000 rows)</a></li>
							<li class="active"><a href="./server-side_processing.html">Server-side processing
							(5,000,000 rows)</a></li>
							<li><a href="./api_scrolling.html">API</a></li>
						</ul>
					</div>
				</div>

				<div class="epilogue">
					<p>Please refer to the <a href="http://www.datatables.net">DataTables documentation</a> for full
					information about its API properties and methods.<br>
					Additionally, there are a wide range of <a href="http://www.datatables.net/extras">extras</a> and
					<a href="http://www.datatables.net/plug-ins">plug-ins</a> which extend the capabilities of
					DataTables.</p>

					<p class="copyright">DataTables designed and created by <a href=
					"http://www.sprymedia.co.uk">SpryMedia Ltd</a> &#169; 2007-2014<br>
					DataTables is licensed under the <a href="http://www.datatables.net/mit">MIT license</a>.</p>
				</div>
			</div>
		</div>
	</section>
</body>
</html>