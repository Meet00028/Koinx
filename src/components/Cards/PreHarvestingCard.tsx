import React from 'react';
import { useHarvesting } from '../../context/HarvestingContext';
import { formatCurrency } from '../../utils/format';

export const PreHarvestingCard: React.FC = () => {
  const { initialGains, preHarvestingData } = useHarvesting();

  if (!initialGains || !preHarvestingData) return null;

  return (
    <div className="bg-[#1e1f25] border border-slate-800 rounded-xl p-6 flex flex-col text-slate-200">
      <h2 className="text-xl font-semibold mb-6 text-white">Pre Harvesting</h2>
      
      <div className="grid grid-cols-3 gap-y-4 gap-x-2 mb-8 text-sm">
        <div className="col-span-1"></div>
        <div className="col-span-1 font-medium text-slate-400 text-right">Short-term</div>
        <div className="col-span-1 font-medium text-slate-400 text-right">Long-term</div>

        <div className="col-span-1 text-slate-300 font-medium">Profits</div>
        <div className="col-span-1 text-right text-slate-200">{formatCurrency(initialGains.stcg.profits)}</div>
        <div className="col-span-1 text-right text-slate-200">{formatCurrency(initialGains.ltcg.profits)}</div>

        <div className="col-span-1 text-slate-300 font-medium">Losses</div>
        <div className="col-span-1 text-right text-slate-200">- {formatCurrency(initialGains.stcg.losses)}</div>
        <div className="col-span-1 text-right text-slate-200">- {formatCurrency(initialGains.ltcg.losses)}</div>

        <div className="col-span-1 text-slate-300 font-semibold mt-2">Net Capital Gains</div>
        <div className="col-span-1 text-right font-semibold mt-2">{formatCurrency(preHarvestingData.netStcg)}</div>
        <div className="col-span-1 text-right font-semibold mt-2">{formatCurrency(preHarvestingData.netLtcg)}</div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-slate-800">
        <span className="text-lg font-medium text-white">Realised Capital Gains:</span>
        <span className="text-3xl font-bold text-white tracking-tight">{formatCurrency(preHarvestingData.realisedCapitalGains)}</span>
      </div>
    </div>
  );
};