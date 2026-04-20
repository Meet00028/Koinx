import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { CapitalGains, Holding } from '../types';
import { fetchHoldings, fetchCapitalGains } from '../services/api';
import { calculatePreHarvesting, calculatePostHarvesting } from '../utils/calculations';
import type { PreHarvestingResult, PostHarvestingResult } from '../utils/calculations';

interface HarvestingContextType {
  initialGains: CapitalGains | null;
  holdings: Holding[];
  selectedCoins: Set<string>;
  isLoading: boolean;
  error: string | null;
  preHarvestingData: PreHarvestingResult | null;
  postHarvestingData: PostHarvestingResult | null;
  toggleCoinSelection: (coinId: string) => void;
  toggleSelectAll: () => void;
}

const HarvestingContext = createContext<HarvestingContextType | undefined>(undefined);

export const HarvestingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialGains, setInitialGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [fetchedHoldings, fetchedGains] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(fetchedHoldings);
        setInitialGains(fetchedGains);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const preHarvestingData = useMemo(() => {
    if (!initialGains) return null;
    return calculatePreHarvesting(initialGains);
  }, [initialGains]);

  const postHarvestingData = useMemo(() => {
    if (!initialGains) return null;
    return calculatePostHarvesting(initialGains, holdings, selectedCoins);
  }, [initialGains, holdings, selectedCoins]);

  const toggleCoinSelection = (coinId: string) => {
    setSelectedCoins(prev => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) {
        newSet.delete(coinId);
      } else {
        newSet.add(coinId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    setSelectedCoins(prev => {
      if (prev.size === holdings.length) {
        return new Set();
      } else {
        return new Set(holdings.map(h => h.coin));
      }
    });
  };

  return (
    <HarvestingContext.Provider
      value={{
        initialGains,
        holdings,
        selectedCoins,
        isLoading,
        error,
        preHarvestingData,
        postHarvestingData,
        toggleCoinSelection,
        toggleSelectAll
      }}
    >
      {children}
    </HarvestingContext.Provider>
  );
};

export const useHarvesting = () => {
  const context = useContext(HarvestingContext);
  if (context === undefined) {
    throw new Error('useHarvesting must be used within a HarvestingProvider');
  }
  return context;
};