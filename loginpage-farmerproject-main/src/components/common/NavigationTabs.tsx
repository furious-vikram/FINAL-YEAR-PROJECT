import React from 'react';
import { BarChart3, Plus, Bed as Seed, Package, Warehouse } from 'lucide-react';
import { TabType } from '../../types';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: BarChart3 },
    { id: 'sell' as TabType, label: 'Sell Crops', icon: Plus },
    { id: 'seeds' as TabType, label: 'Buy Seeds', icon: Seed },
    { id: 'my-products' as TabType, label: 'My Products', icon: Package },
    { id: 'my-warehouses' as TabType, label: 'My Warehouses', icon: Warehouse },
    { id: 'warehouse' as TabType, label: 'Rent Warehouse', icon: Warehouse }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8">
      <div className="flex flex-wrap gap-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
  );
};

export default NavigationTabs;