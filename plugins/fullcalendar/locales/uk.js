FullCalendar.globalLocales.push(function () {
  'use strict';

  var uk = {
    code: "uk",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439",
      next: "\u0434\u0430\u043B\u0456",
      today: "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456",
      month: "\u041C\u0456\u0441\u044F\u0446\u044C",
      week: "\u0422\u0438\u0436\u0434\u0435\u043D\u044C",
      day: "\u0414\u0435\u043D\u044C",
      list: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0434\u0435\u043D\u043D\u0438\u0439"
    },
    weekText: "\u0422\u0438\u0436",
    allDayText: "\u0423\u0432\u0435\u0441\u044C \u0434\u0435\u043D\u044C",
    moreLinkText: function(n) {
      return "+\u0449\u0435 " + n + "...";
    },
    noEventsText: "\u041D\u0435\u043C\u0430\u0454 \u043F\u043E\u0434\u0456\u0439 \u0434\u043B\u044F \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F"
  };

  return uk;

}());
