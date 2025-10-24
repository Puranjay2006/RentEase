
import React from 'react';
import { Tenant } from '../types';

interface TenantDetailsProps {
  tenant: Tenant;
}

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-400">{label}</p>
    <p className="text-md text-white">{value}</p>
  </div>
);

const TenantDetails: React.FC<TenantDetailsProps> = ({ tenant }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">{tenant.name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
        <DetailItem label="Age" value={tenant.age} />
        <DetailItem label="Monthly Income" value={`$${tenant.monthlyIncome.toLocaleString()}`} />
        <DetailItem label="Credit Score" value={tenant.creditScore} />
        <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-400">Employment History</p>
            <p className="text-md text-white whitespace-pre-wrap">{tenant.employmentHistory}</p>
        </div>
        <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-400">Rental History</p>
            <p className="text-md text-white whitespace-pre-wrap">{tenant.rentalHistory}</p>
        </div>
         <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-400">References</p>
            <p className="text-md text-white whitespace-pre-wrap">{tenant.references}</p>
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
