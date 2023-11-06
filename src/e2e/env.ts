import dotenv from 'dotenv';

dotenv.config();

const draftUsername = process.env.DRAFT_IDIR_USERNAME;
const draftPassword = process.env.DRAFT_IDIR_PASSWORD;

const mpoUsername = process.env.MPO_IDIR_USERNAME;
const mpoPassword = process.env.MPO_IDIR_PASSWORD;

const cpoUsername = process.env.CPO_IDIR_USERNAME;
const cpoPassword = process.env.CPO_IDIR_PASSWORD;

export {
  draftUsername,
  draftPassword,
  mpoUsername,
  mpoPassword,
  cpoUsername,
  cpoPassword,
};
