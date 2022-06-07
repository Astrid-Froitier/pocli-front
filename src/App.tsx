import './App.scss';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressList';
import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import Contact from './components/Contact';
import Login from './components/Login';
import Family from './components/Family';
import Activities from './components/Activities';
import Prevention from './components/Prevention';
import Animation from './components/Animation';
import TestContext from './components/TestContext';
import { CurrentTestContextProvider } from './contexts/CurrentTest';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { id, logout, admin } = useContext(CurrentUserContext);

  return (
    <div className="App">
      <Router>
        <nav>
          <div>
            <Link to="/">Home</Link>
            <Link to="/about">Qui sommes nous ?</Link>
            <Link to="/events">Évènements</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/address">Adresses</Link>
            <Link to="/click">Click</Link>
            {admin === true && <a href="http://localhost:3001/">Admin panel</a>}
            {id === 0 ? (
              <Link to="/login">Se connecter</Link>
            ) : (
              <button className="logout" onClick={() => logout()}>
                Se déconnecter
              </button>
            )}
          </div>
          <div>
            <Link to="/family">Famille et parentalité</Link>
            <Link to="/activities">Activités sportives et Bien-être</Link>
            <Link to="/prevention">Prévention - Action Sociale</Link>
            <Link to="/animation">Animation locale</Link>
          </div>
        </nav>
        <main>
          <CurrentTestContextProvider>
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/click" element={<TestContext />} />
              <Route path="/address" element={<AddressList onlyMine={id != 0} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/family" element={<Family />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/prevention" element={<Prevention />} />
              <Route path="/animation" element={<Animation />} />
            </Routes>
          </CurrentTestContextProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;
