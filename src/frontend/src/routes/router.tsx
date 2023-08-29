import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import NotFound from '../components/common/NotFound';
import Unauthorized from '../components/common/Unauthorized';
import { PIAFormIntake } from '../components/public/PIAFormTabs/intake';
import { PIANextSteps } from '../components/public/PIAFormTabs/Next_Steps';

import LandingPage from '../pages/LandingPage/LandingPage';
import PIAFormPage from '../pages/PIAForm';
import PIAIntakeResultsPage from '../pages/PIAIntakeResultsPage';
import PIAActiveList from '../pages/PIAActiveListPage';
import PIACompletedList from '../pages/PIACompletedList';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import StoringPersonalInformation from '../components/public/PIAFormTabs/storingPersonalInformation';
import { isAuthenticated } from '../utils/auth';
import { isMPORole } from '../utils/helper.util';
import PIAAgreementsAndInformationBanks from '../components/public/PIAFormTabs/agreementsAndInformationBanks';
import PIACollectionUseAndDisclosure from '../components/public/PIAFormTabs/collectionUseAndDisclosure';
import { SecurityPersonalInformation } from '../components/public/PIAFormTabs/securityPersonalInformation';
import { AccuracyCorrectionAndRetention } from '../components/public/PIAFormTabs/accuracyRetention';
import PIAAdditionalRisks from '../components/public/PIAFormTabs/additionalRisks';
import { PiaFormPrintPreview } from '../pages/PiaFormPrintPreview';
import PPQ from '../components/public/PIAFormTabs/ppq';
import { routes } from '../constant/routes';
import PIAReview from '../components/public/PIAFormTabs/review';

export const ProtectedRoute = () => {
  const location = useLocation();
  const auth = isAuthenticated();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={routes.NOT_AUTHORIZED} replace state={{ from: location }} />
  );
};

const Router = () => {
  const isMPO = !!isMPORole();
  const hideViewComments = false;

  // const comingSoonBanner = (
  //   <div className="container w-100">
  //     <div className="row justify-content-center align-items-center">
  //       <h1 className="text-center">Coming Soon...</h1>
  //     </div>
  //   </div>
  // );

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

          <Route path="list" element={<PIAActiveList />} />
          <Route path="completed" element={<PIACompletedList />} />
          <Route path="result" element={<PIAIntakeResultsPage />} />

          <Route path="new" element={<PIAFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />
            <Route path="intake" element={<PIAFormIntake />} />
          </Route>

          <Route path=":id/preview" element={<PiaFormPrintPreview />} />

          <Route path=":id" element={<PIAFormPage />}>
            <Route index element={<Navigate relative="path" to="intake" />} />

            <Route path="intake">
              <Route index element={<Navigate relative="path" to="view" />} />
              {/* update above default to view once the PIA intake view component is built */}
              <Route path="edit" element={<PIAFormIntake />} />
              <Route path="view" element={<PIAFormIntake />} />
            </Route>

            <Route path="nextSteps">
              <Route index element={<Navigate relative="path" to="edit" />} />
              {/* update above default to view once the PIA intake view component is built */}
              <Route path="edit" element={<PIANextSteps />} />
            </Route>

            <Route path="collectionUseAndDisclosure">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <PIACollectionUseAndDisclosure
                    hideViewComments={hideViewComments}
                  />
                }
              />
              <Route
                path="view"
                element={
                  <PIACollectionUseAndDisclosure
                    hideViewComments={hideViewComments}
                  />
                }
              />
            </Route>

            <Route
              path="storingPersonalInformation"
              element={
                <StoringPersonalInformation
                  hideViewComments={hideViewComments}
                />
              }
            >
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <StoringPersonalInformation
                    hideViewComments={hideViewComments}
                  />
                }
              />
              <Route
                path="view"
                element={
                  <StoringPersonalInformation
                    hideViewComments={hideViewComments}
                  />
                }
              />
            </Route>

            <Route path="securityOfPersonalInformation">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <SecurityPersonalInformation
                    hideViewComments={hideViewComments}
                  />
                }
              />
              <Route
                path="view"
                element={
                  <SecurityPersonalInformation
                    hideViewComments={hideViewComments}
                  />
                }
              />
            </Route>

            <Route path="accuracyCorrectionAndRetention">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <AccuracyCorrectionAndRetention
                    hideViewComments={hideViewComments}
                  />
                }
              />
              <Route
                path="view"
                element={
                  <AccuracyCorrectionAndRetention
                    hideViewComments={hideViewComments}
                  />
                }
              />
            </Route>

            <Route path="agreementsAndInformationBanks">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <PIAAgreementsAndInformationBanks
                    hideViewComments={hideViewComments}
                  />
                }
              />
              <Route
                path="view"
                element={
                  <PIAAgreementsAndInformationBanks
                    hideViewComments={hideViewComments}
                  />
                }
              />
            </Route>

            <Route path="additionalRisks">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route
                path="edit"
                element={
                  <PIAAdditionalRisks hideViewComments={hideViewComments} />
                }
              />
              <Route
                path="view"
                element={
                  <PIAAdditionalRisks hideViewComments={hideViewComments} />
                }
              />
            </Route>
            <Route path="ppq">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="edit" element={<PPQ />} />
              <Route path="view" element={<PPQ />} />
            </Route>
            <Route path="review">
              <Route index element={<Navigate relative="path" to="view" />} />
              <Route path="view" element={<PIAReview />} />
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
