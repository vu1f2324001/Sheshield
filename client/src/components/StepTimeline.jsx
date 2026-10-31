import React from 'react';

export default function StepTimeline({ currentStep, onSetStep }) {
  const steps = [
    { step: 1, title: 'Confirm Eligibility Match', desc: 'Review AI assessment reasoning.' },
    { step: 2, title: 'Prepare Necessary Documents', desc: 'Collect self-attested soft copies.' },
    { step: 3, title: 'Access Designated Portal', desc: 'Open authorized official departmental URL.' },
    { step: 4, title: 'Submit Online Application', desc: 'Fill personal details and attach scans.' },
    { step: 5, title: 'Save Acknowledgement Form', desc: 'Record your official reference token.' },
    { step: 6, title: 'Track Sanction & DBT Status', desc: 'Check bi-weekly progress until credit.' }
  ];

  return (
    <div className="space-y-4">
      {steps.map(item => {
        const isPassed = item.step <= currentStep;
        return (
          <div key={item.step} className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isPassed ? 'bg-white border-[#E9DDE6]' : 'bg-[#FFF9F5]/60 border-[#E9DDE6]/60 opacity-60'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-xl font-heading font-bold text-xs flex items-center justify-center shrink-0 ${isPassed ? 'bg-[#5B214E] text-white' : 'bg-[#E9DDE6] text-[#6B6170]'}`}>
                0{item.step}
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#241A24]">{item.title}</h3>
                <p className="text-xs text-[#6B6170] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div>
              {isPassed ? (
                <button onClick={() => onSetStep(Math.max(1, item.step - 1))} className="px-3 py-1.5 text-xs text-[#6B6170] hover:text-[#5B214E]">Undo</button>
              ) : (
                <button onClick={() => onSetStep(item.step)} className="px-3.5 py-1.5 rounded-lg bg-[#E85D8E] text-white text-xs font-semibold hover:bg-[#D44B7C]">Mark Complete</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
