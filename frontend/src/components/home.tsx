'use client';
import React, { useState } from 'react';
import { ClipboardList, LogIn } from 'lucide-react';
import { CheckInForm } from './check-in-form';
import { LiveDashboard } from './live-dashboard';

export function Home() {
  const [view, setView] = useState<'check-in' | 'dashboard'>('check-in');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Worker Check-in System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('check-in')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'check-in'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LogIn className="w-5 h-5 mr-1" />
                Check-in/out
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  view === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ClipboardList className="w-5 h-5 mr-1" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'check-in' && <CheckInForm />}
        {view === 'dashboard' && <LiveDashboard />}
      </main>
    </div>
  );
}