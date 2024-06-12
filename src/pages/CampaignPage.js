import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './campaignPage.css';

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/campaigns');
        // Sort campaigns by creation date in descending order
        const sortedCampaigns = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleSendCampaign = async (campaignId) => {
    try {
      await axios.post(`http://127.0.0.1:3001/api/send-campaign/${campaignId}`);
      // Refresh the campaign list
      const response = await axios.get('http://127.0.0.1:3001/api/campaigns');
      const sortedCampaigns = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCampaigns(sortedCampaigns);
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  return (
    <div className="campaign-page">
      <h2>Campaigns</h2>
      <ul className="campaign-list">
        {campaigns.map(campaign => (
          <li key={campaign._id} className="campaign-item">
            <div className="campaign-details">
              <p className="campaign-name">{campaign.name}</p>
              <p className="campaign-status">{campaign.status}</p>
              <p className="campaign-message">Message: {campaign.message}</p>
              <p className="campaign-audience-size">Audience Size: {campaign.audienceSize}</p>
            </div>
            <button className="send-campaign-btn" onClick={() => handleSendCampaign(campaign._id)}>Send Campaign</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignPage;
