import React from 'react';
import { Package } from 'lucide-react';
import { Product, TabType } from '../../types';

interface ProductsOverviewProps {
  products: Product[];
  onViewAll: () => void;
}

const ProductsOverview: React.FC<ProductsOverviewProps> = ({ products, onViewAll }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
          My Products
        </h3>
        <button
          onClick={onViewAll}
          className="text-green-600 hover:text-green-700 text-sm font-medium bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors"
        >
          View All →
        </button>
      </div>
      <div className="space-y-4">
        {products.slice(0, 3).map(product => (
          <div key={product.id} className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">{product.name}</p>
                <p className="text-sm text-gray-600">{product.quantity} {product.unit} • ${product.price}/{product.unit}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              product.isActive 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No products listed yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsOverview;