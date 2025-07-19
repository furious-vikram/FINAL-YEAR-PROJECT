import React from 'react';
import { Plus, Bed as Seed, Warehouse } from 'lucide-react';
import { TabType } from '../../types';
import QuickActionButton from '../common/QuickActionButton';

interface QuickActionsProps {
  onTabChange: (tab: TabType) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onTabChange }) => {
  const actions = [
    {
      title: 'Sell New Crops',
      subtitle: 'List your fresh produce',
      icon: Plus,
      gradient: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      tab: 'sell' as TabType
    },
    {
      title: 'Buy Seeds',
      subtitle: 'Get quality seeds',
      icon: Seed,
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      tab: 'seeds' as TabType
    },
    {
      title: 'Rent Warehouse',
      subtitle: 'Secure storage space',
      icon: Warehouse,
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      tab: 'warehouse' as TabType
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <div className="w-1 h-8 bg-green-500 rounded-full mr-3"></div>
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            title={action.title}
            subtitle={action.subtitle}
            icon={action.icon}
            gradient={action.gradient}
            onClick={() => onTabChange(action.tab)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;