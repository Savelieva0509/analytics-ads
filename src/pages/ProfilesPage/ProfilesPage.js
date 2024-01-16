import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../../Api';

const ProfilesPage = () => {
    const { accountId } = useParams();
    console.log('accountId:', accountId);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getProfiles(accountId);
        setProfiles(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchData();
  }, [accountId]);

  return (
    <div>
      <h1>Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Marketplace</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(profile => (
            <tr key={profile.profileId}>
              <td><Link to={`/profiles/${profile.profileId}`}>{profile.country}</Link></td>
              <td>{profile.marketplace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilesPage;


