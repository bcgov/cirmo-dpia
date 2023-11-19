// For generating a unique identifier
// Not as strong as a UUID, but will work for most cases.
export const generateUID = (): string => {
  const timestamp = new Date().getTime(); // Current time in milliseconds
  const randomPart = Math.random().toString(36).substring(2, 15); // Random string
  return `${timestamp}-${randomPart}`;
};
