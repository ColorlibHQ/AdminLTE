define(function () {
  // Lower Sorbian
  var charsWords = ['znamuško', 'znamušce', 'znamuška','znamuškow'];
  var itemsWords = ['zapisk', 'zapiska', 'zapiski','zapiskow'];

  var pluralWord = function pluralWord(numberOfChars, words) {
    if (numberOfChars === 1) {
        return words[0];
    } else if (numberOfChars === 2) {
      return words[1];
    }  else if (numberOfChars > 2 && numberOfChars <= 4) {
      return words[2];
    } else if (numberOfChars >= 5) {
      return words[3];
    }
  };
  
  return {
    errorLoading: function () {
      return 'Wuslědki njejsu se dali zacytaś.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      return 'Pšosym lašuj ' + overChars + ' ' + 
        pluralWord(overChars, charsWords);
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;
      
      return 'Pšosym zapódaj nanejmjenjej ' + remainingChars + ' ' +
        pluralWord(remainingChars, charsWords);
    },
    loadingMore: function () {
      return 'Dalšne wuslědki se zacytaju…';
    },
    maximumSelected: function (args) {
      return 'Móžoš jano ' + args.maximum + ' ' +
        pluralWord(args.maximum, itemsWords) + 'wubraś.';
    },
    noResults: function () {
      return 'Žedne wuslědki namakane';
    },
    searching: function () {
      return 'Pyta se…';
    },
    removeAllItems: function () {
      // To DO : in Lower Sorbian.
      return 'Remove all items';
    }
  };
});
