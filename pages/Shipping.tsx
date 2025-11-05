import React, { useState } from 'react';

const shipments = [
  { id: 'EGPOST-12345', orderId: 'SHPF-5820', carrier: 'البوسطة المصرية', status: 'In Transit', cost: 60 },
  { id: 'ARMX-67890', orderId: 'SHPF-5821', carrier: 'Aramex', status: 'Out for Delivery', cost: 85 },
  { id: 'DHL-11223', orderId: 'SHPF-5815', carrier: 'DHL', status: 'Delivered', cost: 120 },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/20 text-green-400';
    case 'In Transit': return 'bg-blue-500/20 text-blue-400';
    case 'Out for Delivery': return 'bg-indigo-500/20 text-indigo-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const Shipping: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState('');

    const handleTrack = () => {
        if(trackingNumber) {
            setTrackingResult(`الشحنة ${trackingNumber} في طريقها إليك، الحالة الحالية: قيد التوزيع.`);
        } else {
            setTrackingResult('يرجى إدخال رقم تتبع صحيح.');
        }
    }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">تتبع شحنات البوسطة المصرية</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="أدخل رقم التتبع هنا..."
            className="flex-grow py-2.5 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4da6]"
          />
          <button onClick={handleTrack} className="px-6 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
            تتبع
          </button>
        </div>
        {trackingResult && (
            <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white">
                {trackingResult}
            </div>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">إدارة الشحنات</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">رقم التتبع</th>
                <th scope="col" className="px-6 py-3">رقم الطلب</th>
                <th scope="col" className="px-6 py-3">شركة الشحن</th>
                <th scope="col" className="px-6 py-3">الحالة</th>
                <th scope="col" className="px-6 py-3">تكلفة الشحن</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map(s => (
                <tr key={s.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white">{s.id}</td>
                  <td className="px-6 py-4">{s.orderId}</td>
                  <td className="px-6 py-4">{s.carrier}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(s.status)}`}>
                        {s.status === 'In Transit' ? 'قيد النقل' : s.status === 'Out for Delivery' ? 'خرجت للتوصيل' : 'تم التوصيل'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{s.cost.toFixed(2)} ج.م</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
