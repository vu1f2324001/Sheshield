import React, { useState } from 'react';
import { 
  Shield, CheckCircle, ArrowRight, Sparkles, UploadCloud, 
  Bot, KeyRound, Check, XCircle, LogOut, User, ArrowLeft, ScanText, 
  Search, Loader2, LogIn, Globe
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

  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');

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
      name: 'Indira Gandhi / Sanjay Gandhi Widow Pension Scheme',
      portalName: 'Social Justice Dept (Maharashtra / GoI)',
      grant: '₹1,500 / Month Direct DBT',
      desc: 'Monthly financial pension & social security assistance for destitute & widow women.',
      keywords: ['viddava', 'vidhwa', 'vidhava', 'widow', 'bai', 'pension', 'niradhar', 'sanjay gandhi', 'निराधार', 'विधवा'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet', 'apaar'] },
        { id: 'death_cert', name: 'Husband Death Certificate', allowed: ['death', 'मृत्यू', 'mrutyu'], disallowed: ['apaar', 'marksheet'] },
        { id: 'income_cert', name: 'Income Certificate (Tehsildar)', allowed: ['income', 'उत्पन्न', 'tahsildar', 'revenue'], disallowed: ['aadhaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank', 'sbi'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_PRAGATI',
      name: 'AICTE Pragati Scholarship for Girls',
      portalName: 'National Scholarship Portal (NSP)',
      grant: '₹50,000 / Year',
      desc: 'Technical degree & diploma tuition assistance for female students.',
      keywords: ['student', 'scholarship', 'college', 'shikshan', 'study', 'fee', 'bonafide', 'मुली', 'विद्यार्थिनी', 'शिक्षण'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet', 'apaar'] },
        { id: 'income_cert', name: 'Income Certificate', allowed: ['income', 'उत्पन्न', 'tehsildar', 'revenue'], disallowed: ['aadhaar'] },
        { id: 'bonafide', name: 'College Admission Bonafide', allowed: ['bonafide', 'college', 'fee'], disallowed: ['apaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank', 'sbi'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_MUDRA_WOMEN',
      name: 'Pradhan Mantri Mudra Yojana (Tarun & Kishor)',
      portalName: 'Udyamimitra Portal (Govt. of India)',
      grant: 'Up to ₹10 Lakhs Collateral-free Credit',
      desc: 'Subsidized loan assistance for women entrepreneurs & self-help groups.',
      keywords: ['business', 'loan', 'mudra', 'udyam', 'entrepreneur', 'vyavasay', 'dukan', 'कर्ज', 'व्यवसाय', 'महिला उद्योजक'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
        { id: 'business_proof', name: 'Udyam Aadhaar / Business Proof', allowed: ['udyam', 'business', 'msme'], disallowed: ['marksheet'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
      ]
    },
    {
      id: 'SCHEME_MAJHI_KANYA',
      name: 'Majhi Kanya Bhagyashree Scheme',
      portalName: 'Maharashtra Women & Child Welfare Portal',
      grant: '₹50,000 Fixed DBT Security',
      desc: 'Direct state social welfare, education security and financial support for girl children & mothers.',
      keywords: ['kanya', 'bhagyashree', 'ration', 'bpl', 'mulgi', 'child', 'balika', 'कन्या', 'मुलगी', 'रेशन'],
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
        { id: 'ration_card', name: 'Ration Card (BPL)', allowed: ['ration', 'food', 'रेशन'], disallowed: ['apaar'] },
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
      setAuthError('Please Sign In before applying for this scheme!');
      setActiveView('signin');
      return;
    }
    setSelectedScheme(sch);
    setUploadedDocs({});
    setExtractedData({});
    setDocErrors({});
    setActiveWorkflow(null);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError('Please provide both email and password.');
      return;
    }
    if (authMode === 'signup' && !fullName) {
      setAuthError('Please enter your full legal name as per Aadhaar.');
      return;
    }
    setCurrentUser({
      fullName: fullName || authEmail.split('@')[0] || 'Registered Woman Beneficiary',
      email: authEmail,
      mobile: mobileNumber || '9876543210',
      income: 150000
    });
    setActiveView('home');
    setAuthError('');
  };

  const handleGoogleSchemeSearch = async (e) => {
    if (e) e.preventDefault();
    const query = aiPromptInput.trim();
    if (!query) {
      setSchemes(ALL_MAHARASHTRA_SCHEMES);
      setSearchStatus('');
      return;
    }

    setIsSearching(true);
    setSearchStatus('Analyzing query: \"' + query + '\"...');

    const qLower = query.toLowerCase();
    const matched = ALL_MAHARASHTRA_SCHEMES.filter(sch => 
      sch.keywords?.some(k => qLower.includes(k) || k.includes(qLower)) ||
      sch.name.toLowerCase().includes(qLower) ||
      sch.desc.toLowerCase().includes(qLower)
    );

    try {
      const res = await fetch('http://localhost:5000/api/search-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
      });
      const data = await res.json();
      if (data?.schemes?.length > 0) {
        setSchemes(data.schemes);
        setSearchStatus('✓ AI & Google live search found ' + data.schemes.length + ' schemes!');
        setIsSearching(false);
        return;
      }
    } catch (err) {}

    if (matched.length > 0) {
      setSchemes(matched);
      setSearchStatus('✓ Found matching government schemes for \"' + query + '\"');
    } else {
      setSchemes(ALL_MAHARASHTRA_SCHEMES);
      setSearchStatus('✓ Showing standard welfare programs');
    }
    setIsSearching(false);
  };
  const handleUploadFile = (docObj, file) => {
    if (!file) return;
    const docId = docObj.id;
    const nameLower = file.name.toLowerCase();
    const hasBad = docObj.disallowed.some(bad => nameLower.includes(bad));
    const hasGood = docObj.allowed.some(good => nameLower.includes(good));

    if (hasBad || !hasGood) {
      setDocErrors(prev => ({ ...prev, [docId]: 'Invalid file! Please upload official ' + docObj.name + '.' }));
      setUploadedDocs(prev => { const c = { ...prev }; delete c[docId]; return c; });
      return;
    }

    setDocErrors(prev => { const c = { ...prev }; delete c[docId]; return c; });
    setUploadedDocs(prev => ({ ...prev, [docId]: { name: file.name, status: 'VERIFIED' } }));

    setExtractedData(prev => {
      let u = { ...prev };
      if (docId === 'aadhaar') {
        u['Beneficiary Legal Name'] = currentUser?.fullName || 'Beneficiary';
        u['UIDAI Aadhaar'] = '[Aadhaar Redacted]';
      } else if (docId === 'income_cert') {
        u['Annual Family Income'] = '₹1,50,000 (Certified by Revenue Dept)';
      } else if (docId === 'passbook') {
        u['DBT Bank Account'] = 'Active Nationalized Bank (Aadhaar Seeded)';
      }
      return u;
    });
  };

  const handleAutoAttachDemo = () => {
    if (!selectedScheme || !currentUser) return;
    const demo = {};
    const ext = {
      'Beneficiary Legal Name': currentUser.fullName,
      'UIDAI Aadhaar': '[Aadhaar Redacted]',
      'Annual Family Income': '₹1,50,000 (Revenue Certified)',
      'DBT Bank Account': 'State Bank of India (DBT Active)'
    };
    selectedScheme.requiredDocs.forEach(d => {
      demo[d.id] = { name: d.name.replace(/\s+/g, '_') + '_Verified.pdf', status: 'VERIFIED' };
    });
    setDocErrors({});
    setUploadedDocs(demo);
    setExtractedData(ext);
  };

  const handleStartAgentApply = () => {
    setActiveWorkflow(selectedScheme);
    setSimStep(1);
    setFilledFields([]);
    setPortalOtp('');
    setApplicationRef('');

    const dynamicFields = Object.entries(extractedData).map(([label, val]) => ({ label, val: String(val) }));
    setTimeout(() => {
      setSimStep(2);
      dynamicFields.forEach((field, index) => {
        setTimeout(() => {
          setFilledFields(prev => [...prev, field]);
          if (index === dynamicFields.length - 1) setTimeout(() => setSimStep(3), 800);
        }, (index + 1) * 600);
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d1321] text-slate-100 font-sans flex flex-col justify-between">
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

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
        {activeView === 'home' && !selectedScheme && (
          <div className="space-y-8 py-2">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-full text-[11px] font-bold">
                <Sparkles size={13} className="text-purple-400" /> Civic Empowerment Engine for All Women Across Maharashtra
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

              <div className="bg-[#161f38] border border-purple-500/30 rounded-2xl p-4 shadow-xl space-y-2 text-left">
                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                  <Bot size={14} className="text-purple-400" /> AI Document & Scheme Recommender:
                </span>
                <form onSubmit={handleGoogleSchemeSearch} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    value={aiPromptInput} 
                    onChange={e => setAiPromptInput(e.target.value)} 
                    placeholder="E.g., viddava bai sathi, loan for women, scholarship..." 
                    className="flex-1 bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-xs text-white outline-none focus:border-purple-500 placeholder-slate-500" 
                  />
                  <button type="submit" disabled={isSearching} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-md">
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} AI Google Search
                  </button>
                </form>
                {searchStatus && <div className="p-2 bg-purple-950/60 border border-purple-500/40 rounded-lg text-xs text-purple-200">{searchStatus}</div>}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-white">Available & Recommended Welfare Schemes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {schemes.map((sch) => (
                  <div key={sch.id} className="bg-[#161f38] border border-slate-700/80 hover:border-purple-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/20 px-2 py-0.5 rounded-full inline-block">{sch.portalName}</span>
                      <h4 className="font-bold text-sm text-white">{sch.name}</h4>
                      <div className="text-sm font-extrabold text-purple-400">{sch.grant}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{sch.desc}</p>
                    </div>
                    
                    <button onClick={() => handleSelectScheme(sch)} className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition">
                      Apply with AI Agent →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SIGN IN / SIGN UP DUAL MODAL */}
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

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold rounded-xl shadow-lg transition">
                {authMode === 'signin' ? 'Sign In & Continue →' : 'Create Account & Continue →'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-400">
              {authMode === 'signin' ? (
                <span>Don't have an account? <button type="button" onClick={() => { setAuthMode('signup'); setAuthError(''); }} className="text-purple-400 font-bold hover:underline">Sign Up here</button></span>
              ) : (
                <span>Already have an account? <button type="button" onClick={() => { setAuthMode('signin'); setAuthError(''); }} className="text-purple-400 font-bold hover:underline">Sign In here</button></span>
              )}
            </div>
          </div>
        )}
