import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OwnerDetails() {
  const { getToken } = useAuth();
  const { adminData } = useAdmin();
  const { ownerId } = useParams();
  const [ownerData, setOwnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (adminData?.user_id && ownerId) {
      fetchOwnerDetails();
    }
  }, [adminData?.user_id, ownerId]);

  const fetchOwnerDetails = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.post(
        'https://men4u.xyz/v2/admin/view_owner',
        {
          user_id: adminData.user_id,
          owner_id: parseInt(ownerId)
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      setOwnerData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching owner details:', error);
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

  if (!ownerData) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">No owner data found</div>
      </div>
    );
  }

  // Get unique functionalities (remove duplicates)
  const uniqueFunctionalities = Array.from(
    new Map(ownerData.functionalities.map(item => [item.functionality_id, item])).values()
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Owner Details</h1>
        <p className="text-gray-500">View complete information about the owner</p>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{ownerData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{ownerData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mobile</p>
            <p className="font-medium">{ownerData.mobile}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{ownerData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{ownerData.dob}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Aadhar Number</p>
            <p className="font-medium">{ownerData.aadhar_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Type</p>
            <span className={`px-2 py-1 text-xs rounded-full ${
              ownerData.account_type === 'live' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {ownerData.account_type}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 text-xs rounded-full ${
              ownerData.is_active === 1 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {ownerData.is_active === 1 ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Functionalities */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Functionalities</h2>
        <div className="flex flex-wrap gap-2">
          {uniqueFunctionalities.map((func) => (
            <span
              key={`${func.functionality_id}-${func.functionality_name}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {func.functionality_name.replace('manage_', '').replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Outlets */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Outlets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownerData.outlets.map((outlet) => (
            <div key={outlet.outlet_id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{outlet.name}</h3>
                  <p className="text-sm text-gray-500">Code: {outlet.outlet_code}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  outlet.is_open === 1 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {outlet.is_open === 1 ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">{outlet.address}</p>
                <p className="text-gray-600">{outlet.mobile}</p>
                <p className="text-gray-600 capitalize">Type: {outlet.outlet_type}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(outlet.settings).map(([key, value]) => {
                  if (typeof value === 'boolean' || typeof value === 'number') {
                    return value ? (
                      <span
                        key={key}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                      >
                        {key.replace('has_', '').replace('_', ' ')}
                      </span>
                    ) : null;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;