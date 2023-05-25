FullCalendar.globalLocales.push(function () {
  'use strict';

  var az = {
    code: "az",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "\u018Fvv\u0259l",
      next: "Sonra",
      today: "Bu G\xFCn",
      month: "Ay",
      week: "H\u0259ft\u0259",
      day: "G\xFCn",
      list: "G\xFCnd\u0259m"
    },
    weekText: "H\u0259ft\u0259",
    allDayText: "B\xFCt\xFCn G\xFCn",
    moreLinkText: function(n) {
      return "+ daha \xE7ox " + n;
    },
    noEventsText: "G\xF6st\u0259rm\u0259k \xFC\xE7\xFCn hadis\u0259 yoxdur"
  };

  return az;

}());
