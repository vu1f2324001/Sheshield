import React from 'react';
import StepTimeline from '../components/StepTimeline.jsx';
import { ArrowRight } from 'lucide-react';

export default function ActionPlanPage({ scheme, currentStep, onSetStep, onGoTracker, onBack }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex justify-between items-center border-b border-[#E9DDE6] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">Roadmap</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#5B214E]">Your Path to Apply</h1>
          <p className="text-xs text-[#6B6170] mt-1">{scheme.name}</p>
        </div>
        <button onClick={onBack} className="text-xs font-semibold text-[#5B214E] hover:underline">Back to Details</button>
      </div>

      <StepTimeline currentStep={currentStep} onSetStep={onSetStep} />

      <div className="pt-4 flex justify-between items-center">
        <button onClick={onGoTracker} className="text-xs font-bold text-[#5B214E] hover:underline flex items-center gap-1.5">
          Go to Application Tracker <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
