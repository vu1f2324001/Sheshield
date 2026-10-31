import React from 'react';
import SchemeCard from '../components/SchemeCard.jsx';
import { AlertCircle } from 'lucide-react';

export default function ResultsPage({ matches, savedIds, onToggleSave, onInspect, onBackToFinder }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E9DDE6] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">Evaluation Complete</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#5B214E]">Your Personalized Matches</h1>
          <p className="text-xs text-[#6B6170] mt-1">Found {matches.length} schemes evaluated against your background parameters.</p>
        </div>
        <button onClick={onBackToFinder} className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-[#E9DDE6] text-[#5B214E]">Adjust Profile</button>
      </div>

      <div className="p-3.5 rounded-xl bg-[#FFF9F5] border border-[#E9DDE6] flex items-center gap-3 text-xs text-[#6B6170]">
        <AlertCircle className="w-4 h-4 text-[#7C3AED] shrink-0" />
        <span><strong>Notice:</strong> Eligibility outputs are AI-assisted estimates. Final sanctioning is decided by administrative authorities.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(scheme => (
          <SchemeCard key={scheme.id} scheme={scheme} isSaved={savedIds.includes(scheme.id)} onToggleSave={onToggleSave} onInspect={onInspect} />
        ))}
      </div>
    </div>
  );
}
