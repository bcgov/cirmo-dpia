import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import './sass/App.scss';
import './sass/common.scss';
import NavBar from './components/common/Navbar';
import { NavPages as pages } from './components/common/Navbar/navPages';
import Router from './routes/router';
import { useLocation } from 'react-router-dom';

import { AuthContext } from './hooks/useAuth';
import { useState } from 'react';
import { isAuthenticated } from './utils/auth';
import AppActivityManager from './components/common/AppActivityManager';
function App() {
  const { pathname } = useLocation();
  const [authenticated, setAuthenticated] = useState<boolean>(
    isAuthenticated(),
  );

  return (
    <div className="App" data-color-mode="light">
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Header user="" />

        {pathname.startsWith('/') && !isAuthenticated() ? null : (
          <>
            <NavBar pages={pages} />
            <AppActivityManager />
          </>
        )}

        <Router />
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
