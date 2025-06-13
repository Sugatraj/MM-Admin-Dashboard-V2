import React, { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const Search = () => {
  const { getToken } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('name'); // 'name', 'mobile', or 'outlet_name'

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://men4u.xyz/v2/admin/search',
        {
          search: searchType,
          value: searchInput,
          ...(selectedRole && selectedRole !== 'All Roles' && { role: selectedRole.toLowerCase() })
        },
        {
          headers: {
            Authorization: getToken(),
          }
        }
      );

      if (response.data && Array.isArray(response.data.results)) {
        setSearchResults(response.data.results);
        setTotalResults(response.data.total_results || 0);
      } else {
        setSearchResults([]);
        setTotalResults(0);
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError(error.response?.data?.message || 'Search failed. Please try again.');
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex-grow p-6">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-gray-300"
        >
          <span>Back</span>
        </button>
      </div>

      <h1 className="text-xl font-medium mb-6 text-center">Search</h1>

      {/* Search Controls */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-8 justify-center">
        <select 
          className="px-4 py-2 border rounded-md"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Search by Name</option>
          <option value="mobile">Search by Mobile</option>
          <option value="outlet_name">Search by Outlet</option>
        </select>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={`Search by ${searchType}...`}
          className="px-4 py-2 border rounded-md"
          required
        />
        <select 
          className="px-4 py-2 border rounded-md min-w-[120px]"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option>All Roles</option>
          <option>Owner</option>
          <option>Customer</option>
          <option>Waiter</option>
          <option>Chef</option>
          <option>Outlet</option>
        </select>
        <button 
          type="submit" 
          className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:bg-purple-300"
          disabled={loading || !searchInput.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Results Table */}
      {searchResults.length > 0 ? (
        <>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">NAME</th>
                <th className="text-left py-3 px-4">MOBILE</th>
                <th className="text-left py-3 px-4">EMAIL</th>
                <th className="text-left py-3 px-4">ROLE</th>
                <th className="text-left py-3 px-4">OUTLETS</th>
                <th className="text-left py-3 px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <tr key={user.user_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name || '-'}</td>
                  <td className="py-3 px-4">{user.mobile || '-'}</td>
                  <td className="py-3 px-4">{user.email || '-'}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1">
                      {getTypeIcon(user.role)} {user.role || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {Array.isArray(user.outlets) ? 
                      (user.outlets.map(outlet => outlet.outlet_name).join(', ') || '-') 
                      : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <button className="bg-blue-400 text-white p-1 rounded hover:bg-blue-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Results Summary */}
          <div className="flex justify-between items-center">
            <div>
              Showing {searchResults.length} of {totalResults} results
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          {loading ? 'Searching...' : (searchInput ? 'No results found' : 'Enter a search term to begin')}
        </div>
      )}
    </div>
  );
};

const getTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'owner':
      return '👑';
    case 'waiter':
      return '👨‍🍳';
    case 'customer':
      return '👤';
    case 'outlet':
      return '🏪';
    case 'chef':
      return '🍳';
    default:
      return '❓';
  }
};

export default Search;