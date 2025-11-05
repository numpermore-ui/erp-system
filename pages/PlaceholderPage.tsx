
import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center bg-gray-800 p-12 rounded-2xl border border-gray-700">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#ff4da6]/20 text-[#ff4da6]">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l-2.387-.477a2 2 0 00-1.022.547zM16 8a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mt-6">{title}</h1>
        <p className="text-gray-400 mt-2">
          هذه الصفحة قيد التطوير حاليًا.
        </p>
        <p className="text-gray-500 mt-1 text-sm">
          سيتم إضافة الوظائف الكاملة لهذه الوحدة قريبًا.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
