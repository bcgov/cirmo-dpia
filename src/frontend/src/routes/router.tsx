import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PPQFormPage from '../pages/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage';

const router = createBrowserRouter([
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
]);
export default router;
