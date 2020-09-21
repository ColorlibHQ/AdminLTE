FullCalendar.globalLocales.push(function () {
  'use strict';

  var et = {
    code: "et",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: "Eelnev",
      next: "Järgnev",
      today: "Täna",
      month: "Kuu",
      week: "Nädal",
      day: "Päev",
      list: "Päevakord"
    },
    weekText: "näd",
    allDayText: "Kogu päev",
    moreLinkText: function(n) {
      return "+ veel " + n;
    },
    noEventsText: "Kuvamiseks puuduvad sündmused"
  };

  return et;

}());
