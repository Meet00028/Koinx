import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

export const NoticeBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#121b33] border border-indigo-900/60 rounded-xl overflow-hidden mb-6 text-slate-300">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-indigo-900/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 text-indigo-100">
          <Info size={20} className="text-indigo-400 shrink-0" />
          <span className="font-medium text-sm">Important Notes & Disclaimers</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-indigo-400 shrink-0" /> : <ChevronDown size={20} className="text-indigo-400 shrink-0" />}
      </div>
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-indigo-200/80 border-t border-indigo-900/30">
          <ul className="list-disc pl-5 space-y-2 ml-7">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
};