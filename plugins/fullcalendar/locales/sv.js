FullCalendar.globalLocales.push(function () {
  'use strict';

  var sv = {
    code: 'sv',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'Förra',
      next: 'Nästa',
      today: 'Idag',
      month: 'Månad',
      week: 'Vecka',
      day: 'Dag',
      list: 'Program',
    },
    buttonHints: {
      prev(buttonText) {
        return `Föregående ${buttonText.toLocaleLowerCase()}`
      },
      next(buttonText) {
        return `Nästa ${buttonText.toLocaleLowerCase()}`
      },
      today(buttonText) {
        return (buttonText === 'Program' ? 'Detta' : 'Denna') + ' ' + buttonText.toLocaleLowerCase()
      },
    },
    viewHint: '$0 vy',
    navLinkHint: 'Gå till $0',
    moreLinkHint(eventCnt) {
      return `Visa ytterligare ${eventCnt} händelse${eventCnt === 1 ? '' : 'r'}`
    },
    weekText: 'v.',
    weekTextLong: 'Vecka',
    allDayText: 'Heldag',
    moreLinkText: 'till',
    noEventsText: 'Inga händelser att visa',
    closeHint: 'Stäng',
    timeHint: 'Klockan',
    eventHint: 'Händelse',
  };

  return sv;

}());
