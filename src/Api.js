import axios from 'axios';
const BASE_URL = 'https://65a667f274cf4207b4eff14a.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAccounts = async (sortBy, order, page) => {
  try {
    const response = await api.get('/accounts', {
      params: {
        sortBy: sortBy,
        order: order,
        page: page,
        limit: 3,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const getProfiles = async (accountId, sortBy, order, filterBy, filterValue) => {
  try {
    const response = await api.get(`/accounts/${accountId}/profiles`, {
      params: {
        sortBy: sortBy,
        order: order,
        [filterBy]: filterValue,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};


export const getCampaigns = async (profileId, sortBy, order) => {
  try {
    const response = await api.get(`/profiles/${profileId}/campaigns`, {
      params: {
        sortBy: sortBy,
        order: order,
      },
    });
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
