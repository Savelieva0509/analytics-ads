import axios from 'axios';
const BASE_URL = 'https://65a667f274cf4207b4eff14a.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
   
    return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getProfiles = async accountId => {
  try {
    const response = await api.get(`/accounts/${accountId}/profiles`);
    return response;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};


export const getCampaigns = async profileId => {
  try {
    const response = await api.get(`/profiles/${profileId}/campaigns`);
    console.log('Received campaigns:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

const apiService = {
  getAccounts,
  getProfiles,
  getCampaigns,
};

export default apiService;
