FullCalendar.globalLocales.push(function () {
  'use strict';

  function affix(buttonText) {
    return buttonText === "Tag" || buttonText === "Monat" ? "r" : buttonText === "Jahr" ? "s" : "";
  }
  var de = {
    code: "de",
    week: {
      dow: 1,
      doy: 4
    },
    buttonText: {
      prev: "Zur\xFCck",
      next: "Vor",
      today: "Heute",
      year: "Jahr",
      month: "Monat",
      week: "Woche",
      day: "Tag",
      list: "Termin\xFCbersicht"
    },
    weekText: "KW",
    weekTextLong: "Woche",
    allDayText: "Ganzt\xE4gig",
    moreLinkText: function(n) {
      return "+ weitere " + n;
    },
    noEventsText: "Keine Ereignisse anzuzeigen",
    buttonHints: {
      prev: function(buttonText) {
        return "Vorherige".concat(affix(buttonText), " ").concat(buttonText);
      },
      next: function(buttonText) {
        return "N\xE4chste".concat(affix(buttonText), " ").concat(buttonText);
      },
      today: function(buttonText) {
        if (buttonText === "Tag") {
          return "Heute";
        }
        return "Diese".concat(affix(buttonText), " ").concat(buttonText);
      }
    },
    viewHint: function(buttonText) {
      var glue = buttonText === "Woche" ? "n" : buttonText === "Monat" ? "s" : "es";
      return buttonText + glue + "ansicht";
    },
    navLinkHint: "Gehe zu $0",
    moreLinkHint: function(eventCnt) {
      return "Zeige " + (eventCnt === 1 ? "ein weiteres Ereignis" : eventCnt + " weitere Ereignisse");
    },
    closeHint: "Schlie\xDFen",
    timeHint: "Uhrzeit",
    eventHint: "Ereignis"
  };

  return de;

}());
