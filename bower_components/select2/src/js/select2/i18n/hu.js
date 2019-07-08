define(function () {
  // Hungarian
  return {
    errorLoading: function () {
      return 'Az eredmények betöltése nem sikerült.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      return 'Túl hosszú. ' + overChars + ' karakterrel több, mint kellene.';
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      return 'Túl rövid. Még ' + remainingChars + ' karakter hiányzik.';
    },
    loadingMore: function () {
      return 'Töltés…';
    },
    maximumSelected: function (args) {
      return 'Csak ' + args.maximum + ' elemet lehet kiválasztani.';
    },
    noResults: function () {
      return 'Nincs találat.';
    },
    searching: function () {
      return 'Keresés…';
    },
    removeAllItems: function () {
      return 'Távolítson el minden elemet';
    }
  };
});
