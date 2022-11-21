import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage/LandingPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import {
  getItemFromStorage,
  getPIAIntakeFormFlagFromStorage,
} from '../utils/helper.util';

const Router = () => {
  return (
    <Routes>
      <Route path="/ppq" element={<PPQLandingPage />} />
      <Route
        path="/ppq-form"
        element={
          getItemFromStorage('config') &&
          getPIAIntakeFormFlagFromStorage() === true ? (
            <PPQFormPage />
          ) : (
            <PPQFormPage />
          )
        }
      />
      <Route path="/ppq-connect" element={<PPQConnectPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
