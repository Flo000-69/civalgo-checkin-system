'use client';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Clock, MapPin, Calendar, ArrowRightLeft } from 'lucide-react';
import { format } from 'date-fns';
import { getHistory } from '@/service/api';
import { CheckInEvent } from '@/models/check-in-event';

export function HistoricalEvents() {
  const [events, setEvents] = useState<CheckInEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    siteId: '',
    from: '',
    to: '',
  });

  const fetchEvents = async (f = filters) => {
    setLoading(true);
    try {
      const data = await getHistory(f);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((nextFilters: any) => {
      fetchEvents(nextFilters);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(filters);
  }, [filters, debouncedFetch]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Check-in History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Worker Name</label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            placeholder="Search by name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Site ID</label>
          <input
            type="text"
            value={filters.siteId}
            onChange={(e) => handleFilterChange('siteId', e.target.value)}
            placeholder="Filter by site"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => handleFilterChange('from', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => handleFilterChange('to', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events found for the selected filters</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    event.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <ArrowRightLeft className={`w-5 h-5 ${
                      event.type === 'in' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      <span>Site: {event.site_id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>{format(new Date(event.timestamp), 'h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    <span>{format(new Date(event.timestamp), 'MMM d, yyyy')}</span>
                  </div>
                  <div className={`text-xs mt-1 font-medium ${
                    event.type === 'in' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {event.type === 'in' ? 'Checked In' : 'Checked Out'}
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