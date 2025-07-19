import React from 'react';
import { mockWarehouses } from '../../data/mockData';
import WarehouseCard from '../common/WarehouseCard';

const RentWarehouse: React.FC = () => {
  const handleRent = (warehouseId: string) => {
    console.log('Renting warehouse:', warehouseId);
    // Handle warehouse rental
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Rent Storage Warehouse</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockWarehouses.map(warehouse => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              onRent={handleRent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentWarehouse;