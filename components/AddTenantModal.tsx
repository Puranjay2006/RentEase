import React, { useState, useEffect } from 'react';
import { Tenant } from '../types';
import { XIcon } from './icons';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTenant: (tenantData: Omit<Tenant, 'id'>) => void;
}

const initialFormState: Omit<Tenant, 'id'> = {
  name: '',
  age: 0,
  monthlyIncome: 0,
  creditScore: 0,
  employmentHistory: '',
  rentalHistory: '',
  references: '',
};

const AddTenantModal: React.FC<AddTenantModalProps> = ({ isOpen, onClose, onAddTenant }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() === '') {
        alert('Tenant name is required.');
        return;
    }
    onAddTenant(formData);
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] m-4 text-white animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Add New Tenant</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
               <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Age</label>
                <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-300 mb-1">Monthly Income ($)</label>
                <input type="number" name="monthlyIncome" id="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
               <div>
                <label htmlFor="creditScore" className="block text-sm font-medium text-gray-300 mb-1">Credit Score</label>
                <input type="number" name="creditScore" id="creditScore" value={formData.creditScore} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            </div>
            <div>
              <label htmlFor="employmentHistory" className="block text-sm font-medium text-gray-300 mb-1">Employment History</label>
              <textarea name="employmentHistory" id="employmentHistory" value={formData.employmentHistory} onChange={handleChange} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
              <label htmlFor="rentalHistory" className="block text-sm font-medium text-gray-300 mb-1">Rental History</label>
              <textarea name="rentalHistory" id="rentalHistory" value={formData.rentalHistory} onChange={handleChange} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div>
              <label htmlFor="references" className="block text-sm font-medium text-gray-300 mb-1">References</label>
              <textarea name="references" id="references" value={formData.references} onChange={handleChange} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
          </div>
          <div className="flex justify-end p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 mr-2 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors">
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantModal;
