FullCalendar.globalLocales.push(function () {
  'use strict';

  var ro = {
    code: "ro",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "precedent\u0103",
      next: "urm\u0103toare",
      today: "Azi",
      month: "Lun\u0103",
      week: "S\u0103pt\u0103m\xE2n\u0103",
      day: "Zi",
      list: "Agend\u0103"
    },
    weekText: "S\u0103pt",
    allDayText: "Toat\u0103 ziua",
    moreLinkText: function(n) {
      return "+alte " + n;
    },
    noEventsText: "Nu exist\u0103 evenimente de afi\u0219at"
  };

  return ro;

}());
