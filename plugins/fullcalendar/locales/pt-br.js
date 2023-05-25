FullCalendar.globalLocales.push(function () {
  'use strict';

  var ptBr = {
    code: "pt-br",
    buttonText: {
      prev: "Anterior",
      next: "Pr\xF3ximo",
      today: "Hoje",
      month: "M\xEAs",
      week: "Semana",
      day: "Dia",
      list: "Lista"
    },
    weekText: "Sm",
    allDayText: "dia inteiro",
    moreLinkText: function(n) {
      return "mais +" + n;
    },
    noEventsText: "N\xE3o h\xE1 eventos para mostrar"
  };

  return ptBr;

}());
