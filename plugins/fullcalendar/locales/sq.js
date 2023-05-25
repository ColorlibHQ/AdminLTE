FullCalendar.globalLocales.push(function () {
  'use strict';

  var sq = {
    code: "sq",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "mbrapa",
      next: "P\xEBrpara",
      today: "sot",
      month: "Muaj",
      week: "Jav\xEB",
      day: "Dit\xEB",
      list: "List\xEB"
    },
    weekText: "Ja",
    allDayText: "Gjith\xEB dit\xEBn",
    moreLinkText: function(n) {
      return "+m\xEB tep\xEBr " + n;
    },
    noEventsText: "Nuk ka evente p\xEBr t\xEB shfaqur"
  };

  return sq;

}());
