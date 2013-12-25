$(document).ready(function(){
    if (!$.jqplot._noCodeBlock) {
        $('script.code').each(function(index) {
            if ($('pre.code').eq(index).length  ) {
                $('pre.code').eq(index).text($(this).html());
            }
            else {
                // var str = $(this).text();
                // $('div.jqplot-target').eq(index).after($('<pre class="code">'+str+'</pre>'));
                var pre = $('<pre class="code prettyprint brush: js"></pre>');
                $('div.jqplot-target').eq(index).after(pre);
                pre.text($(this).html());
                pre = null;
            }
        });

        $('script.common').each(function(index) {
            $('pre.common').eq(index).text($(this).html());
        });

        var elstr='';
        if ($('script.include, link.include').length > 0) {

            if ($('pre.include').length == 0) {
                var temp = [
                    '<div class="code prettyprint include">',
                    '<p class="text">The charts on this page depend on the following files:</p>',
                    '<pre class="include prettyprint brush: html gutter: false"></pre>',
                    '</div>'
                ];

                temp = $(temp.join('\n'));
                $('div#example-content').append(temp);
                temp = null;
            }      


            $('script.include').each(function(index) {
                if (elstr !== '') {
                    elstr += '\n';
                }
                elstr += '<script type="text/javascript" src="'+$(this).attr('src')+'"></script>';
            });

            $('link.include').each(function(index) {
                if (elstr !== '') {
                    elstr += '\n';
                }
                elstr += '<link rel="stylesheet" type="text/css" hrf="'+$(this).attr('href')+'" />';
            })

            $('pre.include').text(elstr);
        }

        else {
            $('pre.include').remove();
            $('div.include').remove();
        }
    }

    if (!$.jqplot.use_excanvas) {
        $('div.jqplot-target').each(function(){
            var outerDiv = $(document.createElement('div'));
            var header = $(document.createElement('div'));
            var div = $(document.createElement('div'));

            outerDiv.append(header);
            outerDiv.append(div);

            outerDiv.addClass('jqplot-image-container');
            header.addClass('jqplot-image-container-header');
            div.addClass('jqplot-image-container-content');

            header.html('Right Click to Save Image As...');

            var close = $(document.createElement('a'));
            close.addClass('jqplot-image-container-close');
            close.html('Close');
            close.attr('href', '#');
            close.click(function() {
                $(this).parents('div.jqplot-image-container').hide(500);
            })
            header.append(close);

            $(this).after(outerDiv);
            outerDiv.hide();

            outerDiv = header = div = close = null;

            if (!$.jqplot._noToImageButton) {
                var btn = $(document.createElement('button'));
                btn.text('View Plot Image');
                btn.addClass('jqplot-image-button');
                btn.bind('click', {chart: $(this)}, function(evt) {
                    var imgelem = evt.data.chart.jqplotToImageElem();
                    var div = $(this).nextAll('div.jqplot-image-container').first();
                    div.children('div.jqplot-image-container-content').empty();
                    div.children('div.jqplot-image-container-content').append(imgelem);
                    div.show(500);
                    div = null;
                });

                $(this).after(btn);
                btn.after('<br />');
                btn = null;
            }
        });
    }

    SyntaxHighlighter.defaults['toolbar'] = true;      
    SyntaxHighlighter.all();

    $(document).unload(function() {$('*').unbind(); });
});