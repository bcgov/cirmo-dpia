const timeZone = 'America/Vancouver';

export const dateToString = (date = new Date(), options = {}) => {
  const year = new Date(date).toLocaleString('en', {
    timeZone,
    year: 'numeric',
    ...options,
  });
  const month = new Date(date).toLocaleString('en', {
    timeZone,
    month: '2-digit',
    ...options,
  });
  const day = new Date(date).toLocaleString('en', {
    timeZone,
    day: '2-digit',
    ...options,
  });
  return year + '/' + month + '/' + day;
};

export const getShortTime = (date = new Date()) => {
  return new Date(date).toLocaleTimeString('en', {
    timeZone,
    timeStyle: 'short',
  });
};

export const getDateTime = (date = new Date()) => {
  return `${dateToString(date)} ${getShortTime(date)}`;
};

export const stringToDate = (date: string) => {
  return new Date(date);
};
