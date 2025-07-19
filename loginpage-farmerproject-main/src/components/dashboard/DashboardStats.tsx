import React from 'react';
import { DollarSign, Package, BarChart3, Users, TrendingUp, Clock, Star } from 'lucide-react';
import StatsCard from '../common/StatsCard';

const DashboardStats: React.FC = () => {
  const statsData = [
    {
      title: 'Total Sales',
      value: '$2,450',
      subtitle: '+12% from last month',
      icon: DollarSign,
      gradient: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
      iconBg: 'bg-green-200',
      textColor: 'text-green-700',
      subtitleColor: 'text-green-600'
    },
    {
      title: 'Active Listings',
      value: '12',
      subtitle: '3 new this week',
      icon: Package,
      gradient: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      iconBg: 'bg-blue-200',
      textColor: 'text-blue-700',
      subtitleColor: 'text-blue-600'
    },
    {
      title: 'Orders Today',
      value: '8',
      subtitle: '2 pending delivery',
      icon: BarChart3,
      gradient: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      iconBg: 'bg-purple-200',
      textColor: 'text-purple-700',
      subtitleColor: 'text-purple-600'
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      subtitle: 'Based on 24 reviews',
      icon: Users,
      gradient: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
      iconBg: 'bg-orange-200',
      textColor: 'text-orange-700',
      subtitleColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;