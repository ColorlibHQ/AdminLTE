FullCalendar.globalLocales.push(function () {
  'use strict';

  var sv = {
    code: "sv",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "F\xF6rra",
      next: "N\xE4sta",
      today: "Idag",
      month: "M\xE5nad",
      week: "Vecka",
      day: "Dag",
      list: "Program"
    },
    buttonHints: {
      prev: function(buttonText) {
        return "F\xF6reg\xE5ende ".concat(buttonText.toLocaleLowerCase());
      },
      next: function(buttonText) {
        return "N\xE4sta ".concat(buttonText.toLocaleLowerCase());
      },
      today: function(buttonText) {
        return (buttonText === "Program" ? "Detta" : "Denna") + " " + buttonText.toLocaleLowerCase();
      }
    },
    viewHint: "$0 vy",
    navLinkHint: "G\xE5 till $0",
    moreLinkHint: function(eventCnt) {
      return "Visa ytterligare ".concat(eventCnt, " h\xE4ndelse").concat(eventCnt === 1 ? "" : "r");
    },
    weekText: "v.",
    weekTextLong: "Vecka",
    allDayText: "Heldag",
    moreLinkText: "till",
    noEventsText: "Inga h\xE4ndelser att visa",
    closeHint: "St\xE4ng",
    timeHint: "Klockan",
    eventHint: "H\xE4ndelse"
  };

  return sv;

}());
