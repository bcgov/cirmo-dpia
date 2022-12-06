import { Children, useContext, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import NotFound from '../components/common/NotFound';

import LandingPage from '../pages/LandingPage/LandingPage';
import PIAIntakeFormPage from '../pages/PIAIntakeForm';
import PIAIntakeResultsPage from '../pages/PIAIntakeResultsPage';
import PIAList from '../pages/PIAListPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import { isAuthenticated } from '../utils/auth';
import { getConfigFlagFromStorageByName } from '../utils/helper.util';

export const ProtectedRoute = () => {
  const location = useLocation();
  const auth = isAuthenticated();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

const Router = () => {
  // will give default value to false if we do not get from the config file due to any technical issue
  // or network issue
  const PIAIntakeFlag = !!getConfigFlagFromStorageByName(
    'PIA_INTAKE_FORM_FLAG',
  );
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>

        <Route
          path="/ppq"
          element={<PPQLandingPage enablePiaIntakeForm={PIAIntakeFlag} />}
        />
        <Route path="/ppq-form" element={<PPQFormPage />} />
        <Route path="/ppq-connect" element={<PPQConnectPage />} />
        <Route path="/pia-intake" element={<PIAIntakeFormPage />} />
        <Route path="/pia-result" element={<PIAIntakeResultsPage />} />
        <Route path="/pia-list" element={<PIAList />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<div>Page Not found</div>} />

    </Routes>
  );
};

export default Router;
