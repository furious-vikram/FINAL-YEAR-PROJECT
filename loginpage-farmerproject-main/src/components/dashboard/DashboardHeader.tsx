import React from 'react';
import { User } from '../../types';

interface DashboardHeaderProps {
  user: User | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
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
  );
};

export default DashboardHeader;