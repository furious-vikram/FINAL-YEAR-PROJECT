import React from 'react';
import { Package } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  showEditButton?: boolean;
  onEdit?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showEditButton = false, 
  onEdit 
}) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            product.isActive 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.quantity} {product.unit}
          </span>
        </div>
        {showEditButton && (
          <button 
            onClick={() => onEdit?.(product.id)}
            className="w-full bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 py-2 px-4 rounded-lg transition-colors font-medium border border-gray-200 hover:border-green-200"
          >
            Edit Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;