import React from 'react';

function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-semibold mt-2">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.value}
        </span>
      </div>
    </div>
  );
}

export default StatCard;