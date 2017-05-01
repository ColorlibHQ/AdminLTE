/**
 * Created by ANJINSHUO on 2017/5/1.
 */


let globalpage = 1;
let maxpage;

/**
 * get user from cookie  type: tea / stu
 * get course from path
 */
$(document).ready(() => {
    // $.get('ajax/username').done((data) => {
    //     $('.header .text-muted').text('Welcome ' + data);
    // });
    $.get('http://localhost:2333/ajax/maxpage').done((count) => {
        maxpage = Math.ceil(count / 7);
        if (count == 0) {
            maxpage = 1;
        }
        let button = document.createElement('li');
        button.innerHTML = '<a href="javascript:void(0)" onclick="getabstract(globalpage-1)">Prev</a>'
        $('.pagination')[0].appendChild(button)
        for (let i = 0; i < maxpage; i++) {
            let button = document.createElement('li');
            button.innerHTML = '<a href="javascript:void(0)" onclick="getabstract(' + (i + 1) + ')">' + (i + 1) + '</a>'
            $('.pagination')[0].appendChild(button)
        }
        button = document.createElement('li');
        button.innerHTML = '<a href="javascript:void(0)" onclick="getabstract(globalpage+1)">Next</a>'
        $('.pagination')[0].appendChild(button);
        getabstract(globalpage);
    });
});

const publish = () => {
    if ($('#content').val() == '') {
        $('#blank').html('<div class="alert alert-dismissable alert-warning">\
            <button class="close" type="button" data-dismiss="alert">×</button>\
            <strong>Be aware:</strong> you should fill all the blanks.\
          </div>');
    } else {
        $.post({
            url: 'http://localhost:2333/ajax/publish',
            data: {
                userid: 1,
                content: $('#content').val()
            }
        }).done((res) => {
            // alert(res);
            console.log(res);
        });
    }
};

function getabstract(page) {
    let oripage = page;
    page = page < 1 ? 1 : page > maxpage ? maxpage : page;
    globalpage = page;
    if (oripage < 1 || oripage > maxpage)
        return;
    // d3.selectAll('li').attr('class', '');
    $('.pagination li').removeClass('active');
    $($('.pagination li')[page]).addClass('active');
    $.get('http://localhost:2333/ajax/getabstract', {'page': page}).done((d) => {
        $('#abstract').html('');
        let abstract = d3.select('#abstract')
            .selectAll('blockquote')
            .data(d);
        let blockquote = abstract.enter()
            .append('blockquote');
        blockquote.append('p').append('a')
            .attr('title', 'open the link to reply')
            .text((d) => {
                return d.content;
            })
        blockquote.append('small').text((d) => {
                return 'By ' + d.user;
            })
            .append('cite').text((d) => {
                // return ' (' + new Date(d.time).toLocaleString() + ')';
            });
        abstract.exit().remove();
    });
}

