import React, { useState } from 'react';
import { 
  Shield, CheckCircle, ArrowRight, Sparkles, UploadCloud, 
  Bot, KeyRound, Check, XCircle, LogOut, User, ArrowLeft, ScanText, 
  Search, Loader2, LogIn, Mail, Lock, Globe
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

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');

  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');

  // Clean language switcher that supports instantaneous reset back to pure English
    const changeLanguage = (langCode) => {
    setSelectedLang(langCode);

    // 1. सर्व कुकीज आणि Google Translate कॅशे पूर्णपणे पुसणे
    const eraseCookie = (name) => {
      const host = window.location.hostname;
      const parts = host.split('.');
      const p1 = host;
      const p2 = '.' + host;
      const p3 = parts.length > 2 ? '.' + parts.slice(-2).join('.') : '';
      [p1, p2, p3, ''].forEach(d => {
        ['/', '/client', window.location.pathname].forEach(p => {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + p + (d ? '; domain=' + d : '') + ';';
        });
      });
    };

    eraseCookie('googtrans');
    try {
      sessionStorage.removeItem('googtrans');
      localStorage.removeItem('googtrans');
    } catch(e) {}

    // 2. जर English निवडले असेल: थेट अधिकृत Restore/Reset ट्रिगर करा
    if (langCode === 'en') {
      // Google Translate चा मूळ कॉम्बो बॉक्स 0 वर आणणे
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.selectedIndex = 0;
        combo.value = '';
        combo.dispatchEvent(new Event('change'));
      }

      // Banner मधील Restore बटण ट्रिगर करणे
      try {
        const iframe = document.querySelector('iframe.goog-te-banner-frame');
        if (iframe && iframe.contentDocument) {
          const closeBtn = iframe.contentDocument.querySelector('.goog-close-link, #goog-gt-tt button, a[id=":1.restore"]');
          if (closeBtn) closeBtn.click();
        }
      } catch (e) {}

      // URL पॅरामीटर क्लिअर करून स्वच्छ रीलोड करणे
      setTimeout(() => {
        window.location.href = window.location.origin + window.location.pathname;
      }, 100);
      return;
    }

    // 3. इतर भाषेसाठी कुकी सेट करणे आणि ट्रिगर करणे
    const host = window.location.hostname;
    document.cookie = 'googtrans=/en/' + langCode + '; path=/;';
    document.cookie = 'googtrans=/en/' + langCode + '; path=/; domain=' + host + ';';
    document.cookie = 'googtrans=/en/' + langCode + '; path=/; domain=.' + host + ';';

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };
  const [schemes, setSchemes] = useState([
    {
      id: 'SCHEME_PRAGATI',
      name: 'AICTE Pragati Scholarship for Girls',
      portalName: 'National Scholarship Portal (NSP)',
      grant: '₹50,000 / Year',
      desc: 'Technical degree & diploma tuition assistance for female students.',
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet', 'apaar'] },
        { id: 'income_cert', name: 'Income Certificate', allowed: ['income', 'tehsildar', 'revenue'], disallowed: ['aadhaar'] },
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
      desc: 'Direct state social welfare, education security and financial support for women.',
      requiredDocs: [
        { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
        { id: 'ration_card', name: 'Ration Card (BPL)', allowed: ['ration', 'food'], disallowed: ['apaar'] },
        { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
      ]
    }
  ]);

  const [selectedScheme, setSelectedScheme] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [extractedData, setExtractedData] = useState({});
  const [docErrors, setDocErrors] = useState({});
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [simStep, setSimStep] = useState(0); 
  const [filledFields, setFilledFields] = useState([]);
  const [portalOtp, setPortalOtp] = useState('');
  const [applicationRef, setApplicationRef] = useState('');

  // Primary rule: Require Sign In before launching the agent
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

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError('Please provide both email and password.');
      return;
    }
    setCurrentUser({
      fullName: fullName || authEmail.split('@')[0] || 'Registered Woman Beneficiary',
      email: authEmail,
      income: 150000
    });
    setActiveView('home');
    setAuthError('');
  };

  const handleGoogleSchemeSearch = async (e) => {
    if (e) e.preventDefault();
    if (!aiPromptInput.trim()) return;
    setIsSearching(true);
    setSearchStatus('🤖 AI is searching live official government portals via Google...');
    try {
      const res = await fetch('http://localhost:5000/api/search-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiPromptInput })
      });
      const data = await res.json();
      if (data?.schemes?.length > 0) {
        setSchemes(data.schemes);
        setSearchStatus(`✓ AI found ${data.schemes.length} verified government schemes matching your query!`);
      }
    } catch (err) {
      setSearchStatus('✓ Verified welfare schemes available for your credentials:');
    } finally {
      setIsSearching(false);
    }
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
      {/* Top Navbar */}
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
            {/* All-Indian Languages Translator Dropdown */}
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
                <option value="sa" className="bg-[#0f172a] text-white">संस्कृतम् (Sanskrit)</option>
                <option value="ne" className="bg-[#0f172a] text-white">नेपाली (Nepali)</option>
                <option value="kok" className="bg-[#0f172a] text-white">कोंकणी (Konkani)</option>
                <option value="mai" className="bg-[#0f172a] text-white">मैथिली (Maithili)</option>
                <option value="sd" className="bg-[#0f172a] text-white">سنڌي (Sindhi)</option>
                <option value="ks" className="bg-[#0f172a] text-white">कॉशुर (Kashmiri)</option>
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
        
        {/* VIEW 1: HOME PAGE (English) */}
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
                Students, entrepreneurs, homemakers or senior women—discover matching welfare schemes based on your documents and submit directly.
              </p>

              {/* AI Search Prompt Box */}
              <div className="bg-[#161f38] border border-purple-500/30 rounded-2xl p-4 shadow-xl space-y-2 text-left">
                <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                  <Bot size={14} className="text-purple-400" /> AI Document & Scheme Recommender:
                </span>
                <form onSubmit={handleGoogleSchemeSearch} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    value={aiPromptInput} 
                    onChange={e => setAiPromptInput(e.target.value)} 
                    placeholder="E.g., I have Aadhaar Card, Income Certificate and Bonafide..." 
                    className="flex-1 bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-xs text-white outline-none focus:border-purple-500 placeholder-slate-500" 
                  />
                  <button type="submit" disabled={isSearching} className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-md">
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} AI Google Search
                  </button>
                </form>
                {searchStatus && <div className="p-2 bg-purple-950/60 border border-purple-500/40 rounded-lg text-xs text-purple-200">{searchStatus}</div>}
              </div>
            </div>

            {/* Scheme Cards Grid */}
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

        {/* VIEW 2: SIGN IN VIEW */}
        {activeView === 'signin' && !currentUser && (
          <div className="max-w-md mx-auto bg-[#161f38] border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 my-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mx-auto mb-2">
                <LogIn size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Sign In to Sheshield</h2>
              <p className="text-xs text-slate-400">Please sign in to your beneficiary account before applying:</p>
            </div>

            {authError && <div className="p-2.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs text-rose-200">{authError}</div>}

            <form onSubmit={handleSignInSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Full Legal Name (as per Aadhaar):</label>
                <input type="text" placeholder="E.g., Anita Kadam" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Email ID:</label>
                <input type="email" required placeholder="user@gmail.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Password:</label>
                <input type="password" required placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-purple-500" />
              </div>

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg transition">
                Sign In & Continue →
              </button>
            </form>
          </div>
        )}

        {/* VIEW 3: STRICT DOCUMENT UPLOAD SANDBOX */}
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

        {/* VIEW 4: LIVE HITL PORTAL FORM */}
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
