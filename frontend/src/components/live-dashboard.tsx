import React, { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { CheckInEvent } from '@/models/check-in-event';
import { getOnSiteWorkers } from '@/service/api';

export function LiveDashboard() {
  const [activeWorkers, setActiveWorkers] = useState<CheckInEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workers = await getOnSiteWorkers();
        setActiveWorkers(workers);
      } catch (error) {
        console.error('Error fetching active workers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
    const interval = setInterval(fetchWorkers, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Workers</h2>
      
      {activeWorkers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No workers currently checked in</p>
      ) : (
        <div className="grid gap-4">
          {activeWorkers.map((worker) => (
            <div
              key={worker.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {worker.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{worker.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>Site: {worker.site_id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>
                      {format(new Date(worker.timestamp), 'h:mm a')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {format(new Date(worker.timestamp), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}