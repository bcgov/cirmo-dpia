import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PPQLandingPage from './pages/PPQPage';
import './sass/index.scss';
import './sass/common.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ppq" element={<PPQLandingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
