FullCalendar.globalLocales.push(function () {
  'use strict';

  var cs = {
    code: "cs",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "D\u0159\xEDve",
      next: "Pozd\u011Bji",
      today: "Nyn\xED",
      month: "M\u011Bs\xEDc",
      week: "T\xFDden",
      day: "Den",
      list: "Agenda"
    },
    weekText: "T\xFDd",
    allDayText: "Cel\xFD den",
    moreLinkText: function(n) {
      return "+dal\u0161\xED: " + n;
    },
    noEventsText: "\u017D\xE1dn\xE9 akce k zobrazen\xED"
  };

  return cs;

}());
