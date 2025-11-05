import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve namespace issue.
  icon: React.ReactNode;
  trend: string;
  trendDirection: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendDirection }) => {
  const trendColor = trendDirection === 'up' ? 'text-green-400' : 'text-red-400';
  const trendIcon = trendDirection === 'up' ? '▲' : '▼';

  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 bg-gray-700 rounded-lg text-[#ff4da6]">
          {icon}
        </div>
      </div>
      <div className={`flex items-center text-sm mt-4 ${trendColor}`}>
        <span>{trendIcon} {trend}</span>
        <span className="text-gray-400 mx-1">مقابل الشهر الماضي</span>
      </div>
    </div>
  );
};

export default StatCard;
