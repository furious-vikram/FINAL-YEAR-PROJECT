import React from 'react';
import { Warehouse as WarehouseIcon } from 'lucide-react';
import { Warehouse } from '../../types';

interface WarehousesOverviewProps {
  warehouses: Warehouse[];
  onViewAll: () => void;
}

const WarehousesOverview: React.FC<WarehousesOverviewProps> = ({ warehouses, onViewAll }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-1 h-6 bg-purple-500 rounded-full mr-3"></div>
          My Warehouses
        </h3>
        <button
          onClick={onViewAll}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors"
        >
          View All →
        </button>
      </div>
      <div className="space-y-4">
        {warehouses.map(warehouse => (
          <div key={warehouse.id} className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <WarehouseIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{warehouse.name}</p>
                  <p className="text-sm text-gray-600">{warehouse.location}</p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                Rented
              </span>
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-between">
              <span>${warehouse.pricePerMonth}/month</span>
              <span className="text-xs text-gray-500">Until March 2024</span>
            </div>
          </div>
        ))}
        {warehouses.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <WarehouseIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No warehouses rented yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarehousesOverview;