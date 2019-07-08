define(function () {
  // Slovene
  return {
    errorLoading: function () {
      return 'Zadetkov iskanja ni bilo mogoče naložiti.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Prosim zbrišite ' + overChars + ' znak';

      if (overChars == 2) {
        message += 'a';
      } else if (overChars != 1) {
        message += 'e';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Prosim vpišite še ' + remainingChars + ' znak';

      if (remainingChars == 2) {
        message += 'a';
      } else if (remainingChars != 1) {
        message += 'e';
      }

      return message;
    },
    loadingMore: function () {
      return 'Nalagam več zadetkov…';
    },
    maximumSelected: function (args) {
      var message = 'Označite lahko največ ' + args.maximum + ' predmet';

      if (args.maximum == 2) {
        message += 'a';
      } else if (args.maximum != 1) {
        message += 'e';
      }

      return message;
    },
    noResults: function () {
      return 'Ni zadetkov.';
    },
    searching: function () {
      return 'Iščem…';
    },
    removeAllItems: function () {
      return 'Odstranite vse elemente';
    }
  };
});
