import React from 'react';
import FarmerDashboard from './components/FarmerDashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <FarmerDashboard />
    </AuthProvider>
  );
}

export default App;