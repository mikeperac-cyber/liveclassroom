import React, { useEffect, useState } from 'react';
import {
  Radio,
  Volume2,
  VolumeX,
  Users,
  MessageSquare,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  Bell,
  Send,
  BarChart3,
  Eye
} from 'lucide-react';
import { AZLesson } from '../types';
import { InteractiveSimulator } from './InteractiveSimulators';
import { BrainwavePreset, soundEngine } from '../utils/soundEngine';

interface LiveClassroomProps {
  lesson: AZLesson;
  curriculum: AZLesson[];
  onSelectLesson: (lesson: AZLesson) => void;
  onOpenSandbox: (tab: 'mindmap' | 'palace' | 'whiteboard') => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: 'instructor' | 'student';
  text: string;
  vividnessTag?: number;
  time: string;
}

export const LiveClassroomMode: React.FC<LiveClassroomProps> = ({
  lesson,
  curriculum,
  onSelectLesson,
  onOpenSandbox
}) => {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [teleprompterRunning, setTeleprompterRunning] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(lesson.steps[0]?.durationSec || 20);
  const [brainwave, setBrainwave] = useState<BrainwavePreset>('off');
  const [chatInput, setChatInput] = useState<string>('');
  const [pollActive, setPollActive] = useState<boolean>(false);
  const [cohortAverageVVIQ, setCohortAverageVVIQ] = useState<number>(4.2);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Elena R.',
      role: 'student',
      text: 'Adding the tactile palm weight immediately stopped my 3D image from drifting!',
      vividnessTag: 4,
      time: 'Just now'
    },
    {
      id: 'm2',
      sender: 'Marcus T.',
      role: 'student',
      text: 'When I rotated the key light to 135°, the specular highlight popped into Stage 5.',
      vividnessTag: 5,
      time: '1m ago'
    },
    {
      id: 'm3',
      sender: 'Sora K.',
      role: 'student',
      text: 'Ready for the next guided breathing phase!',
      vividnessTag: 4,
      time: '2m ago'
    }
  ]);

  const currentStep = lesson.steps[stepIdx] || lesson.steps[0];

  useEffect(() => {
    setStepIdx(0);
    setSecondsLeft(lesson.steps[0]?.durationSec || 20);
  }, [lesson]);

  useEffect(() => {
    if (!teleprompterRunning) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          const nextIdx = (stepIdx + 1) % lesson.steps.length;
          setStepIdx(nextIdx);
          soundEngine.playChime(528);
          return lesson.steps[nextIdx]?.durationSec || 20;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [teleprompterRunning, stepIdx, lesson.steps]);

  useEffect(() => {
    return () => {
      soundEngine.stopDrone();
    };
  }, []);

  const changeBrainwave = (preset: BrainwavePreset) => {
    setBrainwave(preset);
    soundEngine.setPreset(preset);
  };

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Instructor (You)',
      role: 'instructor',
      text: chatInput,
      time: 'Live'
    };
    setMessages((prev) => [msg, ...prev]);
    setChatInput('');
    soundEngine.playChime(660);

    // Simulated student reaction to instructor's live visual prompt
    setTimeout(() => {
      const replies = [
        'Got it! Holding that exact angle and texture now — vividness jumped to 5/5!',
        'I can see the neon wireframe edges clearly when I soften my peripheral gaze.',
        'Locked onto Station #2 with the acoustic chime anchor!'
      ];
      const names = ['Aria M.', 'Devon L.', 'Liam C.', 'Nadia V.'];
      setMessages((prev) => [
        {
          id: `reply-${Date.now()}`,
          sender: names[Math.floor(Math.random() * names.length)],
          role: 'student',
          text: replies[Math.floor(Math.random() * replies.length)],
          vividnessTag: 5,
          time: 'Just now'
        },
        ...prev
      ]);
    }, 1800);
  };

  const triggerVividnessPoll = () => {
    setPollActive(true);
    soundEngine.playChime(587);
    const nextScore = Number((4.1 + Math.random() * 0.7).toFixed(1));
    setCohortAverageVVIQ(nextScore);
  };

  return (
    <div className="space-y-6">
      {/* Top Broadcast Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-rose-500/40 p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLive((l) => !l)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition ${
              isLive
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Radio className="w-4 h-4" />
            {isLive ? 'ON AIR • LIVE COHORT (48 Students)' : 'BROADCAST PAUSED'}
          </button>

          <select
            value={lesson.letter}
            onChange={(e) => {
              const found = curriculum.find((c) => c.letter === e.target.value);
              if (found) onSelectLesson(found);
            }}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
          >
            {curriculum.map((c) => (
              <option key={c.letter} value={c.letter}>
                Module {c.letter}: {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Web Audio Binaural Frequency Synth Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            {brainwave === 'off' ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            )}
            Binaural Field:
          </span>
          {(
            [
              { id: 'off', label: 'Mute' },
              { id: 'alpha-10hz', label: '10Hz Alpha (Calm)' },
              { id: 'theta-6hz', label: '6Hz Theta (Deep Imagery)' },
              { id: 'gamma-40hz', label: '40Hz Gamma (Synthesis)' }
            ] as const
          ).map((b) => (
            <button
              key={b.id}
              onClick={() => changeBrainwave(b.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                brainwave === b.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}

          <button
            onClick={() => soundEngine.playChime(528)}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1"
            title="Play 528Hz Breath Chime for Students"
          >
            <Bell className="w-3.5 h-3.5" /> Chime Cue
          </button>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Instructor Teleprompter + Live Interactive Simulator */}
        <div className="lg:col-span-8 space-y-5">
          {/* Instructor Guided Teleprompter Bar */}
          <div className="bg-gradient-to-r from-violet-950/80 via-slate-900 to-cyan-950/70 border border-violet-500/40 rounded-2xl p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-violet-500/20 border border-violet-400/40 text-violet-200 text-xs font-bold">
                  INSTRUCTOR TELEPROMPTER • STEP {stepIdx + 1}/{lesson.steps.length}
                </span>
                <span className="text-xs font-semibold text-emerald-300">
                  {currentStep.breathingCue}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-amber-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {secondsLeft}s
                </span>
                <button
                  onClick={() => setTeleprompterRunning((r) => !r)}
                  className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  {teleprompterRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Start Timer
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    const next = (stepIdx + 1) % lesson.steps.length;
                    setStepIdx(next);
                    setSecondsLeft(lesson.steps[next]?.durationSec || 20);
                    soundEngine.playChime(528);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  title="Next Guided Step"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">{currentStep.phase}</h3>
            <p className="text-base text-violet-100 leading-relaxed font-medium">
              “{currentStep.instruction}”
            </p>
          </div>

          {/* Live Simulator Stage */}
          <InteractiveSimulator lesson={lesson} onOpenSandbox={onOpenSandbox} />
        </div>

        {/* Right 4 Columns: Live Student Vividness Pulse & Q&A Feed */}
        <div className="lg:col-span-4 space-y-5">
          {/* Cohort Vividness Telemetry Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> Cohort VVIQ Vividness Pulse
              </span>
              <span className="text-sm font-black text-white bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                Avg {cohortAverageVVIQ} / 5.0
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              {[
                { stage: 'Stage 5 (Hyperphantasia)', pct: 46, color: 'bg-violet-500' },
                { stage: 'Stage 4 (3D Raytraced)', pct: 38, color: 'bg-cyan-400' },
                { stage: 'Stage 3 (Chromatic Form)', pct: 12, color: 'bg-emerald-400' },
                { stage: 'Stages 1–2 (Developing)', pct: 4, color: 'bg-amber-400' }
              ].map((bar) => (
                <div key={bar.stage}>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                    <span>{bar.stage}</span>
                    <span>{bar.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className={`h-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={triggerVividnessPoll}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              {pollActive ? 'Refresh Live Vividness Poll' : 'Push Live Vividness Check to Class'}
            </button>
          </div>

          {/* Live Student Chat & Visual Cue Broadcast */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col h-[390px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> Live Classroom Feed
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> 48 Active
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl text-xs border ${
                    m.role === 'instructor'
                      ? 'bg-violet-950/50 border-violet-500/40 text-violet-100'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{m.sender}</span>
                    <div className="flex items-center gap-1.5">
                      {m.vividnessTag && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          VVIQ {m.vividnessTag}/5
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500">{m.time}</span>
                    </div>
                  </div>
                  <p className="leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendPrompt} className="mt-3 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Broadcast a visual cue to students..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
