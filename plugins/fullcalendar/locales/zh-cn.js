FullCalendar.globalLocales.push(function () {
  'use strict';

  var zhCn = {
    code: "zh-cn",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "\u4E0A\u6708",
      next: "\u4E0B\u6708",
      today: "\u4ECA\u5929",
      month: "\u6708",
      week: "\u5468",
      day: "\u65E5",
      list: "\u65E5\u7A0B"
    },
    weekText: "\u5468",
    allDayText: "\u5168\u5929",
    moreLinkText: function(n) {
      return "\u53E6\u5916 " + n + " \u4E2A";
    },
    noEventsText: "\u6CA1\u6709\u4E8B\u4EF6\u663E\u793A"
  };

  return zhCn;

}());
