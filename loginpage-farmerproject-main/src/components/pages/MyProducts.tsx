import React from 'react';
import { Plus, Package } from 'lucide-react';
import { Product, TabType } from '../../types';
import ProductCard from '../common/ProductCard';

interface MyProductsProps {
  products: Product[];
  onAddNew: () => void;
}

const MyProducts: React.FC<MyProductsProps> = ({ products, onAddNew }) => {
  const handleEditProduct = (productId: string) => {
    console.log('Editing product:', productId);
    // Handle product editing
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <div className="w-1 h-8 bg-green-500 rounded-full mr-4"></div>
              My Product Listings
            </h2>
            <p className="text-gray-600 mt-2">Manage and track your agricultural products</p>
          </div>
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Product</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showEditButton={true}
              onEdit={handleEditProduct}
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products listed yet</h3>
            <p className="text-gray-500 mb-6">Start selling by adding your first product</p>
            <button
              onClick={onAddNew}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              List Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;