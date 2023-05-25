FullCalendar.globalLocales.push(function () {
  'use strict';

  var bg = {
    code: "bg",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "\u043D\u0430\u0437\u0430\u0434",
      next: "\u043D\u0430\u043F\u0440\u0435\u0434",
      today: "\u0434\u043D\u0435\u0441",
      month: "\u041C\u0435\u0441\u0435\u0446",
      week: "\u0421\u0435\u0434\u043C\u0438\u0446\u0430",
      day: "\u0414\u0435\u043D",
      list: "\u0413\u0440\u0430\u0444\u0438\u043A"
    },
    allDayText: "\u0426\u044F\u043B \u0434\u0435\u043D",
    moreLinkText: function(n) {
      return "+\u043E\u0449\u0435 " + n;
    },
    noEventsText: "\u041D\u044F\u043C\u0430 \u0441\u044A\u0431\u0438\u0442\u0438\u044F \u0437\u0430 \u043F\u043E\u043A\u0430\u0437\u0432\u0430\u043D\u0435"
  };

  return bg;

}());
