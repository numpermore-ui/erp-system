import React from 'react';
import Modal from './Modal';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  onExport: (format: 'PDF' | 'Excel') => void;
}

const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({ isOpen, onClose, reportTitle, onExport }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`معاينة: ${reportTitle}`}>
      <div className="space-y-4">
        <div className="bg-gray-700/50 p-4 rounded-lg h-64 border border-gray-600">
            <p className="text-gray-400 text-center pt-24">محتوى التقرير التجريبي يظهر هنا...</p>
        </div>
         <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button 
                onClick={() => onExport('PDF')}
                className="px-5 py-2.5 text-sm font-medium text-white bg-[#ff4da6] rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300 glow-shadow">
                تصدير PDF
            </button>
            <button 
                 onClick={() => onExport('Excel')}
                 className="px-5 py-2.5 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500">
                تصدير Excel
            </button>
            <button 
                 onClick={onClose}
                 className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600">
                إغلاق
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportPreviewModal;
