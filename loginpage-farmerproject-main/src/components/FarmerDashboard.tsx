import React, { useState } from 'react';
import { TabType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts, mockWarehouses } from '../data/mockData';
import DashboardHeader from './dashboard/DashboardHeader';
import NavigationTabs from './common/NavigationTabs';
import DashboardOverview from './pages/DashboardOverview';
import SellCrops from './pages/SellCrops';
import BuySeeds from './pages/BuySeeds';
import RentWarehouse from './pages/RentWarehouse';
import MyProducts from './pages/MyProducts';
import MyWarehouses from './pages/MyWarehouses';

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { user } = useAuth();
  
  // Mock data for farmer's products and warehouses
  const farmerProducts = mockProducts.filter(p => p.farmerId === user?.id);
  const farmerWarehouses = mockWarehouses.slice(0, 1); // Mock rented warehouses

  const renderContent = () => {
    switch (activeTab) {
      case 'sell':
        return <SellCrops />;
      case 'seeds':
        return <BuySeeds />;
      case 'warehouse':
        return <RentWarehouse />;
      case 'my-products':
        return (
          <MyProducts 
            products={farmerProducts}
            onAddNew={() => setActiveTab('sell')}
          />
        );
      case 'my-warehouses':
        return (
          <MyWarehouses 
            warehouses={farmerWarehouses}
            onRentNew={() => setActiveTab('warehouse')}
          />
        );
      default:
        return (
          <DashboardOverview
            farmerProducts={farmerProducts}
            farmerWarehouses={farmerWarehouses}
            onTabChange={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader user={user} />
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
};

export default FarmerDashboard;