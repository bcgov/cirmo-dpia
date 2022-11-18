import React from 'react';

export const ConfigContext = React.createContext({
  setConfig: (config: JSON) => {},
});
