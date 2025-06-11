import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppLayout from './AppLayout';

const PrivateRoute = () => {
  // You can add authentication check logic here
  // const isAuthenticated = // your auth check logic
  const isAuthenticated = true; // temporary, replace with your actual auth logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default PrivateRoute; 