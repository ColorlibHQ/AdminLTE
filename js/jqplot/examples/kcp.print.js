// <--- --------------------------------------------------------------------------------------- ----
	
// 	Blog Entry:
// 	Ask Ben: Print Part Of A Web Page With jQuery
	
// 	Author:
// 	Ben Nadel / Kinky Solutions
	
// 	Link:
// 	http://www.bennadel.com/index.cfm?event=blog.view&id=1591
	
// 	Date Posted:
// 	May 21, 2009 at 9:10 PM
	
// ---- --------------------------------------------------------------------------------------- --->


// Create a jquery plugin that prints the given element.
jQuery.fn.print = function(){
	// NOTE: We are trimming the jQuery collection down to the
	// first element in the collection.
	if (this.size() > 1){
		this.eq( 0 ).print();
		return;
	} else if (!this.size()){
		return;
	}

    var chart = $(this).closest('div.quintile-outer-container').find('div.jqplot-target');
    // var imgelem = chart.jqplotToImageElem();
    var imageElemStr = chart.jqplotToImageElemStr();
    // var statsrows = $(this).closest('div.quintile-outer-container').find('table.stats-table tr');
    var statsTable = $('<div></div>').append($(this).closest('div.quintile-outer-container').find('table.stats-table').clone());
    // var rowstyles = window.getComputedStyle(statsrows.get(0), '');
 
	// ASSERT: At this point, we know that the current jQuery
	// collection (as defined by THIS), contains only one
	// printable element.
 
	// Create a random name for the print frame.
	var strFrameName = ("printer-" + (new Date()).getTime());
 
	// Create an iFrame with the new name.
	var jFrame = $( "<iframe name='" + strFrameName + "'>" );
 
	// Hide the frame (sort of) and attach to the body.
	jFrame
		.css( "width", "1px" )
		.css( "height", "1px" )
		.css( "position", "absolute" )
		.css( "left", "-9999px" )
		.appendTo( $( "body:first" ) )
	;
 
	// Get a FRAMES reference to the new frame.
	var objFrame = window.frames[ strFrameName ];
 
	// Get a reference to the DOM in the new frame.
	var objDoc = objFrame.document;
 
	// Grab all the style tags and copy to the new
	// document so that we capture look and feel of
	// the current document.
 
	// Create a temp document DIV to hold the style tags.
	// This is the only way I could find to get the style
	// tags into IE.
	var jStyleDiv = $( "<div>" ).append(
		$( "style" ).clone()
		);
 
	// Write the HTML for the document. In this, we will
	// write out the HTML of the current element.
	objDoc.open();
	objDoc.write( "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" );
	objDoc.write( "<html>" );
	objDoc.write( "<body>" );
	objDoc.write( "<head>" );
	objDoc.write( "<title>" );
	objDoc.write( document.title );
	objDoc.write( "</title>" );
	objDoc.write( jStyleDiv.html() );
	objDoc.write( "</head>" );

	// Typically, would just write out the html.	
	// objDoc.write( this.html() );

	// We need to do specific manipulation for kcp quintiles.
	objDoc.write( '<div class="quintile-outer-container ui-widget ui-corner-all"> \
    <div class="quintile-content ui-widget-content ui-corner-bottom"> \
		<table class="quintile-display"> \
            <tr> \
                <td class="chart-cell">');

    objDoc.write(imageElemStr);
    
    objDoc.write('</td> <td class="stats-cell">');

    objDoc.write(statsTable.html());

    objDoc.write('</td></tr></table></div></div>');

	objDoc.write( "</body>" );
	objDoc.write( "</html>" );
	objDoc.close();
 
 	// 
	// When the iframe is completely loaded, print it.
	// This seemed worked in IE 9, but caused problems in FF.
	//
	// $(objFrame).load(function() {
	// 	objFrame.focus();
	// 	objFrame.print();
	// });

	//
	// This works in all supported browsers.
	// Note, might have to adjust time.
	//
	setTimeout(
		function() {
			objFrame.focus();
			objFrame.print();
		}, 750);
 

	// Have the frame remove itself in about a minute so that
	// we don't build up too many of these frames.
	setTimeout(
		function(){
			jFrame.empty();
			jFrame.remove();
		},
		(60 * 1000)
		);
}