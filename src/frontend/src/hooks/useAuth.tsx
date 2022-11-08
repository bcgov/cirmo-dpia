import React, { useContext, useState } from 'react';
import { getItemFromStorage } from '../utils/helper.util';

export const AuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});
