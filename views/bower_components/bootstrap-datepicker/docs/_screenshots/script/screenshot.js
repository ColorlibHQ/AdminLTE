/* jshint phantom:true, devel:true */
/* Usage: phantomjs screenshot.js in.html out.png */

var sys = require('system'),
    page = new WebPage();
page.viewportSize = {
    width: 800,
    height: 600
};

page.open(sys.args[1], function(status){
    if (status !== 'success'){
        console.log('Bad status: %s', status);
        phantom.exit(1);
    }
    window.setTimeout(function(){
        var box = page.evaluate(function(){
            var lefts, rights, tops, bottoms,
                padding = 10, // px
                selection, show;

            // Call setup method
            if (window.setup)
                window.setup();
            // Show all pickers, or only those marked for showing
            show = $('body').data('show');
            show = show ? $(show) : $('*');
            show
                .filter(function(){
                    return 'datepicker' in $(this).data();
                })
                .datepicker('show');

            // Get bounds of selected elements
            selection = $($('body').data('capture'));
            tops = selection.map(function(){
                return $(this).offset().top;
            }).toArray();
            lefts = selection.map(function(){
                return $(this).offset().left;
            }).toArray();
            bottoms = selection.map(function(){
                return $(this).offset().top + $(this).outerHeight();
            }).toArray();
            rights = selection.map(function(){
                return $(this).offset().left + $(this).outerWidth();
            }).toArray();

            // Convert bounds to single bounding box
            var b = {
                top: Math.min.apply(Math, tops),
                left: Math.min.apply(Math, lefts)
            };
            b.width = Math.max.apply(Math, rights) - b.left;
            b.height = Math.max.apply(Math, bottoms) - b.top;

            // Return bounding box
            return {
                top: Math.max(b.top - padding, 0),
                left: Math.max(b.left - padding, 0),
                width: b.width + 2 * padding,
                height: b.height + 2 * padding
            };
        });
        page.clipRect = box;
        page.render(sys.args[2]);
        phantom.exit();
    }, 1);
});
