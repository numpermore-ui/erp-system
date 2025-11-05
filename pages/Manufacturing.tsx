import React, { useState } from 'react';
import { ProductionOrder, RawMaterial } from '../types';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';


const initialProductionOrders: ProductionOrder[] = [
  { id: 'PROD-101', product: 'فستان سهرة اسود', quantity: 50, status: 'In Progress', cost: 12500 },
  { id: 'PROD-102', product: 'بلوزة حرير وردي', quantity: 120, status: 'Completed', cost: 18000 },
  { id: 'PROD-103', product: 'تنورة بيضاء', quantity: 75, status: 'Planning', cost: 9375 },
];

const initialRawMaterials: RawMaterial[] = [
  { id: 'MAT-01', name: 'قماش ساتان اسود', stock: '250 متر', reorder: 50 },
  { id: 'MAT-02', name: 'قماش حرير وردي', stock: '80 متر', reorder: 30 },
  { id: 'MAT-03', name: 'أزرار ذهبية', stock: '1500 قطعة', reorder: 500 },
  { id: 'MAT-04', name: 'سحابات مخفية', stock: '450 قطعة', reorder: 100 },
];

const getStatusClass = (status: ProductionOrder['status']) => {
  switch (status) {
    case 'Completed': return 'bg-green-500/20 text-green-400';
    case 'In Progress': return 'bg-blue-500/20 text-blue-400';
    case 'Planning': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const Manufacturing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [productionOrders, setProductionOrders] = useState(initialProductionOrders);
  const [rawMaterials, setRawMaterials] = useState(initialRawMaterials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  
  const handleAddOrder = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newOrder: ProductionOrder = {
          id: `PROD-${Math.floor(Math.random() * 900) + 100}`,
          product: formData.get('product') as string,
          quantity: parseInt(formData.get('quantity') as string),
          cost: 0,
          status: 'Planning'
      };
      setProductionOrders([newOrder, ...productionOrders]);
      setIsModalOpen(false);
      showToast('تم إنشاء أمر التصنيع بنجاح!', 'success');
  }

  const handleAddMaterial = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newMaterial: RawMaterial = {
          id: `MAT-${Math.floor(Math.random() * 90) + 10}`,
          name: formData.get('name') as string,
          stock: formData.get('stock') as string,
          reorder: parseInt(formData.get('reorder') as string),
      };
      setRawMaterials([newMaterial, ...rawMaterials]);
      setIsModalOpen(false);
      showToast('تمت إضافة المادة الخام بنجاح!', 'success');
  }

  return (
    <>
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div className="flex border-b border-gray-700">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'orders' ? 'border-b-2 border-[#ff4da6] text-[#ff4da6]' : 'text-gray-400 hover:text-white'}`}>أوامر التصنيع</button>
            <button onClick={() => setActiveTab('materials')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'materials' ? 'border-b-2 border-[#ff4da6] text-[#ff4da6]' : 'text-gray-400 hover:text-white'}`}>المواد الخام</button>
        </div>
         <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
            {activeTab === 'orders' ? 'إنشاء أمر تصنيع' : 'إضافة مادة خام'}
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        {activeTab === 'orders' ? (
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-right text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">رقم الأمر</th>
                  <th scope="col" className="px-6 py-3">المنتج</th>
                  <th scope="col" className="px-6 py-3">الكمية</th>
                  <th scope="col" className="px-6 py-3">الحالة</th>
                  <th scope="col" className="px-6 py-3">التكلفة الإجمالية</th>
                </tr>
              </thead>
              <tbody>
                {productionOrders.map((order) => (
                  <tr key={order.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                           {order.status === 'In Progress' ? 'قيد التنفيذ' : order.status === 'Completed' ? 'مكتمل' : 'تخطيط'}
                        </span>
                    </td>
                    <td className="px-6 py-4">{order.cost.toFixed(2)} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-300">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">معرف المادة</th>
                  <th scope="col" className="px-6 py-3">اسم المادة</th>
                  <th scope="col" className="px-6 py-3">المخزون الحالي</th>
                  <th scope="col" className="px-6 py-3">حد إعادة الطلب</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.map((material) => (
                  <tr key={material.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-6 py-4 font-medium text-white">{material.id}</td>
                    <td className="px-6 py-4">{material.name}</td>
                    <td className="px-6 py-4">{material.stock}</td>
                    <td className="px-6 py-4 text-yellow-400">{material.reorder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeTab === 'orders' ? 'إنشاء أمر تصنيع' : 'إضافة مادة خام'}>
      {activeTab === 'orders' ? (
        <form onSubmit={handleAddOrder} className="space-y-4">
          <div>
            <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-300">اسم المنتج</label>
            <input type="text" name="product" id="product" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
          <div>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-300">الكمية</label>
            <input type="number" name="quantity" id="quantity" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
          <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">إنشاء الأمر</button>
        </form>
      ) : (
        <form onSubmit={handleAddMaterial} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">اسم المادة</label>
            <input type="text" name="name" id="name" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-300">المخزون (مثال: 100 متر)</label>
            <input type="text" name="stock" id="stock" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
           <div>
            <label htmlFor="reorder" className="block mb-2 text-sm font-medium text-gray-300">حد إعادة الطلب</label>
            <input type="number" name="reorder" id="reorder" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
          <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">إضافة المادة</button>
        </form>
      )}
    </Modal>
    </>
  );
};

export default Manufacturing;