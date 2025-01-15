import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from '../../pages/Participantdash/Dashboard';
import Allparticipant from '../../pages/Participantdash/Allparticipant';
import Viewuser from '../../pages/Participantdash/Viewuser';
import Edituser from '../../pages/Participantdash/Edituser';

function DashboardLayout() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    const targetPath = tab === 'dashboard' ? '/dashboard' : `/dashboard/{tab}`;
    navigate(targetPath); // Navigate to the correct path
  };

  return (
    <MainLayout onTabChange={handleTabChange} currentTab={currentTab}>
      <Routes>
        {/* Nested Routes */}
        <Route path="" element={<Dashboard />} />
        <Route path="/all-participant" element={<Allparticipant />} />
        <Route path="/dashboard/view-user/:id" element={<Viewuser />} />
        <Route path="/dashboard/edit-user/:id" element={<Edituser />} />
      </Routes>
    </MainLayout>
  );
}

export default DashboardLayout;
