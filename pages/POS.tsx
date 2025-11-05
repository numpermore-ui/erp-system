import React, { useState } from 'react';
import { Product } from '../types';
import { useToast } from '../hooks/useToast';

const posProducts: Product[] = [
  { id: 'FS-001', name: 'فستان سهرة اسود', category: 'فساتين', stock: 75, price: 1500 },
  { id: 'BL-001', name: 'بلوزة حرير وردي', category: 'بلوزات', stock: 120, price: 750 },
  { id: 'SK-001', name: 'تنورة بيضاء', category: 'تنانير', stock: 25, price: 600 },
  { id: 'FS-002', name: 'فستان كاجوال أزرق', category: 'فساتين', stock: 90, price: 850 },
  { id: 'BL-002', name: 'بلوزة قطن مخططة', category: 'بلوزات', stock: 15, price: 450 },
];

interface CartItem extends Product {
  quantity: number;
}

const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
      setCart(cart.filter(item => item.id !== productId));
  }

  const handleCheckout = () => {
      if (cart.length === 0) {
          showToast('السلة فارغة!', 'error');
          return;
      }
      showToast(`تم إتمام الدفع بنجاح! الإجمالي: ${total.toFixed(2)} ج.م`, 'success');
      setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)]">
      {/* Products Grid */}
      <div className="lg:w-2/3 bg-gray-800 p-4 rounded-2xl border border-gray-700 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {posProducts.map(product => (
            <div key={product.id} onClick={() => addToCart(product)} className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 transition-colors">
              <div className="w-24 h-24 bg-gray-600 rounded-md mb-2 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-sm font-semibold text-white">{product.name}</p>
              <p className="text-xs text-gray-400">{product.price.toFixed(2)} ج.م</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="lg:w-1/3 bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-4">الفاتورة الحالية</h3>
        <div className="flex-grow overflow-y-auto -mr-3 pr-3">
          {cart.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p>السلة فارغة</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-3 bg-gray-700/50 p-3 rounded-md">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.quantity} x {item.price.toFixed(2)}</p>
                </div>
                <p className="text-sm font-semibold text-white mx-4">{(item.quantity * item.price).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-700 pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold text-white mb-4">
                <span>الإجمالي</span>
                <span>{total.toFixed(2)} ج.م</span>
            </div>
            <button onClick={handleCheckout} className="w-full py-3 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
                إتمام الدفع وطباعة الفاتورة
            </button>
             <button onClick={() => setCart([])} className="w-full mt-2 py-3 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600">
                إلغاء
            </button>
        </div>
      </div>
    </div>
  );
};

export default POS;