import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Auth />} />
        
        {/* Protected routes with AppLayout */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
