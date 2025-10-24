import React from 'react';
import { Tenant } from '../types';
import { UserIcon, PlusIcon } from './icons';

interface TenantListProps {
  tenants: Tenant[];
  selectedTenant: Tenant | null;
  onSelectTenant: (tenant: Tenant) => void;
  onAddTenantClick: () => void;
}

const TenantList: React.FC<TenantListProps> = ({ tenants, selectedTenant, onSelectTenant, onAddTenantClick }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-white">Tenant Applications</h2>
            <p className="text-sm text-gray-400">Select an applicant to review</p>
        </div>
        <button 
            onClick={onAddTenantClick}
            className="p-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
            aria-label="Add new tenant"
        >
            <PlusIcon className="w-5 h-5"/>
        </button>
      </div>
      <ul className="divide-y divide-gray-700 max-h-[70vh] overflow-y-auto">
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            <button
              onClick={() => onSelectTenant(tenant)}
              className={`w-full text-left p-4 transition-colors duration-200 ${
                selectedTenant?.id === tenant.id
                  ? 'bg-indigo-600/30'
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${selectedTenant?.id === tenant.id ? 'bg-indigo-500' : 'bg-gray-600'}`}>
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{tenant.name}</p>
                  <p className="text-sm text-gray-400">Credit Score: {tenant.creditScore}</p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantList;
