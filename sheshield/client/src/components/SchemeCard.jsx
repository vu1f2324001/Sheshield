import React from 'react';
import { Bookmark, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function SchemeCard({ scheme, isSaved, onToggleSave, onInspect }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#F3E8FF] text-[#7C3AED]">
            {scheme.govLevel} • {scheme.category}
          </span>
          <button onClick={() => onToggleSave(scheme.id)} className="p-1.5 rounded-lg text-[#6B6170] hover:text-[#E85D8E] hover:bg-[#FFF1F5]">
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#E85D8E] text-[#E85D8E]' : ''}`} />
          </button>
        </div>

        <div>
          <h3 className="font-heading font-bold text-base text-[#241A24] group-hover:text-[#5B214E] transition-colors">{scheme.name}</h3>
          <p className="text-xs text-[#6B6170] mt-1.5 leading-relaxed line-clamp-2">{scheme.shortDesc}</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#E9DDE6]/60 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#5B214E]">Match Confidence</span>
            <span className="font-bold text-[#E85D8E]">{scheme.evaluation.score}%</span>
          </div>
          <div className="w-full bg-[#E9DDE6] h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${scheme.evaluation.score >= 80 ? 'bg-[#137333]' : 'bg-[#E85D8E]'}`} style={{ width: `${scheme.evaluation.score}%` }} />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B6170]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
            <span>{scheme.evaluation.checks.filter(c => c.status === 'PASS').length} rules verified</span>
          </div>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-[#E9DDE6] flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold text-[#5B214E]">{scheme.evaluation.tier}</span>
        <button onClick={() => onInspect(scheme.id)} className="px-3.5 py-2 rounded-xl bg-[#5B214E] hover:bg-[#431839] text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
          Details & Checklist <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
