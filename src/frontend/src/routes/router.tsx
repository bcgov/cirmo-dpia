import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import PPQConnectPage from '../pages/PPQConnectPage';
import PPQFormPage from '../pages/PPQFormPage';
import PPQLandingPage from '../pages/PPQPage';
import PPQResultsPage from '../pages/PPQResultsPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/ppq" element={<PPQLandingPage />} />
      <Route path="/ppq-form" element={<PPQFormPage />} />
      <Route path="/ppq-results" element={<PPQResultsPage />} />
      <Route path="/ppq-connect" element={<PPQConnectPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
