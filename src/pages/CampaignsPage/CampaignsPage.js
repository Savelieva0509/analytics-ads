import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const CampaignsPage = () => {
  const { profileId } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');

  const formatDate = dateString => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getCampaigns(
          profileId,
          sortBy,
          order
        );
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchData();
  }, [profileId, sortBy, order]);

  const handleSortChange = newSortBy => {
    setSortBy(newSortBy);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container mt-4">
      <h1>Campaigns</h1>
      <table className="table">
        <thead>
          <tr>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('clicks')}
              >
                Sort by clicks
              </button>
            </th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('cost')}
              >
                Sort by cost
              </button>
            </th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('date')}
              >
                Sort by date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(campaign => (
            <tr key={campaign.campaignId}>
              <td>{campaign.clicks}</td>
              <td>{campaign.cost}</td>
              <td>{formatDate(campaign.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsPage;
