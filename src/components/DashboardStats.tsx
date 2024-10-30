import React from 'react';
import { DollarSign, Users, Award, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1">
              +{trend}% from last year
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Budget"
        value="$24.5M"
        icon={<DollarSign className="h-6 w-6 text-indigo-600" />}
        trend="12"
      />
      <StatsCard
        title="Faculties"
        value="8"
        icon={<Users className="h-6 w-6 text-indigo-600" />}
      />
      <StatsCard
        title="Accredited Programs"
        value="42"
        icon={<Award className="h-6 w-6 text-indigo-600" />}
        trend="8"
      />
      <StatsCard
        title="Average Score"
        value="85.2"
        icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
        trend="5"
      />
    </div>
  );
}