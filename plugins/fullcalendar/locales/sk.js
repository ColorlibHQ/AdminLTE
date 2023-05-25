FullCalendar.globalLocales.push(function () {
  'use strict';

  var sk = {
    code: "sk",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Predch\xE1dzaj\xFAci",
      next: "Nasleduj\xFAci",
      today: "Dnes",
      month: "Mesiac",
      week: "T\xFD\u017Ede\u0148",
      day: "De\u0148",
      list: "Rozvrh"
    },
    weekText: "Ty",
    allDayText: "Cel\xFD de\u0148",
    moreLinkText: function(n) {
      return "+\u010Fal\u0161ie: " + n;
    },
    noEventsText: "\u017Diadne akcie na zobrazenie"
  };

  return sk;

}());
