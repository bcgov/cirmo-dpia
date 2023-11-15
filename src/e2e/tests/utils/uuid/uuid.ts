// Function to generate a random UUID (10 characters long)
const generateUUID = (): string => {
  // Define the set of characters that can be used in the UUID
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  // Generate a 10-character UUID by randomly selecting characters
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Return the generated UUID
  return result;
};

// Export the generateUUID function to make it accessible in other modules
export { generateUUID };
