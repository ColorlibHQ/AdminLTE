FullCalendar.globalLocales.push(function () {
  'use strict';

  var nb = {
    code: "nb",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Forrige",
      next: "Neste",
      today: "I dag",
      month: "M\xE5ned",
      week: "Uke",
      day: "Dag",
      list: "Agenda"
    },
    weekText: "Uke",
    weekTextLong: "Uke",
    allDayText: "Hele dagen",
    moreLinkText: "til",
    noEventsText: "Ingen hendelser \xE5 vise",
    buttonHints: {
      prev: "Forrige $0",
      next: "Neste $0",
      today: "N\xE5v\xE6rende $0"
    },
    viewHint: "$0 visning",
    navLinkHint: "G\xE5 til $0",
    moreLinkHint: function(eventCnt) {
      return "Vis ".concat(eventCnt, " flere hendelse").concat(eventCnt === 1 ? "" : "r");
    }
  };

  return nb;

}());
