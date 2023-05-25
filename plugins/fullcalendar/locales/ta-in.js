FullCalendar.globalLocales.push(function () {
  'use strict';

  var taIn = {
    code: "ta-in",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BC8\u0BAF",
      next: "\u0B85\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1",
      today: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1",
      month: "\u0BAE\u0BBE\u0BA4\u0BAE\u0BCD",
      week: "\u0BB5\u0BBE\u0BB0\u0BAE\u0BCD",
      day: "\u0BA8\u0BBE\u0BB3\u0BCD",
      list: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0B85\u0B9F\u0BCD\u0B9F\u0BB5\u0BA3\u0BC8"
    },
    weekText: "\u0BB5\u0BBE\u0BB0\u0BAE\u0BCD",
    allDayText: "\u0BA8\u0BBE\u0BB3\u0BCD \u0BAE\u0BC1\u0BB4\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD",
    moreLinkText: function(n) {
      return "+ \u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD " + n;
    },
    noEventsText: "\u0B95\u0BBE\u0BA3\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95 \u0BA8\u0BBF\u0B95\u0BB4\u0BCD\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8"
  };

  return taIn;

}());
