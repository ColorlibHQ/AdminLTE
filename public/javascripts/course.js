/**
 * Created by ANJINSHUO on 2017/5/1.
 */

let cid = getUrlParam('cid') || 0;

let history = [];
let homework = [];
let name = '';
let role = 'student';

$(document).ready(() => {
    alertMsg('init');
    $.get('http://localhost:2333/ajax/courseInfo', {
        cid: cid,
    }).done((res) => {
        history = res.history;
        homework = res.homework;
        role = res.role;
        name = document.title= res.name || 'No Course Name';
        getHomework();
        getHistory();
    });
});

const delHistory = (_id) => {
    $.post({
        url: 'http://localhost:2333/ajax/delHistory',
        data: {
            _id : _id
        }
    }).done((res) => {
        console.log(res);
        if(res){
            alertMsg('success');
        } else {
            alertMsg('error');
        }
    })
};

const addHistory = () => {
    if ($('#content').val() == '') {
        alertMsg('warn');
    } else {
        $.post({
            url: 'http://localhost:2333/ajax/addHistory',
            data: {
                content: $('#content').val()
            }
        }).done((res) => {
            // alert(res);
            console.log(res);
            if(res){
                $('#content').val('');
                alertMsg('success')
            } else {
                alertMsg('warn');
            }
        });
    }
};

const alertMsg = (type) => {
    w = $('#alertWarning');
    e = $('#alertError');
    s = $('#alertSuccess');
    switch(type){
        case 'init':
            w.hide(); e.hide(); s.hide(); break;
        case 'error':
            w.hide(); e.show(); s.hide(); break;
        case 'warn':
            w.show(); e.hide(); s.hide(); break;
        case 'success':
            w.hide(); e.hide(); s.show(); break;
    }
};
const getHomework = () => {
    let homeworkHtml = '';
    for(let i in homework){
        homeworkHtml += '<tr>\
            <td>' + i + '</td>\
            <td>' + homework[i].description + '</td>\
            <td>' + homework[i].duedate.slice(5,10) + '</td>\
            <td>' + homework[i].done + '</td>\
            </tr>';
    }
    $('#table-tr').append(homeworkHtml);
};
const getHistory = () => {
    let historyHtml = '';
    for(let i in history){
        // let historyHtml = '<div class="item"><img src="../dist/img/user2-160x160.jpg" alt="user image" class="offline"><p class="message"><a href="#" class="name"><small class="text-muted pull-right"><i class="fa fa-clock-o"></i> {0}</small>{1}</a>{2}</p></div>';
        historyHtml += '<div class="item">\
            <img src="../dist/img/user2-160x160.jpg" alt="user image" class="offline">\
            <p class="message">\
            <a href="#" class="name">\
            <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> ' + history[i].time + '</small>\
        ' + history[i].user + '\
        </a>\
        ' + history[i].content + '\
        <br/>\
            <i class="fa fa-trash" style="cursor:pointer"   onclick="delHistory(' + history[i]._id + ')"></i>\
        </p>\
        </div>';
    }
    $('#chat-box').html(historyHtml);
};

function getUrlParam(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
