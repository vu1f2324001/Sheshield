import React from 'react';
import { Shield, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, onDemoClick, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#E9DDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => setCurrentPage('landing')} className="flex items-center gap-2.5 text-left group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E85D8E] to-[#7C3AED] flex items-center justify-center text-white shadow-md shadow-[#E85D8E]/20 transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg text-[#5B214E] tracking-tight">Sheshield</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] border border-[#7C3AED]/20">2.0</span>
            </div>
            <p className="text-[10px] text-[#6B6170] -mt-0.5 font-medium">AI Benefit Discovery</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B6170]">
          <button onClick={() => setCurrentPage('landing')} className={`hover:text-[#5B214E] transition-colors ${currentPage === 'landing' ? 'text-[#E85D8E] font-semibold' : ''}`}>Home</button>
          <button onClick={() => setCurrentPage('finder')} className={`hover:text-[#5B214E] transition-colors ${currentPage === 'finder' ? 'text-[#E85D8E] font-semibold' : ''}`}>Explore Schemes</button>
          <button onClick={() => setCurrentPage('dashboard')} className={`hover:text-[#5B214E] transition-colors ${currentPage === 'dashboard' ? 'text-[#E85D8E] font-semibold' : ''}`}>Dashboard</button>
          <button onClick={() => setCurrentPage('tracker')} className={`hover:text-[#5B214E] transition-colors ${currentPage === 'tracker' ? 'text-[#E85D8E] font-semibold' : ''}`}>Application Tracker</button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onDemoClick} className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#FCE7F3] text-[#5B214E] border border-[#E85D8E]/30 hover:bg-[#E85D8E] hover:text-white transition-all shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Try Demo Profile
          </button>
          <button onClick={() => setCurrentPage('finder')} className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#5B214E] text-white hover:bg-[#431839] transition-all shadow-md shadow-[#5B214E]/15">
            Get Started
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#5B214E]" aria-label="Toggle Menu">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E9DDE6] bg-[#FFF9F5] px-4 py-4 space-y-3">
          <button onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-[#5B214E]">Home</button>
          <button onClick={() => { setCurrentPage('finder'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-[#5B214E]">Explore Schemes</button>
          <button onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-[#5B214E]">Dashboard</button>
          <button onClick={() => { setCurrentPage('tracker'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-semibold text-[#5B214E]">Tracker</button>
          <button onClick={() => { onDemoClick(); setMobileMenuOpen(false); }} className="w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-[#FCE7F3] text-[#5B214E]">
            ✦ Try Demo Profile
          </button>
        </div>
      )}
    </header>
  );
}
