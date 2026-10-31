import React from 'react';
import { Sparkles, ArrowRight, Layers, AlertCircle, FileText, Compass, ChevronRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function LandingPage({ onExplore, onDemo, onInspectCard }) {
  return (
    <div className="space-y-24 py-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E8FF] border border-[#7C3AED]/20 text-xs font-semibold text-[#7C3AED]">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Women Benefit Assistant
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#241A24] leading-[1.12] tracking-tight">
              Government Benefits, <br />
              <span className="bg-gradient-to-r from-[#E85D8E] via-[#7C3AED] to-[#5B214E] bg-clip-text text-transparent">
                Made Personal.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B6170] max-w-2xl leading-relaxed">
              Sheshield helps women discover public initiatives they qualify for, explains the exact reasoning behind eligibility, highlights missing documentation, and generates a turnkey application path.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button onClick={onExplore} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E85D8E] to-[#7C3AED] text-white font-semibold text-sm shadow-lg shadow-[#E85D8E]/25 hover:opacity-95 transition-all flex items-center gap-2">
                <span>Find My Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onDemo} className="px-6 py-3.5 rounded-xl bg-white border border-[#E9DDE6] text-[#5B214E] font-semibold text-sm hover:bg-[#FFF1F5] hover:border-[#E85D8E]/40 transition-all shadow-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E85D8E]" />
                <span>Run Judge Demo Tour</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="bg-white/95 backdrop-blur border border-[#E9DDE6] rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#E9DDE6] pb-4">
                <h3 className="font-heading font-bold text-[#5B214E] text-base">Your Benefit Match Summary</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F4EA] text-[#137333]">92% Confidence</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FFF1F5] border border-[#FCE7F3]">
                  <h4 className="font-heading text-xs font-bold text-[#5B214E]">AICTE Pragati Scholarship</h4>
                  <p className="text-[11px] text-[#6B6170]">Direct financial grant of ₹50,000/year for technical degree studies.</p>
                </div>
              </div>
              <button onClick={() => onInspectCard('pragati-scholarship')} className="w-full py-2.5 rounded-xl bg-[#5B214E] hover:bg-[#431839] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                View Personalized Explanation <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
