FullCalendar.globalLocales.push(function () {
  'use strict';

  var ja = {
    code: 'ja',
    buttonText: {
      prev: '前',
      next: '次',
      today: '今日',
      month: '月',
      week: '週',
      day: '日',
      list: '予定リスト',
    },
    weekText: '週',
    allDayText: '終日',
    moreLinkText(n) {
      return '他 ' + n + ' 件'
    },
    noEventsText: '表示する予定はありません',
  };

  return ja;

}());
