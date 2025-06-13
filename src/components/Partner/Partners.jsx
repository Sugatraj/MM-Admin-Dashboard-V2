import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

function Partners() {
  const navigate = useNavigate();
  const { adminData } = useAdmin();
  const { getToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  useEffect(() => {
    if (adminData?.user_id) {
      fetchPartners();
    }
  }, [adminData?.user_id]);

  const fetchPartners = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.get(
        `https://men4u.xyz/v2/admin/listview_partner/${adminData.user_id}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      setPartners(response.data);
      
      // Calculate stats from the response
      const total = response.data.length;
      const active = response.data.filter(partner => partner.is_active === 1).length;
      const inactive = total - active;
      
      setStats({
        total,
        active,
        inactive
      });

    } catch (err) {
      setError('Failed to fetch partners');
      console.error('Error fetching partners:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
        <span className="text-gray-500">/</span>
        <span>Partner</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-4xl font-semibold text-center">{stats.total}</div>
          <div className="text-center text-gray-600">Total Count</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-4xl font-semibold text-center text-green-500">{stats.active}</div>
          <div className="text-center text-gray-600">Total Active</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-4xl font-semibold text-center text-red-500">{stats.inactive}</div>
          <div className="text-center text-gray-600">Total Inactive</div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => navigate(-1)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-xl">Partner</h2>
          </div>

          {/* Create Partner Button */}
          <button 
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            onClick={() => navigate('/create-partner')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Partner
          </button>
        </div>

        {/* Table Controls */}
        <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-t">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select 
              className="border rounded px-2 py-1"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Search:</span>
            <input
              type="text"
              className="border rounded px-3 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search partners..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {partners
                .filter(partner => 
                  partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  partner.mobile.includes(searchTerm) ||
                  partner.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((partner) => (
                  <tr key={partner.user_id}>
                    <td className="px-6 py-4">{partner.name}</td>
                    <td className="px-6 py-4">{partner.mobile}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        partner.is_active === 1 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {partner.is_active === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                          onClick={() => navigate(`/partner-details/${partner.user_id}`)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          className="p-1 text-purple-500 hover:bg-purple-50 rounded"
                          onClick={() => navigate(`/edit-partner/${partner.user_id}`)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing 1 to {Math.min(partners.length, entries)} of {partners.length} entries
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-gray-50 text-gray-400" disabled>Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600">1</button>
            <button className="px-3 py-1 border rounded bg-gray-50 text-gray-400" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;