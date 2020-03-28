/**
 * Externally trigger the display of DataTables' "processing" indicator. 
 *
 *  @name processing()
 *  @summary Show / hide the processing indicator via the API
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *  @param {boolean} show `true` to show the processing indicator, `false` to
 *    hide it.
 *
 * @returns {DataTables.Api} Unmodified API instance
 *
 *  @example
 *    // Show a processing indicator for two seconds on initialisation
 *    var table = $('#example').DataTable( {
 *      processing: true
 *    } );
 *    
 *    table.processing( true );
 *    
 *    setTimeout( function () {
 *      table.processing( false );
 *    }, 2000 );
 */

jQuery.fn.dataTable.Api.register( 'processing()', function ( show ) {
    return this.iterator( 'table', function ( ctx ) {
        ctx.oApi._fnProcessingDisplay( ctx, show );
    } );
} );
