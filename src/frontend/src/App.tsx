import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import './sass/App.scss';
import './sass/common.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
