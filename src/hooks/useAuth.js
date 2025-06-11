import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authData, setAuthData] = useState(() => {
    // Initialize from localStorage if exists
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  // Update localStorage whenever authData changes
  useEffect(() => {
    if (authData) {
      localStorage.setItem('auth', JSON.stringify(authData));
    } else {
      localStorage.removeItem('auth');
    }
  }, [authData]);

  const login = (response) => {
    const newAuthData = {
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires_at: response.data.expires_at,
    };
    setAuthData(newAuthData);
  };

  const logout = () => {
    setAuthData(null);
  };

  const isAuthenticated = () => {
    return !!authData && new Date(authData.expires_at) > new Date();
  };

  const getToken = () => {
    return authData ? `${authData.token_type} ${authData.access_token}` : null;
  };

  return {
    authData,
    login,
    logout,
    isAuthenticated,
    getToken,
  };
};

// import { useState, useEffect } from 'react';

// export const useAdmin = () => {
//   const [adminData, setAdminData] = useState(() => {
//     // Initialize from localStorage if exists
//     const savedAdmin = localStorage.getItem('adminData');
//     return savedAdmin ? JSON.parse(savedAdmin) : null;
//   });

//   // Update localStorage whenever adminData changes
//   useEffect(() => {
//     if (adminData) {
//       localStorage.setItem('adminData', JSON.stringify(adminData));
//     } else {
//       localStorage.removeItem('adminData');
//     }
//   }, [adminData]);

//   const setAdmin = (response) => {
//     const newAdminData = {
//       user_id: response.data.user_id,
//       name: response.data.name,
//       mobile: response.data.mobile,
//       email: response.data.email,
//       role: response.data.role,
//     };
//     setAdminData(newAdminData);
//   };

//   const clearAdmin = () => {
//     setAdminData(null);
//   };

//   const updateAdminProfile = (updatedData) => {
//     setAdminData(prev => ({
//       ...prev,
//       ...updatedData
//     }));
//   };

//   return {
//     adminData,
//     setAdmin,
//     clearAdmin,
//     updateAdminProfile,
//   };
// };

// // Optional: Create a combined hook for both auth and admin data
// // src/hooks/useAuthStore.js
// export const useAuthStore = () => {
//   const auth = useAuth();
//   const admin = useAdmin();

//   const handleLogin = (response) => {
//     auth.login(response);
//     admin.setAdmin(response);
//   };

//   const handleLogout = () => {
//     auth.logout();
//     admin.clearAdmin();
//   };

//   return {
//     ...auth,
//     ...admin,
//     handleLogin,
//     handleLogout,
//   };
// };
