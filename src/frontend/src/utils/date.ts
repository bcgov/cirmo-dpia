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
