export const dateToString = (date = new Date(), options = {}) => {
  const year = new Date(date).toLocaleString('en', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
    ...options,
  });
  const month = new Date(date).toLocaleString('en', {
    timeZone: 'America/Vancouver',
    month: '2-digit',
    ...options,
  });
  const day = new Date(date).toLocaleString('en', {
    timeZone: 'America/Vancouver',
    day: '2-digit',
    ...options,
  });
  return year + '/' + month + '/' + day;
};

export const getShortTime = (date = new Date()) => {
  return new Date(date).toLocaleTimeString('en', { timeStyle: 'short' });
};

export const stringToDate = (date: string) => {
  return new Date(date);
};

const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).\d{3}Z$/;

export const formatDate = (dateString: string) => {
  const match = dateString.match(dateRegex);
  if (!match) {
    throw new Error('Invalid date string');
  }
  const year = match[1];
  const month = match[2];
  const day = match[3];
  const hour = parseInt(match[4], 10);
  const minute = match[5];
  const offset = match[6];
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 || 12;
  const utcDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00.000Z`);
  const localDate = new Date(
    utcDate.getTime() + (parseInt(offset, 10) / 60) * 60 * 1000,
  );
  return `${localDate.getFullYear()}/${formatNumber(
    localDate.getMonth() + 1,
  )}/${formatNumber(localDate.getDate())} ${formattedHour}:${formatNumber(
    localDate.getMinutes(),
  )} ${period}`;
};
