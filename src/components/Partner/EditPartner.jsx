import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

function EditPartner() {
  const navigate = useNavigate();
  const { partnerId } = useParams();
  const { adminData } = useAdmin();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    aadhar_number: '',
    address: '',
    is_active: false
  });

  useEffect(() => {
    if (adminData?.user_id && partnerId) {
      fetchPartnerDetails();
    }
  }, [adminData?.user_id, partnerId]);

  const fetchPartnerDetails = async () => {
    try {
      setIsLoading(true);
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

      setFormData({
        name: response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
        dob: response.data.dob,
        aadhar_number: response.data.aadhar_number,
        address: response.data.address,
        is_active: response.data.is_active === 1
      });
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch partner details');
      console.error('Error fetching partner details:', err);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API integration will be added later
    console.log(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
        <span>Edit</span>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-xl">Edit Partner</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Active Partner Checkbox */}
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Active Partner</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">Partners marked as inactive will not be able to access the system</p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 transition rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPartner;