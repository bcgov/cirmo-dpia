import dotenv from 'dotenv';

// Load environment variables from the .env file in the current directory
dotenv.config();

// Retrieve the Drafter's IDIR username and password from environment variables
const drafterUsername = process.env.DRAFT_IDIR_USERNAME;
const drafterPassword = process.env.DRAFT_IDIR_PASSWORD;

// Retrieve the MPO's IDIR username and password from environment variables
const mpoUsername = process.env.MPO_IDIR_USERNAME;
const mpoPassword = process.env.MPO_IDIR_PASSWORD;

// Retrieve the CPO's IDIR username and password from environment variables
const cpoUsername = process.env.CPO_IDIR_USERNAME;
const cpoPassword = process.env.CPO_IDIR_PASSWORD;

// Export all the retrieved IDIR usernames and passwords for use in other modules
export {
  drafterUsername,
  drafterPassword,
  mpoUsername,
  mpoPassword,
  cpoUsername,
  cpoPassword,
};
