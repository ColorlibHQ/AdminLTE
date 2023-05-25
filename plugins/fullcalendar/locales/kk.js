FullCalendar.globalLocales.push(function () {
  'use strict';

  var kk = {
    code: "kk",
    week: {
      dow: 1,
      doy: 7
    },
    buttonText: {
      prev: "\u0410\u043B\u0434\u044B\u04A3\u0493\u044B",
      next: "\u041A\u0435\u043B\u0435\u0441\u0456",
      today: "\u0411\u04AF\u0433\u0456\u043D",
      month: "\u0410\u0439",
      week: "\u0410\u043F\u0442\u0430",
      day: "\u041A\u04AF\u043D",
      list: "\u041A\u04AF\u043D \u0442\u04D9\u0440\u0442\u0456\u0431\u0456"
    },
    weekText: "\u041D\u0435",
    allDayText: "\u041A\u04AF\u043D\u0456 \u0431\u043E\u0439\u044B",
    moreLinkText: function(n) {
      return "+ \u0442\u0430\u0493\u044B " + n;
    },
    noEventsText: "\u041A\u04E9\u0440\u0441\u0435\u0442\u0443 \u04AF\u0448\u0456\u043D \u043E\u049B\u0438\u0493\u0430\u043B\u0430\u0440 \u0436\u043E\u049B"
  };

  return kk;

}());
