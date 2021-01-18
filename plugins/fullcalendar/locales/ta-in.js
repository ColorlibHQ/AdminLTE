FullCalendar.globalLocales.push(function () {
  'use strict';

  var taIn = {
    code: 'ta-in',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'முந்தைய',
      next: 'அடுத்தது',
      today: 'இன்று',
      month: 'மாதம்',
      week: 'சனிக்கிழமை',
      day: 'நாள்',
      list: 'தினசரி கதை',
    },
    weekText: 'வார',
    allDayText: 'நாள் முழுவதும்',
    moreLinkText: function(n) {
      return '+ மேலும் ' + n
    },
    noEventsText: 'நிகழ்வைக் காட்டவில்லை',
  };

  return taIn;

}());
