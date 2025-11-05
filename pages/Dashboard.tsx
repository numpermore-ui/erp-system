import React, { useState, useEffect, useCallback } from 'react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getDashboardStats } from '../api/shopify';
import Spinner from '../components/Spinner';

const salesData = [
  { name: 'يناير', sales: 4000, profit: 2400 },
  { name: 'فبراير', sales: 3000, profit: 1398 },
  { name: 'مارس', sales: 2000, profit: 9800 },
  { name: 'أبريل', sales: 2780, profit: 3908 },
  { name: 'مايو', sales: 1890, profit: 4800 },
  { name: 'يونيو', sales: 2390, profit: 3800 },
  { name: 'يوليو', sales: 3490, profit: 4300 },
];

const LoadingStatCard = () => (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between h-[136px]">
        <div className="flex justify-between items-start">
            <div className="flex flex-col">
                <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-700 rounded w-32"></div>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg w-14 h-14"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-40 mt-4"></div>
    </div>
);


const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const data = await getDashboardStats();
    setStats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
          <button onClick={fetchStats} disabled={loading} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow flex items-center disabled:bg-opacity-50 disabled:cursor-not-allowed">
            {loading ? <Spinner size="sm" /> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" /></svg>}
            مزامنة مع Shopify
          </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading || !stats ? (
          <>
            <LoadingStatCard />
            <LoadingStatCard />
            <LoadingStatCard />
            <LoadingStatCard />
          </>
        ) : (
          <>
            <StatCard
              title="المبيعات اليومية"
              value={`${stats.dailySales.toLocaleString()} ج.م`}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              trend="12.5%"
              trendDirection="up"
            />
            <StatCard
              title="الطلبات الجديدة"
              value={stats.newOrders}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
              trend="2.1%"
              trendDirection="down"
            />
            <StatCard
              title="الأرباح الشهرية"
              value={`${stats.monthlyProfit.toLocaleString()} ج.م`}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
              trend="8.2%"
              trendDirection="up"
            />
            <StatCard
              title="عناصر المخزون"
              value={stats.inventoryItems.toLocaleString()}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
              trend="50 items"
              trendDirection="down"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">أداء المبيعات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Legend wrapperStyle={{ color: '#d1d5db' }}/>
              <Bar dataKey="sales" fill="#ff4da6" name="المبيعات" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">نمو الأرباح</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af' }}/>
              <YAxis tick={{ fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
              <Legend wrapperStyle={{ color: '#d1d5db' }}/>
              <Line type="monotone" dataKey="profit" stroke="#ff4da6" strokeWidth={2} name="الأرباح" dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;