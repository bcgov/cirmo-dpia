import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import './sass/App.scss';
import './sass/common.scss';
import NavBar from './components/common/Navbar';
import { NavPages as pages } from './components/common/Navbar/navPages';
import Router from './routes/router';

function App() {
  return (
    <div className="App">
      <Header user="" />
      <NavBar pages={pages} />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
