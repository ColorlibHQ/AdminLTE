FullCalendar.globalLocales.push(function () {
  'use strict';

  var fa = {
    code: "fa",
    week: {
      dow: 6,
      doy: 12
    },
    direction: "rtl",
    buttonText: {
      prev: "\u0642\u0628\u0644\u06CC",
      next: "\u0628\u0639\u062F\u06CC",
      today: "\u0627\u0645\u0631\u0648\u0632",
      month: "\u0645\u0627\u0647",
      week: "\u0647\u0641\u062A\u0647",
      day: "\u0631\u0648\u0632",
      list: "\u0628\u0631\u0646\u0627\u0645\u0647"
    },
    weekText: "\u0647\u0641",
    allDayText: "\u062A\u0645\u0627\u0645 \u0631\u0648\u0632",
    moreLinkText: function(n) {
      return "\u0628\u06CC\u0634 \u0627\u0632 " + n;
    },
    noEventsText: "\u0647\u06CC\u0686 \u0631\u0648\u06CC\u062F\u0627\u062F\u06CC \u0628\u0647 \u0646\u0645\u0627\u06CC\u0634"
  };

  return fa;

}());
