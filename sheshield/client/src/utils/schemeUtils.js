import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [appliedCount, setAppliedCount] = useState(3);
  const [selectedSchemeModal, setSelectedSchemeModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const stats = [
    { label: 'Total Schemes', value: '50+', icon: '🎯', bg: 'from-pink-500 to-rose-400' },
    { label: 'AI Matches', value: '12', icon: '✨', bg: 'from-indigo-500 to-blue-500' },
    { label: 'Applied', value: String(appliedCount), icon: '📄', bg: 'from-fuchsia-500 to-pink-500' }
  ];

  const popularSchemes = [
    {
      id: 'POP_1',
      title: 'AICTE Pragati Scholarship for Girls',
      amount: '₹50,000 /year',
      tag: '92% confidence',
      category: 'Education',
      desc: 'Technical degree/diploma scholarship for girl students from families with income under ₹8 Lakhs.'
    },
    {
      id: 'POP_2',
      title: 'Education Loan Subsidy',
      amount: 'Upto ₹10 Lakhs',
      tag: 'For Higher Education',
      category: 'Finance',
      desc: '100% interest subsidy on professional higher education loans across recognized institutions.'
    },
    {
      id: 'POP_3',
      title: 'Skill Development & Entrepreneurship',
      amount: 'Free / Subsidised',
      tag: 'Certification Courses',
      category: 'Skill',
      desc: 'Technical AI, coding, and vocational certification subsidies directly supported by the state.'
    },
    {
      id: 'POP_4',
      title: 'Post Matric Scholarship (MahaDBT)',
      amount: 'Full Fee Reimbursement',
      tag: '98% confidence',
      category: 'Education',
      desc: 'State government post-matric educational tuition assistance and examination fee waivers.'
    }
  ];

  const [applications, setApplications] = useState([
    {
      ref: 'MH-SHIELD-2026-891024',
      scheme: 'AICTE Pragati Scholarship for Girls',
      date: '28 Oct 2026',
      status: 'Under AI Verification',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      ref: 'MH-SHIELD-2026-654129',
      scheme: "Girl's Free Higher Education Scheme",
      date: '15 Oct 2026',
      status: 'Approved by Tehsildar Desk',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      ref: 'MH-SHIELD-2026-320911',
      scheme: 'Rajarshri Chhatrapati Shahu Maharaj Merit Benefit',
      date: '02 Oct 2026',
      status: 'DBT Amount Disbursed',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300'
    }
  ]);

  const handleApply = (scheme) => {
    setSelectedSchemeModal(scheme);
  };

  const confirmApply = () => {
    if (!selectedSchemeModal) return;
    const newRef = 'MH-SHIELD-2026-' + Math.floor(100000 + Math.random() * 900000);
    const newApp = {
      ref: newRef,
      scheme: selectedSchemeModal.title,
      date: '30 Oct 2026',
      status: 'Submitted via AI Agent',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    setApplications([newApp, ...applications]);
    setAppliedCount(prev => prev + 1);
    setSelectedSchemeModal(null);
    showToast(`✓ Application ${newRef} submitted successfully!`);
    setActiveTab('My Applications');
  };

  const filteredSchemes = popularSchemes.filter(s => {
    const matchesFilter = activeFilter === 'All' || s.category === activeFilter;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-[#f6f8fc] text-slate-800 font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#482868] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border border-purple-300/30 animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-64 bg-[#5c3b7a] text-white flex flex-col justify-between p-5 shadow-2xl flex-shrink-0 min-h-screen">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-4 mb-6">
            <div className="w-9 h-9 rounded-xl border border-white/30 flex items-center justify-center bg-white/10 font-bold text-lg">
              🛡️
            </div>
            <span className="text-xl font-bold tracking-tight">Sheshield 2.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'Home', label: 'Home', icon: '🏠' },
              { id: 'Scheme Discovery', label: 'Scheme Discovery', icon: '🔍' },
              { id: 'My Applications', label: 'My Applications', icon: '📑' },
              { id: 'Profile', label: 'Profile', icon: '👤' },
              { id: 'Settings', label: 'Settings', icon: '⚙️' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white shadow-inner font-bold translate-x-1'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-[11px] text-white/50">
          Sheshield 2.0 • Civic AI Platform
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        {/* Top Header */}
        <header className="h-16 px-8 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="text-xs text-slate-400 font-medium">Empowering Women With Autonomous AI</div>
          <div className="flex items-center gap-2 bg-[#6b428d] text-white px-3.5 py-1.5 rounded-full text-sm font-medium shadow-sm cursor-pointer" onClick={() => setActiveTab('Profile')}>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
              A
            </span>
            <span>Akshada Valkunde</span>
            <span className="text-xs opacity-70">▾</span>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-7">
          
          {/* TAB 1: HOME */}
          {activeTab === 'Home' && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-[#482868] tracking-tight">AI Benefit Discovery</h1>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search schemes, benefits, or keywords..."
                  className="w-full pl-11 pr-14 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b428d]/40 focus:border-[#6b428d] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setActiveTab('Scheme Discovery')}
                  className="absolute inset-y-1.5 right-1.5 px-4 bg-[#4a266a] hover:bg-[#3d1e57] text-white rounded-xl flex items-center justify-center"
                >
                  🔍
                </button>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((s, idx) => (
                  <div key={idx} className={`rounded-2xl p-5 text-white bg-gradient-to-r ${s.bg} shadow-md flex items-center justify-between`}>
                    <div>
                      <div className="text-xs font-medium text-white/85 mb-1">{s.label}</div>
                      <div className="text-3xl font-extrabold">{s.value}</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">{s.icon}</div>
                  </div>
                ))}
              </div>

              {/* Popular Schemes List */}
              <div className="space-y-4 pt-2">
                <h2 className="text-base font-bold text-[#482868]">Popular Schemes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {popularSchemes.slice(0, 3).map((scheme) => (
                    <div key={scheme.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">{scheme.title}</h3>
                        <div className="text-sm font-semibold text-[#5c3b7a]">{scheme.amount}</div>
                        <div className="text-xs text-slate-400 mt-1">{scheme.tag}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleApply(scheme)}
                        className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#7a4b9e] hover:bg-[#683c88] transition"
                      >
                        View Details & Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SCHEME DISCOVERY */}
          {activeTab === 'Scheme Discovery' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#482868]">Scheme Discovery</h1>
                  <p className="text-xs text-slate-500 mt-1">Autonomous eligibility engine for matching government welfare schemes.</p>
                </div>
                <div className="flex gap-2">
                  {['All', 'Education', 'Finance', 'Skill'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        activeFilter === cat ? 'bg-[#5c3b7a] text-white shadow' : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSchemes.map((scheme) => (
                  <div key={scheme.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">{scheme.category}</span>
                      <span className="text-xs font-semibold text-emerald-600">{scheme.tag}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-800">{scheme.title}</h3>
                    <div className="text-sm font-extrabold text-[#5c3b7a]">{scheme.amount}</div>
                    <p className="text-xs text-slate-500">{scheme.desc}</p>
                    <button
                      type="button"
                      onClick={() => handleApply(scheme)}
                      className="w-full py-2.5 bg-[#5c3b7a] hover:bg-[#4a266a] text-white rounded-xl text-xs font-semibold shadow transition"
                    >
                      Apply with AI Agent →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MY APPLICATIONS */}
          {activeTab === 'My Applications' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#482868]">My Applications</h1>
                <p className="text-xs text-slate-500 mt-1">Track real-time submission states across official government portals.</p>
              </div>

              <div className="space-y-3">
                {applications.map((app, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-400">REF: {app.ref}</div>
                      <h3 className="font-bold text-sm text-slate-800">{app.scheme}</h3>
                      <div className="text-xs text-slate-500">Submitted on: {app.date}</div>
                    </div>
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'Profile' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#482868]">Beneficiary Profile</h1>
                <p className="text-xs text-slate-500 mt-1">Your verified canonical details used by the AI Agent for automated form completion.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="w-16 h-16 rounded-full bg-[#5c3b7a] text-white text-2xl font-bold flex items-center justify-center shadow">
                    A
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Akshada Valkunde</h2>
                    <p className="text-xs text-slate-400">Maharashtra Resident • Computer Engineering Student</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-0.5">Full Legal Name</span>
                    <span className="font-semibold text-slate-800">Akshada Valkunde</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-0.5">Annual Family Income</span>
                    <span className="font-semibold text-emerald-600">₹1,50,000 (Certified by Tehsildar)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-0.5">Identity Verification</span>
                    <span className="font-semibold text-slate-800">Aadhaar Linked [Aadhaar Redacted]</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-0.5">DBT Bank Status</span>
                    <span className="font-semibold text-emerald-600">Aadhaar-Seeded Active NPCI Account</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-700">Verified Document Vault</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-xs font-medium text-emerald-900">Aadhaar Verified</span>
                    </div>
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-xs font-medium text-emerald-900">Income Certificate</span>
                    </div>
                    <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-xs font-medium text-emerald-900">College Bonafide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-[#482868]">Settings & Preferences</h1>
                <p className="text-xs text-slate-500 mt-1">Configure language, notification alerts, and security options.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800">SMS & WhatsApp Scheme Alerts</div>
                    <div className="text-slate-400">Receive instant updates when new matching welfare schemes launch.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#5c3b7a] w-4 h-4 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800">HITL Approval Gate (Human-In-The-Loop)</div>
                    <div className="text-slate-400">Require OTP verification before the AI agent executes form submission.</div>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#5c3b7a] w-4 h-4 cursor-pointer" />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('Home'); showToast('Signed out successfully.'); }}
                    className="px-4 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold hover:bg-rose-100"
                  >
                    Reset Session
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Interactive Apply Modal */}
      {selectedSchemeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-[#482868]">Autonomous AI Application</h3>
              <button onClick={() => setSelectedSchemeModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="text-xs space-y-2">
              <div className="font-bold text-slate-800">{selectedSchemeModal.title}</div>
              <div className="text-[#5c3b7a] font-semibold">{selectedSchemeModal.amount}</div>
              <p className="text-slate-500">{selectedSchemeModal.desc}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-800 space-y-1">
              <div>✓ Verified Applicant: <b>Akshada Valkunde</b></div>
              <div>✓ Verified Documents Attached: Aadhaar & Income Certificate</div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedSchemeModal(null)}
                className="flex-1 py-2 text-xs font-semibold bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmApply}
                className="flex-1 py-2 text-xs font-semibold bg-[#5c3b7a] hover:bg-[#4a266a] text-white rounded-xl shadow"
              >
                Submit Form →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

