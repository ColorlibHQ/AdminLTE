define(function () {
  // Georgian
  return {
    errorLoading: function () {
      return 'მონაცემების ჩატვირთვა შეუძლებელია.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'გთხოვთ აკრიფეთ ' + overChars + ' სიმბოლოთი ნაკლები';

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'გთხოვთ აკრიფეთ ' + remainingChars + ' სიმბოლო ან მეტი';

      return message;
    },
    loadingMore: function () {
      return 'მონაცემების ჩატვირთვა…';
    },
    maximumSelected: function (args) {
      var message = 'თქვენ შეგიძლიათ აირჩიოთ არაუმეტეს ' + args.maximum +
        ' ელემენტი';

      return message;
    },
    noResults: function () {
      return 'რეზულტატი არ მოიძებნა';
    },
    searching: function () {
      return 'ძიება…';
    },
    removeAllItems: function () {
      return 'ამოიღე ყველა ელემენტი';
    }
  };
});
