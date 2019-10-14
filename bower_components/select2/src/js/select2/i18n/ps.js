/* jslint maxlen: 87 */
define(function () {
  // Pashto (پښتو)
  return {
    errorLoading: function () {
      return 'پايلي نه سي ترلاسه کېدای';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'د مهربانۍ لمخي ' + overChars + ' توری ړنګ کړئ';

      if (overChars != 1) {
        message = message.replace('توری', 'توري');
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'لږ تر لږه ' + remainingChars + ' يا ډېر توري وليکئ';

      return message;
    },
    loadingMore: function () {
      return 'نوري پايلي ترلاسه کيږي...';
    },
    maximumSelected: function (args) {
      var message = 'تاسو يوازي ' + args.maximum + ' قلم په نښه کولای سی';

      if (args.maximum != 1) {
        message = message.replace('قلم', 'قلمونه');
      }

      return message;
    },
    noResults: function () {
      return 'پايلي و نه موندل سوې';
    },
    searching: function () {
      return 'لټول کيږي...';
    },
    removeAllItems: function () {
      return 'ټول توکي لرې کړئ';
    }
  };
});
