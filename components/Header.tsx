
import React from 'react';
import { BuildingIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BuildingIcon className="w-8 h-8 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              RentEase
            </h1>
          </div>
          <p className="text-sm text-gray-400 hidden sm:block">AI-Powered Tenant Verification</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
