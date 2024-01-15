import axios from 'axios';
axios.defaults.baseURL = 'https://6571f80ad61ba6fcc0141958.mockapi.io';

export const getTotalAccounts = async () => {
  try {
    const { data } = await axios.get(`/accounts`);
    return data;
  } catch (error) {
    console.error('Error getting total accounts:', error);
    throw error;
  }
};
