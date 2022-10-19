import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashRouter } from 'react-router-dom';

import App from '../App';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage';
import PPQResultsPage from '../pages/PPQResultsPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/ppq',
    element: <PPQLandingPage />,
  },
  {
    path: '/ppq-form',
    element: <PPQFormPage />,
  },
  {
    path: '/ppq-results',
    element: <PPQResultsPage />,
  },
  {
    path: '/ppq-connect',
    element: <PPQConnectPage />,
  },
]);
export default router;
