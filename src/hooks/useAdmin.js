import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [adminData, setAdminData] = useState(() => {
    // Initialize from localStorage if exists
    const savedAdmin = localStorage.getItem('adminData');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  // Update localStorage whenever adminData changes
  useEffect(() => {
    if (adminData) {
      localStorage.setItem('adminData', JSON.stringify(adminData));
    } else {
      localStorage.removeItem('adminData');
    }
  }, [adminData]);

  const setAdmin = (response) => {
    const newAdminData = {
      user_id: response.data.user_id,
      name: response.data.name,
      mobile: response.data.mobile,
      email: response.data.email,
      role: response.data.role,
    };
    setAdminData(newAdminData);
  };

  const clearAdmin = () => {
    setAdminData(null);
  };

  const updateAdminProfile = (updatedData) => {
    setAdminData(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  return {
    adminData,
    setAdmin,
    clearAdmin,
    updateAdminProfile,
  };
}; 