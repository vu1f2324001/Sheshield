import React from 'react';
import EligibilityReasoningCard from '../components/EligibilityReasoningCard.jsx';
import DocumentChecklist from '../components/DocumentChecklist.jsx';
import { ChevronRight, ArrowRight, ExternalLink, Check } from 'lucide-react';

export default function SchemeDetailPage({ scheme, evaluation, tracker, onToggleDoc, onStartActionPlan, onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-2 text-xs text-[#6B6170]">
        <button onClick={onBack} className="hover:underline">Results</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#5B214E] font-medium">{scheme.name}</span>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 sm:p-8 shadow-sm space-y-4">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#5B214E]">{scheme.name}</h1>
        <p className="text-sm text-[#6B6170] max-w-3xl">{scheme.shortDesc}</p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button onClick={onStartActionPlan} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D8E] to-[#7C3AED] text-white text-xs font-semibold flex items-center gap-2">
            <span>Start Step-by-Step Action Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a href={scheme.portalUrl} target="_blank" rel="noreferrer" className="px-4 py-2.5 rounded-xl border border-[#E9DDE6] text-[#5B214E] text-xs font-semibold flex items-center gap-2">
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <EligibilityReasoningCard evaluation={evaluation} />
          <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 shadow-sm space-y-3">
            <h3 className="font-heading font-bold text-base text-[#5B214E]">Key Benefits</h3>
            <ul className="space-y-2 text-xs text-[#6B6170]">
              {scheme.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-5">
          <DocumentChecklist docs={scheme.docs} tracker={tracker} onToggleDoc={onToggleDoc} />
        </div>
      </div>
    </div>
  );
}
