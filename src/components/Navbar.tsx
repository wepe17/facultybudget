import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-2" />
            <span className="font-semibold text-xl">UniScore</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.name}</span>
            <span className="px-2 py-1 text-xs bg-indigo-700 rounded-full">
              {user?.role}
            </span>
            <button
              onClick={logout}
              className="p-2 hover:bg-indigo-700 rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}