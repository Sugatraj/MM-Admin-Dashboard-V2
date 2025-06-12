import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Outlets from './components/Outlets';
import CreateOutlet from './components/CreateOutlet';
import ViewOutlet from './components/ViewOutlet';
import EditOutlet from './components/EditOutlet';
import Owners from './components/Owners';
import OwnerDetails from './components/OwnerDetails';
import EditOwner from './components/EditOwner';
import CreateOwner from './components/CreateOwner';
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
          <Route path="/outlets" element={<Outlets />} />
          <Route path="/create-outlet" element={<CreateOutlet />} />
          <Route path="/view-outlet/:outletId" element={<ViewOutlet />} />
          <Route path="/edit-outlet/:outletId" element={<EditOutlet />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/owner-details/:ownerId" element={<OwnerDetails />} />
          <Route path="/edit-owner/:ownerId" element={<EditOwner />} />
          <Route path="/create-owner" element={<CreateOwner />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
