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
import { isMPORole } from '../utils/helper.util';

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
  const isMPO = !!isMPORole('roles');

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/ppq"
          element={<PPQLandingPage showMPOContents={isMPO} />}
        />
        <Route path="/ppq-form" element={<PPQFormPage />} />
        <Route path="/ppq-connect" element={<PPQConnectPage />} />
        <Route path="/pia-intake" element={<PIAIntakeFormPage />} />
        <Route path="/pia-result" element={<PIAIntakeResultsPage />} />
        <Route path="/pia-list" element={<PIAList />} />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
