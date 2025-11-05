export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Credit Card' | 'PayPal' | 'Cash on Delivery';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  totalSpent: number;
  lastOrder: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    stock: number;
    price: number;
}

export interface RawMaterial {
  id: string;
  name: string;
  stock: string;
  reorder: number;
}

export interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  status: 'Planning' | 'In Progress' | 'Completed';
  cost: number;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  total: number;
  status: 'قيد التنفيذ' | 'مكتمل' | 'مؤجل';
}

export interface JournalEntry {
  date: string;
  account: string;
  debit: number;
  credit: number;
  description: string;
}

export interface Settings {
    apiKey: string;
    apiSecret: string;
}