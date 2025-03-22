'use client';
import React, { useState } from 'react';
import { ClipboardList, LogIn, History, LogOut } from 'lucide-react';
import { CheckInForm } from './check-in-form';
import { HistoricalEvents } from './historical-events';
import { LiveDashboard } from './live-dashboard';
import { User, UserRole } from '@/models/user';
import { SignIn } from './sign-in';

export function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'check-in' | 'dashboard' | 'history'>('check-in');

  const handleSignIn = (role: UserRole) => {
    setUser({ name: role === 'worker' ? 'Worker' : 'Supervisor', role });
    setView(role === 'worker' ? 'check-in' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('check-in');
  };

  if (!user) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Worker Check-in System</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user.role === 'worker' && (
                <button
                  onClick={() => setView('check-in')}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700"
                >
                  <LogIn className="w-5 h-5 mr-1" />
                  Check-in/out
                </button>
              )}
              
              {user.role === 'supervisor' && (
                <>
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
                  <button
                    onClick={() => setView('history')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      view === 'history'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <History className="w-5 h-5 mr-1" />
                    History
                  </button>
                </>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'check-in' && <CheckInForm />}
        {view === 'dashboard' && <LiveDashboard />}
        {view === 'history' && <HistoricalEvents />}
      </main>
    </div>
  );
}