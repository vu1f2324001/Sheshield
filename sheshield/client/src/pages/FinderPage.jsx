import React from 'react';
import AIChat from '../components/AIChat.jsx';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function FinderPage({ profile, setProfile, onRunAnalysis, onDemo, isProcessingAI }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-3xl font-extrabold text-[#5B214E]">Find Benefits That Fit You</h1>
        <p className="text-sm text-[#6B6170]">Provide your coordinates via guided parameters or natural conversational description.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
          <Sparkles className="w-4 h-4" /> Option A — Natural Language AI Intake
        </div>
        <AIChat onSubmitPrompt={onRunAnalysis} isLoading={isProcessingAI} />
      </div>

      <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#E9DDE6] pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5B214E]">Option B — Structured Form</div>
          <button onClick={onDemo} className="text-xs font-semibold text-[#E85D8E] hover:underline flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Fill Demo Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#5B214E] mb-1.5">Age</label>
            <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} className="w-full text-xs rounded-xl border border-[#E9DDE6] p-2.5 focus:border-[#E85D8E] focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#5B214E] mb-1.5">State</label>
            <select value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} className="w-full text-xs rounded-xl border border-[#E9DDE6] p-2.5 bg-white">
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#5B214E] mb-1.5">Occupation</label>
            <select value={profile.occupation} onChange={(e) => setProfile({ ...profile, occupation: e.target.value })} className="w-full text-xs rounded-xl border border-[#E9DDE6] p-2.5 bg-white">
              <option value="Student">Student</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Salaried">Salaried</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E9DDE6] flex justify-end">
          <button onClick={() => onRunAnalysis(null)} className="px-6 py-3 rounded-xl bg-[#5B214E] hover:bg-[#431839] text-white text-xs font-semibold flex items-center gap-2 shadow-md">
            Analyze My Eligibility <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
