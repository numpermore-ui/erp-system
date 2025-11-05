
import React from 'react';
import { NAV_ITEMS, NavItemType } from '../constants';

interface SidebarProps {
  activePage: NavItemType;
  setActivePage: (page: NavItemType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 border-l border-gray-700">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white tracking-widest">
          ERP <span className="text-[#ff4da6]">MIRAZA</span>
        </h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item);
            }}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activePage.id === item.id
                ? 'bg-[#ff4da6] text-white shadow-lg glow-shadow'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="mr-3">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
