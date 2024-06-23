export function getTimeAgo(dateTime) {
  const currentDate = new Date(2024, 5, 14); // Месяцы в JavaScript нумеруются с 0
  const timeSpan = currentDate - dateTime;

  const years = Math.floor(timeSpan / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((timeSpan % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  const days = Math.floor((timeSpan % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

  if (years > 0) {
    return `${ years } ${ getYearString(years) } назад`;
  }

  if (months > 0) {
    return `${ months } ${ getMonthString(months) } назад`;
  }

  return `${ days } ${ getDayString(days) } назад`;
}

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${ minutes }:${ remainingSeconds < 10 ? '0' : '' }${ remainingSeconds }`;
};

export const formatDate = (date) => {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${ day } ${ month } ${ year } года`;
};

function getYearString(years) {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod10 === 1 && mod100 !== 11) return 'год';
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'года';
  return 'лет';
}

function getMonthString(months) {
  const mod10 = months % 10;
  const mod100 = months % 100;

  if (mod10 === 1 && mod100 !== 11) return 'месяц';
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'месяца';
  return 'месяцев';
}

function getDayString(days) {
  const mod10 = days % 10;
  const mod100 = days % 100;

  if (mod10 === 1 && mod100 !== 11) return 'день';
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'дня';
  return 'дней';
}
