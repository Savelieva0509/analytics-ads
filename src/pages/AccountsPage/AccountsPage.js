import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiService from '../../Api';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [sortBy, setSortBy] = useState('creationDate');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const navigate = useNavigate();

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
    setPage(1);
  };

  const handleRowClick = accountId => {
    navigate(`/accounts/${accountId}/profiles`);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <div className="container mt-4">
      <h1>Accounts</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Auth Token</th>
            <th>
              <button
                className="btn btn-primary"
                onClick={() => handleSortChange('creationDate')}
              >
                Sort by creation date{' '}
                {sortBy === 'creationDate' && order === 'asc' && <BsArrowUp />}
                {sortBy === 'creationDate' && order === 'desc' && (
                  <BsArrowDown />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr
              key={account.accountId}
              className="clickable-row"
              onClick={() => handleRowClick(account.accountId)}
            >
              <td>{account.email}</td>
              <td>{account.authToken}</td>
              <td>{formatDate(account.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default AccountsPage;
