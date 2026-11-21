import React from 'react';
import {
  Award,
  CheckCircle2,
  Compass,
  Eye,
  Flame,
  Sparkles,
  Trophy,
  Zap,
  BookOpen
} from 'lucide-react';
import { AZLesson, StudentProgress, VividnessProfile } from '../types';

interface DashboardProps {
  curriculum: AZLesson[];
  progress: StudentProgress;
  onUpdateProfile: (profile: VividnessProfile) => void;
  onSelectLesson: (lesson: AZLesson) => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({
  curriculum,
  progress,
  onUpdateProfile,
  onSelectLesson
}) => {
  const completedCount = progress.completedLetters.length;
  const pct = Math.round((completedCount / 26) * 100);

  const profileValues = Object.values(progress.vividnessProfile);
  const avgVividness = (
    profileValues.reduce((a, b) => a + b, 0) / profileValues.length
  ).toFixed(1);

  const getPhantasiaTitle = (score: number) => {
    if (score >= 4.5) return 'Stage 5: Hyperphantasic Omniscient Architect';
    if (score >= 3.8) return 'Stage 4: High-Definition Spatial Visualizer';
    if (score >= 2.8) return 'Stage 3: Chromatic Inner Cinematographer';
    if (score >= 1.8) return 'Stage 2: Blueprint & Silhouette Explorer';
    return 'Stage 1: Conceptual Seeker';
  };

  const badges = [
    {
      id: 'b-sensory',
      name: 'V1 Raytracer',
      desc: 'Mastered Sensory Apple, Chroma & Light (A, C, L)',
      unlocked: ['A', 'C', 'L'].every((l) => progress.completedLetters.includes(l)),
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'b-spatial',
      name: '3D Shepard-Metzler Pilot',
      desc: 'Mastered Blueprints, 3D Rotation & X-Ray Views (B, R, X)',
      unlocked: ['B', 'R', 'X'].every((l) => progress.completedLetters.includes(l)),
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'b-palace',
      name: 'Grand Loci Architect',
      desc: 'Built Memory Palaces, Journeys & Paracosms (J, M, W)',
      unlocked: ['J', 'M', 'W'].every((l) => progress.completedLetters.includes(l)),
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'b-zenith',
      name: 'A–Z Zenith Master',
      desc: 'Completed at least 10 modules across the A–Z Visual School',
      unlocked: completedCount >= 10,
      color: 'from-violet-500 to-fuchsia-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-violet-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">A–Z Mastery Progress</div>
            <div className="text-2xl font-black text-white">
              {completedCount} / 26 <span className="text-sm font-semibold text-violet-400">({pct}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">VVIQ Vividness Index</div>
            <div className="text-2xl font-black text-white">
              {avgVividness} <span className="text-xs font-medium text-cyan-300">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Visual Experience (XP)</div>
            <div className="text-2xl font-black text-white">{progress.xp} XP</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Daily Visualization Streak</div>
            <div className="text-2xl font-black text-white">{progress.streakDays} Days</div>
          </div>
        </div>
      </div>

      {/* Middle Row: 26-Letter Interactive Mastery Matrix + VVIQ 5D Calibrator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* A-Z Constellation Matrix */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Complete 26-Module Atlas
              </span>
              <h3 className="text-lg font-extrabold text-white">
                Your A-to-Z Visualization Mastery Map
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Click any letter tile to jump into its interactive simulator & lesson
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2.5">
            {curriculum.map((lesson) => {
              const isDone = progress.completedLetters.includes(lesson.letter);
              const quizPassed = progress.quizScores[lesson.letter];
              const rating = progress.vividnessRatings[lesson.letter];

              return (
                <button
                  key={lesson.letter}
                  onClick={() => onSelectLesson(lesson)}
                  className={`p-3 rounded-xl border text-left transition group relative overflow-hidden ${
                    isDone
                      ? 'bg-violet-950/50 border-violet-500/60 hover:border-violet-400 shadow-lg shadow-violet-950/50'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-lg font-black ${
                        isDone ? 'text-violet-300' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {lesson.letter}
                    </span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-300 line-clamp-2 leading-snug">
                    {lesson.title.replace(/^[A-Z] — /, '')}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{quizPassed ? '★ Quiz' : lesson.difficulty.slice(0, 5)}</span>
                    {rating && <span className="text-amber-400 font-bold">VVIQ {rating}/5</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5D VVIQ Self-Assessment Profile */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              VVIQ Psychometric Profile
            </span>
            <h3 className="text-lg font-extrabold text-white">5D Mind’s Eye Calibration</h3>
            <p className="text-xs text-emerald-300 font-semibold mt-1">
              {getPhantasiaTitle(Number(avgVividness))}
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            {(
              [
                {
                  key: 'contourClarity',
                  label: '1. Contour & Wireframe Clarity (A, B)',
                  color: 'accent-violet-500'
                },
                {
                  key: 'colorIntensity',
                  label: '2. Chromatic & Light Saturation (C, L)',
                  color: 'accent-pink-500'
                },
                {
                  key: 'spatialDepth3D',
                  label: '3. 3D Rotation & X-Ray Depth (D, R, X)',
                  color: 'accent-cyan-400'
                },
                {
                  key: 'motionStability',
                  label: '4. Continuous Morphing & Cinema (I, O)',
                  color: 'accent-emerald-400'
                },
                {
                  key: 'multisensoryFusion',
                  label: '5. 5-Sense & Loci Architecture (K, M)',
                  color: 'accent-amber-400'
                }
              ] as const
            ).map((dim) => (
              <div key={dim.key} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">{dim.label}</span>
                  <span className="font-mono font-bold text-white">
                    {progress.vividnessProfile[dim.key]} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={progress.vividnessProfile[dim.key]}
                  onChange={(e) =>
                    onUpdateProfile({
                      ...progress.vividnessProfile,
                      [dim.key]: Number(e.target.value)
                    })
                  }
                  className={`w-full ${dim.color} cursor-pointer`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earned Credentials & Badges */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" /> School of Visualization Credentials & Mastery Badges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition ${
                b.unlocked
                  ? 'bg-slate-950 border-amber-400/50 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r ${b.color} text-white`}
                >
                  {b.name}
                </span>
                <span className="text-[11px] font-bold text-amber-300">
                  {b.unlocked ? 'UNLOCKED ★' : 'Locked'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
