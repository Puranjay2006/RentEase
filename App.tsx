import React, { useState, useCallback } from 'react';
import { Tenant, AnalysisResult } from './types';
import { tenants as sampleTenants } from './data/tenants';
import { analyzeTenantData } from './services/geminiService';
import Header from './components/Header';
import TenantList from './components/TenantList';
import TenantDetails from './components/TenantDetails';
import AnalysisDisplay from './components/AnalysisResult';
import AddTenantModal from './components/AddTenantModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RobotIcon } from './components/icons';

const App: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(sampleTenants);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleSelectTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAddTenant = (newTenantData: Omit<Tenant, 'id'>) => {
    const newTenant: Tenant = {
      id: Math.max(0, ...tenants.map(t => t.id)) + 1,
      ...newTenantData,
    };
    setTenants(prevTenants => [...prevTenants, newTenant]);
    setSelectedTenant(newTenant); // Optionally select the new tenant
    setIsAddModalOpen(false);
  };

  const handleAnalyze = useCallback(async () => {
    if (!selectedTenant) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeTenantData(selectedTenant);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to analyze tenant data. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTenant]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TenantList
              tenants={tenants}
              selectedTenant={selectedTenant}
              onSelectTenant={handleSelectTenant}
              onAddTenantClick={() => setIsAddModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedTenant ? (
              <div className="space-y-6">
                <TenantDetails tenant={selectedTenant} />
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4">AI Verification</h3>
                  <div className="min-h-[250px] flex flex-col items-center justify-center">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : error ? (
                      <div className="text-center text-red-400">
                        <p className="font-semibold">Analysis Failed</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    ) : analysisResult ? (
                      <AnalysisDisplay result={analysisResult} />
                    ) : (
                       <div className="text-center text-gray-400">
                        <RobotIcon className="w-12 h-12 mx-auto mb-2" />
                        <p>Ready to run AI analysis on {selectedTenant.name}.</p>
                      </div>
                    )}
                  </div>
                   <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="mt-6 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Analyzing...' : `Analyze with Gemini AI`}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800/50 border border-dashed border-gray-700 rounded-lg min-h-[400px]">
                <p className="text-gray-400 text-lg">Select a tenant to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <AddTenantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTenant={handleAddTenant}
      />
    </div>
  );
};

export default App;
