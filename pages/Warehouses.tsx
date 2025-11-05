import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';
import { getInventory } from '../api/shopify';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';

const Warehouses: React.FC = () => {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { showToast } = useToast();
  const lowStockThreshold = 30;
  
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      const data = await getInventory();
      setInventory(data);
      setLoading(false);
    };
    fetchInventory();
  }, []);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: (formData.get('id') as string).toUpperCase(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string),
      price: parseFloat(formData.get('price') as string),
    };
    setInventory([newProduct, ...inventory]);
    setIsModalOpen(false);
    showToast('تمت إضافة المنتج بنجاح!', 'success');
  };

  const handleDeleteProduct = (productId: string) => {
    if(window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      setInventory(inventory.filter(p => p.id !== productId));
      showToast('تم حذف المنتج بنجاح!', 'success');
    }
  }

  const categories = useMemo(() => ['All', ...new Set(inventory.map(p => p.category))], [inventory]);

  const filteredInventory = useMemo(() => {
    return inventory
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(product => 
        categoryFilter === 'All' || product.category === categoryFilter
      );
  }, [inventory, searchTerm, categoryFilter]);


  return (
    <>
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-white">جرد المخزون</h3>
          <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-4 flex-wrap">
              <input
                  type="text"
                  placeholder="بحث باسم المنتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto flex-grow py-2 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
              />
              <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-2 px-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff4da6]"
              >
                  {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'كل الفئات' : cat}</option>)}
              </select>
              <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow whitespace-nowrap">
                إضافة منتج
              </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64"><Spinner /></div>
          ) : filteredInventory.length === 0 ? (
            <EmptyState title="لا توجد منتجات" message="لا توجد منتجات تطابق بحثك أو الفئة المحددة." />
          ) : (
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">SKU</th>
                <th scope="col" className="px-6 py-3">اسم المنتج</th>
                <th scope="col" className="px-6 py-3">الفئة</th>
                <th scope="col" className="px-6 py-3">الكمية المتاحة</th>
                <th scope="col" className="px-6 py-3">السعر</th>
                <th scope="col" className="px-6 py-3">الحالة</th>
                <th scope="col" className="px-6 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((product) => (
                <tr key={product.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">{product.price.toFixed(2)} ج.م</td>
                  <td className="px-6 py-4">
                    {product.stock > lowStockThreshold ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400">متوفر</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400">مخزون منخفض</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة منتج جديد">
         <form onSubmit={handleAddProduct} className="space-y-4">
           <div>
             <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-300">SKU</label>
             <input type="text" name="id" id="id" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
           </div>
           <div>
             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">اسم المنتج</label>
             <input type="text" name="name" id="name" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
           </div>
            <div>
             <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">الفئة</label>
             <input type="text" name="category" id="category" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
           </div>
           <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-300">الكمية</label>
              <input type="number" name="stock" id="stock" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
            </div>
             <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">السعر</label>
              <input type="number" step="0.01" name="price" id="price" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
            </div>
           </div>
           <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">
             إضافة المنتج
           </button>
         </form>
       </Modal>
    </>
  );
};

export default Warehouses;