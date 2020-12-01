FullCalendar.globalLocales.push(function () {
  'use strict';

  var sq = {
    code: 'sq',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'mbrapa',
      next: 'Përpara',
      today: 'sot',
      month: 'Muaj',
      week: 'Javë',
      day: 'Ditë',
      list: 'Listë',
    },
    weekText: 'Ja',
    allDayText: 'Gjithë ditën',
    moreLinkText(n) {
      return '+më tepër ' + n
    },
    noEventsText: 'Nuk ka evente për të shfaqur',
  };

  return sq;

}());
