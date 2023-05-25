FullCalendar.globalLocales.push(function () {
  'use strict';

  var bs = {
    code: "bs",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "Pro\u0161li",
      next: "Sljede\u0107i",
      today: "Danas",
      month: "Mjesec",
      week: "Sedmica",
      day: "Dan",
      list: "Raspored"
    },
    weekText: "Sed",
    allDayText: "Cijeli dan",
    moreLinkText: function(n) {
      return "+ jo\u0161 " + n;
    },
    noEventsText: "Nema doga\u0111aja za prikazivanje"
  };

  return bs;

}());
