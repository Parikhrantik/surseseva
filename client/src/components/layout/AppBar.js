import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

const AppBar = () => {
  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Settings size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">test</div>
              {/* <div className="text-xs text-gray-500">UX Designer</div> */}
            </div>
            <img
              src="https://avatars.githubusercontent.com/u/47383426?v=4"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;