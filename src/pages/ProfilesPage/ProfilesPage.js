import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../Api';
import { FaSortAmountUp, FaSortAmountDownAlt } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilesPage.css'

const ProfilesPage = () => {
  const { accountId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [sortBy, setSortBy] = useState('country');
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
   const handleGoBack = () => {
     navigate(`/`);
   };

  return (
    <div className="container mt-4">
      <div className="title-container">
        <button className="btn btn-link" onClick={handleGoBack}>
          <FaArrowLeftLong />
        </button>
        <h1 className="title">Profiles</h1>
      </div>

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
                Sort by country{' '}
                {sortBy === 'country' && order === 'asc' && <FaSortAmountUp />}
                {sortBy === 'country' && order === 'desc' && (
                  <FaSortAmountDownAlt />
                )}
              </button>
            </th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('marketplace')}
              >
                Sort by marketplace{' '}
                {sortBy === 'marketplace' && order === 'asc' && (
                  <FaSortAmountUp />
                )}
                {sortBy === 'marketplace' && order === 'desc' && (
                  <FaSortAmountDownAlt />
                )}
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
