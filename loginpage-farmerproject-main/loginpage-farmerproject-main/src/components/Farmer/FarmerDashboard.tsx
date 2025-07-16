import React, { useState } from 'react';
import { Plus, Package, Bed as Seed, Warehouse, TrendingUp, Calendar, MapPin, DollarSign, BarChart3, Users, Clock, Star } from 'lucide-react';
import SellCrops from './SellCrops';
import BuySeeds from './BuySeeds';
import RentWarehouse from './RentWarehouse';
import { useAuth } from '../../hooks/useAuth';
import { mockWarehouses, mockProducts } from '../../utils/mockData';

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sell' | 'seeds' | 'warehouse' | 'my-products' | 'my-warehouses'>('overview');
  const { user } = useAuth();
  
  // Mock data for farmer's products and warehouses
  const farmerProducts = mockProducts.filter(p => p.farmerId === user?.id);
  const farmerWarehouses = mockWarehouses.slice(0, 1); // Mock rented warehouses

  const renderContent = () => {
    switch (activeTab) {
      case 'sell':
        return <SellCrops />;
      case 'seeds':
        return <BuySeeds />;
      case 'warehouse':
        return <RentWarehouse />;
      case 'my-products':
        return renderMyProducts();
      case 'my-warehouses':
        return renderMyWarehouses();
      default:
        return (
          <div className="space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Total Sales</p>
                    <p className="text-3xl font-bold text-green-800">$2,450</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <div className="bg-green-200 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-8 w-8 text-green-700" />
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">Active Listings</p>
                    <p className="text-3xl font-bold text-blue-800">12</p>
                    <p className="text-xs text-blue-600 mt-1 flex items-center">
                      <Package className="h-3 w-3 mr-1" />
                      3 new this week
                    </p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-blue-700" />
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Orders Today</p>
                    <p className="text-3xl font-bold text-purple-800">8</p>
                    <p className="text-xs text-purple-600 mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      2 pending delivery
                    </p>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-purple-700" />
                  </div>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 mb-1">Customer Rating</p>
                    <p className="text-3xl font-bold text-orange-800">4.8</p>
                    <p className="text-xs text-orange-600 mt-1 flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Based on 24 reviews
                    </p>
                  </div>
                  <div className="bg-orange-200 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-orange-700" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setActiveTab('sell')}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Plus className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg">Sell New Crops</p>
                      <p className="text-green-100 text-sm">List your fresh produce</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('seeds')}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Seed className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg">Buy Seeds</p>
                      <p className="text-blue-100 text-sm">Get quality seeds</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('warehouse')}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Warehouse className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-lg">Rent Warehouse</p>
                      <p className="text-purple-100 text-sm">Secure storage space</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Enhanced Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* My Products Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                    My Products
                  </h3>
                  <button
                    onClick={() => setActiveTab('my-products')}
                    className="text-green-600 hover:text-green-700 text-sm font-medium bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {farmerProducts.slice(0, 3).map(product => (
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
                  {farmerProducts.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No products listed yet</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* My Warehouses Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <div className="w-1 h-6 bg-purple-500 rounded-full mr-3"></div>
                    My Warehouses
                  </h3>
                  <button
                    onClick={() => setActiveTab('my-warehouses')}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {farmerWarehouses.map(warehouse => (
                    <div key={warehouse.id} className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Warehouse className="h-6 w-6 text-purple-600" />
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
                  {farmerWarehouses.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Warehouse className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No warehouses rented yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  const renderMyProducts = () => (
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
            onClick={() => setActiveTab('sell')}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New Product</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerProducts.map(product => (
            <div key={product.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
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
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.quantity} {product.unit}
                  </span>
                </div>
                <button className="w-full bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 py-2 px-4 rounded-lg transition-colors font-medium border border-gray-200 hover:border-green-200">
                  Edit Product
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {farmerProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products listed yet</h3>
            <p className="text-gray-500 mb-6">Start selling by adding your first product</p>
            <button
              onClick={() => setActiveTab('sell')}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              List Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderMyWarehouses = () => (
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
            onClick={() => setActiveTab('warehouse')}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Rent New Warehouse</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {farmerWarehouses.map(warehouse => (
            <div key={warehouse.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img src={warehouse.image} alt={warehouse.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                    Active Rental
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{warehouse.name}</h3>
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
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span>Expires: March 2024</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium">
                    Extend Rental
                  </button>
                  <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {farmerWarehouses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Warehouse className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No warehouses rented yet</h3>
            <p className="text-gray-500 mb-6">Secure storage space for your agricultural products</p>
            <button
              onClick={() => setActiveTab('warehouse')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Rent Your First Warehouse
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.fullName?.charAt(0) || 'F'}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  Welcome back, {user?.fullName}! 👋
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Ready to grow your farming business today?</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'sell', label: 'Sell Crops', icon: Plus },
              { id: 'seeds', label: 'Buy Seeds', icon: Seed },
              { id: 'my-products', label: 'My Products', icon: Package },
              { id: 'my-warehouses', label: 'My Warehouses', icon: Warehouse },
              { id: 'warehouse', label: 'Rent Warehouse', icon: Warehouse }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default FarmerDashboard;