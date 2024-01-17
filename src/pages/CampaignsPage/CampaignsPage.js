import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaSortAmountUp, FaSortAmountDownAlt } from 'react-icons/fa';
import apiService from '../../Api';

import 'bootstrap/dist/css/bootstrap.min.css';

const CampaignsPage = () => {
  const { profileId } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [sortBy, setSortBy] = useState('clicks');
  const [order, setOrder] = useState('asc');

  const navigate = useNavigate();

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

 const handleGoBack = () => {
   navigate(-1); 
 };


  return (
    <div className="container mt-4">
      <div className="title-container">
        <button className="btn btn-link" onClick={handleGoBack}>
          <FaArrowLeftLong />
        </button>
        <h1 className="title">Campaigns</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('clicks')}
              >
                Sort by clicks{' '}
                {sortBy === 'clicks' && order === 'asc' && <FaSortAmountUp />}
                {sortBy === 'clicks' && order === 'desc' && (
                  <FaSortAmountDownAlt />
                )}
              </button>
            </th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('cost')}
              >
                Sort by cost{' '}
                {sortBy === 'cost' && order === 'asc' && <FaSortAmountUp />}
                {sortBy === 'cost' && order === 'desc' && (
                  <FaSortAmountDownAlt />
                )}
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
