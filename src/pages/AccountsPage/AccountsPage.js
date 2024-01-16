import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../Api';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const formatDate = dateString => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAccounts(
          sortBy,
          order,
          page,
          limit
        );
       setAccounts(prevAccounts =>
         page === 1 ? response.data : [...prevAccounts, ...response.data]
       );
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, [sortBy, order, page, limit]);

  const handleSortChange = newSortBy => {
    setSortBy(newSortBy);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };
const handleLoadMore = () => {
  setPage(prevPage => prevPage + 1);
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
              <td>{formatDate(account.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default AccountsPage;
