import React, { useState, useMemo } from 'react';
import { PurchaseOrder } from '../types';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';

const initialPurchaseOrders: PurchaseOrder[] = [
  { id: 'PO-2023-055', supplier: 'مورد أقمشة النور', date: '2023-10-20', total: 45000, status: 'مكتمل' },
  { id: 'PO-2023-056', supplier: 'شركة الإكسسوارات الحديثة', date: '2023-10-22', total: 12000, status: 'قيد التنفيذ' },
  { id: 'PO-2023-057', supplier: 'مورد أقمشة النور', date: '2023-10-25', total: 78000, status: 'قيد التنفيذ' },
  { id: 'PO-2023-058', supplier: 'شركة الخيوط الذهبية', date: '2023-10-28', total: 5500, status: 'مؤجل' },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'مكتمل': return 'bg-green-500/20 text-green-400';
    case 'قيد التنفيذ': return 'bg-blue-500/20 text-blue-400';
    case 'مؤجل': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const Purchasing: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const { showToast } = useToast();

  const handleAddOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrder: PurchaseOrder = {
      id: `PO-2023-${Math.floor(Math.random() * 900) + 100}`,
      supplier: formData.get('supplier') as string,
      total: parseFloat(formData.get('total') as string),
      date: new Date().toISOString().split('T')[0],
      status: 'قيد التنفيذ',
    };
    setPurchaseOrders([newOrder, ...purchaseOrders]);
    setIsModalOpen(false);
    showToast('تم إنشاء أمر الشراء بنجاح!', 'success');
  };

  const filteredOrders = useMemo(() => {
    return purchaseOrders
      .filter(order =>
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(order =>
        statusFilter === 'الكل' || order.status === statusFilter
      );
  }, [purchaseOrders, searchTerm, statusFilter]);

  return (
    <>
     <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-semibold text-white">أوامر الشراء</h3>
        <div className="flex items-center gap-4 w-full sm:w-auto">
           <input
                type="text"
                placeholder="بحث باسم المورد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
            >
                <option>الكل</option>
                <option>قيد التنفيذ</option>
                <option>مكتمل</option>
                <option>مؤجل</option>
            </select>
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow whitespace-nowrap">
            إنشاء أمر شراء
            </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3">رقم الأمر</th>
              <th scope="col" className="px-6 py-3">المورد</th>
              <th scope="col" className="px-6 py-3">التاريخ</th>
              <th scope="col" className="px-6 py-3">الإجمالي</th>
              <th scope="col" className="px-6 py-3">الحالة</th>
              <th scope="col" className="px-6 py-3">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4">{order.supplier}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.total.toFixed(2)} ج.م</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-[#ff4da6] hover:underline">عرض الفاتورة</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إنشاء أمر شراء جديد">
       <form onSubmit={handleAddOrder} className="space-y-4">
         <div>
           <label htmlFor="supplier" className="block mb-2 text-sm font-medium text-gray-300">اسم المورد</label>
           <input type="text" name="supplier" id="supplier" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
         </div>
         <div>
           <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-300">الإجمالي</label>
           <input type="number" name="total" id="total" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
         </div>
         <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">
           إنشاء الأمر
         </button>
       </form>
     </Modal>
    </>
  );
};

export default Purchasing;