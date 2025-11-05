import React from 'react';
import StatCard from '../components/StatCard';

const transactions = [
  { id: 'INV-123', type: 'وارد', source: 'Shopify Sale #SHPF-5821', amount: 1250, status: 'مكتمل' },
  { id: 'PO-056', type: 'صادر', source: 'مورد الإكسسوارات', amount: -12000, status: 'مكتمل' },
  { id: 'INV-124', type: 'وارد', source: 'Shopify Sale #SHPF-5820', amount: 850.50, status: 'قيد الانتظار' },
  { id: 'PO-057', type: 'صادر', source: 'مورد أقمشة النور', amount: -78000, status: 'مستحق' },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'مكتمل': return 'bg-green-500/20 text-green-400';
    case 'قيد الانتظار': return 'bg-blue-500/20 text-blue-400';
    case 'مستحق': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const AccountPayments: React.FC = () => {
  return (
    <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="رصيد البنك الأهلي" value="450,230 ج.م" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>} trend="5.1%" trendDirection="up" />
        <StatCard title="محفظة فودافون كاش" value="25,100 ج.م" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>} trend="1.2%" trendDirection="down" />
        <StatCard title="إجمالي المستحقات" value="78,000 ج.م" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} trend="فاتورة واحدة" trendDirection="up" />
      </div>

       <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
         <h3 className="text-xl font-semibold text-white mb-6">أحدث المعاملات</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">رقم المرجع</th>
                  <th scope="col" className="px-6 py-3">النوع</th>
                  <th scope="col" className="px-6 py-3">المصدر/الوجهة</th>
                  <th scope="col" className="px-6 py-3">المبلغ</th>
                  <th scope="col" className="px-6 py-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-medium text-white">{t.id}</td>
                    <td className={`px-6 py-4 font-semibold ${t.type === 'وارد' ? 'text-green-400' : 'text-red-400'}`}>{t.type}</td>
                    <td className="px-6 py-4">{t.source}</td>
                    <td className={`px-6 py-4 font-mono ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{t.amount.toFixed(2)} ج.م</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(t.status)}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AccountPayments;
