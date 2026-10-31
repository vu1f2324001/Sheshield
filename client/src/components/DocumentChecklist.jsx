import React from 'react';
import { Check } from 'lucide-react';

export default function DocumentChecklist({ docs, tracker, onToggleDoc }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 shadow-sm space-y-4">
      <div>
        <h3 className="font-heading font-bold text-base text-[#5B214E]">Required Documents</h3>
        <p className="text-xs text-[#6B6170]">Self-verify your documentation readiness before filing.</p>
      </div>
      <div className="space-y-2.5">
        {docs.map((doc, idx) => {
          const isChecked = tracker?.documentsReady?.[doc.name] || false;
          return (
            <div key={idx} onClick={() => onToggleDoc(doc.name)} className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${isChecked ? 'bg-[#E6F4EA]/40 border-[#CEEAD6]' : 'bg-[#FFF9F5] border-[#E9DDE6]'}`}>
              <div className="flex items-start gap-2.5">
                <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center ${isChecked ? 'bg-[#137333] border-[#137333] text-white' : 'border-[#6B6170] bg-white'}`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#241A24]">{doc.name}</p>
                  <span className="text-[10px] text-[#6B6170]">{doc.mandatory ? 'Mandatory official document' : 'Supplemental support proof'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
