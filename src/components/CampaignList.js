import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await axios.get('http://127.0.0.1:3001/api/campaigns');
      setCampaigns(response.data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2>Past Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>{campaign.name} - {campaign.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
