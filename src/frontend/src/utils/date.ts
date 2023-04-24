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
  // Parse the input datetime string into a Date object
  const inputDate = new Date(dateString);

  // Create a new Date object with the current local time
  const currentDate = new Date();

  // Calculate the local timezone offset in minutes
  const localOffset = currentDate.getTimezoneOffset() * 60 * 1000;

  // Vancouver is in the Pacific Time Zone (PT), which is -7 hours or -8 hours from UTC
  // depending on daylight saving time (DST)
  const standardOffset = -8 * 60 * 60 * 1000;
  const DSTOffset = -7 * 60 * 60 * 1000;

  // Get the current year to check for daylight saving time in Vancouver
  const currentYear = currentDate.getFullYear();

  // Vancouver's daylight saving time starts on the second Sunday in March at 2 AM
  const dstStart = new Date(
    currentYear,
    2,
    14 - (new Date(currentYear, 2, 1).getDay() || 7) + 1,
    2,
  );
  // and ends on the first Sunday in November at 2 AM
  const dstEnd = new Date(
    currentYear,
    10,
    7 - (new Date(currentYear, 10, 1).getDay() || 7) + 1,
    2,
  );

  // Determine if the current local time is within Vancouver's daylight saving time
  const isDST = currentDate >= dstStart && currentDate < dstEnd;

  // Calculate the Vancouver timezone offset based on daylight saving time
  const calculatedOffset = isDST ? DSTOffset : standardOffset;

  // Calculate the Vancouver local time by applying the offsets
  const localDate = new Date(
    inputDate.getTime() - calculatedOffset - localOffset,
  );

  // Format the Vancouver local time as the desired string format
  const hour = localDate.getHours();
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 || 12;
  return ` ${dateToString(inputDate)} ${formattedHour}:${formatNumber(
    localDate.getMinutes(),
  )} ${period}`;
};
