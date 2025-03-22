'use client';
import React, { useState } from 'react';
import { UserCircle, Building } from 'lucide-react';
import { checkIn, checkOut } from '@/service/api';

export function CheckInForm() {
  const [name, setName] = useState('');
  const [site_id, setsite_id] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'in' | 'out'>('in');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'in') {
        await checkIn(name, site_id);
      } else {
        await checkOut(name, site_id);
      }
      setName('');
      setsite_id('');
    } catch (err) {
      setError(`Failed to check ${mode}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Worker Check {mode}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6 flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setMode('in')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md ${
            mode === 'in'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Check In
        </button>
        <button
          type="button"
          onClick={() => setMode('out')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md ${
            mode === 'out'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Check Out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site ID
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={site_id}
              onChange={(e) => setsite_id(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter site ID"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? `Processing...` : `Check ${mode}`}
        </button>
      </form>
    </div>
  );
}