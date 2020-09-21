FullCalendar.globalLocales.push(function () {
  'use strict';

  var it = {
    code: "it",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: "Prec",
      next: "Succ",
      today: "Oggi",
      month: "Mese",
      week: "Settimana",
      day: "Giorno",
      list: "Agenda"
    },
    weekText: "Sm",
    allDayText: "Tutto il giorno",
    moreLinkText: function(n) {
      return "+altri " + n;
    },
    noEventsText: "Non ci sono eventi da visualizzare"
  };

  return it;

}());
