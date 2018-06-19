define(function () {
  // Norwegian (Bokmål)
  return {
    errorLoading: function () {
      return 'Kunne ikke hente resultater.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      return 'Vennligst fjern ' + overChars + ' tegn';
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Vennligst skriv inn ' + remainingChars + ' tegn til';

      return message + ' tegn til';
    },
    loadingMore: function () {
      return 'Laster flere resultater…';
    },
    maximumSelected: function (args) {
      return 'Du kan velge maks ' + args.maximum + ' elementer';
    },
    noResults: function () {
      return 'Ingen treff';
    },
    searching: function () {
      return 'Søker…';
    }
  };
});
