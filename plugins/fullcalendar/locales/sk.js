FullCalendar.globalLocales.push(function () {
  'use strict';

  var sk = {
    code: 'sk',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'Predchádzajúci',
      next: 'Nasledujúci',
      today: 'Dnes',
      month: 'Mesiac',
      week: 'Týždeň',
      day: 'Deň',
      list: 'Rozvrh',
    },
    weekText: 'Ty',
    allDayText: 'Celý deň',
    moreLinkText(n) {
      return '+ďalšie: ' + n
    },
    noEventsText: 'Žiadne akcie na zobrazenie',
  };

  return sk;

}());
