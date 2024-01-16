import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../Api';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAccounts();
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Auth Token</th>
            <th>Creation Date</th>
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

export default AccountsPage