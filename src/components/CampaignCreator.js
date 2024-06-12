// src/components/CampaignCreator.js
import React, { useState } from 'react';
import axios from 'axios';

const CampaignCreator = () => {
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [campaignName, setCampaignName] = useState('');

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const updateRule = (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
  };

  const checkAudienceSize = async () => {
    const response = await axios.post('http://127.0.0.1:3001/api/check-audience', { rules });
    setAudienceSize(response.data.size);
  };

  const createCampaign = async () => {
    await axios.post('http://127.0.0.1:3001/api/campaigns', { name: campaignName, rules });
  };

  return (
    <div>
      <h1>Create Campaign</h1>
      <input
        type="text"
        placeholder="Campaign Name"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />
      {rules.map((rule, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Field"
            value={rule.field}
            onChange={(e) => updateRule(index, 'field', e.target.value)}
          />
          <input
            type="text"
            placeholder="Operator"
            value={rule.operator}
            onChange={(e) => updateRule(index, 'operator', e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addRule}>Add Rule</button>
      <button onClick={checkAudienceSize}>Check Audience Size</button>
      <button onClick={createCampaign}>Create Campaign</button>
      <p>Audience Size: {audienceSize}</p>
    </div>
  );
};

export default CampaignCreator;
