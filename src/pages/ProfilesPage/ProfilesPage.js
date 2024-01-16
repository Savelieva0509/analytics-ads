import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../../Api';

const ProfilesPage = () => {
  const { accountId } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');
  const [selectedMarketplace, setSelectedMarketplace] = useState('All');

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
  
   const handleMarketplaceChange = newMarketplace => {
     setSelectedMarketplace(newMarketplace);
  };
  
  return (
    <div>
      <h1>Profiles</h1>
      <div>
        <label>Filter by Marketplace:</label>
        <select
          value={selectedMarketplace}
          onChange={e => handleMarketplaceChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Rozetka">Rozetka</option>
          <option value="Amazon">Amazon</option>
          <option value="AliExpress">AliExpress</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSortChange('country')}>
                Sort by country
              </button>
            </th>
            <th>
              <button onClick={() => handleSortChange('marketplace')}>
                Sort by marketplace
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.profileId}>
              <td>
                <Link to={`/profiles/${profile.profileId}/campaigns`}>
                  {profile.country}
                </Link>
              </td>
              <td>{profile.marketplace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilesPage;


