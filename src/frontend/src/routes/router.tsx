import { Children, useContext, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import NotFound from '../components/common/NotFound';
import Unauthorized from '../components/common/Unauthorized';

import LandingPage from '../pages/LandingPage/LandingPage';
import PIADetailPage from '../pages/PIADetailPage';
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
  const isMPO = !!isMPORole();

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/ppq"
          element={<PPQLandingPage showMPOContents={isMPO} />}
        />
        <Route path="/ppq-form" element={<PPQFormPage />} />
        <Route path="/ppq-connect" element={<PPQConnectPage />} />
        <Route path="/pia" element={<Outlet />}>
          <Route index element={<Navigate relative="path" to="list" />} />
          <Route path="list" element={<PIAList />} />
          <Route path="result" element={<PIAIntakeResultsPage />} />
          <Route path="new" element={<PIAIntakeFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />
            <Route path="intake" element={<PIAIntakeFormPage />} />
            {/* Placeholder for other tabs */}
          </Route>
          <Route path=":id" element={<PIAIntakeFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />
            <Route path="intake">
              <Route path="" element={<PIADetailPage />} />
              <Route path="edit" element={<PIAIntakeFormPage />} />
            </Route>
            {/* Placeholder for other tabs */}
          </Route>
        </Route>
        <Route path="/pia-intake/:id/edit" element={<PIAIntakeFormPage />} />
        <Route path="/pia-intake" element={<PIAIntakeFormPage />} />
        <Route path="/pia-result" element={<PIAIntakeResultsPage />} />
        <Route path="/pia-list" element={<PIAList />} />
        <Route path="/pia-list/*" element={<PIAList />} />
        <Route path="/pia/intake/:id/:title" element={<PIADetailPage />} />
      </Route>
      <Route path="/not-authorized" element={<Unauthorized />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
