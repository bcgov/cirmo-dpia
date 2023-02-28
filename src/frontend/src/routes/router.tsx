import { Children, useContext, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import NotFound from '../components/common/NotFound';
import Unauthorized from '../components/common/Unauthorized';
import { PIAFormIntake } from '../components/public/PIAFormTabs/intake';
import { AccuracyCorrectionAndRetention } from '../components/public/PIAFormTabs/Accuracy_Retention';
import PIAAdditionalRisks from '../components/public/PIAFormTabs/PIAAdditionalRisks';

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

  const comingSoonBanner = (
    <div className="container w-100">
      <div className="row justify-content-center align-items-center">
        <h1 className="text-center">Coming Soon...</h1>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        {/* PPQ related routes */}
        <Route
          path="/ppq"
          element={<PPQLandingPage showMPOContents={isMPO} />}
        />
        <Route path="/ppq-form" element={<PPQFormPage />} />
        <Route path="/ppq-connect" element={<PPQConnectPage />} />

        {/* PIA related routes */}
        <Route path="/pia" element={<Outlet />}>
          <Route index element={<Navigate relative="path" to="list" />} />

          <Route path="list" element={<PIAList />} />
          <Route path="result" element={<PIAIntakeResultsPage />} />

          <Route path="new" element={<PIAIntakeFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />
            <Route path="intake" element={<PIAFormIntake />} />
          </Route>

          <Route path=":id/view/:title" element={<PIADetailPage />} />
          {/* Replace the above path with proper view nested component once developed */}

          <Route path=":id" element={<PIAIntakeFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />

            <Route path="intake">
              <Route index element={<Navigate relative="path" to="edit" />} />
              {/* update above default to view once the PIA intake view component is built */}
              <Route path="edit" element={<PIAFormIntake />} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="collectionUseAndDisclosure">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={comingSoonBanner} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="storingPersonalInformation">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={comingSoonBanner} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="securityOfPersonalInformation">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={comingSoonBanner} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="accuracyCorrectionAndRetention">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={<AccuracyCorrectionAndRetention />} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="personalInformationBank">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={comingSoonBanner} />
              <Route path="view" element={comingSoonBanner} />
            </Route>

            <Route path="additionalRisks">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={<PIAAdditionalRisks />} />
              <Route path="view" element={comingSoonBanner} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="/not-authorized" element={<Unauthorized />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
