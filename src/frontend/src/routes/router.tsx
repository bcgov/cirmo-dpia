import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import LandingPage from '../pages/LandingPage/LandingPage';
import PIAIntakeFormPage from '../pages/PIAIntakeForm/PIAIntakeFormPage';
import PIAIntakeResultsPage from '../pages/PIAIntakeResultsPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import { isAuthenticated } from '../utils/auth';
import { getConfigFlagFromStorageByName } from '../utils/helper.util';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

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
      <Route path="/pia-intake" element={<PIAIntakeFormPage />} />
      <Route path="/pia-result" element={<PIAIntakeResultsPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
