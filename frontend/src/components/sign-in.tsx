import React from 'react';
import { UserCircle, Users, HardHat } from 'lucide-react';

interface SignInProps {
  onSignIn: (role: 'worker' | 'supervisor') => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome to Worker Check-in System</h2>
          <p className="mt-2 text-gray-600">Please select your role to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSignIn('worker')}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <HardHat className="h-5 w-5" />
            <span>Sign in as Worker</span>
          </button>

          <button
            onClick={() => onSignIn('supervisor')}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <UserCircle className="h-5 w-5" />
            <span>Sign in as Supervisor</span>
          </button>
        </div>
      </div>
    </div>
  );
}