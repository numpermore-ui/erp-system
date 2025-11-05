import React from 'react';
import { useToast } from '../hooks/useToast';

const ToastContainer: React.FC = () => {
  const { toast, hideToast } = useToast();

  if (!toast) {
    return null;
  }

  const baseClasses = "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center text-white";
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  const Icon = () => {
    if (toast.type === 'success') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[toast.type]} toast-container opacity-0 transform translate-x-full ${toast ? 'opacity-100 translate-x-0' : ''}`}
      style={{ direction: 'rtl' }}
    >
      <Icon />
      <span>{toast.message}</span>
      <button onClick={hideToast} className="mr-4 text-xl font-semibold">&times;</button>
    </div>
  );
};

export default ToastContainer;