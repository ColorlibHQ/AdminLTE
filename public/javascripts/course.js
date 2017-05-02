/**
 * Created by ANJINSHUO on 2017/5/1.
 */

const num_per_page = 7;
let globalpage = 1;
let maxpage;
let cid = getUrlParam('cid') || 0;

let history = [];
let homework = [];
let name = '';

$(document).ready(() => {
    // $.get('ajax/username').done((data) => {
    //     $('.header .text-muted').text('Welcome ' + data);
    // });
    $.get('http://localhost:2333/ajax/courseInfo', {
        cid: cid,
    }).done((res) => {
        history = res.history;
        homework = res.homework;
        name = document.title= res.name || 'No Course Name';

        let count = res.history.length;
        maxpage = Math.ceil(count / num_per_page);
        if (count == 0) {
            maxpage = 1;
        }
        let button = document.createElement('li');
        button.innerHTML = '<a href="javascript:void(0)" onclick="getHistory(globalpage-1)">Prev</a>'
        $('.pagination')[0].appendChild(button)
        for (let i = 0; i < maxpage; i++) {
            let button = document.createElement('li');
            button.innerHTML = '<a href="javascript:void(0)" onclick="getHistory(' + (i + 1) + ')">' + (i + 1) + '</a>'
            $('.pagination')[0].appendChild(button)
        }
        button = document.createElement('li');
        button.innerHTML = '<a href="javascript:void(0)" onclick="getHistory(globalpage+1)">Next</a>'
        $('.pagination')[0].appendChild(button);
        getHistory(globalpage);
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
                userid: 1234, //cookie
                content: $('#content').val()
            }
        }).done((res) => {
            // alert(res);
            console.log(res);
        });
    }
};

function getHistory(page) {
    let oripage = page;
    page = page < 1 ? 1 : page > maxpage ? maxpage : page;
    globalpage = page;
    if (oripage < 1 || oripage > maxpage)
        return;
    // d3.selectAll('li').attr('class', '');
    $('.pagination li').removeClass('active');
    $($('.pagination li')[page]).addClass('active');

    let d = history.slice((page-1)*num_per_page, page*num_per_page);
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
        });
    blockquote.append('small').text((d) => {
            return 'By ' + d.user;
        })
        .append('cite').text((d) => {
            // return ' (' + new Date(d.time).toLocaleString() + ')';
        });
    abstract.exit().remove();

    $('#history').html('');
    let historyItems = d3.select('#history')
        .selectAll('#item')
        .data(d);
    let item = historyItems.enter()
        .append('div')
        .attr('class', 'item');
    item.append('img')
        .attr('src', '../dist/img/user2-160x160.jpg')
        .attr('alt', 'user image')
        .attr('class', 'offline')
    let message = item.append('p').attr('class', 'message')
    message.text((d) => {
            return d.content;
        });
    message.append('a').attr('class', 'name')
        .text((d) => {
            return d.user;
        })
        .append('small')
        .attr('class', 'text-muted pull-right')
        .text((d) => {
            return d.time
        })
        .append('i')
        .attr('class', 'fa fa-clock-o');
    /*
 <div class="item">
     <img src="../dist/img/user2-160x160.jpg" alt="user image" class="offline">

     <p class="message">
        <a href="#" class="name">
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
            Susan Doe
        </a>
        I would like to meet you to discuss the latest news about
        the arrival of the new theme. They say it is going to be one the
        best themes on the market
     </p>
 </div>
    */

}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

