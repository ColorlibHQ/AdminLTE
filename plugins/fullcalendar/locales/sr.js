FullCalendar.globalLocales.push(function () {
  'use strict';

  var sr = {
    code: "sr",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "Prethodna",
      next: "Sledec\u0301i",
      today: "Danas",
      month: "M\u0435s\u0435c",
      week: "N\u0435d\u0435lja",
      day: "Dan",
      list: "Plan\u0435r"
    },
    weekText: "Sed",
    allDayText: "C\u0435o dan",
    moreLinkText: function(n) {
      return "+ jo\u0161 " + n;
    },
    noEventsText: "N\u0435ma doga\u0111aja za prikaz"
  };

  return sr;

}());
