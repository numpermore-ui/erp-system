import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="text-center py-16 px-6 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 text-[#ff4da6]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;
