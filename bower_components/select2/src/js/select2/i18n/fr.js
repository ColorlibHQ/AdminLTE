define(function () {
  // French
  return {
    errorLoading: function () {
      return 'Les résultats ne peuvent pas être chargés.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      return 'Supprimez ' + overChars + ' caractère' +
        ((overChars > 1) ? 's' : '');
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      return 'Saisissez au moins ' + remainingChars + ' caractère' +
        ((remainingChars > 1) ? 's' : '');
    },
    loadingMore: function () {
      return 'Chargement de résultats supplémentaires…';
    },
    maximumSelected: function (args) {
      return 'Vous pouvez seulement sélectionner ' + args.maximum +
        ' élément' + ((args.maximum > 1) ? 's' : '');
    },
    noResults: function () {
      return 'Aucun résultat trouvé';
    },
    searching: function () {
      return 'Recherche en cours…';
    },
    removeAllItems: function () {
      return 'Supprimer tous les articles';
    }
  };
});
