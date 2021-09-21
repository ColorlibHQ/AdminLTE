FullCalendar.globalLocales.push(function () {
  'use strict';

  var ku = {
    code: 'ku',
    week: {
      dow: 6, // Saturday is the first day of the week.
      doy: 12, // The week that contains Jan 1st is the first week of the year.
    },
    direction: 'rtl',
    buttonText: {
      prev: 'پێشتر',
      next: 'دواتر',
      today: 'ئەمڕو',
      month: 'مانگ',
      week: 'هەفتە',
      day: 'ڕۆژ',
      list: 'بەرنامە',
    },
    weekText: 'هەفتە',
    allDayText: 'هەموو ڕۆژەکە',
    moreLinkText: 'زیاتر',
    noEventsText: 'هیچ ڕووداوێك نیە',
  };

  return ku;

}());
