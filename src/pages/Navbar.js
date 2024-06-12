import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const handleLogout = () => {
        window.location.href = 'http://localhost:3001/logout';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/aud" className="navbar-logo">
          Mini CRM
        </Link>
        <div className="navbar-menu">
          <Link to="/campaigns" className="navbar-item">Campaigns</Link>
          <button className="navbar-item" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
