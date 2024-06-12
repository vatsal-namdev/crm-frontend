import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import Navbar from './pages/Navbar';
import './pages/Navbar.css';

const App = () => {
  const location = useLocation();

  // Determine if the current path matches /aud or /campaigns
  const showNavbar = location.pathname === '/aud' || location.pathname === '/campaigns';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<GoogleSignIn />} />
        <Route path="/aud" element={<HomePage />} />
        <Route path="/campaigns" element={<CampaignPage />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
