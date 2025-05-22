import React from 'react';
import { Smartphone } from '../icon/Smartphone';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">PilihPintar</h1>
              <p className="text-xs text-gray-500">Analisis Means-End untuk Smartphone</p>
            </div>
          </div>
          
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset Pilihan
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;