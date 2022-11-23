import React from 'react';

export const AuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});
