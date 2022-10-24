export const toPacific = (date = new Date(), options = {}) => {
  return new Date(date).toLocaleString('en', {
    timeZone: 'America/Vancouver',
    ...options,
  });
};

export const shortDate = (date = new Date(), options = {}) => {
  return toPacific(date, { dateStyle: 'short', ...options });
};
