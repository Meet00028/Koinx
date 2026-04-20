import React from 'react';
import { useHarvesting } from '../../context/HarvestingContext';
import { formatCurrency } from '../../utils/format';

export const PostHarvestingCard: React.FC = () => {
  const { postHarvestingData } = useHarvesting();

  if (!postHarvestingData) return null;

  const { updatedGains, netStcg, netLtcg, effectiveCapitalGains, savings } = postHarvestingData;

  return (
    <div className="bg-blue-600 rounded-xl p-6 flex flex-col text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
      <h2 className="text-xl font-semibold mb-6">After Harvesting</h2>
      
      <div className="grid grid-cols-3 gap-y-4 gap-x-2 mb-8 text-sm">
        <div className="col-span-1"></div>
        <div className="col-span-1 font-medium text-blue-200 text-right">Short-term</div>
        <div className="col-span-1 font-medium text-blue-200 text-right">Long-term</div>

        <div className="col-span-1 text-blue-100 font-medium">Profits</div>
        <div className="col-span-1 text-right text-white">{formatCurrency(updatedGains.stcg.profits)}</div>
        <div className="col-span-1 text-right text-white">{formatCurrency(updatedGains.ltcg.profits)}</div>

        <div className="col-span-1 text-blue-100 font-medium">Losses</div>
        <div className="col-span-1 text-right text-white">- {formatCurrency(updatedGains.stcg.losses)}</div>
        <div className="col-span-1 text-right text-white">- {formatCurrency(updatedGains.ltcg.losses)}</div>

        <div className="col-span-1 text-blue-100 font-semibold mt-2">Net Capital Gains</div>
        <div className="col-span-1 text-right font-semibold mt-2">{formatCurrency(netStcg)}</div>
        <div className="col-span-1 text-right font-semibold mt-2">{formatCurrency(netLtcg)}</div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-blue-500/50">
        <span className="text-lg font-medium text-blue-50">Effective Capital Gains:</span>
        <span className="text-3xl font-bold text-white tracking-tight">{formatCurrency(effectiveCapitalGains)}</span>
      </div>

      {savings > 0 && (
        <div className="mt-6 -mx-2 -mb-2 bg-blue-500/30 rounded-lg p-3 flex items-center gap-2 border border-blue-400/20">
          <span className="text-xl animate-bounce">🎉</span>
          <span className="font-medium text-blue-50 text-sm sm:text-base">
            You are going to save upto <span className="text-white font-bold ml-1">{formatCurrency(savings)}</span>
          </span>
        </div>
      )}
    </div>
  );
};