import React, { useEffect, useState } from 'react';
import {
  Eye,
  BookOpen,
  Compass,
  Wand2,
  Radio,
  LayoutDashboard,
  Sparkles,
  CheckCircle2,
  Brain,
  Clock,
  ChevronRight,
  ChevronLeft,
  Search,
  Award,
  Play
} from 'lucide-react';
import {
  AZLesson,
  MemoryPalaceRoom,
  MindMapEdge,
  MindMapNode,
  StudentProgress,
  VisualizationCategory,
  VividnessProfile
} from './types';
import {
  INITIAL_AZ_CURRICULUM,
  INITIAL_MEMORY_PALACE_ROOMS,
  INITIAL_MIND_MAP_EDGES,
  INITIAL_MIND_MAP_NODES
} from './data/azCurriculum';
import { InteractiveSimulator } from './components/InteractiveSimulators';
import { VisualSandboxLab } from './components/VisualSandboxLab';
import { InstructorStudio } from './components/InstructorStudio';
import { LiveClassroomMode } from './components/LiveClassroomMode';
import { StudentDashboard } from './components/StudentDashboard';
import { soundEngine } from './utils/soundEngine';

type NavView = 'curriculum' | 'sandbox' | 'studio' | 'classroom' | 'dashboard';

const DEFAULT_PROGRESS: StudentProgress = {
  completedLetters: ['A', 'B', 'M', 'N'],
  quizScores: { A: true, B: true, M: true },
  vividnessRatings: { A: 4, B: 4, M: 5, N: 4 },
  journalNotes: {
    A: 'Anchoring the apple with 200g palm weight and a crisp acoustic snap kept the ruby highlight completely stable.'
  },
  vividnessProfile: {
    contourClarity: 4.0,
    colorIntensity: 4.0,
    spatialDepth3D: 3.5,
    motionStability: 4.0,
    multisensoryFusion: 4.5
  },
  xp: 550,
  streakDays: 7
};

