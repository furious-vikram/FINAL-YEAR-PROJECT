import React from 'react';
import { Plus, Warehouse as WarehouseIcon } from 'lucide-react';
import { Warehouse } from '../../types';
import WarehouseCard from '../common/WarehouseCard';

interface MyWarehousesProps {
  warehouses: Warehouse[];
  onRentNew: () => void;
}

const MyWarehouses: React.FC<MyWarehousesProps> = ({ warehouses, onRentNew }) => {
  const handleExtendRental = (warehouseId: string) => {
    console.log('Extending rental for warehouse:', warehouseId);
    // Handle rental extension
  };

  const handleViewDetails = (warehouseId: string) => {
    console.log('Viewing details for warehouse:', warehouseId);
    // Handle view details
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <div className="w-1 h-8 bg-purple-500 rounded-full mr-4"></div>
              My Warehouse Rentals
            </h2>
            <p className="text-gray-600 mt-2">Manage your storage facilities and rentals</p>
          </div>
          <button
            onClick={onRentNew}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Rent New Warehouse</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {warehouses.map(warehouse => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              isRented={true}
              onExtend={handleExtendRental}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        
        {warehouses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <WarehouseIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No warehouses rented yet</h3>
            <p className="text-gray-500 mb-6">Secure storage space for your agricultural products</p>
            <button
              onClick={onRentNew}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Rent Your First Warehouse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWarehouses;