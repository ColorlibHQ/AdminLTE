FullCalendar.globalLocales.push(function () {
  'use strict';

  var vi = {
    code: "vi",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Tr\u01B0\u1EDBc",
      next: "Ti\u1EBFp",
      today: "H\xF4m nay",
      month: "Th\xE1ng",
      week: "Tu\xE2\u0300n",
      day: "Ng\xE0y",
      list: "L\u1ECBch bi\u1EC3u"
    },
    weekText: "Tu",
    allDayText: "C\u1EA3 ng\xE0y",
    moreLinkText: function(n) {
      return "+ th\xEAm " + n;
    },
    noEventsText: "Kh\xF4ng c\xF3 s\u1EF1 ki\u1EC7n \u0111\u1EC3 hi\u1EC3n th\u1ECB"
  };

  return vi;

}());
