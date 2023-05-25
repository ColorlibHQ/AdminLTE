FullCalendar.globalLocales.push(function () {
  'use strict';

  var hr = {
    code: "hr",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "Prija\u0161nji",
      next: "Sljede\u0107i",
      today: "Danas",
      month: "Mjesec",
      week: "Tjedan",
      day: "Dan",
      list: "Raspored"
    },
    weekText: "Tje",
    allDayText: "Cijeli dan",
    moreLinkText: function(n) {
      return "+ jo\u0161 " + n;
    },
    noEventsText: "Nema doga\u0111aja za prikaz"
  };

  return hr;

}());
