import React from 'react';
import Sidebar from './Sidebar';
import AppBar from './AppBar';


function MainLayout({ children, onTabChange, currentTab }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onTabChange={onTabChange} currentTab={currentTab} />
      <AppBar />
      <main className="ml-64 pt-16 p-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;