FullCalendar.globalLocales.push(function () {
  'use strict';

  var mk = {
    code: "mk",
    buttonText: {
      prev: "претходно",
      next: "следно",
      today: "Денес",
      month: "Месец",
      week: "Недела",
      day: "Ден",
      list: "График"
    },
    weekText: "Сед",
    allDayText: "Цел ден",
    moreLinkText: function(n) {
      return "+повеќе " + n;
    },
    noEventsText: "Нема настани за прикажување"
  };

  return mk;

}());
