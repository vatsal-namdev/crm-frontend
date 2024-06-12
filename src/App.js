import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaigns" element={<CampaignPage />} />
      </Routes>
    </Router>
  );
}

export default App;
