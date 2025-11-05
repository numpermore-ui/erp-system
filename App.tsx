import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import CentralTracking from './pages/CentralTracking';
import Manufacturing from './pages/Manufacturing';
import Purchasing from './pages/Purchasing';
import Warehouses from './pages/Warehouses';
import AccountPayments from './pages/AccountPayments';
import Shipping from './pages/Shipping';
import POS from './pages/POS';
import Reports from './pages/Reports';
import GeneralAccounts from './pages/GeneralAccounts';
import Settings from './pages/Settings';
import PlaceholderPage from './pages/PlaceholderPage';
import { NAV_ITEMS, NavItemType } from './constants';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/Toast';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<NavItemType>(NAV_ITEMS[0]);

  const renderPage = () => {
    switch (activePage.id) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <Sales />;
      case 'central-tracking':
        return <CentralTracking />;
      case 'manufacturing':
        return <Manufacturing />;
      case 'purchasing':
        return <Purchasing />;
      case 'warehouses':
        return <Warehouses />;
      case 'payments':
        return <AccountPayments />;
      case 'shipping':
        return <Shipping />;
      case 'pos':
        return <POS />;
      case 'reports':
        return <Reports />;
      case 'general-accounts':
        return <GeneralAccounts />;
      case 'settings':
        return <Settings />;
      default:
        return <PlaceholderPage title={activePage.name} />;
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header pageTitle={activePage.name} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 lg:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
      <ToastContainer />
    </ToastProvider>
  );
};

export default App;