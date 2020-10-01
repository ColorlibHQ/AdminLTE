FullCalendar.globalLocales.push(function () {
  'use strict';

  var ru = {
    code: "ru",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: "Пред",
      next: "След",
      today: "Сегодня",
      month: "Месяц",
      week: "Неделя",
      day: "День",
      list: "Повестка дня"
    },
    weekText: "Нед",
    allDayText: "Весь день",
    moreLinkText: function(n) {
      return "+ ещё " + n;
    },
    noEventsText: "Нет событий для отображения"
  };

  return ru;

}());
