import React, { useState } from 'react';

export default function DashboardView({ user = { name: 'Akshada' }, onLogout, onNavigateSearch }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Schemes', value: '50+', icon: '🎯', bg: 'from-pink-500 to-rose-400' },
    { label: 'AI Matches', value: '12', icon: '✨', bg: 'from-indigo-500 to-blue-500' },
    { label: 'Applied', value: '3', icon: '📄', bg: 'from-fuchsia-500 to-pink-500' }
  ];

  const popularSchemes = [
    {
      title: 'AICTE Pragati',
      amount: '₹50,000 /year',
      tag: '92% confidence'
    },
    {
      title: 'Education Loan',
      amount: 'Upto ₹10 Lakhs',
      tag: 'For Higher Education'
    },
    {
      title: 'Skill Development',
      amount: 'Free / Subsidised',
      tag: 'Certification Courses'
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#f6f8fc] text-slate-800 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#5c3b7a] text-white flex flex-col justify-between p-5 shadow-xl flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-4 mb-6">
            <div className="w-9 h-9 rounded-xl border border-white/30 flex items-center justify-center bg-white/10 font-bold text-lg">
              🛡️
            </div>
            <span className="text-xl font-bold tracking-tight">Sheshield 2.0</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {[
              { id: 'Home', label: 'Home', icon: '🏠' },
              { id: 'Scheme Discovery', label: 'Scheme Discovery', icon: '🔍' },
              { id: 'My Applications', label: 'My Applications', icon: '📑' },
              { id: 'Profile', label: 'Profile', icon: '👤' },
              { id: 'Settings', label: 'Settings', icon: '⚙️' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'Scheme Discovery' && onNavigateSearch) {
                    onNavigateSearch();
                  }
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white shadow-inner font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-16 px-8 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Empowering Women With Autonomous AI</div>
          <div className="flex items-center gap-2 bg-[#6b428d] text-white px-3.5 py-1.5 rounded-full text-sm font-medium shadow-sm">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </span>
            <span>{user.name || 'Akshada'}</span>
            <span className="text-xs opacity-70">▾</span>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 max-w-6xl w-full mx-auto space-y-7">
          <h1 className="text-2xl font-bold text-[#482868] tracking-tight">AI Benefit Discovery</h1>

          {/* Search Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search schemes, benefits, or keywords..."
              className="w-full pl-11 pr-14 py-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b428d]/40 focus:border-[#6b428d] text-sm placeholder:text-slate-400"
            />
            <button
              onClick={() => onNavigateSearch && onNavigateSearch(searchTerm)}
              className="absolute inset-y-1.5 right-1.5 px-4 bg-[#4a266a] hover:bg-[#3d1e57] text-white rounded-xl flex items-center justify-center transition shadow-sm"
            >
              🔍
            </button>
          </div>

          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 text-white bg-gradient-to-r ${s.bg} shadow-md flex items-center justify-between`}
              >
                <div>
                  <div className="text-xs font-medium text-white/85 mb-1">{s.label}</div>
                  <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl">
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Popular Schemes */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#482868]">Popular Schemes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {popularSchemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-800">{scheme.title}</h3>
                    <div className="text-sm font-semibold text-[#5c3b7a]">{scheme.amount}</div>
                    <div className="text-xs text-slate-400">{scheme.tag}</div>
                  </div>
                  <button
                    onClick={() => onNavigateSearch && onNavigateSearch(scheme.title)}
                    className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-white bg-[#7a4b9e] hover:bg-[#683c88] transition shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
