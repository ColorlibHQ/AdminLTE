FullCalendar.globalLocales.push(function () {
  'use strict';

  var ms = {
    code: "ms",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "Sebelum",
      next: "Selepas",
      today: "hari ini",
      month: "Bulan",
      week: "Minggu",
      day: "Hari",
      list: "Agenda"
    },
    weekText: "Mg",
    allDayText: "Sepanjang hari",
    moreLinkText: function(n) {
      return "masih ada " + n + " acara";
    },
    noEventsText: "Tiada peristiwa untuk dipaparkan"
  };

  return ms;

}());
