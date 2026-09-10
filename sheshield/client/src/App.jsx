import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import FinderPage from './pages/FinderPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import SchemeDetailPage from './pages/SchemeDetailPage.jsx';
import ActionPlanPage from './pages/ActionPlanPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TrackerPage from './pages/TrackerPage.jsx';
import { SEED_SCHEMES } from './data/mockSchemes.js';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeSchemeId, setActiveSchemeId] = useState('pragati-scholarship');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [savedSchemeIds, setSavedSchemeIds] = useState(['pragati-scholarship']);

  const [profile, setProfile] = useState({
    age: '21',
    state: 'Maharashtra',
    education: 'Graduate',
    occupation: 'Student',
    income: '250000',
    category: 'General'
  });

  const [trackerTasks, setTrackerTasks] = useState({
    'pragati-scholarship': { step: 2, documentsReady: { 'Official State Domicile Certificate': true } }
  });

  const evaluateScheme = (sch, user) => {
    let score = 0;
    const checks = [];
    const uAge = parseInt(user.age, 10) || 0;
    if (uAge >= sch.minAge && uAge <= sch.maxAge) {
      score += 25;
      checks.push({ title: 'Age Criteria', status: 'PASS', msg: `Age ${uAge} is valid.` });
    } else {
      checks.push({ title: 'Age Criteria', status: 'FAIL', msg: `Requires ${sch.minAge}-${sch.maxAge}.` });
    }

    const stateMatch = sch.state === 'All India' || sch.state.toLowerCase() === user.state.toLowerCase();
    if (stateMatch) {
      score += 25;
      checks.push({ title: 'Domicile', status: 'PASS', msg: 'Residency matches requirements.' });
    } else {
      checks.push({ title: 'Domicile', status: 'FAIL', msg: `Only for ${sch.state}.` });
    }

    const uInc = parseInt(user.income, 10) || 0;
    if (!sch.maxIncome || uInc <= sch.maxIncome) {
      score += 25;
      checks.push({ title: 'Income Cap', status: 'PASS', msg: 'Household income inside limit.' });
    } else {
      checks.push({ title: 'Income Cap', status: 'FAIL', msg: 'Income exceeds threshold.' });
    }

    if (sch.targetOccupations.includes(user.occupation)) {
      score += 25;
      checks.push({ title: 'Occupation', status: 'PASS', msg: 'Aligns with target category.' });
    } else {
      score += 10;
      checks.push({ title: 'Occupation', status: 'PARTIAL', msg: 'Secondary priority profile.' });
    }

    return { score, tier: score >= 80 ? 'High Match' : 'Possible Match', checks };
  };

  const matches = useMemo(() => {
    return SEED_SCHEMES.map(s => ({
      ...s,
      evaluation: evaluateScheme(s, profile)
    })).sort((a, b) => b.evaluation.score - a.evaluation.score);
  }, [profile]);

  const activeScheme = useMemo(() => {
    return SEED_SCHEMES.find(s => s.id === activeSchemeId) || SEED_SCHEMES[0];
  }, [activeSchemeId]);

  const activeEvaluation = useMemo(() => evaluateScheme(activeScheme, profile), [activeScheme, profile]);

  const handleDemo = () => {
    setProfile({ age: '21', state: 'Maharashtra', education: 'Graduate', occupation: 'Student', income: '240000', category: 'General' });
    setIsProcessingAI(true);
    setTimeout(() => {
      setIsProcessingAI(false);
      setCurrentPage('results');
    }, 700);
  };

  const handleToggleSave = (id) => {
    setSavedSchemeIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleToggleDoc = (docName) => {
    setTrackerTasks(prev => {
      const current = prev[activeSchemeId] || { step: 1, documentsReady: {} };
      return {
        ...prev,
        [activeSchemeId]: {
          ...current,
          documentsReady: { ...current.documentsReady, [docName]: !current.documentsReady?.[docName] }
        }
      };
    });
  };

  const handleSetStep = (step) => {
    setTrackerTasks(prev => ({
      ...prev,
      [activeSchemeId]: { ...(prev[activeSchemeId] || {}), step }
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#241A24] flex flex-col justify-between">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onDemoClick={handleDemo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow">
        {currentPage === 'landing' && <LandingPage onExplore={() => setCurrentPage('finder')} onDemo={handleDemo} onInspectCard={(id) => { setActiveSchemeId(id); setCurrentPage('schemeDetail'); }} />}
        {currentPage === 'finder' && <FinderPage profile={profile} setProfile={setProfile} onRunAnalysis={() => setCurrentPage('results')} onDemo={handleDemo} isProcessingAI={isProcessingAI} />}
        {currentPage === 'results' && <ResultsPage matches={matches} savedIds={savedSchemeIds} onToggleSave={handleToggleSave} onInspect={(id) => { setActiveSchemeId(id); setCurrentPage('schemeDetail'); }} onBackToFinder={() => setCurrentPage('finder')} />}
        {currentPage === 'schemeDetail' && <SchemeDetailPage scheme={activeScheme} evaluation={activeEvaluation} tracker={trackerTasks[activeSchemeId]} onToggleDoc={handleToggleDoc} onStartActionPlan={() => setCurrentPage('actionPlan')} onBack={() => setCurrentPage('results')} />}
        {currentPage === 'actionPlan' && <ActionPlanPage scheme={activeScheme} currentStep={trackerTasks[activeSchemeId]?.step || 1} onSetStep={handleSetStep} onGoTracker={() => setCurrentPage('tracker')} onBack={() => setCurrentPage('schemeDetail')} />}
        {currentPage === 'dashboard' && <DashboardPage schemes={SEED_SCHEMES} savedIds={savedSchemeIds} onSelectScheme={(id) => { setActiveSchemeId(id); setCurrentPage('schemeDetail'); }} onExplore={() => setCurrentPage('finder')} />}
        {currentPage === 'tracker' && <TrackerPage />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
