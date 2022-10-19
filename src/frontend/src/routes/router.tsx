import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashRouter } from 'react-router-dom';

import App from '../App';
import PPQResults from '../components/public/PPQResults';
import PPQFormPage from '../pages/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage';

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
    element: <PPQResults />,
  },
]);
export default router;
