import { Children, useContext, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '../components/common/Layout/Layout';
import { AuthContext } from '../hooks/useAuth';

import LandingPage from '../pages/LandingPage/LandingPage';
import PIAIntakeFormPage from '../pages/PIAIntakeForm';
import PIAIntakeResultsPage from '../pages/PIAIntakeResultsPage';
import PIAList from '../pages/PIAListPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage/PPQPage';
import { getConfigFlagFromStorageByName } from '../utils/helper.util';


interface IComponentProps {
  isLoggedIn: boolean;
}
export const ProtectedRoute = () => {
  const location = useLocation();
  const auth = getItemFromStorage('access_token');
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};


const Router = (props: IComponentProps) => {
  // will give default value to false if we do not get from the config file due to any technical issue
  // or network issue
  const PIAIntakeFlag = !!getConfigFlagFromStorageByName(
    'PIA_INTAKE_FORM_FLAG',
  );
  console.log('render router', props.isLoggedIn);
  return (
    <Routes>

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
