FullCalendar.globalLocales.push(function () {
  'use strict';

  var srCyrl = {
    code: "sr-cyrl",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "\u041F\u0440\u0435\u0442\u0445\u043E\u0434\u043D\u0430",
      next: "\u0441\u043B\u0435\u0434\u0435\u045B\u0438",
      today: "\u0414\u0430\u043D\u0430\u0441",
      month: "\u041C\u0435\u0441\u0435\u0446",
      week: "\u041D\u0435\u0434\u0435\u0459\u0430",
      day: "\u0414\u0430\u043D",
      list: "\u041F\u043B\u0430\u043D\u0435\u0440"
    },
    weekText: "\u0421\u0435\u0434",
    allDayText: "\u0426\u0435\u043E \u0434\u0430\u043D",
    moreLinkText: function(n) {
      return "+ \u0458\u043E\u0448 " + n;
    },
    noEventsText: "\u041D\u0435\u043C\u0430 \u0434\u043E\u0433\u0430\u0452\u0430\u0458\u0430 \u0437\u0430 \u043F\u0440\u0438\u043A\u0430\u0437"
  };

  return srCyrl;

}());
