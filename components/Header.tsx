
import React from 'react';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-gray-800 border-b border-gray-700">
      <h2 className="text-2xl font-semibold text-white">{pageTitle}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="بحث..."
            className="w-full py-2 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff4da6]"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
        </div>
        <button className="p-2 text-gray-400 bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff4da6]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <div className="flex items-center space-x-2">
            <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User avatar" />
            <div className="text-right">
                <p className="text-sm font-medium text-white">مدير النظام</p>
                <p className="text-xs text-gray-400">Miraza Admin</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
