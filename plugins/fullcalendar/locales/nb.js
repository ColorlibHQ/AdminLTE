FullCalendar.globalLocales.push(function () {
  'use strict';

  var nb = {
    code: 'nb',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'Forrige',
      next: 'Neste',
      today: 'I dag',
      month: 'Måned',
      week: 'Uke',
      day: 'Dag',
      list: 'Agenda',
    },
    weekText: 'Uke',
    weekTextLong: 'Uke',
    allDayText: 'Hele dagen',
    moreLinkText: 'til',
    noEventsText: 'Ingen hendelser å vise',
    buttonHints: {
      prev: 'Forrige $0',
      next: 'Neste $0',
      today: 'Nåværende $0',
    },
    viewHint: '$0 visning',
    navLinkHint: 'Gå til $0',
    moreLinkHint(eventCnt) {
      return `Vis ${eventCnt} flere hendelse${eventCnt === 1 ? '' : 'r'}`
    },
  };

  return nb;

}());
