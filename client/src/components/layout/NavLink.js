import React from 'react';

export const NavLink = ({ icon: Icon, label, path, isActive }) => {
  return (
    <a
      href={`#${path}`}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </a>
  );
};
