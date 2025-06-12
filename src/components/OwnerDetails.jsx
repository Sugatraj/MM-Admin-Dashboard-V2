import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function OwnerDetails() {
  const { getToken } = useAuth();
  const { adminData } = useAdmin();
  const { ownerId } = useParams();
  const navigate = useNavigate();
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

  return (
    <div className="p-6">
      {/* Breadcrumb and Header */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Dashboard</span>
        <span className="mx-2">›</span>
        <span>Owners</span>
        <span className="mx-2">›</span>
        <span>View</span>
      </div>

      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span className="mr-2">‹</span>
          Back
        </button>
        <div className="text-xl font-semibold">Owner Details</div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
            Edit
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Name</div>
                <div>{ownerData.name}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Email</div>
                <div>{ownerData.email}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Mobile</div>
                <div>{ownerData.mobile}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Address</div>
                <div>{ownerData.address}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Date of Birth</div>
                <div>{ownerData.dob}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Aadhar Number</div>
                <div>{ownerData.aadhar_number}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Role</div>
                <div>{ownerData.role}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Account Status</div>
                <div>
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

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Active Status</div>
                <div>
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

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Staff Status</div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ownerData.is_staff === 1 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {ownerData.is_staff === 1 ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Created On</div>
                <div>{ownerData.created_on}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-gray-500">Updated On</div>
                <div>{ownerData.updated_on}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outlets */}
      <div className="mt-6 bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Outlets</h2>
        <div className="space-y-4">
          {ownerData.outlets.map((outlet, index) => (
            <div key={outlet.outlet_id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-gray-500">{index + 1}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{outlet.name}</div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                outlet.is_open === 1 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {outlet.is_open === 1 ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;