import React from 'react';
import {  FileText, Users } from 'lucide-react';
import StatCard from '../../components/dashboard/stats/StatCard';
// import StatCard from '../components/dashboard/stats/StatCard';
// import RevenueChart from '../components/dashboard/charts/RevenueChart';
// import ProfitChart from '../components/dashboard/charts/ProfitChart';
// import RegionMap from '../components/dashboard/maps/RegionMap';

function Dashboard() {
  const stats = [
    {
      icon: Users,
      label: 'Total Participant',
      value: '$3.456K',
      trend: { value: '0.43% ↑', isPositive: true }
    },
    {
      icon: Users,
      label: 'Total Organizer',
      value: '$45.2K',
      trend: { value: '4.35% ↑', isPositive: true }
    },
    {
      icon: Users,
      label: 'Total Voter',
      value: '2,450',
      trend: { value: '2.59% ↑', isPositive: true }
    },
    {
      icon: Users,
      label: 'Total Users',
      value: '3,456',
      trend: { value: '0.95% ↓', isPositive: false }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* <RevenueChart /> */}
        </div>
        <div>
          {/* <ProfitChart /> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <RegionMap />drgvdrgvdrtg */}
      </div>
    </div>
  );
}

export default Dashboard;