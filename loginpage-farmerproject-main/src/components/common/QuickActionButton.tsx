import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  title,
  subtitle,
  icon: Icon,
  gradient,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden ${gradient} text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <div className="relative flex items-center space-x-4">
        <div className="bg-white bg-opacity-20 p-3 rounded-full">
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-left">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-white text-opacity-80 text-sm">{subtitle}</p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionButton;