define(function () {
  // Turkmen
  return {
    errorLoading: function (){
      return 'Netije ýüklenmedi.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = overChars + ' harp bozuň.';

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Ýene-de iň az ' + remainingChars + ' harp ýazyň.';

      return message;
    },
    loadingMore: function () {
      return 'Köpräk netije görkezilýär…';
    },
    maximumSelected: function (args) {
      var message = 'Diňe ' + args.maximum + ' sanysyny saýlaň.';

      return message;
    },
    noResults: function () {
      return 'Netije tapylmady.';
    },
    searching: function () {
      return 'Gözlenýär…';
    },
    removeAllItems: function () {
      // TO DO : add in turkmen,
      return 'Remove all items';
    }
  };
});
