import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Shield, ArrowRight, FileText, Lock, ExternalLink } from 'lucide-react';

export default function AutonomousAgentView() {
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluatedSchemes, setEvaluatedSchemes] = useState([]);
  
  const verifiedProfile = {
    fullName: 'Akshada Valkunde',
    annualIncome: 150000,
    category: 'OBC',
    institution: "Padmabhushan Vasantdada Patil Pratishthan's COE",
    domicile: 'Maharashtra'
  };

  const sampleSchemes = [
    {
      schemeId: 'SCHEME_MAHA_RAJARSHI_CHHATRAPATI',
      schemeName: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna',
      adminAuthority: 'Higher & Technical Education Department, Govt. of Maharashtra',
      portalUrl: 'https://mahadbt.maharashtra.gov.in',
      isEligible: true,
      status: 'ELIGIBLE',
      passedRules: [
        'Annual income ₹1,50,000 is within ceiling of ₹8,00,000',
        'Social category OBC qualifies',
        'Maharashtra Domicile verified'
      ]
    },
    {
      schemeId: 'SCHEME_PRAGATI_WOMEN_SCHOLARSHIP',
      schemeName: 'AICTE Pragati Scholarship Scheme for Girl Students',
      adminAuthority: 'AICTE, Central Government',
      portalUrl: 'https://scholarships.gov.in',
      isEligible: true,
      status: 'ELIGIBLE',
      passedRules: [
        'Target gender Female qualifies',
        'Enrolled in Degree Technical Education'
      ]
    }
  ];

  const runEvaluation = () => {
    setLoading(true);
    setTimeout(() => {
      setEvaluatedSchemes(sampleSchemes);
      setLoading(false);
    }, 400);
  };

  const triggerAutoFill = (scheme) => {
    setLoading(true);
    setTimeout(() => {
      setActiveWorkflow({
        _id: 'wf_' + Date.now(),
        schemeName: scheme.schemeName,
        status: 'HUMAN_ACTION_REQUIRED',
        requiredHumanAction: {
          actionType: 'OTP_VERIFICATION',
          promptMessage: 'MahaDBT Gateway triggered an Aadhaar OTP verification to link DBT scholarship credit to your bank account.'
        }
      });
      setLoading(false);
    }, 500);
  };

  const resolveHumanStep = () => {
    if (!otpInput) return;
    setLoading(true);
    setTimeout(() => {
      setActiveWorkflow({
        _id: activeWorkflow._id,
        schemeName: activeWorkflow.schemeName,
        status: 'READY_FOR_REVIEW',
        formData: {
          applicant_name: verifiedProfile.fullName,
          annual_income: '₹' + verifiedProfile.annualIncome.toLocaleString(),
          caste_category: verifiedProfile.category,
          institution: verifiedProfile.institution,
          aadhaar_auth_status: 'VERIFIED'
        }
      });
      setOtpInput('');
      setLoading(false);
    }, 400);
  };

  const submitApplication = () => {
    setLoading(true);
    setTimeout(() => {
      setActiveWorkflow({
        _id: activeWorkflow._id,
        schemeName: activeWorkflow.schemeName,
        status: 'SUBMITTED',
        submissionDetails: {
          applicationRefNumber: 'MH-DBT-2026-894120',
          submissionDate: new Date(),
          officialTrackingUrl: 'https://mahadbt.maharashtra.gov.in/disbursement/track'
        }
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="text-purple-600" /> Sheshield 2.0 Autonomous Agent
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Autonomous Form Preparation with Guardrailed HITL Resumption</p>
        </div>
        <button 
          onClick={runEvaluation} 
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white font-medium text-sm rounded-lg hover:bg-purple-700 transition"
        >
          {loading ? 'Evaluating...' : 'Discover & Evaluate Schemes'}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs sm:text-sm">
        <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <FileText size={16} className="text-purple-600" /> Verified Personal Facts (Derived from Documents)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div><span className="text-slate-400 block">Name:</span> <span className="font-medium">{verifiedProfile.fullName}</span></div>
          <div><span className="text-slate-400 block">Family Income:</span> <span className="font-medium">₹{verifiedProfile.annualIncome.toLocaleString()}</span></div>
          <div><span className="text-slate-400 block">Category:</span> <span className="font-medium">{verifiedProfile.category}</span></div>
          <div><span className="text-slate-400 block">Institution:</span> <span className="font-medium truncate block">{verifiedProfile.institution}</span></div>
        </div>
      </div>

      {evaluatedSchemes.length > 0 && !activeWorkflow && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-800">Evaluated Welfare & Scholarship Schemes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {evaluatedSchemes.map((scheme) => (
              <div key={scheme.schemeId} className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                      {scheme.status}
                    </span>
                    <a href={scheme.portalUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mt-2">{scheme.schemeName}</h4>
                  <p className="text-xs text-slate-500 mt-1">{scheme.adminAuthority}</p>
                  <div className="mt-3 space-y-1">
                    {scheme.passedRules.map((rule, idx) => (
                      <div key={idx} className="text-xs text-emerald-700 flex items-center gap-1">
                        <CheckCircle size={13} /> {rule}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => triggerAutoFill(scheme)}
                  disabled={!scheme.isEligible}
                  className="mt-4 w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  Prepare Application with AI <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeWorkflow && (
        <div className="border border-purple-200 bg-purple-50/50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-purple-700 tracking-wider uppercase">Active Agent Session</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeWorkflow.schemeName}</h3>
            </div>
            <span className="px-2.5 py-1 bg-purple-100 text-purple-800 font-semibold text-xs rounded-full">
              {activeWorkflow.status}
            </span>
          </div>

          {activeWorkflow.status === 'HUMAN_ACTION_REQUIRED' && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle size={16} className="text-amber-600" /> Human Action Required to Continue
              </div>
              <p className="text-xs text-amber-800">
                {activeWorkflow.requiredHumanAction?.promptMessage}
              </p>
              <div className="flex gap-2 max-w-sm mt-2">
                <input
                  type="password"
                  placeholder="Enter 6-digit Portal OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="px-3 py-1.5 border rounded-lg text-xs w-full bg-white"
                />
                <button
                  onClick={resolveHumanStep}
                  disabled={loading || !otpInput}
                  className="px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 whitespace-nowrap"
                >
                  Verify & Resume
                </button>
              </div>
            </div>
          )}

          {activeWorkflow.status === 'READY_FOR_REVIEW' && (
            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3">
              <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <Lock size={15} className="text-emerald-600" /> Application Form Ready for Verification
              </h4>
              <p className="text-xs text-slate-500">
                Agent has populated parameters. Review all fields before authorizing submission.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 font-mono text-slate-700">
                {Object.entries(activeWorkflow.formData || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="font-semibold">{k}:</span>
                    <span>{String(v)}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={submitApplication}
                disabled={loading}
                className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition"
              >
                Approve & Execute Official Submission
              </button>
            </div>
          )}

          {activeWorkflow.status === 'SUBMITTED' && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle size={18} className="text-emerald-600" /> Official Application Submitted Successfully
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block">Reference Number:</span>
                  <span className="font-bold text-slate-900 font-mono">{activeWorkflow.submissionDetails.applicationRefNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Submission Timestamp:</span>
                  <span className="font-medium">{new Date(activeWorkflow.submissionDetails.submissionDate).toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-1">
                <a
                  href={activeWorkflow.submissionDetails.officialTrackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-700 font-semibold underline"
                >
                  Verify on Official Government Portal <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
