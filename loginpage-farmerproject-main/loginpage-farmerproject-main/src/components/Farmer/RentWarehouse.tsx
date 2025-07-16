import React, { useState } from 'react';
import { MapPin, Package, DollarSign, Calendar, Star } from 'lucide-react';
import { mockWarehouses } from '../../utils/mockData';

const RentWarehouse: React.FC = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);

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
            <div key={warehouse.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <img src={warehouse.image} alt={warehouse.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{warehouse.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    warehouse.isAvailable 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {warehouse.isAvailable ? 'Available' : 'Rented'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6">{warehouse.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{warehouse.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>Capacity: {warehouse.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>${warehouse.pricePerMonth}/month</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleRent(warehouse.id)}
                  disabled={!warehouse.isAvailable}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    warehouse.isAvailable
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {warehouse.isAvailable ? 'Rent This Warehouse' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentWarehouse;