// Authentication-related exports
export { cpoLogin, logout } from './auth/cpoAuth';
export { mpoLogin } from './auth/mpoAuth';
export { drafterLogin } from './auth/drafterAuth';

// Exported environment variables related to authentication
export {
  drafterUsername,
  drafterPassword,
  mpoUsername,
  mpoPassword,
  cpoUsername,
  cpoPassword,
} from './env/env';

// Export the 10-character UUID generator and UUID search function
export { generateUUID } from './uuid/uuid';
export { searchUUID } from './uuid/uuidSearch';
