import React from 'react';
import { Product, Warehouse, TabType } from '../../types';
import DashboardStats from '../dashboard/DashboardStats';
import QuickActions from '../dashboard/QuickActions';
import ProductsOverview from '../dashboard/ProductsOverview';
import WarehousesOverview from '../dashboard/WarehousesOverview';

interface DashboardOverviewProps {
  farmerProducts: Product[];
  farmerWarehouses: Warehouse[];
  onTabChange: (tab: TabType) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  farmerProducts,
  farmerWarehouses,
  onTabChange
}) => {
  return (
    <div className="space-y-8">
      <DashboardStats />
      <QuickActions onTabChange={onTabChange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductsOverview 
          products={farmerProducts}
          onViewAll={() => onTabChange('my-products')}
        />
        <WarehousesOverview 
          warehouses={farmerWarehouses}
          onViewAll={() => onTabChange('my-warehouses')}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;