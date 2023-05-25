FullCalendar.globalLocales.push(function () {
  'use strict';

  var hi = {
    code: "hi",
    week: {
      dow: 0,
      doy: 6
    },
    buttonText: {
      prev: "\u092A\u093F\u091B\u0932\u093E",
      next: "\u0905\u0917\u0932\u093E",
      today: "\u0906\u091C",
      month: "\u092E\u0939\u0940\u0928\u093E",
      week: "\u0938\u092A\u094D\u0924\u093E\u0939",
      day: "\u0926\u093F\u0928",
      list: "\u0915\u093E\u0930\u094D\u092F\u0938\u0942\u091A\u0940"
    },
    weekText: "\u0939\u092B\u094D\u0924\u093E",
    allDayText: "\u0938\u092D\u0940 \u0926\u093F\u0928",
    moreLinkText: function(n) {
      return "+\u0905\u0927\u093F\u0915 " + n;
    },
    noEventsText: "\u0915\u094B\u0908 \u0918\u091F\u0928\u093E\u0913\u0902 \u0915\u094B \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F"
  };

  return hi;

}());
