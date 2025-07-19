import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockSeeds } from '../../data/mockData';
import SeedCard from '../common/SeedCard';

const BuySeeds: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSeeds = mockSeeds.filter(seed => {
    const matchesSearch = seed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || seed.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (seedId: string) => {
    console.log('Adding seed to cart:', seedId);
    // Handle add to cart functionality
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Buy Quality Seeds</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search seeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="herbs">Herbs</option>
          </select>
        </div>
        
        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map(seed => (
            <SeedCard 
              key={seed.id} 
              seed={seed} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuySeeds;