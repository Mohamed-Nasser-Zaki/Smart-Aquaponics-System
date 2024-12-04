import React from 'react';
import { Card } from './ui/Card';

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
}

export const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, icon }) => {
  return (
    <Card className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-blue-600">{value}</span>
              <span className="text-gray-500">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};