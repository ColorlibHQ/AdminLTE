FullCalendar.globalLocales.push(function () {
  'use strict';

  var frCh = {
    code: 'fr-ch',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'Précédent',
      next: 'Suivant',
      today: 'Courant',
      year: 'Année',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Mon planning',
    },
    weekText: 'Sm',
    allDayText: 'Toute la journée',
    moreLinkText: 'en plus',
    noEventsText: 'Aucun événement à afficher',
  };

  return frCh;

}());
