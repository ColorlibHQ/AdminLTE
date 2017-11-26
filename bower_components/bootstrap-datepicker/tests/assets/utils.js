function UTCDate(){
    return new Date(Date.UTC.apply(Date, arguments));
}


function format_date(date){
    var y = date.getUTCFullYear(),
        m = date.getUTCMonth() + 1,
        d = date.getUTCDate(),
        h = date.getUTCHours(),
        i = date.getUTCMinutes(),
        s = date.getUTCSeconds(),
        l = date.getUTCMilliseconds();
    function z(i){return (i <= 9 ? '0'+i : i);}
    return y+'-'+z(m)+'-'+z(d)+' '+z(h)+':'+z(i)+':'+z(s)+'.'+z(l);
}


function datesEqual(actual, expected, message){
    QUnit.push(QUnit.equiv(actual, expected), format_date(actual), format_date(expected), message);
}
