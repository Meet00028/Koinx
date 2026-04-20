import React from 'react';
import { HarvestingProvider, useHarvesting } from './context/HarvestingContext';
import { Layout } from './components/Layout';
import { Loader2, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isLoading, error } = useHarvesting();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center text-blue-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Calculating optimal tax savings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="text-xl font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <Layout />;
};

function App() {
  return (
    <HarvestingProvider>
      <AppContent />
    </HarvestingProvider>
  );
}

export default App;