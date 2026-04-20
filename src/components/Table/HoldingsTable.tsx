import React, { useState, memo, useCallback, useMemo } from 'react';
import { useHarvesting } from '../../context/HarvestingContext';
import { formatCurrency, formatNumber } from '../../utils/format';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import type { Holding } from '../../types';

const GainDisplay = ({ gain, balance, symbol }: { gain: number; balance: number; symbol: string }) => {
  const isPositive = gain >= 0;
  const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
  const sign = isPositive ? '+' : '';
  
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`${colorClass} font-medium`}>
        {sign}{formatCurrency(gain)}
      </span>
      <span className="text-xs text-slate-500">
        {formatNumber(balance, 4)} {symbol}
      </span>
    </div>
  );
};

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (coinId: string) => void;
}

const HoldingRow = memo(({ holding, isSelected, onToggle }: HoldingRowProps) => {
  const symbol = holding.coin;
  
  return (
    <tr 
      className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-slate-800/30' : ''}`}
      onClick={() => onToggle(holding.coin)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(holding.coin);
        }
      }}
    >
      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center">
          <input 
            type="checkbox" 
            aria-label={`Select ${holding.coinName}`}
            className="w-4 h-4 rounded border-slate-700 bg-slate-800 accent-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer transition-shadow"
            checked={isSelected}
            onChange={() => onToggle(holding.coin)}
          />
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3 min-w-0">
          <img src={holding.logo} alt="" aria-hidden="true" className="w-8 h-8 rounded-full bg-slate-800 shrink-0" />
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-medium text-slate-200 truncate block max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" title={holding.coinName}>
              {holding.coinName}
            </span>
            <span className="text-xs text-slate-500">{symbol}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-right">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-slate-200">{formatNumber(holding.totalHolding, 4)} {symbol}</span>
          <span className="text-xs text-slate-500">{formatCurrency(holding.currentPrice)}/{symbol}</span>
        </div>
      </td>
      <td className="p-4 text-right font-medium text-slate-200">
        {formatCurrency(holding.totalHolding * holding.currentPrice)}
      </td>
      <td className="p-4 text-right">
        <GainDisplay gain={holding.stcg.gain} balance={holding.stcg.balance} symbol={symbol} />
      </td>
      <td className="p-4 text-right">
        <GainDisplay gain={holding.ltcg.gain} balance={holding.ltcg.balance} symbol={symbol} />
      </td>
      <td className="p-4 text-right font-medium text-slate-300 pr-6">
        {isSelected ? `${formatNumber(holding.totalHolding, 4)} ${symbol}` : '-'}
      </td>
    </tr>
  );
}, (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.holding.coin === nextProps.holding.coin;
});

export const HoldingsTable: React.FC = () => {
  const { holdings, selectedCoins, toggleCoinSelection, toggleSelectAll } = useHarvesting();
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: 'stcg' | 'ltcg' | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = 0;
        let bValue = 0;
        
        if (sortConfig.key === 'stcg') {
          aValue = a.stcg.gain;
          bValue = b.stcg.gain;
        } else if (sortConfig.key === 'ltcg') {
          aValue = a.ltcg.gain;
          bValue = b.ltcg.gain;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const displayedHoldings = isExpanded ? sortedHoldings : sortedHoldings.slice(0, 4);
  const isAllSelected = holdings.length > 0 && selectedCoins.size === holdings.length;
  const isIndeterminate = selectedCoins.size > 0 && selectedCoins.size < holdings.length;

  const handleSort = (key: 'stcg' | 'ltcg') => {
    let direction: 'asc' | 'desc' = 'desc'; // Default to descending to show highest gains/losses first
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: 'stcg' | 'ltcg') => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-50 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3.5 h-3.5 text-blue-400 opacity-100 transition-opacity" /> 
      : <ChevronDown className="w-3.5 h-3.5 text-blue-400 opacity-100 transition-opacity" />;
  };

  const handleToggle = useCallback((coinId: string) => {
    toggleCoinSelection(coinId);
  }, [toggleCoinSelection]);

  return (
    <div className="bg-[#1e1f25] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-800/80 bg-[#1e1f25]">
        <h2 className="text-xl font-semibold text-white">Holdings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300 min-w-[800px] table-fixed">
          <thead className="bg-[#12141c]/50 text-slate-400 font-medium">
            <tr>
              <th className="p-4 w-[5%] text-center">
                <div className="flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    aria-label="Select all holdings"
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 accent-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer transition-shadow"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={toggleSelectAll}
                  />
                </div>
              </th>
              <th className="p-4 w-[20%]">Asset</th>
              <th className="p-4 text-right w-[15%]">
                Holdings<br/>
                <span className="text-xs font-normal text-slate-500">Current Market Rate</span>
              </th>
              <th className="p-4 text-right w-[15%]">Total Current Value</th>
              <th className="p-4 text-right w-[15%]">
                <button 
                  onClick={() => handleSort('stcg')}
                  className="flex items-center justify-end gap-1.5 ml-auto group hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1 -mr-1 w-full"
                >
                  <span>Short-term</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {getSortIcon('stcg')}
                  </div>
                </button>
              </th>
              <th className="p-4 text-right w-[15%]">
                <button 
                  onClick={() => handleSort('ltcg')}
                  className="flex items-center justify-end gap-1.5 ml-auto group hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded px-1 -mr-1 w-full"
                >
                  <span>Long-Term</span>
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                    {getSortIcon('ltcg')}
                  </div>
                </button>
              </th>
              <th className="p-4 text-right pr-6 w-[15%]">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {displayedHoldings.map((holding) => (
              <HoldingRow 
                key={holding.coin}
                holding={holding}
                isSelected={selectedCoins.has(holding.coin)}
                onToggle={handleToggle}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {holdings.length > 4 && (
        <div className="p-4 border-t border-slate-800/80 bg-[#1e1f25]">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1e1f25] rounded px-2 py-1"
          >
            {isExpanded ? 'View less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
};