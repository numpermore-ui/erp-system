import React, { useState, useEffect } from 'react';
import { getLiveOrders, updateLiveOrders } from '../api/shopify';
import Spinner from '../components/Spinner';

interface LiveOrder {
    id: string;
    status: string;
    progress: number;
    alert: string | null;
}

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'Processing': return { text: 'قيد التجهيز', color: 'blue' };
    case 'Shipped': return { text: 'تم الشحن', color: 'indigo' };
    case 'Delayed': return { text: 'متأخر', color: 'yellow' };
    case 'Delivered': return { text: 'تم التوصيل', color: 'green' };
    case 'New Order': return { text: 'طلب جديد', color: 'pink' };
    default: return { text: status, color: 'gray' };
  }
};

const CentralTracking: React.FC = () => {
    const [orders, setOrders] = useState<LiveOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            const data = await getLiveOrders();
            setOrders(data);
            setLoading(false);
        };
        fetchInitialData();

        const interval = setInterval(async () => {
            setOrders(prevOrders => updateLiveOrders(prevOrders));
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);


  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">تتبع الطلبات اللحظي</h3>
        <p className="text-gray-400 mb-6">متابعة جميع الطلبات الواردة من متجر Shopify مباشرة. (يتم تحديث البيانات تلقائياً)</p>
        <div className="space-y-6">
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <Spinner />
             </div>
          ) : orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 transition-all duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="font-bold text-lg text-white">{order.id}</p>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${statusInfo.color}-500/20 text-${statusInfo.color}-400`}>
                      {statusInfo.text}
                    </span>
                  </div>
                  {order.alert && (
                     <div className="flex items-center space-x-2 space-x-reverse text-red-400 bg-red-500/20 px-3 py-2 rounded-lg text-sm animate-pulse">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                       <span>{order.alert}</span>
                     </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-gray-400 text-xs mb-1">تقدم الطلب</p>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className="bg-[#ff4da6] h-2.5 rounded-full transition-all duration-500" style={{ width: `${order.progress}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CentralTracking;