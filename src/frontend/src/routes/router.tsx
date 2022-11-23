import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage/LandingPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import { getConfigFlagFromStorageByName } from '../utils/helper.util';

const Router = () => {
  // will give default value to false if we do not get from the config file due to any technical issue
  // or network issue
  const PIAIntakeFlag = !!getConfigFlagFromStorageByName(
    'PIA_INTAKE_FORM_FLAG',
  );
  return (
    <Routes>
      <Route
        path="/ppq"
        element={<PPQLandingPage enablePiaIntakeForm={PIAIntakeFlag} />}
      />
      <Route path="/ppq-form" element={<PPQFormPage />} />
      <Route path="/ppq-connect" element={<PPQConnectPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
