import React, { useState } from 'react';
import { 
  Shield, CheckCircle, UploadCloud, 
  Bot, KeyRound, Check, XCircle, LogOut, User, ArrowLeft, ScanText, 
  Search, Loader2, LogIn, Globe, ExternalLink, LayoutDashboard
} from 'lucide-react';
import DashboardView from './DashboardView';
import { analyzeRequiredDocsForScheme, handleLanguageSwitch } from './utils/schemeUtils';

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
  const [liveGoogleUrl, setLiveGoogleUrl] = useState('');

  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [extractedData, setExtractedData] = useState({});
  const [docErrors, setDocErrors] = useState({});
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [simStep, setSimStep] = useState(0); 
  const [filledFields, setFilledFields] = useState([]);
  const [portalOtp, setPortalOtp] = useState('');
  const [applicationRef, setApplicationRef] = useState('');

  const onLanguageChange = (code) => {
    setSelectedLang(code);
    handleLanguageSwitch(code);
  };

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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError('कृपया ईमेल आणि पासवर्ड भरा.');
      return;
    }
    if (authMode === 'signup' && !fullName) {
      setAuthError('कृपया आधार प्रमाणे पूर्ण नाव भरा.');
      return;
    }
    
    const userObj = {
      name: fullName || (authEmail ? authEmail.split('@')[0] : 'Akshada'),
      fullName: fullName || (authEmail ? authEmail.split('@')[0] : 'Akshada Valkunde'),
      email: authEmail,
      mobile: mobileNumber || '9876543210',
      income: 150000
    };
    setCurrentUser(userObj);
    setActiveView('dashboard');
    setAuthError('');
  };

  const executeSchemeSearch = async (searchTerm) => {
    const rawQuery = (searchTerm || '').trim();
    if (!rawQuery) {
      setSchemes([]);
      setSearchStatus('');
      return;
    }

    setIsSearching(true);
    setSchemes([]);
    setSearchStatus('Searching live government network for: "' + rawQuery + '"...');
    setLiveGoogleUrl('https://www.google.com/search?q=' + encodeURIComponent(rawQuery + ' site:mahadbt.maharashtra.gov.in OR site:myscheme.gov.in'));

    try {
      const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';
      const res = await fetch(`${backendUrl}/api/google-live-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: rawQuery })
      });
      const data = await res.json();

      if (data && data.success && Array.isArray(data.schemes) && data.schemes.length > 0) {
        setSchemes(data.schemes);
        setSearchStatus('✓ ' + data.schemes.length + ' official live schemes found!');
      } else {
        setSearchStatus('या क्वेरीसाठी थेट निकाल उपलब्ध नाही.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchStatus('Network error connecting to live search backend.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUploadFile = (docObj, file) => {
    if (!file) return;
    const docId = docObj.id;
    setDocErrors(prev => { const c = { ...prev }; delete c[docId]; return c; });
    setUploadedDocs(prev => ({ ...prev, [docId]: { name: file.name, status: 'VERIFIED' } }));

    setExtractedData(prev => ({
      ...prev,
      ...(docId === 'aadhaar' ? { 'Beneficiary Legal Name': currentUser?.fullName || 'Beneficiary', 'UIDAI Aadhaar': '[Aadhaar Redacted]' } : {}),
      ...(docId === 'income_cert' ? { 'Annual Family Income': '₹1,50,000 (Certified by Revenue Dept)' } : {}),
      ...(docId === 'passbook' ? { 'DBT Bank Account': 'Active Nationalized Bank (Aadhaar Seeded)' } : {})
    }));
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

  if (currentUser && activeView === 'dashboard') {
    return (
      <DashboardView
        user={currentUser}
        onLogout={() => { setCurrentUser(null); setActiveView('home'); }}
        onNavigateSearch={(term) => {
          setActiveView('home');
          if (term) {
            setAiPromptInput(term);
            executeSchemeSearch(term);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1321] text-slate-100 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-[#111827]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveView('home'); setSelectedScheme(null); setActiveWorkflow(null); }}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Shield size={22} />
            </div>
            <div>
              <span className="font-black text-xl text-white block leading-tight">Sheshield <span className="text-purple-400">2.0</span></span>
              <span className="text-[9px] text-purple-300 font-bold uppercase tracking-wider block">ALL-WOMEN CIVIC EMPOWERMENT • HITL</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#1e293b] border border-purple-500/50 px-3 py-1.5 rounded-xl text-xs">
              <Globe size={14} className="text-purple-400" />
              <select value={selectedLang} onChange={(e) => onLanguageChange(e.target.value)} className="bg-transparent text-slate-100 font-bold text-xs outline-none">
                <option value="en" className="bg-[#0f172a]">English (Default)</option>
                <option value="mr" className="bg-[#0f172a]">मराठी (Marathi)</option>
                <option value="hi" className="bg-[#0f172a]">हिंदी (Hindi)</option>
              </select>
            </div>

            <button onClick={() => { setActiveView('home'); setSelectedScheme(null); setActiveWorkflow(null); }} className={'px-3 py-1 font-bold text-xs rounded-xl ' + (activeView === 'home' && !selectedScheme ? 'text-purple-400 bg-purple-500/15' : 'text-slate-400')}>
              Home
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveView('dashboard')} className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5">
                  <LayoutDashboard size={13} /> Dashboard
                </button>
                <button onClick={() => { setCurrentUser(null); setActiveView('home'); }} className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl"><LogOut size={16} /></button>
              </div>
            ) : (
              <button onClick={() => { setAuthError(''); setActiveView('signin'); }} className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5">
                <LogIn size={13} /> Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
        {activeView === 'home' && !selectedScheme && (
          <div className="space-y-8 py-2">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-white">
                Empowering Every Woman With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                  Autonomous AI Benefits & Subsidies.
                </span>
              </h1>

              {/* Search Box */}
              <div className="bg-[#161f38] border border-purple-500/30 rounded-2xl p-4 space-y-2.5 text-left">
                <form onSubmit={(e) => { e.preventDefault(); executeSchemeSearch(aiPromptInput); }} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    value={aiPromptInput} 
                    onChange={e => setAiPromptInput(e.target.value)} 
                    placeholder="उदा. Student, scholarship, loan..." 
                    className="flex-1 bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-xs text-white outline-none focus:border-purple-500" 
                  />
                  <button type="submit" disabled={isSearching} className="px-4 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} AI Search
                  </button>
                </form>
                {searchStatus && <div className="text-xs text-purple-200 mt-2">{searchStatus}</div>}
              </div>
            </div>

            {/* Schemes Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemes.map((sch) => (
                <div key={sch.id} className="bg-[#161f38] border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full inline-block">{sch.portalName}</span>
                    <h4 className="font-bold text-sm text-white">{sch.name}</h4>
                    <p className="text-xs text-slate-400">{sch.desc}</p>
                  </div>
                  <button onClick={() => handleSelectScheme(sch)} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl">
                    Apply with AI Agent →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sign In View */}
        {activeView === 'signin' && !currentUser && (
          <div className="max-w-md mx-auto bg-[#161f38] border border-slate-700 p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold text-white text-center">Sign In to Sheshield</h2>
            {authError && <div className="p-2 text-xs text-rose-300 bg-rose-950/60 rounded">{authError}</div>}
            <form onSubmit={handleAuthSubmit} className="space-y-3 text-xs">
              <input type="email" required placeholder="user@example.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none" />
              <input type="password" required placeholder="••••••••" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-[#0d1321] border border-slate-700 p-2.5 rounded-xl text-white outline-none" />
              <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl">Sign In & Continue →</button>
            </form>
          </div>
        )}

        {/* Selected Scheme Docs & HITL Workflow */}
        {selectedScheme && !activeWorkflow && currentUser && (
          <div className="bg-[#161f38] border border-slate-700 rounded-3xl p-6 space-y-4">
            <button onClick={() => setSelectedScheme(null)} className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
            <h3 className="text-lg font-bold text-white">{selectedScheme.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedScheme.requiredDocs.map((doc) => (
                <div key={doc.id} className="p-3 bg-[#0d1321] rounded-xl border border-slate-700 flex justify-between items-center text-xs">
                  <span>{doc.name}</span>
                  {uploadedDocs[doc.id] ? <span className="text-emerald-400 font-bold">✓ Verified</span> : (
                    <label className="text-purple-400 font-bold cursor-pointer">
                      Upload <input type="file" className="hidden" onChange={e => handleUploadFile(doc, e.target.files[0])} />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between items-center">
              <button onClick={handleAutoAttachDemo} className="text-xs text-purple-400 font-bold hover:underline">⚡ Demo Auto-Attach</button>
              <button onClick={handleStartAgentApply} className="px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl">Launch Auto-Fill →</button>
            </div>
          </div>
        )}

        {/* HITL Simulation */}
        {activeWorkflow && (
          <div className="bg-slate-950 border border-purple-500/50 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-sm">{activeWorkflow.name} — Auto-Filling</h3>
              <button onClick={() => setActiveWorkflow(null)} className="text-xs text-slate-400">Close ✕</button>
            </div>
            <div className="space-y-2">
              {filledFields.map((f, i) => (
                <div key={i} className="text-xs text-purple-300 font-mono bg-purple-950/40 p-2 rounded border border-purple-800">{f.label}: {f.val}</div>
              ))}
            </div>
            {simStep === 3 && (
              <form onSubmit={(e) => { e.preventDefault(); setSimStep(4); setApplicationRef('MH-SHIELD-' + Math.floor(100000 + Math.random() * 900000)); }} className="flex gap-2">
                <input type="password" placeholder="OTP 123456" value={portalOtp} onChange={e => setPortalOtp(e.target.value)} className="p-2 text-xs bg-slate-900 border border-slate-700 rounded text-white" />
                <button type="submit" className="px-3 bg-emerald-600 text-white font-bold text-xs rounded">Verify & Submit</button>
              </form>
            )}
            {simStep === 4 && <div className="text-emerald-400 font-bold text-xs">Submitted! Ref: {applicationRef}</div>}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] border-t border-slate-800 py-3 text-center text-xs text-slate-400">
        Sheshield 2.0 • Autonomous Civic AI Platform
      </footer>
        </div>
      )}
    </div>
  );
}
      
