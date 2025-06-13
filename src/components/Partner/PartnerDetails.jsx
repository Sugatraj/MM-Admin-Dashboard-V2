import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

function PartnerDetails() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const { adminData } = useAdmin();
  const { getToken } = useAuth();
  const [partner, setPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (adminData?.user_id && partnerId) {
      fetchPartnerDetails();
    }
  }, [adminData?.user_id, partnerId]);

  const fetchPartnerDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axios.post(
        'https://men4u.xyz/v2/admin/view_partner',
        {
          partner_id: Number(partnerId),
          user_id: adminData.user_id
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      );

      setPartner(response.data);
    } catch (err) {
      setError('Failed to fetch partner details');
      console.error('Error fetching partner details:', err);
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
        <a href="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</a>
        <span className="text-gray-500">/</span>
        <a href="/partners" className="text-gray-500 hover:text-gray-700">Partners</a>
        <span className="text-gray-500">/</span>
        <span>View</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate(-1)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl">Partner</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              partner?.is_active === 1 ? 'bg-green-100 text-green-800' : ''
            }`}>
              Active
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
              Open
            </span>
          </div>
          <button
            onClick={() => navigate(`/edit-partner/${partnerId}`)}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
        </div>
      </div>

      {partner && (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Personal Information */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{partner.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{partner.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{partner.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{partner.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{partner.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhar Number</p>
                <p className="font-medium">{partner.aadhar_number}</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{partner.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-medium">{partner.account_status === 1 ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Status</p>
                <p className="font-medium">{partner.is_active === 1 ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff Status</p>
                <p className="font-medium">{partner.is_staff === 1 ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Superuser Status</p>
                <p className="font-medium">{partner.is_superuser === 1 ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Audit Information */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-medium mb-4">Audit Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium">{partner.created_on}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created By</p>
                <p className="font-medium">{partner.created_by}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Updated On</p>
                <p className="font-medium">{partner.updated_on}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Updated By</p>
                <p className="font-medium">{partner.updated_by}</p>
              </div>
            </div>
          </div>

          {/* Functionalities */}
          <div className="p-6 border-t">
            <h2 className="text-lg font-medium mb-4">Functionalities</h2>
            <div className="flex flex-wrap gap-2">
              {partner.functionalities.map(func => (
                <span 
                  key={func.functionality_id}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {func.functionality_name.replace(/_/g, ' ').toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerDetails;