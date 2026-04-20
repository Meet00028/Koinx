import React, { useState } from 'react';
import { NoticeBar } from './NoticeBar';
import { CardsContainer } from './Cards/CardsContainer';
import { HoldingsTable } from './Table/HoldingsTable';

export const Layout: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Mock Header */}
      <header className="border-b border-slate-800 bg-[#12141c] px-6 py-4 flex items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-blue-500 font-extrabold text-2xl tracking-tighter">Koin<span className="text-amber-500">X</span></span>
          <span className="text-[10px] align-top bg-slate-800/80 text-slate-400 px-1 py-0.5 rounded leading-none">®</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Tax Harvesting</h1>
          <div 
            className="relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-4 transition-colors">
              How it works?
            </a>
            
            {/* Tooltip */}
            <div 
              className={`absolute top-full left-0 mt-2 w-72 bg-white text-slate-800 text-sm rounded-lg p-4 shadow-xl z-50 transition-all duration-200 origin-top-left ${
                showTooltip ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
            >
              <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45 border-l border-t border-transparent"></div>
              <p className="relative z-10 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. <a href="#" className="text-blue-600 font-medium hover:underline">Know More</a>
              </p>
            </div>
          </div>
        </div>
        
        <NoticeBar />
        <CardsContainer />
        <HoldingsTable />
      </main>
    </div>
  );
};