export function App() {
  const [activeView, setActiveView] = useState<NavView>('curriculum');
  const [sandboxTab, setSandboxTab] = useState<'mindmap' | 'palace' | 'whiteboard'>('mindmap');

  // Persistent Curriculum
  const [curriculum, setCurriculum] = useState<AZLesson[]>(() => {
    try {
      const saved = localStorage.getItem('aetheria_az_curriculum_v1');
      return saved ? JSON.parse(saved) : INITIAL_AZ_CURRICULUM;
    } catch {
      return INITIAL_AZ_CURRICULUM;
    }
  });

  const [activeLetter, setActiveLetter] = useState<string>('A');
  const [categoryFilter, setCategoryFilter] = useState<VisualizationCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent Progress
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('aetheria_progress_v1');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Persistent Sandbox State
  const [nodes, setNodes] = useState<MindMapNode[]>(INITIAL_MIND_MAP_NODES);
  const [edges, setEdges] = useState<MindMapEdge[]>(INITIAL_MIND_MAP_EDGES);
  const [rooms, setRooms] = useState<MemoryPalaceRoom[]>(INITIAL_MEMORY_PALACE_ROOMS);

  // Quiz state for current lesson
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('aetheria_az_curriculum_v1', JSON.stringify(curriculum));
    } catch {
      // Ignore storage quota errors
    }
  }, [curriculum]);

  useEffect(() => {
    try {
      localStorage.setItem('aetheria_progress_v1', JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const activeLesson =
    curriculum.find((l) => l.letter === activeLetter) || curriculum[0];

  useEffect(() => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  }, [activeLetter]);

  const filteredCurriculum = curriculum.filter((lesson) => {
    const matchesCat = categoryFilter === 'All' || lesson.category === categoryFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.letter.toLowerCase() === searchQuery.trim().toLowerCase();
    return matchesCat && matchesSearch;
  });

  const toggleLessonComplete = (letter: string) => {
    soundEngine.playChime(660);
    setProgress((prev) => {
      const exists = prev.completedLetters.includes(letter);
      const nextCompleted = exists
        ? prev.completedLetters.filter((l) => l !== letter)
        : [...prev.completedLetters, letter];
      return {
        ...prev,
        completedLetters: nextCompleted,
        xp: exists ? Math.max(0, prev.xp - 100) : prev.xp + 100
      };
    });
  };

  const handleRateVividness = (letter: string, rating: number) => {
    setProgress((prev) => ({
      ...prev,
      vividnessRatings: { ...prev.vividnessRatings, [letter]: rating }
    }));
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === activeLesson.quiz.correctIndex) {
      soundEngine.playChime(740);
      setProgress((prev) => ({
        ...prev,
        quizScores: { ...prev.quizScores, [activeLesson.letter]: true },
        xp: prev.quizScores[activeLesson.letter] ? prev.xp : prev.xp + 50
      }));
    }
  };

  const handleSaveCustomLesson = (updated: AZLesson) => {
    setCurriculum((prev) =>
      prev.map((item) => (item.letter === updated.letter ? updated : item))
    );
  };

  const openSandboxWithTab = (tab: 'mindmap' | 'palace' | 'whiteboard') => {
    setSandboxTab(tab);
    setActiveView('sandbox');
  };

  const currentIdx = curriculum.findIndex((l) => l.letter === activeLesson.letter);
  const prevLesson = currentIdx > 0 ? curriculum[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < curriculum.length - 1 ? curriculum[currentIdx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('curriculum')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 p-[2px] shadow-lg shadow-violet-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Eye className="w-5 h-5 text-violet-300 group-hover:scale-110 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  AETHERIA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300">
                  A–Z Visual Academy
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Creative & Mental Visualization • Mind Mapping • Memory Palaces • Guided Imagery
              </p>
            </div>
          </div>

          {/* 5 Core Platform Mode Tabs */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveView('curriculum')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeView === 'curriculum'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> A–Z Curriculum
            </button>

            <button
              onClick={() => setActiveView('sandbox')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeView === 'sandbox'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Visual Sandbox
            </button>

            <button
              onClick={() => setActiveView('studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeView === 'studio'
                  ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" /> Instructor Studio
            </button>

            <button
              onClick={() => setActiveView('classroom')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeView === 'classroom'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" /> Live Classroom
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeView === 'dashboard'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Mastery Map ({progress.completedLetters.length}/26)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeView === 'curriculum' && (
          <div className="space-y-6">
            {/* Hero A-to-Z Alphabet Navigator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Complete 26-Letter Curriculum
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    Visualize Everything from A to Z
                  </h1>
                </div>

                {/* Search & Category Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search A–Z topics..."
                      className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(e.target.value as VisualizationCategory | 'All')
                    }
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  >
                    <option value="All">All 5 Pillars (26 Modules)</option>
                    <option value="Sensory & Vividness">Sensory & Vividness</option>
                    <option value="Spatial & 3D">Spatial & 3D</option>
                    <option value="Memory Architecture">Memory Architecture</option>
                    <option value="Mind Mapping & Ideation">Mind Mapping & Ideation</option>
                    <option value="Guided Imagery & Mastery">Guided Imagery & Mastery</option>
                  </select>
                </div>
              </div>

              {/* Interactive A-Z Ribbon */}
              <div className="grid grid-cols-9 sm:grid-cols-13 lg:grid-cols-26 gap-1.5 pt-1">
                {curriculum.map((item) => {
                  const isSelected = item.letter === activeLesson.letter;
                  const isCompleted = progress.completedLetters.includes(item.letter);
                  const isVisible = filteredCurriculum.some((f) => f.letter === item.letter);

                  return (
                    <button
                      key={item.letter}
                      onClick={() => setActiveLetter(item.letter)}
                      title={`${item.letter}: ${item.title}`}
                      className={`h-10 rounded-xl font-display text-xs font-black transition relative flex flex-col items-center justify-center ${
                        !isVisible ? 'opacity-25' : ''
                      } ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-600/40 scale-110 z-10 ring-2 ring-white/70'
                          : isCompleted
                          ? 'bg-violet-950/70 border border-violet-500/50 text-violet-200 hover:bg-violet-900/60'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span>{item.letter}</span>
                      {isCompleted && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Lesson Header Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-violet-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4 max-w-3xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-3xl font-black text-white shadow-xl shrink-0">
                    {activeLesson.letter}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/20 border border-violet-500/40 text-violet-300">
                        {activeLesson.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-cyan-300">
                        {activeLesson.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {activeLesson.durationMinutes} min lab
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeLesson.letter} — {activeLesson.title}
                    </h2>
                    <p className="text-sm text-violet-200/90 mt-1">{activeLesson.subtitle}</p>
                  </div>
                </div>

                {/* Action Buttons: Teach Live or Mark Complete */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveView('classroom')}
                    className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Teach Live
                  </button>
                  <button
                    onClick={() => toggleLessonComplete(activeLesson.letter)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                      progress.completedLetters.includes(activeLesson.letter)
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {progress.completedLetters.includes(activeLesson.letter)
                      ? 'Completed (+100 XP)'
                      : 'Mark Module Complete'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pt-5 border-t border-slate-800/80">
                <div className="lg:col-span-7 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Core Visualization Methodology
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeLesson.overview}
                  </p>
                </div>
                <div className="lg:col-span-5 bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Brain className="w-4 h-4" /> Visual Neuroscience Insight
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeLesson.neuroscienceNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Live Interactive Visual Simulator */}
            <InteractiveSimulator
              lesson={activeLesson}
              onOpenSandbox={openSandboxWithTab}
            />

            {/* Guided Step-by-Step Script + Mastery Quiz & Vividness Log */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Guided Mental Imagery Sequence */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Step-by-Step Mental Construction
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Guided Visualization Protocol ({activeLesson.steps.length} Stages)
                  </h3>
                </div>

                <div className="space-y-3">
                  {activeLesson.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-violet-500/40 transition"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-bold text-white">{step.phase}</span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-medium">
                            {step.breathingCue}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-violet-300 font-mono">
                            {step.durationSec}s
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Practice Drill:</strong> {activeLesson.drillPrompt}
                </div>
              </div>

              {/* Right Column: Key Takeaways + Mastery Quiz + Vividness Journal */}
              <div className="lg:col-span-5 space-y-5">
                {/* Key Takeaways */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400">
                    Golden Rules for Module {activeLesson.letter}
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {activeLesson.keyTakeaways.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-violet-400 font-bold">✦</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Mastery Quiz */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Module {activeLesson.letter} Mastery Check
                    </span>
                    {progress.quizScores[activeLesson.letter] && (
                      <span className="text-xs font-bold text-emerald-400">✓ Passed (+50 XP)</span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-white leading-relaxed">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {activeLesson.quiz.options.map((opt, idx) => {
                      const isPicked = selectedQuizOption === idx;
                      const isCorrect = idx === activeLesson.quiz.correctIndex;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedQuizOption(idx);
                            setQuizSubmitted(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs border transition ${
                            quizSubmitted && isCorrect
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-semibold'
                              : quizSubmitted && isPicked && !isCorrect
                              ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                              : isPicked
                              ? 'bg-violet-600/25 border-violet-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleQuizSubmit}
                    className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow"
                  >
                    Check Answer
                  </button>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-emerald-400">Why: </strong>
                      {activeLesson.quiz.explanation}
                    </div>
                  )}
                </div>

                {/* Self-Rate VVIQ & Personal Journal */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">
                      Rate Your Mind’s Eye Vividness (VVIQ):
                    </span>
                    <span className="text-amber-300 font-bold">
                      Stage {progress.vividnessRatings[activeLesson.letter] || 3} / 5
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleRateVividness(activeLesson.letter, score)}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                          progress.vividnessRatings[activeLesson.letter] === score
                            ? 'bg-amber-500 border-amber-300 text-slate-950'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {score} ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder={`Log your imagery notes for Module ${activeLesson.letter}...`}
                    value={progress.journalNotes[activeLesson.letter] || ''}
                    onChange={(e) =>
                      setProgress((prev) => ({
                        ...prev,
                        journalNotes: {
                          ...prev.journalNotes,
                          [activeLesson.letter]: e.target.value
                        }
                      }))
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Prev / Next Letter Navigation */}
            <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
              {prevLesson ? (
                <button
                  onClick={() => setActiveLetter(prevLesson.letter)}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Module {prevLesson.letter}: {prevLesson.title}
                </button>
              ) : (
                <div />
              )}
              {nextLesson && (
                <button
                  onClick={() => setActiveLetter(nextLesson.letter)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg"
                >
                  Next Module {nextLesson.letter}: {nextLesson.title} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {activeView === 'sandbox' && (
          <VisualSandboxLab
            initialTab={sandboxTab}
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            rooms={rooms}
            setRooms={setRooms}
          />
        )}

        {activeView === 'studio' && (
          <InstructorStudio
            curriculum={curriculum}
            onSaveLesson={handleSaveCustomLesson}
            onLaunchLiveClass={(lesson) => {
              setActiveLetter(lesson.letter);
              setActiveView('classroom');
            }}
          />
        )}

        {activeView === 'classroom' && (
          <LiveClassroomMode
            lesson={activeLesson}
            curriculum={curriculum}
            onSelectLesson={(lesson) => setActiveLetter(lesson.letter)}
            onOpenSandbox={openSandboxWithTab}
          />
        )}

        {activeView === 'dashboard' && (
          <StudentDashboard
            curriculum={curriculum}
            progress={progress}
            onUpdateProfile={(profile: VividnessProfile) =>
              setProgress((prev) => ({ ...prev, vividnessProfile: profile }))
            }
            onSelectLesson={(lesson) => {
              setActiveLetter(lesson.letter);
              setActiveView('curriculum');
            }}
          />
        )}
      </main>
    </div>
  );
}
export default App;
