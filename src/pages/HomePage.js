import React from 'react';
import AudienceForm from '../components/AudienceForm';
import './audienceForm.css'

const HomePage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to Mini CRM</h1>
      <AudienceForm />
    </div>
  );
};

export default HomePage;
