import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../Api';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAccounts(sortBy, order);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, [sortBy, order]);

  const handleSortChange = newSortBy => {
    setSortBy(newSortBy);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h1>Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Auth Token</th>
            <th>
              <button onClick={() => handleSortChange('creationDate')}>
                Sort by creation date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.accountId}>
              <td>
                <Link to={`/accounts/${account.accountId}/profiles`}>
                  {account.email}
                </Link>
              </td>
              <td>{account.authToken}</td>
              <td>{account.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPage;
