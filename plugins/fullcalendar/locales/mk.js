FullCalendar.globalLocales.push(function () {
  'use strict';

  var mk = {
    code: "mk",
    buttonText: {
      prev: "\u043F\u0440\u0435\u0442\u0445\u043E\u0434\u043D\u043E",
      next: "\u0441\u043B\u0435\u0434\u043D\u043E",
      today: "\u0414\u0435\u043D\u0435\u0441",
      month: "\u041C\u0435\u0441\u0435\u0446",
      week: "\u041D\u0435\u0434\u0435\u043B\u0430",
      day: "\u0414\u0435\u043D",
      list: "\u0413\u0440\u0430\u0444\u0438\u043A"
    },
    weekText: "\u0421\u0435\u0434",
    allDayText: "\u0426\u0435\u043B \u0434\u0435\u043D",
    moreLinkText: function(n) {
      return "+\u043F\u043E\u0432\u0435\u045C\u0435 " + n;
    },
    noEventsText: "\u041D\u0435\u043C\u0430 \u043D\u0430\u0441\u0442\u0430\u043D\u0438 \u0437\u0430 \u043F\u0440\u0438\u043A\u0430\u0436\u0443\u0432\u0430\u045A\u0435"
  };

  return mk;

}());
