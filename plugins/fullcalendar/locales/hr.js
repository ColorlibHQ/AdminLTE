FullCalendar.globalLocales.push(function () {
  'use strict';

  var hr = {
    code: 'hr',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7, // The week that contains Jan 1st is the first week of the year.
    },
    buttonText: {
      prev: 'Prijašnji',
      next: 'Sljedeći',
      today: 'Danas',
      month: 'Mjesec',
      week: 'Tjedan',
      day: 'Dan',
      list: 'Raspored',
    },
    weekText: 'Tje',
    allDayText: 'Cijeli dan',
    moreLinkText: function(n) {
      return '+ još ' + n
    },
    noEventsText: 'Nema događaja za prikaz',
  };

  return hr;

}());
