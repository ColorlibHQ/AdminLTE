FullCalendar.globalLocales.push(function () {
  'use strict';

  var ru = {
    code: "ru",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "\u041F\u0440\u0435\u0434",
      next: "\u0421\u043B\u0435\u0434",
      today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
      month: "\u041C\u0435\u0441\u044F\u0446",
      week: "\u041D\u0435\u0434\u0435\u043B\u044F",
      day: "\u0414\u0435\u043D\u044C",
      list: "\u041F\u043E\u0432\u0435\u0441\u0442\u043A\u0430 \u0434\u043D\u044F"
    },
    weekText: "\u041D\u0435\u0434",
    allDayText: "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C",
    moreLinkText: function(n) {
      return "+ \u0435\u0449\u0451 " + n;
    },
    noEventsText: "\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
  };

  return ru;

}());
