import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { getToken, isAuthenticated } = useAuth();
  const [data, setData] = useState({
    outlet_data: [],
    counts: {
      customer_count: 0,
      owner_count: 0,
      outlet_count: 0,
      partner_count: 0,
      guest_count: 0
    }
  });

  useEffect(() => {
    if (isAuthenticated()) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('https://men4u.xyz/v2/admin/admin_home', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{data.counts?.owner_count}</h3>
            <p className="text-gray-600">Restaurant Owners</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{data.counts?.partner_count}</h3>
            <p className="text-gray-600">Partners</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{data.counts?.outlet_count}</h3>
            <p className="text-gray-600">Total Outlets</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{data.counts?.customer_count}</h3>
            <p className="text-gray-600">Customers</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">{data.counts?.guest_count}</h3>
            <p className="text-gray-600">Guests</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-sm text-gray-500">Showing 1 to {data.outlet_data?.length} of {data.outlet_data?.length} entries</span>
          <div className="flex items-center gap-2">
            <span>All Outlets</span>
            <input type="text" placeholder="Search outlets..." className="px-3 py-1 border rounded-md" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Outlet Name</th>
                <th className="px-6 py-3">Orders</th>
                <th className="px-6 py-3">Cooking</th>
                <th className="px-6 py-3">Placed</th>
                <th className="px-6 py-3">Paid</th>
                <th className="px-6 py-3">Cancelled</th>
                <th className="px-6 py-3">Categories</th>
                <th className="px-6 py-3">Menu Items</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Account Type</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.outlet_data?.map((outlet) => (
                <tr key={outlet.outlet_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{outlet.outlet_name}</td>
                  <td className="px-6 py-4">{outlet.total_order_count}</td>
                  <td className="px-6 py-4">{outlet.total_cooking_count}</td>
                  <td className="px-6 py-4">{outlet.total_placed_count}</td>
                  <td className="px-6 py-4">{outlet.total_paid_count}</td>
                  <td className="px-6 py-4">{outlet.total_cancel_count}</td>
                  <td className="px-6 py-4">{outlet.total_category}</td>
                  <td className="px-6 py-4">{outlet.total_menu}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${outlet.total_order_count > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {outlet.total_order_count > 0 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${outlet.account_type === 'test' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {outlet.account_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;