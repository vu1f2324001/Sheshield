import React, { useEffect, useState } from 'react';
import { getAIRecommendations } from './services/recommendationService';
import { 
  Shield, CheckCircle, ArrowRight, Sparkles, UploadCloud, 
  Bot, KeyRound, Check, XCircle, LogOut, User, ArrowLeft, ScanText, 
  Search, Loader2, LogIn, Globe, ExternalLink
} from 'lucide-react';

export default function App() {
  const getInitialLang = () => {
    try {
      const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
      return match ? match[1] : 'en';
    } catch (e) {
      return 'en';
    }
  };

  const [activeView, setActiveView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedLang, setSelectedLang] = useState(getInitialLang);

  const [authMode, setAuthMode] = useState('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [authError, setAuthError] = useState('');
  const [authStep, setAuthStep] = useState('form');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (otpTimer <= 0) return undefined;

    const timer = setTimeout(() => {
      setOtpTimer((previousTimer) => previousTimer - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [otpTimer]);

  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [liveGoogleUrl, setLiveGoogleUrl] = useState('');

  const changeLanguage = (langCode) => {
    setSelectedLang(langCode);
    const domain = window.location.hostname;
    const isLocal = domain === 'localhost' || domain === '127.0.0.1';

    if (langCode === 'en') {
      document.cookie = 'googtrans=/en/en; path=/;' + (isLocal ? '' : ' domain=' + domain + ';');
      document.cookie = 'googtrans=/en/en; path=/;';
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
      }
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname;
      }, 100);
      return;
    }

    document.cookie = 'googtrans=/en/' + langCode + '; path=/;' + (isLocal ? '' : ' domain=' + domain + ';');
    document.cookie = 'googtrans=/en/' + langCode + '; path=/;';
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
    setTimeout(() => { window.location.reload(); }, 150);
  };
  const ALL_MAHARASHTRA_SCHEMES = [
    {
      id: 'SCHEME_WIDOW_PENSION',
      name: 'Indira Gandhi / Sanjay Gandhi Niradhar Widow Pension Scheme',
      portalName: 'Social Justice Dept (Govt of Maharashtra)',
      grant: '₹1,500 / Month Direct DBT Support',
      desc: 'Monthly financial pension & social security assistance for widow, destitute, and divorced women (विधवा महिलांसाठी मासिक पेन्शन सहाय्य).',
      keywords: ['viddava', 'vidhava', 'vidhwa', 'widow', 'bai', 'sathi', 'pension', 'niradhar', 'sanjay gandhi', 'निराधार', 'विधवा', 'पेन्शन'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet', 'apaar'] },
        { id: 'death_cert', name: 'Husband Death Certificate', allowed: ['death', 'मृत्यू', 'mrutyu'], disallowed: ['apaar', 'marksheet'] },
        { id: 'income_cert', name: 'Income Certificate (Tehsildar)', allowed: ['income', 'उत्पन्न', 'tahsildar', 'revenue'], disallowed: ['aadhaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT Active)', allowed: ['passbook', 'bank', 'sbi'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_MAJHI_KANYA',
      name: 'Majhi Kanya Bhagyashree Scheme',
      portalName: 'Women & Child Welfare Dept (Maharashtra)',
      grant: '₹50,000 Direct Security Deposit',
      desc: 'Direct state social welfare, education security and financial support for girls & mothers.',
      keywords: ['kanya', 'bhagyashree', 'ration', 'bpl', 'mulgi', 'child', 'balika', 'girl', 'कन्या', 'मुलगी', 'रेशन'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
        { id: 'ration_card', name: 'Ration Card (BPL/Antyodaya)', allowed: ['ration', 'food', 'रेशन'], disallowed: ['apaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_PRAGATI',
      name: 'AICTE Pragati Scholarship for Girls',
      portalName: 'National Scholarship Portal (NSP)',
      grant: '₹50,000 / Year',
      desc: 'Technical degree & diploma tuition assistance for female students.',
      keywords: ['student', 'scholarship', 'college', 'shikshan', 'study', 'fee', 'bonafide', 'विद्यार्थिनी', 'शिक्षण', 'मुली'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet', 'apaar'] },
        { id: 'income_cert', name: 'Income Certificate', allowed: ['income', 'उत्पन्न', 'tehsildar'], disallowed: ['aadhaar'] },
        { id: 'bonafide', name: 'College Admission Bonafide', allowed: ['bonafide', 'college', 'fee'], disallowed: ['apaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank', 'sbi'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_MUDRA_WOMEN',
      name: 'Pradhan Mantri Mudra Yojana (Tarun & Kishor)',
      portalName: 'Udyamimitra Portal (Govt. of India)',
      grant: 'Up to ₹10 Lakhs Collateral-free Credit',
      desc: 'Subsidized loan assistance for women entrepreneurs & self-help groups (बचत गट व महिला व्यवसाय कर्ज).',
      keywords: ['business', 'loan', 'mudra', 'udyam', 'entrepreneur', 'vyavasay', 'dukan', 'कर्ज', 'व्यवसाय', 'महिला उद्योजक'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
        { id: 'business_proof', name: 'Udyam Aadhaar / Business Proof', allowed: ['udyam', 'business', 'msme'], disallowed: ['marksheet'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
      ]
    }
  ];

  const [schemes, setSchemes] = useState(ALL_MAHARASHTRA_SCHEMES);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [extractedData, setExtractedData] = useState({});
  const [docErrors, setDocErrors] = useState({});
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [simStep, setSimStep] = useState(0); 
  const [filledFields, setFilledFields] = useState([]);
  const [portalOtp, setPortalOtp] = useState('');
  const [applicationRef, setApplicationRef] = useState('');

  const handleSelectScheme = (sch) => {
    if (!currentUser) {
      setAuthError('योजनेचा अर्ज भरण्यासाठी प्रथम Sign In करा!');
      setActiveView('signin');
      return;
    }
    setSelectedScheme(sch);
    setUploadedDocs({});
    setExtractedData({});
    setDocErrors({});
    setActiveWorkflow(null);
  };

  const handleUploadFile = (doc, file) => {
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const isRejected = doc.disallowed.some((term) => fileName.includes(term));

    if (isRejected) {
      setDocErrors((previous) => ({
        ...previous,
        [doc.id]: `${file.name} does not match ${doc.name}. Please upload the correct document.`
      }));
      setUploadedDocs((previous) => {
        const next = { ...previous };
        delete next[doc.id];
        return next;
      });
      return;
    }

    setDocErrors((previous) => {
      const next = { ...previous };
      delete next[doc.id];
      return next;
    });
    setUploadedDocs((previous) => ({
      ...previous,
      [doc.id]: { name: file.name, status: 'VERIFIED', file }
    }));
    setExtractedData((previous) => ({
      ...previous,
      [doc.name]: file.name
    }));
  };

  const handleAutoAttachDemo = () => {
    if (!selectedScheme) return;

    const demoDocs = selectedScheme.requiredDocs.reduce((docs, doc) => {
      docs[doc.id] = {
        name: `demo-${doc.name.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        status: 'VERIFIED'
      };
      return docs;
    }, {});

    setUploadedDocs(demoDocs);
    setDocErrors({});
    setExtractedData(
      selectedScheme.requiredDocs.reduce((data, doc) => {
        data[doc.name] = 'Demo verified value';
        return data;
      }, {})
    );
  };

  const handleStartAgentApply = () => {
    if (!selectedScheme || !currentUser) return;

    const hasUnverifiedDocument = selectedScheme.requiredDocs.some(
      (doc) => !uploadedDocs[doc.id] || uploadedDocs[doc.id].status !== 'VERIFIED'
    );
    if (hasUnverifiedDocument) return;

    setActiveWorkflow(selectedScheme);
    setSimStep(1);
    setPortalOtp('');
    setApplicationRef('');
    setFilledFields([
      { label: 'Applicant Name', val: currentUser.fullName },
      { label: 'Email', val: currentUser.email },
      { label: 'Mobile Number', val: currentUser.mobile }
    ]);

    setTimeout(() => setSimStep(2), 500);
    setTimeout(() => setSimStep(3), 1000);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail || !authPassword) {
      setAuthError('Please enter email and password.');
      return;
    }

    if (authMode === 'signup' && !fullName.trim()) {
      setAuthError('Please enter your full legal name.');
      return;
    }

    if (authMode === 'signup' && authPassword.length < 8) {
      setAuthError('Password must contain at least 8 characters.');
      return;
    }

    try {
      const endpoint =
        authMode === 'signup'
          ? '/api/v1/auth/register'
          : '/api/v1/auth/login';

      const payload =
        authMode === 'signup'
          ? {
              name: fullName.trim(),
              email: authEmail.trim(),
              password: authPassword
            }
          : {
              email: authEmail.trim(),
              password: authPassword
            };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed.');
      }

      localStorage.setItem('sheshield_token', data.token);
      setCurrentUser({
        fullName: data.user.name,
        email: data.user.email,
        mobile: mobileNumber || '9876543210',
        income: 0
      });
      setActiveView('home');
    } catch (error) {
      console.error('Authentication Error:', error);
      setAuthError(error.message || 'Something went wrong. Please try again.');
    }
  };

  const handleForgotPasswordSendOTP = async (e) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      setAuthError('Please enter your registered email.');
      return;
    }

    try {
      setIsOtpLoading(true);
      setAuthError('');

      const response = await fetch('/api/v1/otp/reset/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() })
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send OTP.');
      }

      setOtp('');
      setOtpTimer(60);
      setAuthStep('reset-otp');
      setAuthError('If your account exists, an OTP has been sent to your email.');
    } catch (error) {
      setAuthError(error.message || 'Unable to send OTP.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleForgotPasswordReset = async (e) => {
    e.preventDefault();

    if (!otp.trim() || !newPassword) {
      setAuthError('Please enter OTP and new password.');
      return;
    }

    if (newPassword.length < 8) {
      setAuthError('Password must contain at least 8 characters.');
      return;
    }

    try {
      setIsOtpLoading(true);
      setAuthError('');

      const response = await fetch('/api/v1/otp/reset/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          otp: otp.trim(),
          newPassword
        })
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Password reset failed.');
      }

      setShowForgotPassword(false);
      setAuthStep('form');
      setAuthMode('signin');
      setAuthEmail(forgotEmail.trim());
      setAuthPassword('');
      setOtp('');
      setNewPassword('');
      setOtpTimer(0);
      setAuthError('Password reset successful! Please sign in.');
    } catch (error) {
      setAuthError(error.message || 'Password reset failed.');
    } finally {
      setIsOtpLoading(false);
    }
  };

const handleGoogleSchemeSearch = async (e) => {
  e.preventDefault();

  const rawQuery = aiPromptInput.trim();

  if (!rawQuery) {
    setSearchStatus('Please enter your requirement.');
    return;
  }

  setIsSearching(true);
  setLiveGoogleUrl('');
  setSearchStatus('AI is searching for suitable schemes...');

  try {
    const data = await getAIRecommendations(rawQuery);

    console.log('FULL API RESPONSE:', data);

    const result = data?.recommendations;
    const aiSchemes = result?.schemes || [];

    if (aiSchemes.length === 0) {
      setSchemes([]);
      setSearchStatus(result?.answer || 'No matching schemes found.');
      return;
    }

    const mappedSchemes = aiSchemes.map((item, index) => {
      const documents = String(item['Documents Required'] || '')
        .split(/[,;\n•]+/)
        .map(doc => doc.trim())
        .filter(doc =>
          doc &&
          !['not specified', 'n/a', 'none', 'not available']
            .includes(doc.toLowerCase())
        );

      return {
        id: `AI_SCHEME_${index}_${Date.now()}`,

        name: item['Scheme Name'] || 'Scheme name unavailable',

        portalName:
          item['State / UT / Ministry'] || 'Government Scheme',

        grant:
          item['Benefits'] || 'Check official scheme details',

        desc:
          item['Eligibility Criteria'] ||
          item['Description'] ||
          'Eligibility details unavailable',

        keywords: [],

        requiredDocs: documents.map((doc, docIndex) => ({
          id: `ai_doc_${index}_${docIndex}`,
          name: doc,
          allowed: [],
          disallowed: []
        })),

        officialLink:
          item['Official Link'] || item['MyScheme URL'] || '',

        applicationMode: item['Application Mode'] || 'Check official portal',

        similarityScore: item.similarity_score,

        rawData: item
      };
    });

    setSchemes(mappedSchemes);

    setSearchStatus(
      `Found ${mappedSchemes.length} government schemes. Review the benefits and eligibility below.`
    );

  } catch (error) {
    console.error('AI Search Error:', error);
    setSearchStatus(error.message || 'AI service connection failed.');
  } finally {
    setIsSearching(false);
  }
};
  return (
    
    <div className="min-h-screen bg-[#0d1321] text-slate-100 font-sans flex flex-col justify-between">
      {/* Navbar */}
      <header className="bg-[#111827]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => { setActiveView('home'); setSelectedScheme(null); setActiveWorkflow(null); }}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Shield size={22} />
            </div>
            <div>
              <span className="font-black text-xl text-white block leading-tight">Sheshield <span className="text-purple-400">2.0</span></span>
              <span className="text-[9px] text-purple-300 font-bold uppercase tracking-wider block">ALL-WOMEN CIVIC EMPOWERMENT • HITL</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="notranslate flex items-center gap-1.5 bg-[#1e293b] border border-purple-500/50 hover:border-purple-400 px-3 py-1.5 rounded-xl text-xs shadow-md transition">
              <Globe size={14} className="text-purple-400 shrink-0" />
              <select 
                value={selectedLang} 
                onChange={(e) => changeLanguage(e.target.value)}
                className="notranslate bg-transparent text-slate-100 font-bold text-xs outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-[#0f172a] text-white">English (Default)</option>
                <option value="mr" className="bg-[#0f172a] text-white">मराठी (Marathi)</option>
                <option value="hi" className="bg-[#0f172a] text-white">हिंदी (Hindi)</option>
                <option value="bn" className="bg-[#0f172a] text-white">বাংলা (Bengali)</option>
                <option value="gu" className="bg-[#0f172a] text-white">ગુજરાતી (Gujarati)</option>
                <option value="ta" className="bg-[#0f172a] text-white">தமிழ் (Tamil)</option>
                <option value="te" className="bg-[#0f172a] text-white">తెలుగు (Telugu)</option>
                <option value="kn" className="bg-[#0f172a] text-white">ಕನ್ನಡ (Kannada)</option>
                <option value="pa" className="bg-[#0f172a] text-white">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="ml" className="bg-[#0f172a] text-white">മലയാളം (Malayalam)</option>
                <option value="or" className="bg-[#0f172a] text-white">ଓଡ଼ିଆ (Odia)</option>
                <option value="as" className="bg-[#0f172a] text-white">অসমীয়া (Assamese)</option>
                <option value="ur" className="bg-[#0f172a] text-white">اردو (Urdu)</option>
              </select>
            </div>

            <button onClick={() => { setActiveView('home'); setSelectedScheme(null); setActiveWorkflow(null); }} className={'px-3 py-1 font-bold text-xs rounded-xl transition ' + (activeView === 'home' && !selectedScheme ? 'text-purple-400 bg-purple-500/15' : 'text-slate-400 hover:text-white')}>
              Home
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="bg-purple-500/15 border border-purple-500/30 px-3 py-1.5 rounded-xl font-bold text-xs text-purple-200 flex items-center gap-1.5">
                  <User size={13} className="text-purple-400" /> {currentUser.fullName}
                </span>
                <button onClick={() => { setCurrentUser(null); setActiveView('home'); }} className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl transition" title="Logout"><LogOut size={16} /></button>
              </div>
            ) : (
              <button onClick={() => { setAuthError(''); setActiveView('signin'); }} className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5">
                <LogIn size={13} /> Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
        {activeView === 'home' && !selectedScheme && (
          <div className="space-y-8 py-2">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-full text-[11px] font-bold">
                <Sparkles size={13} className="text-purple-400" /> Civic Empowerment Engine for All Women Across India
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Empowering Every Woman With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
                  Autonomous AI Benefits & Subsidies.
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm">
                Students, entrepreneurs, homemakers, widows or senior women—discover matching welfare schemes based on your documents and submit directly.
              </p>

              {/* AI Scheme Search Box */}
              <div className="bg-[#161f38] border border-purple-500/30 rounded-2xl p-4 shadow-xl space-y-2.5 text-left">
                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                  <Bot size={14} className="text-purple-400" /> AI Document & Scheme Recommender:
                </span>
                <form onSubmit={handleGoogleSchemeSearch} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    value={aiPromptInput} 
                    onChange={e => setAiPromptInput(e.target.value)} 
                    placeholder="उदा. viddava bai sathi, loan for women, scholarship..." 
                    className="flex-1 bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-xs text-white outline-none focus:border-purple-500 placeholder-slate-500" 
                  />
                  <button type="submit" disabled={isSearching} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-md">
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} AI Search
                  </button>
                  {aiPromptInput && (
                    <a 
                      href={'https://www.google.com/search?q=' + encodeURIComponent(aiPromptInput + ' maharashtra government scheme for women site:gov.in OR site:nic.in')}
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-3.5 py-2.5 bg-blue-600/80 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-md transition"
                    >
                      <ExternalLink size={13} /> Google वर उघडा
                    </a>
                  )}
                </form>

               {searchStatus && (
                 <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                   <div className="p-2 bg-purple-500/20 rounded-lg">
                     <Bot size={17} className="text-purple-300" />
                  </div>
                  <div>
                   <p className="text-xs font-bold text-purple-200">
                     Sheshield AI Assistant
                   </p>
                   <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {searchStatus}
                   </p>
                  </div>
                </div>
              )}
                  
              </div>
            </div>

            {/* Scheme Cards Grid */}
<div className="space-y-5">

  <div className="flex flex-wrap justify-between items-center gap-3">
    <div>
      <h3 className="text-lg sm:text-xl font-black text-white">
        Government Schemes
      </h3>
      <p className="text-xs text-slate-400 mt-1">
        Explore benefits, eligibility and application details
      </p>
    </div>

    <div className="flex items-center gap-2">
      <span className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
        {schemes.length} Schemes Found
      </span>

      {schemes.length !== ALL_MAHARASHTRA_SCHEMES.length && (
        <button
          onClick={() => {
            setSchemes(ALL_MAHARASHTRA_SCHEMES);
            setSearchStatus('');
            setAiPromptInput('');
          }}
          className="text-xs text-purple-400 hover:text-white font-bold"
        >
          Reset
        </button>
      )}
    </div>
  </div>

  {schemes.length === 0 ? (
    <div className="text-center py-12 bg-[#161f38] border border-slate-700 rounded-2xl">
      <Search size={30} className="mx-auto text-slate-500 mb-3" />
      <h4 className="text-white font-bold text-sm">
        No matching schemes found
      </h4>
      <p className="text-xs text-slate-400 mt-2">
        Try another search with your state, education or requirement.
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {schemes.map((sch) => (
        <div
          key={sch.id}
          className="group bg-[#161f38] border border-slate-700/80 hover:border-purple-500/60 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30"
        >
          <div className="space-y-3">

            <div className="flex justify-between items-center gap-2">
              <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/20 px-3 py-1 rounded-full">
                {sch.portalName}
              </span>

              <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">
                Government Scheme
              </span>
            </div>

            <h4 className="text-base font-bold text-white leading-snug">
              {sch.name}
            </h4>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
              <p className="text-[10px] text-purple-300 font-bold uppercase mb-1">
                Benefits
              </p>
              <p className="text-sm font-semibold text-white leading-relaxed line-clamp-4">
                {sch.grant || 'Check official scheme details'}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1.5">
                Eligibility
              </p>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-5">
                {sch.desc || 'Please check the official eligibility criteria.'}
              </p>
            </div>

          </div>

          <div className="mt-auto pt-3 border-t border-slate-700 flex flex-col gap-2">

            {sch.officialLink && (
              <a
                href={sch.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ExternalLink size={13} />
                Official Portal
              </a>
            )}

            <button
              onClick={() => handleSelectScheme(sch)}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition"
            >
              View & Apply with AI Agent
              <ArrowRight size={14} />
            </button>

          </div>
        </div>
      ))}
    </div>
  )}

          </div>
        </div>
        )}

        {/* Dual Sign In / Sign Up Modal */}
        {activeView === 'signin' && !currentUser && (
          <div className="max-w-md mx-auto bg-[#161f38] border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 my-4">
            <div className="flex bg-[#0d1321] p-1 rounded-2xl border border-slate-800">
              <button 
                type="button"
                onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                className={'flex-1 py-2 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 ' + (authMode === 'signin' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white')}
              >
                <LogIn size={13} /> Sign In
              </button>
              <button 
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={'flex-1 py-2 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 ' + (authMode === 'signup' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white')}
              >
                <User size={13} /> Sign Up
              </button>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-white">
                {authMode === 'signin' ? 'Sign In to Sheshield' : 'Create Beneficiary Account'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'signin' 
                  ? 'Access scheme applications and autonomous submission' 
                  : 'Register as a woman beneficiary for state welfare schemes'}
              </p>
            </div>

            {authError && <div className="p-2.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs text-rose-200">{authError}</div>}

            {showForgotPassword ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Reset Password</h2>

                {authStep !== 'reset-otp' ? (
                  <form onSubmit={handleForgotPasswordSendOTP} className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Registered Email:</label>
                    <input
                      type="email"
                      required
                      placeholder="user@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isOtpLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-60"
                  >
                    {isOtpLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotPasswordReset} className="space-y-3.5 text-xs">
                    <p className="text-sm text-slate-400">
                      Enter the OTP sent to your email.
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500"
                    />
                    <p className="text-sm text-slate-400">
                      {otpTimer > 0
                        ? `Resend OTP in 00:${String(otpTimer).padStart(2, '0')}`
                        : 'You can resend OTP now.'}
                    </p>
                    <button
                      type="button"
                      disabled={otpTimer > 0 || isOtpLoading}
                      onClick={handleForgotPasswordSendOTP}
                      className="text-purple-400 hover:text-purple-300 disabled:text-slate-500"
                    >
                      Resend OTP
                    </button>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="Enter new password (minimum 8 characters)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={isOtpLoading}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-60"
                    >
                      {isOtpLoading ? 'Updating...' : 'Reset Password'}
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setAuthStep('form');
                    setAuthError('');
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <>
              {authStep === 'otp' && (
              <p className="text-xs text-slate-400">
                {otpTimer > 0
                  ? `Resend OTP in 00:${String(otpTimer).padStart(2, '0')}`
                  : 'You can resend OTP now.'}
              </p>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Full Legal Name (as per Aadhaar):</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="E.g., Anita Ramesh Kadam" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)} 
                      className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" 
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Mobile Number:</label>
                    <input 
                      type="tel" 
                      placeholder="E.g., 9876543210" 
                      value={mobileNumber} 
                      onChange={e => setMobileNumber(e.target.value)} 
                      className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" 
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Email ID:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="user@example.com" 
                  value={authEmail} 
                  onChange={e => setAuthEmail(e.target.value)} 
                  className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Password:</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  value={authPassword} 
                  onChange={e => setAuthPassword(e.target.value)} 
                  className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" 
                />
              </div>

              {authMode === 'signin' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setAuthError('');
                    }}
                    className="text-purple-400 hover:text-purple-300 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold rounded-xl shadow-lg transition">
                {authMode === 'signin' ? 'Sign In & Continue →' : 'Create Account & Continue →'}
              </button>
            </form>
              </>
            )}

            <div className="text-center text-xs text-slate-400">
              {authMode === 'signin' ? (
                <span>Don't have an account? <button type="button" onClick={() => { setAuthMode('signup'); setAuthError(''); }} className="text-purple-400 font-bold hover:underline">Sign Up here</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => { setAuthMode('signin'); setAuthError(''); }} className="text-purple-400 font-bold hover:underline">Sign In here</button></span>
              )}
            </div>
          </div>
        )}
        {/* Document Verification Sandbox */}
        {selectedScheme && !activeWorkflow && currentUser && (
          <div className="bg-[#161f38] border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
            <button onClick={() => setSelectedScheme(null)} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold">
              <ArrowLeft size={14} /> Back to Schemes List
            </button>

            <div className="border-b border-slate-700 pb-3">
              <span className="text-[10px] text-purple-400 font-bold uppercase block">Applicant: {currentUser.fullName}</span>
              <h3 className="text-xl font-black text-white">{selectedScheme.name}</h3>
              <p className="text-xs text-slate-300 mt-0.5">🔒 Upload the required verified documents for this scheme:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedScheme.requiredDocs.map((doc) => {
                const uploaded = uploadedDocs[doc.id];
                const error = docErrors[doc.id];
                return (
                  <div key={doc.id} className={'p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ' + (error ? 'bg-rose-950/40 border-rose-500/80' : uploaded ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-[#0d1321] border-slate-700')}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-white">{doc.name}</h4>
                      {uploaded ? <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={10} /> Verified</span> : error ? <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={10} /> Rejected</span> : <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">Required</span>}
                    </div>
                    {error && <div className="p-1.5 bg-rose-950/80 border border-rose-500/50 rounded-lg text-[10px] text-rose-200">{error}</div>}
                    {uploaded ? (
                      <div className="bg-slate-800 p-2 rounded-lg border border-emerald-500/30 flex justify-between items-center text-xs">
                        <span className="font-medium text-emerald-300 truncate">{uploaded.name}</span>
                        <label className="text-purple-400 text-[10px] font-bold cursor-pointer hover:underline ml-2">Replace<input type="file" className="hidden" accept="image/*,.pdf,.txt" onChange={e => handleUploadFile(doc, e.target.files[0])} /></label>
                      </div>
                    ) : (
                      <label className="py-2 border-2 border-dashed border-purple-500/40 bg-purple-500/10 text-purple-300 text-center font-bold text-xs rounded-lg cursor-pointer block">
                        <UploadCloud size={13} className="inline mr-1" /> Upload {doc.name}
                        <input type="file" className="hidden" accept="image/*,.pdf,.txt" onChange={e => handleUploadFile(doc, e.target.files[0])} />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>

            {Object.keys(extractedData).length > 0 && (
              <div className="p-3 bg-[#0d1321] border border-purple-500/40 rounded-xl space-y-1.5">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1"><ScanText size={14} /> Verified Extracted Parameters:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(extractedData).map(([k, v]) => (
                    <div key={k} className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block text-[9px]">{k}</span>
                      <span className="font-bold text-emerald-400 text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 flex flex-wrap justify-between items-center gap-3 border-t border-slate-700">
              <button onClick={handleAutoAttachDemo} className="text-xs text-purple-400 font-bold hover:underline">⚡ Auto-Attach Demo Verified Docs</button>
              <button onClick={handleStartAgentApply} disabled={selectedScheme.requiredDocs.some(d => !uploadedDocs[d.id] || uploadedDocs[d.id].status !== 'VERIFIED')} className={'px-5 py-2.5 font-bold text-xs rounded-xl transition ' + (selectedScheme.requiredDocs.every(d => uploadedDocs[d.id] && uploadedDocs[d.id].status === 'VERIFIED') ? 'bg-purple-600 text-white cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed')}>
                Launch Portal Auto-Fill for {currentUser.fullName.split(' ')[0]} →
              </button>
            </div>
          </div>
        )}

        {/* Live HITL Simulation */}
        {activeWorkflow && (
          <div className="bg-slate-950 border border-purple-500/50 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">{activeWorkflow.name} — Real-time Filling</h3>
              <button onClick={() => { setActiveWorkflow(null); setSelectedScheme(null); }} className="text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded-lg">Close ✕</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
                <span className="text-purple-400 font-bold block"><Bot size={14} className="inline mr-1" /> Agent Terminal</span>
                <div className="text-emerald-400"><Check size={13} className="inline mr-1" /> Beneficiary authenticated: {currentUser?.fullName}</div>
                {simStep >= 2 && <div className="text-purple-300"><Check size={13} className="inline mr-1" /> Auto-populating verified portal parameters</div>}
                {simStep >= 3 && <div className="p-2 bg-amber-500/15 border border-amber-500/30 rounded-lg text-amber-300">[HITL] Ready for submission. Enter Gateway OTP.</div>}
                {simStep === 4 && <div className="p-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-300 font-bold">✓ Application submitted officially!</div>}
              </div>

              <div className="lg:col-span-7 bg-white text-slate-900 rounded-xl p-4 space-y-3 shadow-lg">
                <div className="border-b pb-1.5 flex justify-between items-center"><h4 className="font-bold text-xs">{activeWorkflow.name}</h4><span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Govt Portal Gateway</span></div>
                <div className="space-y-2">
                  {filledFields.map((f, idx) => (
                    <div key={idx}><label className="text-[10px] text-slate-500 block">{f.label}</label><div className="p-1.5 rounded text-xs font-mono border bg-purple-50 border-purple-300 font-bold">{f.val}</div></div>
                  ))}
                </div>
                {simStep === 3 && (
                  <form onSubmit={(e) => { e.preventDefault(); if (portalOtp) { setSimStep(4); setApplicationRef('MH-SHIELD-2026-' + Math.floor(100000 + Math.random() * 900000)); } }} className="p-3 bg-amber-50 border border-amber-300 rounded-lg space-y-2">
                    <span className="text-xs font-bold text-amber-900 block"><KeyRound size={13} className="inline mr-1" /> Complete Gateway OTP Verification:</span>
                    <div className="flex gap-2">
                      <input type="password" required placeholder="123456" value={portalOtp} onChange={e => setPortalOtp(e.target.value)} className="p-1.5 border rounded text-xs bg-white w-32 font-mono outline-none" />
                      <button type="submit" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded">Verify & Submit</button>
                    </div>
                  </form>
                )}
                {simStep === 4 && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs">
                    <span className="font-bold text-emerald-900 block"><CheckCircle size={14} className="inline mr-1" /> Application Submitted!</span>
                    <div>Application Reference: <b className="font-mono text-slate-900">{applicationRef}</b></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#111827] border-t border-slate-800 py-3 text-center text-xs text-slate-400">
        Sheshield 2.0 • Autonomous Civic AI Platform for All Women
      </footer>
    </div>
  );
}
