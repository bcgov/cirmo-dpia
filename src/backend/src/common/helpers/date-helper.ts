export const toPacific = (date = new Date(), options = {}) => {
  return new Date(date).toLocaleString('en', {
    timeZone: 'America/Vancouver',
    ...options,
  });
};

/**
 *
 * @param date | @type Date | @optional | @default current_date
 * @param options | @type Intl.DateTimeFormatOptions | @optional
 * @returns mm/dd/yyyy date string
 */
export const shortDate = (date = new Date(), options = {}) => {
  const year = toPacific(date, { year: 'numeric', ...options });

  const month = toPacific(date, {
    month: '2-digit',
    ...options,
  });
  const day = toPacific(date, {
    day: '2-digit',
    ...options,
  });
  return year + '/' + month + '/' + day;
};
