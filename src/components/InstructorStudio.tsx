import React, { useState } from 'react';
import {
  Wand2,
  Plus,
  Save,
  Play,
  Layers,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Trash2
} from 'lucide-react';
import { AZLesson, GuidedStep, SimulatorType, VisualizationCategory } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface InstructorStudioProps {
  curriculum: AZLesson[];
  onSaveLesson: (updated: AZLesson) => void;
  onLaunchLiveClass: (lesson: AZLesson) => void;
}

export const InstructorStudio: React.FC<InstructorStudioProps> = ({
  curriculum,
  onSaveLesson,
  onLaunchLiveClass
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const currentLesson =
    curriculum.find((l) => l.letter === selectedLetter) || curriculum[0];

  const [draft, setDraft] = useState<AZLesson>(currentLesson);
  const [savedBanner, setSavedBanner] = useState<boolean>(false);

  const selectModule = (letter: string) => {
    setSelectedLetter(letter);
    const found = curriculum.find((l) => l.letter === letter);
    if (found) setDraft(found);
    setSavedBanner(false);
  };

  const updateStep = (idx: number, patch: Partial<GuidedStep>) => {
    const updatedSteps = draft.steps.map((st, i) => (i === idx ? { ...st, ...patch } : st));
    setDraft({ ...draft, steps: updatedSteps });
  };

  const addGuidedStep = () => {
    const newStep: GuidedStep = {
      phase: `Stage ${draft.steps.length + 1}: Sensory Expansion`,
      instruction: 'Guide your students to intensify color, lighting, and tactile weight...',
      breathingCue: 'Inhale (4s)',
      durationSec: 20,
      sensoryFocus: 'Multi-Sensory Immersion'
    };
    setDraft({ ...draft, steps: [...draft.steps, newStep] });
  };

  const removeGuidedStep = (idx: number) => {
    if (draft.steps.length <= 1) return;
    setDraft({ ...draft, steps: draft.steps.filter((_, i) => i !== idx) });
  };

  const handleSave = () => {
    onSaveLesson(draft);
    setSavedBanner(true);
    soundEngine.playChime(660);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/85 border border-violet-500/30 p-5 rounded-2xl">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5" /> Instructor Studio & Curriculum Architect
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-0.5">
            Design Guided Visualization Scripts, Simulators & A–Z Modules
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {savedBanner && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" /> Saved to Live Curriculum!
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-violet-600/30"
          >
            <Save className="w-4 h-4" /> Save Module Changes
          </button>
          <button
            onClick={() => {
              onSaveLesson(draft);
              onLaunchLiveClass(draft);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" /> Teach This Module Live
          </button>
        </div>
      </div>

      {/* A-Z Quick Selector Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-3 rounded-2xl">
        <div className="text-xs text-slate-400 mb-2 font-medium px-1">
          Select any Letter Module (A–Z) to customize its script, simulator, or exercises:
        </div>
        <div className="grid grid-cols-13 sm:grid-cols-26 gap-1">
          {curriculum.map((item) => (
            <button
              key={item.letter}
              onClick={() => selectModule(item.letter)}
              className={`h-9 rounded-lg text-xs font-extrabold transition ${
                selectedLetter === item.letter
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40 scale-105'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Core Module Metadata & Simulator Config */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-lg font-black text-violet-300">
              {draft.letter}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Module {draft.letter} Configuration</h3>
              <p className="text-xs text-slate-400">Customize how students experience this letter</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Lesson Title</label>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Subtitle / Pedagogical Hook</label>
              <input
                type="text"
                value={draft.subtitle}
                onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Category</label>
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as VisualizationCategory })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Sensory & Vividness">Sensory & Vividness</option>
                  <option value="Spatial & 3D">Spatial & 3D</option>
                  <option value="Memory Architecture">Memory Architecture</option>
                  <option value="Mind Mapping & Ideation">Mind Mapping & Ideation</option>
                  <option value="Guided Imagery & Mastery">Guided Imagery & Mastery</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Interactive Simulator Engine
                </label>
                <select
                  value={draft.simulatorType}
                  onChange={(e) =>
                    setDraft({ ...draft, simulatorType: e.target.value as SimulatorType })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-semibold"
                >
                  <option value="sensory-apple">Sensory Apple & VVIQ Calibrator</option>
                  <option value="rotation-3d">3D Rotation & X-Ray Polyhedra</option>
                  <option value="afterimage">Retinal Afterimage & Flash Matrix</option>
                  <option value="mandala-geometry">Sacred Geometry Mandala</option>
                  <option value="guided-cinema">Guided Inner Cinema & Camera</option>
                  <option value="memory-palace-mini">Memory Palace Loci Preview</option>
                  <option value="mind-map-mini">Radiant Mind Map Preview</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Instructor Lesson Overview
              </label>
              <textarea
                rows={4}
                value={draft.overview}
                onChange={(e) => setDraft({ ...draft, overview: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Neuroscience & Cognitive Backing
              </label>
              <textarea
                rows={3}
                value={draft.neuroscienceNote}
                onChange={(e) => setDraft({ ...draft, neuroscienceNote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-200 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Interactive Student Drill Prompt
              </label>
              <textarea
                rows={2}
                value={draft.drillPrompt}
                onChange={(e) => setDraft({ ...draft, drillPrompt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-200"
              />
            </div>
          </div>
        </div>

        {/* Right: Timed Guided Visualization Script Builder */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Guided Imagery Timeline & Teleprompter Script
              </span>
              <h3 className="text-base font-bold text-white">
                Step-by-Step Mental Construction Sequence ({draft.steps.length} Phases)
              </h3>
            </div>
            <button
              onClick={addGuidedStep}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Guided Step
            </button>
          </div>

          <div className="space-y-3">
            {draft.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <input
                    type="text"
                    value={step.phase}
                    onChange={(e) => updateStep(idx, { phase: e.target.value })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs font-bold text-white flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={step.breathingCue}
                      onChange={(e) =>
                        updateStep(idx, {
                          breathingCue: e.target.value as GuidedStep['breathingCue']
                        })
                      }
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-emerald-300"
                    >
                      <option value="Inhale (4s)">Inhale (4s)</option>
                      <option value="Hold & Construct (4s)">Hold & Construct (4s)</option>
                      <option value="Exhale & Stabilize (6s)">Exhale & Stabilize (6s)</option>
                      <option value="Deep Focus">Deep Focus</option>
                    </select>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={step.durationSec}
                      onChange={(e) => updateStep(idx, { durationSec: Number(e.target.value) })}
                      className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-300 font-mono"
                    />
                    <span className="text-[11px] text-slate-500">sec</span>
                    {draft.steps.length > 1 && (
                      <button
                        onClick={() => removeGuidedStep(idx)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={step.instruction}
                  onChange={(e) => updateStep(idx, { instruction: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200"
                  placeholder="Spoken guided imagery cue for your students..."
                />
              </div>
            ))}
          </div>

          {/* Mastery Quiz Editor */}
          <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Module {draft.letter} Mastery Check Question
            </h4>
            <input
              type="text"
              value={draft.quiz.question}
              onChange={(e) =>
                setDraft({ ...draft, quiz: { ...draft.quiz, question: e.target.value } })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {draft.quiz.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctQuizOpt"
                    checked={draft.quiz.correctIndex === oIdx}
                    onChange={() =>
                      setDraft({ ...draft, quiz: { ...draft.quiz, correctIndex: oIdx } })
                    }
                    className="accent-emerald-500"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const nextOpts = [...draft.quiz.options];
                      nextOpts[oIdx] = e.target.value;
                      setDraft({ ...draft, quiz: { ...draft.quiz, options: nextOpts } });
                    }}
                    className={`w-full bg-slate-950 border rounded-lg px-2.5 py-1.5 text-xs ${
                      draft.quiz.correctIndex === oIdx
                        ? 'border-emerald-500/60 text-emerald-200'
                        : 'border-slate-800 text-slate-300'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
