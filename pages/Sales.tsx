import React, { useState, useEffect, useMemo } from 'react';
import { Order } from '../types';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';
import { getOrders } from '../api/shopify';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';


const getStatusClass = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500/20 text-green-400';
    case 'Shipped':
      return 'bg-blue-500/20 text-blue-400';
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const Sales: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { showToast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleCreateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 900) + 100}`,
        customerName: formData.get('customerName') as string,
        total: parseFloat(formData.get('total') as string),
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        paymentMethod: 'Cash on Delivery',
    };
    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    showToast('تم إنشاء الفاتورة بنجاح!', 'success');
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(order => 
        statusFilter === 'All' || order.status === statusFilter
      );
  }, [orders, searchTerm, statusFilter]);

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full sm:w-auto">
                <h3 className="text-xl font-semibold text-white">أحدث الطلبات</h3>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-4 flex-wrap">
                 <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="بحث باسم العميل..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </span>
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-2 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
                >
                    <option value="All">كل الحالات</option>
                    <option value="Pending">قيد الانتظار</option>
                    <option value="Shipped">تم الشحن</option>
                    <option value="Delivered">تم التوصيل</option>
                    <option value="Cancelled">ملغي</option>
                </select>
                <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow whitespace-nowrap">
                    إنشاء فاتورة
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <Spinner />
             </div>
          ) : filteredOrders.length === 0 ? (
             <EmptyState title="لا توجد طلبات تطابق البحث" message="جرّب تغيير كلمات البحث أو الفلاتر." />
          ) : (
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">رقم الطلب</th>
                <th scope="col" className="px-6 py-3">اسم العميل</th>
                <th scope="col" className="px-6 py-3">التاريخ</th>
                <th scope="col" className="px-6 py-3">الإجمالي</th>
                <th scope="col" className="px-6 py-3">الحالة</th>
                <th scope="col" className="px-6 py-3">طريقة الدفع</th>
                <th scope="col" className="px-6 py-3">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">{order.total.toFixed(2)} ج.م</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                      {order.status === 'Pending' ? 'قيد الانتظار' : order.status === 'Shipped' ? 'تم الشحن' : order.status === 'Delivered' ? 'تم التوصيل' : 'ملغي'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-[#ff4da6] hover:underline">عرض التفاصيل</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إنشاء فاتورة يدوية">
         <form onSubmit={handleCreateInvoice} className="space-y-4">
           <div>
             <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-300">اسم العميل</label>
             <input type="text" name="customerName" id="customerName" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
           </div>
           <div>
             <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-300">الإجمالي</label>
             <input type="number" name="total" id="total" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
           </div>
           <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">
             إنشاء الفاتورة
           </button>
         </form>
       </Modal>
    </>
  );
};

export default Sales;