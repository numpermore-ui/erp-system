import React, { useState } from 'react';
import ReportPreviewModal from '../components/ReportPreviewModal';
import { useToast } from '../hooks/useToast';


const reportTypes = [
  { id: 'sales', title: 'تقرير المبيعات الشامل', description: 'تحليل المبيعات حسب الفترة، المنتج، والعميل.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
  { id: 'financial', title: 'تقرير مالي', description: 'يشمل قائمة الدخل والميزانية العمومية.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
  { id: 'inventory', title: 'تقرير المخزون', description: 'جرد تفصيلي للمنتجات والمواد الخام.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg> },
  { id: 'purchasing', title: 'تقرير المشتريات', description: 'عرض أوامر الشراء وتكاليفها لكل مورد.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
  { id: 'shipping', title: 'تقرير الشحن', description: 'ملخص تكاليف وحالات الشحن.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg> },
];

const Reports: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<(typeof reportTypes)[0] | null>(null);
  const { showToast } = useToast();

  const handlePreview = (report: (typeof reportTypes)[0]) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  }

  const handleExport = (format: 'PDF' | 'Excel') => {
      showToast(`يتم الآن تصدير ${selectedReport?.title} كملف ${format}...`, 'success');
      setIsModalOpen(false);
  }

  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold text-white mb-6">مركز التقارير</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col justify-between">
              <div>
                <div className="text-[#ff4da6] mb-3">{report.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{report.title}</h4>
                <p className="text-sm text-gray-400">{report.description}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => handlePreview(report)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
                  معاينة وتصدير
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
       {selectedReport && (
            <ReportPreviewModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reportTitle={selectedReport.title}
                onExport={handleExport}
            />
        )}
    </>
  );
};

export default Reports;