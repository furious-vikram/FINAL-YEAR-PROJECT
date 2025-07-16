import React from 'react';
import FarmerDashboard from './components/Farmer/FarmerDashboard';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <FarmerDashboard />
    </AuthProvider>
  );
}

export default App;