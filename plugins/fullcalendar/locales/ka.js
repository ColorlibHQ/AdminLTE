FullCalendar.globalLocales.push(function () {
  'use strict';

  var ka = {
    code: "ka",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "\u10EC\u10D8\u10DC\u10D0",
      next: "\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2\u10D8",
      today: "\u10D3\u10E6\u10D4\u10E1",
      month: "\u10D7\u10D5\u10D4",
      week: "\u10D9\u10D5\u10D8\u10E0\u10D0",
      day: "\u10D3\u10E6\u10D4",
      list: "\u10D3\u10E6\u10D8\u10E1 \u10EC\u10D4\u10E1\u10E0\u10D8\u10D2\u10D8"
    },
    weekText: "\u10D9\u10D5",
    allDayText: "\u10DB\u10D7\u10D4\u10DA\u10D8 \u10D3\u10E6\u10D4",
    moreLinkText: function(n) {
      return "+ \u10D9\u10D8\u10D3\u10D4\u10D5 " + n;
    },
    noEventsText: "\u10E6\u10DD\u10DC\u10D8\u10E1\u10EB\u10D8\u10D4\u10D1\u10D4\u10D1\u10D8 \u10D0\u10E0 \u10D0\u10E0\u10D8\u10E1"
  };

  return ka;

}());
