import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilesPage = () => {
  const { accountId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');
  const [selectedMarketplace, setSelectedMarketplace] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProfiles(
          accountId,
          sortBy,
          order,
          selectedMarketplace !== 'All' ? 'marketplace' : undefined,
          selectedMarketplace !== 'All' ? selectedMarketplace : undefined
        );
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchData();
  }, [accountId, sortBy, order, selectedMarketplace]);

  const handleSortChange = newSortBy => {
    setSortBy(newSortBy);
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleRowClick = profileId => {
    navigate(`/profiles/${profileId}/campaigns`);
  };

  const handleMarketplaceChange = newMarketplace => {
    setSelectedMarketplace(newMarketplace);
  };

  return (
    <div className="container mt-4">
      <h1>Profiles</h1>
      <div className="form-floating">
        <select
          id="floatingSelect"
          aria-label="Floating label select example"
          className="form-select"
          value={selectedMarketplace}
          onChange={e => handleMarketplaceChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Rozetka">Rozetka</option>
          <option value="Amazon">Amazon</option>
          <option value="AliExpress">AliExpress</option>
        </select>
        <label htmlFor="floatingSelect">Selected dy country</label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('country')}
              >
                Sort by country
              </button>
            </th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('marketplace')}
              >
                Sort by marketplace
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr
              key={profile.profileId}
              className="clickable-row"
              onClick={() => handleRowClick(profile.profileId)}
            >
              <td>{profile.country}</td>
              <td>{profile.marketplace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilesPage;
