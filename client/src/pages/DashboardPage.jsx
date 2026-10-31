import React from 'react';

export default function DashboardPage({ schemes, savedIds, onSelectScheme, onExplore }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#5B214E]">Good morning, Akshada 👋</h1>
        <button onClick={onExplore} className="px-4 py-2 rounded-xl bg-[#5B214E] text-white text-xs font-semibold">Find More Schemes</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E9DDE6] shadow-sm">
          <p className="text-xs text-[#6B6170]">Schemes Analyzed</p>
          <p className="font-heading text-2xl font-extrabold text-[#5B214E] mt-1">{schemes.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#E9DDE6] shadow-sm">
          <p className="text-xs text-[#6B6170]">Saved Schemes</p>
          <p className="font-heading text-2xl font-extrabold text-[#7C3AED] mt-1">{savedIds.length}</p>
        </div>
      </div>
    </div>
  );
}
