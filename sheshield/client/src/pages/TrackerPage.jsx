import React from 'react';

export default function TrackerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#E9DDE6] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">Registry</span>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#5B214E]">My Applications</h1>
      </div>
      <div className="bg-white rounded-2xl border border-[#E9DDE6] p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-[#241A24]">AICTE Pragati Scholarship</h3>
        <p className="text-xs text-[#6B6170]">Current Step: Step 2 Documents In Progress</p>
      </div>
    </div>
  );
}
