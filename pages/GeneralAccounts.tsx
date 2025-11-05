import React, { useState } from 'react';
import { JournalEntry } from '../types';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';

const initialJournalEntries: JournalEntry[] = [
  { date: '2023-10-27', account: 'النقدية', debit: 1250, credit: 0, description: 'مبيعات Shopify #SHPF-5821' },
  { date: '2023-10-27', account: 'إيرادات المبيعات', debit: 0, credit: 1250, description: 'مبيعات Shopify #SHPF-5821' },
  { date: '2023-10-22', account: 'مخزون الإكسسوارات', debit: 12000, credit: 0, description: 'شراء من مورد الإكسسوارات' },
  { date: '2023-10-22', account: 'الدائنون', debit: 0, credit: 12000, description: 'فاتورة شراء #PO-056' },
  { date: '2023-10-20', account: 'مصروفات إعلانية', debit: 5000, credit: 0, description: 'حملة إعلانية فيسبوك' },
  { date: '2023-10-20', account: 'النقدية', debit: 0, credit: 5000, description: 'دفع لحملة إعلانية' },
];

const GeneralAccounts: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(initialJournalEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  
  const handleAddEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEntry: JournalEntry = {
      date: new Date().toISOString().split('T')[0],
      account: formData.get('account') as string,
      debit: parseFloat(formData.get('debit') as string) || 0,
      credit: parseFloat(formData.get('credit') as string) || 0,
      description: formData.get('description') as string,
    };
    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
    showToast('تم إضافة القيد بنجاح!', 'success');
  }

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">القيود اليومية</h3>
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
            إضافة قيد يومية
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3">التاريخ</th>
                <th scope="col" className="px-6 py-3">الحساب</th>
                <th scope="col" className="px-6 py-3">مدين</th>
                <th scope="col" className="px-6 py-3">دائن</th>
                <th scope="col" className="px-6 py-3">الوصف</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">{entry.date}</td>
                  <td className="px-6 py-4 font-medium text-white">{entry.account}</td>
                  <td className="px-6 py-4 font-mono text-green-400">{entry.debit > 0 ? entry.debit.toFixed(2) : '-'}</td>
                  <td className="px-6 py-4 font-mono text-red-400">{entry.credit > 0 ? entry.credit.toFixed(2) : '-'}</td>
                  <td className="px-6 py-4 text-gray-400">{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة قيد يومية جديد">
        <form onSubmit={handleAddEntry} className="space-y-4">
          <div>
            <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-300">اسم الحساب</label>
            <input type="text" name="account" id="account" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="debit" className="block mb-2 text-sm font-medium text-gray-300">مدين</label>
              <input type="number" step="0.01" name="debit" id="debit" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" />
            </div>
            <div>
              <label htmlFor="credit" className="block mb-2 text-sm font-medium text-gray-300">دائن</label>
              <input type="number" step="0.01" name="credit" id="credit" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">الوصف</label>
            <textarea name="description" id="description" rows={3} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-[#ff4da6] focus:border-[#ff4da6] block w-full p-2.5" required></textarea>
          </div>
          <button type="submit" className="w-full text-white bg-[#ff4da6] hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center glow-shadow">
            إضافة القيد
          </button>
        </form>
      </Modal>
    </>
  );
};

export default GeneralAccounts;