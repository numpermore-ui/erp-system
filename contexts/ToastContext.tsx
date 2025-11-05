import React, { createContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastMessage {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: ToastMessage | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};