import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

function Functionalities() {
  const { getToken } = useAuth();
  const [functionalities, setFunctionalities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFunctionalities();
  }, []);

  const fetchFunctionalities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.get(
        'https://men4u.xyz/v2/admin/get_ubac_functionalities',
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      setFunctionalities(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch functionalities');
      console.error('Error fetching functionalities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter functionalities based on search term
  const filteredFunctionalities = functionalities.filter(functionality => 
    functionality.functionality_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</Link>
        <span className="text-gray-500">/</span>
        <Link to="/access-control" className="text-gray-500 hover:text-gray-700">Access-control</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700">Functionalities</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3 mr-1" />
            Back
          </button>
          <h1 className="text-xl font-semibold">Functionalities</h1>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add Functionality
        </button>
      </div>

      {/* Stats and Search Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-2xl font-semibold">{functionalities.length}</div>
          <div className="text-xs text-gray-500 uppercase">TOTAL</div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search functionalities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 h-10 pl-10 pr-4 text-gray-600 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* Functionalities Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SR NO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FUNCTIONALITY NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFunctionalities.map((functionality, index) => (
              <tr key={functionality.functionality_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                  {functionality.functionality_name.replace(/_/g, ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-error-500 shadow-theme-xs hover:bg-error-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div>Showing 1 to {filteredFunctionalities.length} of {filteredFunctionalities.length} entries</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 text-white bg-blue-500 rounded">1</button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Functionalities;