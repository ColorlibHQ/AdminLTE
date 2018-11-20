define(function () {
  // Galician
  return {
    errorLoading: function () {
      return 'Non foi posíbel cargar os resultados.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      if (overChars === 1) {
        return 'Elimine un carácter';
      }
      return 'Elimine ' + overChars + ' caracteres';
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      if (remainingChars === 1) {
        return 'Engada un carácter';
      }
      return 'Engada ' + remainingChars + ' caracteres';
    },
    loadingMore: function () {
      return 'Cargando máis resultados…';
    },
    maximumSelected: function (args) {
      if (args.maximum === 1) {
        return 'Só pode seleccionar un elemento';
      }
      return 'Só pode seleccionar ' + args.maximum + ' elementos';
    },
    noResults: function () {
      return 'Non se atoparon resultados';
    },
    searching: function () {
      return 'Buscando…';
    }
  };
});