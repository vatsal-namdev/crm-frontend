import React from 'react';
import './GoogleSignIn.css';

const GoogleSignIn = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div className="google-signin-container">
      <div className="google-signin-card">
        <h1>Welcome to Mini CRM</h1>
        <p>Please sign in with Google to continue</p>
        <button onClick={handleLogin} className="google-signin-button">
          <img src="./google-icon.svg" alt="Google icon" className="google-icon" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleSignIn;
