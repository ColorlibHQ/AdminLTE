FullCalendar.globalLocales.push(function () {
  'use strict';

  var vi = {
    code: 'vi',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
    buttonText: {
      prev: 'Trước',
      next: 'Tiếp',
      today: 'Hôm nay',
      month: 'Tháng',
      week: 'Tuần',
      day: 'Ngày',
      list: 'Lịch biểu',
    },
    weekText: 'Tu',
    allDayText: 'Cả ngày',
    moreLinkText(n) {
      return '+ thêm ' + n
    },
    noEventsText: 'Không có sự kiện để hiển thị',
  };

  return vi;

}());
