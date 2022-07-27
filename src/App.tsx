import './App.scss';

import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './components/About';
import Activities from './components/Activities';
import AdherentSpace from './components/AdherentSpace';
import Animation from './components/Animation';
import Contact from './components/Contact';
import Documents from './components/Documents';
import Events from './components/Events';
import Family from './components/Family';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Messaging from './components/Messaging';
import MyEvents from './components/MyEvents';
import NavBar from './components/NavBar';
import NavBarMobile from './components/NavBarMobile';
import PoliticConf from './components/PoliticConf';
import PoliticCookies from './components/PoliticCookies';
import Prevention from './components/Prevention';
import CurrentUserContext from './contexts/CurrentUser';

function App() {
  const { user } = useContext(CurrentUserContext);
  return (
    <div className="app">
      <Router>
        {/* <main> */}
        <NavBar />
        <NavBarMobile />
        <Routes>
          {/* <Route path="*" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/address" element={<AddressList onlyMine={id != 0} />} /> */}
          {user && user.id > 0 && (
            <>
              <Route path="/adherent-space" element={<AdherentSpace />} />
              <Route path="/my-messaging" element={<Messaging />} />
              <Route path="/my-documents" element={<Documents />} />
              <Route path="/my-events" element={<MyEvents />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/family" element={<Family />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/prevention" element={<Prevention />} />
          <Route path="/animation" element={<Animation />} />
          <Route path="/politicconf" element={<PoliticConf />} />
          <Route path="/politiccookies" element={<PoliticCookies />} />
        </Routes>
        {/* </main> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
