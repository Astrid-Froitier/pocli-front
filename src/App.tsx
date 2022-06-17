import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './components/About';
import Activities from './components/Activities';
import Animation from './components/Animation';
import Contact from './components/Contact';
import Events from './components/Events';
import Family from './components/Family';
// import AddressList from './components/AddressList';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Prevention from './components/Prevention';
import TestContext from './components/TestContext';
import { CurrentTestContextProvider } from './contexts/CurrentTest';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Router>
        {/* <main> */}
        <NavBar />
        <CurrentTestContextProvider>
          <Routes>
            {/* <Route path="*" element={<Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/click" element={<TestContext />} />
            {/* <Route path="/address" element={<AddressList onlyMine={id != 0} />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/family" element={<Family />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/prevention" element={<Prevention />} />
            <Route path="/animation" element={<Animation />} />
          </Routes>
        </CurrentTestContextProvider>
        <Footer />
        {/* </main> */}
      </Router>
    </div>
  );
}

export default App;
