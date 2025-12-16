import React from 'react';
import { useGetDashboardStatsQuery } from '@/services/adminService';

const AdminDashboard: React.FC = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminDashboard;
