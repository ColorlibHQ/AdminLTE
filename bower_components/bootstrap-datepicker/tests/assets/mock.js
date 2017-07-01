;(function(){

window.patch_date = function patch(f){
    var NativeDate = window.Date;
    var date = function date(y,m,d,h,i,s,j){
        switch(arguments.length){
            case 0: return date.now ? new NativeDate(date.now) : new NativeDate();
            case 1: return new NativeDate(y);
            case 2: return new NativeDate(y,m);
            case 3: return new NativeDate(y,m,d);
            case 4: return new NativeDate(y,m,d,h);
            case 5: return new NativeDate(y,m,d,h,i);
            case 6: return new NativeDate(y,m,d,h,i,s);
            case 7: return new NativeDate(y,y,m,d,h,i,s,j);
        }
    };
    date.UTC = NativeDate.UTC;
    return function(){
        Array.prototype.push.call(arguments, date);
        window.Date = date;
        f.apply(this, arguments);
        window.Date = NativeDate;
    };
};


window.patch_show_hide = function patch(f){
    var oldShow = $.fn.show,
        newShow = function () {
            $(this).removeClass('foo');
            return oldShow.apply(this, arguments);
        };

    var oldHide = $.fn.hide,
        newHide = function () {
            $(this).addClass('foo');
            return oldHide.apply(this, arguments);
        };

    return function(){
        $.fn.show = newShow;
        $.fn.hide = newHide;
        f.apply(this, arguments);
        $.fn.show = oldShow;
        $.fn.hide = oldHide;
    };
};

}());
