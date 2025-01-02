import React from 'react';
import { Home, User,  Settings, HelpCircle, LogOut } from 'lucide-react';
import { NavLink } from './NavLink';

const navItems = [
  { icon: Home, label: 'Dashboard', path: 'dashboard' },
  { icon: User, label: 'Allparticipant', path: 'all-participant' },
  // { icon: BarChart2, label: 'Analytics', path: 'analytics' },
  // { icon: Activity, label: 'Performance', path: 'performance' }
];

const bottomNavItems = [
  { icon: Settings, label: 'Settings', path: 'settings' },
  { icon: HelpCircle, label: 'Help', path: 'help' },
  { icon: LogOut, label: 'Logout', path: 'logout' }
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-sm flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold">SUSEVA</span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;