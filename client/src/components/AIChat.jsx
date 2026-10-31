import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function AIChat({ onSubmitPrompt, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmitPrompt(input);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        placeholder="e.g., I am a 21-year-old engineering student from Maharashtra looking for college fee scholarships..."
        className="w-full text-xs sm:text-sm rounded-xl border border-[#E9DDE6] p-3.5 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] bg-[#FFF9F5]/40"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-[11px] text-[#6B6170]">Our reasoning parser infers age, state, and category automatically.</span>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
        </button>
      </div>
    </form>
  );
}
