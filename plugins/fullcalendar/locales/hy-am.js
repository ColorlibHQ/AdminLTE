FullCalendar.globalLocales.push(function () {
  'use strict';

  var hyAm = {
    code: "hy-am",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "\u0546\u0561\u056D\u0578\u0580\u0564",
      next: "\u0540\u0561\u057B\u0578\u0580\u0564",
      today: "\u0531\u0575\u057D\u0585\u0580",
      month: "\u0531\u0574\u056B\u057D",
      week: "\u0547\u0561\u0562\u0561\u0569",
      day: "\u0555\u0580",
      list: "\u0555\u0580\u057E\u0561 \u0581\u0578\u0582\u0581\u0561\u056F"
    },
    weekText: "\u0547\u0561\u0562",
    allDayText: "\u0531\u0574\u0562\u0578\u0572\u057B \u0585\u0580",
    moreLinkText: function(n) {
      return "+ \u0587\u057D " + n;
    },
    noEventsText: "\u0532\u0561\u0581\u0561\u056F\u0561\u0575\u0578\u0582\u0574 \u0567 \u056B\u0580\u0561\u0564\u0561\u0580\u0571\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568 \u0581\u0578\u0582\u0581\u0561\u0564\u0580\u0565\u056C\u0578\u0582"
  };

  return hyAm;

}());
