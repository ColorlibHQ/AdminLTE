FullCalendar.globalLocales.push(function () {
  'use strict';

  var lv = {
    code: "lv",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Iepr.",
      next: "N\u0101k.",
      today: "\u0160odien",
      month: "M\u0113nesis",
      week: "Ned\u0113\u013Ca",
      day: "Diena",
      list: "Dienas k\u0101rt\u012Bba"
    },
    weekText: "Ned.",
    allDayText: "Visu dienu",
    moreLinkText: function(n) {
      return "+v\u0113l " + n;
    },
    noEventsText: "Nav notikumu"
  };

  return lv;

}());
