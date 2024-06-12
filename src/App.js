import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import Navbar from './pages/Navbar';
import './pages/Navbar.css';


const App = () => {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<GoogleSignIn />} />
          <Route path="/aud" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
