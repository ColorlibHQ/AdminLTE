FullCalendar.globalLocales.push(function () {
  'use strict';

  var az = {
    code: "az",
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: "Əvvəl",
      next: "Sonra",
      today: "Bu Gün",
      month: "Ay",
      week: "Həftə",
      day: "Gün",
      list: "Gündəm"
    },
    weekText: "Həftə",
    allDayText: "Bütün Gün",
    moreLinkText: function(n) {
      return "+ daha çox " + n;
    },
    noEventsText: "Göstərmək üçün hadisə yoxdur"
  };

  return az;

}());
