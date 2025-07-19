import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Seed } from '../../types';

interface SeedCardProps {
  seed: Seed;
  onAddToCart?: (seedId: string) => void;
}

const SeedCard: React.FC<SeedCardProps> = ({ seed, onAddToCart }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <img src={seed.image} alt={seed.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{seed.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{seed.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(seed.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {seed.rating} ({seed.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${seed.price}</span>
          <button 
            onClick={() => onAddToCart?.(seed.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedCard;