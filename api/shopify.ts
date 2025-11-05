import { Order, Product } from '../types';

const MOCK_DELAY = 1000; // 1 second delay

// --- Mock Data ---

const mockOrders: Order[] = [
  { id: 'SHPF-5821', customerName: 'سارة أحمد', date: '2023-10-27', total: 1250.00, status: 'Shipped', paymentMethod: 'Credit Card' },
  { id: 'SHPF-5820', customerName: 'فاطمة علي', date: '2023-10-27', total: 850.50, status: 'Pending', paymentMethod: 'Cash on Delivery' },
  { id: 'SHPF-5819', customerName: 'نور محمد', date: '2023-10-26', total: 2400.00, status: 'Delivered', paymentMethod: 'PayPal' },
  { id: 'SHPF-5818', customerName: 'هبة خالد', date: '2023-10-26', total: 600.75, status: 'Cancelled', paymentMethod: 'Credit Card' },
  { id: 'SHPF-5817', customerName: 'ريم مصطفى', date: '2023-10-25', total: 3100.00, status: 'Delivered', paymentMethod: 'Credit Card' },
];

const mockInventory: Product[] = [
  { id: 'FS-001', name: 'فستان سهرة اسود', category: 'فساتين', stock: 75, price: 1500 },
  { id: 'BL-001', name: 'بلوزة حرير وردي', category: 'بلوزات', stock: 120, price: 750 },
  { id: 'SK-001', name: 'تنورة بيضاء', category: 'تنانير', stock: 25, price: 600 },
  { id: 'FS-002', name: 'فستان كاجوال أزرق', category: 'فساتين', stock: 90, price: 850 },
  { id: 'BL-002', name: 'بلوزة قطن مخططة', category: 'بلوزات', stock: 15, price: 450 },
];

let mockLiveOrders = [
  { id: 'SHPF-5821', status: 'Processing', progress: 50, alert: null },
  { id: 'SHPF-5820', status: 'Shipped', progress: 75, alert: null },
  { id: 'SHPF-5819', status: 'Delayed', progress: 25, alert: 'تأخير في التجهيز' },
  { id: 'SHPF-5818', status: 'Delivered', progress: 100, alert: null },
  { id: 'SHPF-5817', status: 'New Order', progress: 10, alert: 'نقص في مخزون القماش' },
];

// --- API Functions ---

export const getDashboardStats = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        dailySales: Math.floor(Math.random() * 20000) + 5000,
        newOrders: Math.floor(Math.random() * 100) + 10,
        monthlyProfit: Math.floor(Math.random() * 300000) + 100000,
        inventoryItems: mockInventory.reduce((sum, item) => sum + item.stock, 0),
      });
    }, MOCK_DELAY);
  });
};

export const getOrders = (): Promise<Order[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockOrders]);
    }, MOCK_DELAY);
  });
};

export const getInventory = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockInventory]);
    }, MOCK_DELAY);
  });
};

export const getLiveOrders = (): Promise<any[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...mockLiveOrders]);
        }, MOCK_DELAY);
    });
}

export const updateLiveOrders = (currentOrders: any[]) => {
    return currentOrders.map(order => {
        const randomChange = Math.random();
        if (randomChange < 0.2 && order.status !== 'Delivered') { // 20% chance to update
            if (order.status === 'New Order') return { ...order, status: 'Processing', progress: 25 };
            if (order.status === 'Processing') return { ...order, status: 'Shipped', progress: 75 };
            if (order.status === 'Shipped') return { ...order, status: 'Delivered', progress: 100, alert: null };
        }
        return order;
    });
};
