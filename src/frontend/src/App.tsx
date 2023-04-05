import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import './sass/App.scss';
import './sass/common.scss';
import NavBar from './components/common/Navbar';
import { NavPages as pages } from './components/common/Navbar/navPages';
import Router from './routes/router';
import { useLocation } from 'react-router-dom';

import { AuthContext } from './hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { isAuthenticated } from './utils/auth';
import AppActivityManager from './components/common/AppActivityManager';
function App() {
  const { pathname } = useLocation();
  const [authenticated, setAuthenticated] = useState<boolean>(
    isAuthenticated(),
  );

  const mainContentRef = useRef<HTMLDivElement>(null); // Create a reference for the main content container
  const skipToContentRef = useRef<HTMLButtonElement>(null);
  const skipToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  };

  useEffect(() => {
    if (skipToContentRef.current) {
      skipToContentRef.current.focus(); // Set focus to the main content container when the route changes
    }
  }, [pathname]);
  return (
    <div className="App" data-color-mode="light">
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <div>
          <button
            onClick={skipToContent}
            ref={skipToContentRef}
            tabIndex={0}
            className="skip-to-main"
          >
            Skip to main content
          </button>
        </div>
        <Header user="" />

        {pathname.startsWith('/') && !isAuthenticated() ? null : (
          <>
            <NavBar pages={pages} CSSclass="navbar-container wrapper" />
            <AppActivityManager />
          </>
        )}
        <div id="main-content" ref={mainContentRef} tabIndex={-1}>
          <Router />
        </div>
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
