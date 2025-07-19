import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  textColor: string;
  subtitleColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  iconBg,
  textColor,
  subtitleColor
}) => {
  return (
    <div className={`group ${gradient} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} mb-1`}>{title}</p>
          <p className={`text-3xl font-bold ${textColor.replace('700', '800')}`}>{value}</p>
          <p className={`text-xs ${subtitleColor} mt-1 flex items-center`}>
            {subtitle}
          </p>
        </div>
        <div className={`${iconBg} p-3 rounded-full group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-8 w-8 ${textColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;