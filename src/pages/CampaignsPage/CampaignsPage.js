import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../Api';

const CampaignsPage = () => {
  const { profileId } = useParams();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getCampaigns(profileId);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchData();
  }, [profileId]);

  return (
    <div>
      <h1>Campaigns</h1>
      <table>
        <thead>
          <tr>
            <th>Clicks</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(campaign => (
            <tr key={campaign.campaignId}>
              <td>{campaign.clicks}</td>
              <td>{campaign.cost}</td>
              <td>{campaign.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsPage;
