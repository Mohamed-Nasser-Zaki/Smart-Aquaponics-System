import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

interface SensorData {
  ph: number;
  temperature: number;
  waterLevel: number;
  timestamp: number;
}

export const useSensorData = () => {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sensorRef = ref(database, 'sensors');

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const latestData = {
            ph: data.ph || 0,
            temperature: data.temperature || 0,
            waterLevel: data.waterLevel || 0,
            timestamp: Date.now(),
          };

          setCurrentData(latestData);
          setHistoricalData(prev => [...prev, latestData].slice(-24)); // Keep last 24 readings
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching sensor data');
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentData, historicalData, loading, error };
};