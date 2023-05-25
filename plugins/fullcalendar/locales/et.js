FullCalendar.globalLocales.push(function () {
  'use strict';

  var et = {
    code: "et",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Eelnev",
      next: "J\xE4rgnev",
      today: "T\xE4na",
      month: "Kuu",
      week: "N\xE4dal",
      day: "P\xE4ev",
      list: "P\xE4evakord"
    },
    weekText: "n\xE4d",
    allDayText: "Kogu p\xE4ev",
    moreLinkText: function(n) {
      return "+ veel " + n;
    },
    noEventsText: "Kuvamiseks puuduvad s\xFCndmused"
  };

  return et;

}());
