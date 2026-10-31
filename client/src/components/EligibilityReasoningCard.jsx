import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export default function EligibilityReasoningCard({ evaluation }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 shadow-sm space-y-5">
      <div className="border-b border-[#E9DDE6] pb-3">
        <h2 className="font-heading font-bold text-base text-[#5B214E]">Transparent Eligibility Reasoning</h2>
        <p className="text-xs text-[#6B6170]">{evaluation.score}% match confidence based on the profile information provided.</p>
      </div>
      <div className="space-y-3">
        {evaluation.checks.map((check, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-[#E9DDE6] bg-[#FFF9F5] flex items-start gap-3">
            {check.status === 'PASS' ? (
              <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
            ) : check.status === 'PARTIAL' ? (
              <AlertTriangle className="w-4 h-4 text-[#B06000] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-bold text-[#241A24]">{check.title}</p>
              <p className="text-xs text-[#6B6170] mt-0.5">{check.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
