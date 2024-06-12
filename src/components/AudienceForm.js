import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = () => {
  const [totalSpends, setTotalSpends] = useState('');
  const [maxVisits, setMaxVisits] = useState('');
  const [lastVisit, setLastVisit] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);
  const [rules, setRules] = useState([]);
  const [operator, setOperator] = useState('AND');
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckAudience = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/check-audience', {
        rules,
        operator,
      });
      setAudienceSize(response.data.size);
    } catch (error) {
      console.error('Error checking audience:', error);
      setError('Error checking audience.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAudience = async (e) => {
    e.preventDefault();
    if (audienceSize === 0) {
      setError('Audience size is 0. Cannot save the campaign.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://127.0.0.1:3001/api/campaigns', {
        name: campaignName,
        criteria: rules,
        operator,
        message,
        audienceSize,
      });
      // Redirect to campaigns list
      window.location.href = '/campaigns';
    } catch (error) {
      console.error('Error saving campaign:', error);
      setError('Error saving campaign.');
    } finally {
      setLoading(false);
    }
  };

  const addRule = () => {
    if (!totalSpends && !maxVisits && !lastVisit) {
      setError('At least one field must be filled to add a rule.');
      return;
    }
    const rule = {};
    if (totalSpends) rule.totalSpends = totalSpends;
    if (maxVisits) rule.maxVisits = maxVisits;
    if (lastVisit) rule.lastVisitMonths = lastVisit;
    setRules([...rules, rule]);
    setTotalSpends('');
    setMaxVisits('');
    setLastVisit('');
    setError(null);
  };

  return (
    <div>
      <h2>Create Audience</h2>
      <form onSubmit={handleCheckAudience}>
        <div>
          <label>Campaign Name:</label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Spends should be greater than:</label>
          <input
            type="number"
            value={totalSpends}
            onChange={(e) => setTotalSpends(e.target.value)}
          />
        </div>
        <div>
          <label>Max Visits:</label>
          <input
            type="number"
            value={maxVisits}
            onChange={(e) => setMaxVisits(e.target.value)}
          />
        </div>
        <div>
          <label>Last Visit (before months):</label>
          <input
            type="number"
            value={lastVisit}
            onChange={(e) => setLastVisit(e.target.value)}
          />
        </div>
        <div>
          <label>Combine rules with:</label>
          <select value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        <button type="button" onClick={addRule}>Add Rule</button>
        <br></br>
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check Audience Size'}
        </button>
        <br></br>
        <button type="button" onClick={handleSaveAudience} disabled={loading || audienceSize === null}>
          {loading ? 'Saving...' : 'Save Audience'}
        </button>
      </form>
      
      <div className='current-rules'>
        <h3>Current Rules:</h3>
        {rules.map((rule, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {rule.totalSpends && <p>Total Spends: {rule.totalSpends}</p>}
            {rule.maxVisits && <p>Max Visits: {rule.maxVisits}</p>}
            {rule.lastVisitMonths && <p>Last Visit: {rule.lastVisitMonths} months ago</p>}
          </div>
        ))}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      </div>
    </div>
  );
};

export default AudienceForm;
