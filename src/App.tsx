import React from 'react';
import { Droplet, Thermometer, TestTube } from 'lucide-react';
import { SensorCard } from './components/SensorCard';
import { SensorChart } from './components/SensorChart';
import { HistoricalDataTable } from './components/HistoricalDataTable';
import { useSensorData } from './hooks/useSensorData';

function App() {
  const { currentData, historicalData, loading, error } = useSensorData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading sensor data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Aquaponics Monitoring System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SensorCard
            title="pH Level"
            value={currentData?.ph.toFixed(2) || '0'}
            unit="pH"
            icon={<TestTube className="w-6 h-6 text-blue-600" />}
          />
          <SensorCard
            title="Water Temperature"
            value={currentData?.temperature.toFixed(1) || '0'}
            unit="°C"
            icon={<Thermometer className="w-6 h-6 text-red-600" />}
          />
          <SensorCard
            title="Water Level"
            value={currentData?.waterLevel.toFixed(1) || '0'}
            unit="%"
            icon={<Droplet className="w-6 h-6 text-green-600" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">pH History</h3>
            <SensorChart
              data={historicalData.map(d => d.ph)}
              labels={historicalData.map(d => formatTime(d.timestamp))}
              label="pH Level"
              borderColor="#2563eb"
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Temperature History</h3>
            <SensorChart
              data={historicalData.map(d => d.temperature)}
              labels={historicalData.map(d => formatTime(d.timestamp))}
              label="Temperature (°C)"
              borderColor="#dc2626"
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Water Level History</h3>
            <SensorChart
              data={historicalData.map(d => d.waterLevel)}
              labels={historicalData.map(d => formatTime(d.timestamp))}
              label="Water Level (%)"
              borderColor="#16a34a"
            />
          </div>
        </div>

        <div className="mt-8">
          <HistoricalDataTable data={historicalData} />
        </div>
      </div>
    </div>
  );
}

export default App;