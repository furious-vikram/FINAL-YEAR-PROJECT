import React from 'react';
import { MapPin, Package, DollarSign, Calendar, Warehouse as WarehouseIcon } from 'lucide-react';
import { Warehouse } from '../../types';

interface WarehouseCardProps {
  warehouse: Warehouse;
  isRented?: boolean;
  onRent?: (warehouseId: string) => void;
  onExtend?: (warehouseId: string) => void;
  onViewDetails?: (warehouseId: string) => void;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ 
  warehouse, 
  isRented = false,
  onRent,
  onExtend,
  onViewDetails
}) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={warehouse.image} 
          alt={warehouse.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            isRented
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : warehouse.isAvailable 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isRented ? 'Active Rental' : warehouse.isAvailable ? 'Available' : 'Rented'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {warehouse.name}
        </h3>
        <p className="text-gray-600 mb-6">{warehouse.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4" />
            </div>
            <span>{warehouse.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
            <span>Capacity: {warehouse.capacity}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
            <span>${warehouse.pricePerMonth}/month</span>
          </div>
          {isRented && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
              <span>Expires: March 2024</span>
            </div>
          )}
        </div>
        
        {isRented ? (
          <div className="flex space-x-3">
            <button 
              onClick={() => onExtend?.(warehouse.id)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium"
            >
              Extend Rental
            </button>
            <button 
              onClick={() => onViewDetails?.(warehouse.id)}
              className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium"
            >
              View Details
            </button>
          </div>
        ) : (
          <button
            onClick={() => onRent?.(warehouse.id)}
            disabled={!warehouse.isAvailable}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              warehouse.isAvailable
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {warehouse.isAvailable ? 'Rent This Warehouse' : 'Currently Unavailable'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WarehouseCard;