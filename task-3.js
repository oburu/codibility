console.log(getHolidayWeeks(2014, 'April', 'May', 'Wednesday')); // should return weeks: 7
console.log(getHolidayWeeks(2001, 'April', 'May', 'Monday')); // should return weeks: 8
console.log(getHolidayWeeks(2023, 'July', 'September', 'Sunday')); // should return weeks: 12

function getHolidayWeeks(y, a, b, w) {
  if (!y) {
    return 'Year is missing';
  }

  if (y < 2001 || y > 2099) {
    return 'Year is out of range';
  }

  if (!a) {
    return 'Start month is missing';
  }

  if (!b) {
    return 'End month is missing';
  }

  if (!w) {
    return '1st of january day is missing';
  }

  const calendar = createCalendar({ firstDayOfYear: w, year: y }); // Create calendar for the given year
  const { firstMonday, lastSunday } = getRange({
    calendar,
    start: a,
    end: b,
  });
  const weeks = Math.ceil((lastSunday.index - firstMonday.index) / 7);

  return { firstMonday, lastSunday, weeks };
}

function getRange({ calendar, start, end }) {
  return {
    firstMonday: calendar.find(
      (item) => item.month === start && item.name === 'Monday'
    ),
    lastSunday: calendar.findLast(
      (item) => item.month === end && item.name === 'Sunday'
    ),
  };
}

function createCalendar({ firstDayOfYear, year }) {
  const months = [
    { name: 'January', length: 31 },
    { name: 'February', length: calcualteLeapYear(year) },
    { name: 'March', length: 31 },
    { name: 'April', length: 30 },
    { name: 'May', length: 31 },
    { name: 'June', length: 30 },
    { name: 'July', length: 31 },
    { name: 'August', length: 31 },
    { name: 'September', length: 30 },
    { name: 'October', length: 31 },
    { name: 'November', length: 30 },
    { name: 'December', length: 31 },
  ];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const calendar = [];
  let dayIndex = days.indexOf(firstDayOfYear);
  let daysCount = 1;

  for (const month of months) {
    for (let i = 1; i <= month.length; i++) {
      calendar.push({
        index: daysCount,
        day: i,
        name: days[dayIndex],
        month: month.name,
        year,
      });

      dayIndex = dayIndex === 6 ? 0 : dayIndex + 1;
      daysCount++;
    }
  }

  return calendar;
}

function calcualteLeapYear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0 ? 29 : 28;
}
