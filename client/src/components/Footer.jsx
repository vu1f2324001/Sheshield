import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-white border-t border-[#E9DDE6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#5B214E] flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading font-bold text-base text-[#5B214E]">Sheshield 2.0</span>
            </div>
            <p className="text-xs text-[#6B6170]">“Discover. Verify. Decide. Apply.”</p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-[#6B6170] font-medium">
            <button onClick={() => setCurrentPage('landing')} className="hover:text-[#5B214E]">Home</button>
            <button onClick={() => setCurrentPage('finder')} className="hover:text-[#5B214E]">Explore Schemes</button>
            <button onClick={() => setCurrentPage('dashboard')} className="hover:text-[#5B214E]">Dashboard</button>
            <button onClick={() => setCurrentPage('tracker')} className="hover:text-[#5B214E]">Tracker</button>
          </div>
        </div>

        <div className="border-t border-[#E9DDE6] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#6B6170]">
          <p>Sheshield is an independent AI-assisted platform. Users should verify scheme requirements and final eligibility through official sources.</p>
          <p>© 2026 Sheshield Team. Built for civic empowerment.</p>
        </div>
      </div>
    </footer>
  );
}
