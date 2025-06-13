import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

function Customer() {
  const { getToken } = useAuth();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInactive, setTotalInactive] = useState(0);
  const [outletName, setOutletName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You can make outlet_id dynamic as needed
  const outlet_id = 1;

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, [outlet_id]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://men4u.xyz/v2/admin/customer_listview',
        { outlet_id },
        {
          headers: {
            Authorization: getToken(),
          },
        }
      );
      setCustomers(response.data.customers || []);
      setTotalCount(response.data.total_customers || 0);
      setOutletName(response.data.outlet_name || '');
      // If your API provides active/inactive counts, set them here.
      // For now, we'll just set totalActive = totalCount, totalInactive = 0 as a placeholder.
      setTotalActive(response.data.total_active || response.data.total_customers || 0);
      setTotalInactive(response.data.total_inactive || 0);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  // Filtered customers for search
  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile?.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <span>Home</span>
        <span>/</span>
        <span>Customers</span>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-48">
          <span className="text-2xl font-bold text-blue-600">{totalCount}</span>
          <span className="text-gray-600 mt-1 flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z" /></svg>
            Total Count
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-48">
          <span className="text-2xl font-bold text-green-600">{totalActive}</span>
          <span className="text-gray-600 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Total Active
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center w-48">
          <span className="text-2xl font-bold text-red-600">{totalInactive}</span>
          <span className="text-gray-600 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            Total Inactive
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <button className="text-xs border border-gray-300 rounded px-3 py-1 text-gray-700 hover:bg-gray-100">
            &#8592; Back
          </button>
          <h2 className="text-lg font-semibold text-center flex-grow -ml-16">
            Customers{outletName ? ` - ${outletName}` : ''}
          </h2>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="text-sm mr-2">Show</label>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-sm ml-2">entries</span>
          </div>
          <div>
            <label className="text-sm mr-2">Search:</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">NAME</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">MOBILE</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">ORDER COUNT</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-400">No customers found.</td>
                  </tr>
                ) : (
                  filteredCustomers.map((c, idx) => (
                    <tr key={c.customer_id || idx}>
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2">{c.mobile}</td>
                      <td className="px-4 py-2">{c.order_count ?? '-'}</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            Showing 1 to {filteredCustomers.length} of {totalCount} entries
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-purple-600 text-white">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">3</button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded-md">11</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">Next</button>
          </div>
        </div>
      </div>
      <div className="text-xs text-right text-gray-400 mt-4">
        Powered By Shekru Labs India Pvt. Ltd.
      </div>
    </div>
  );
}

export default Customer;