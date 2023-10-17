import React from 'react';

export const AuthContext = React.createContext({
  authenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthenticated: (auth: boolean) => {},
});
