import React, { useEffect, useRef, useState } from 'react';
import {
  Eye,
  EyeOff,
  Sun,
  Sparkles,
  RotateCw,
  Layers,
  Zap,
  Play,
  Pause,
  Camera,
  Compass,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Maximize2
} from 'lucide-react';
import { AZLesson } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SimulatorProps {
  lesson: AZLesson;
  onOpenSandbox?: (tab: 'mindmap' | 'palace' | 'whiteboard') => void;
}

export const InteractiveSimulator: React.FC<SimulatorProps> = ({ lesson, onOpenSandbox }) => {
  switch (lesson.simulatorType) {
    case 'sensory-apple':
      return <SensoryAppleSimulator lesson={lesson} />;
    case 'rotation-3d':
      return <Rotation3DSimulator lesson={lesson} />;
    case 'afterimage':
      return <AfterimageFlashSimulator lesson={lesson} />;
    case 'mandala-geometry':
      return <MandalaGeometrySimulator lesson={lesson} />;
    case 'guided-cinema':
      return <GuidedCinemaSimulator lesson={lesson} />;
    case 'memory-palace-mini':
      return <MiniPalaceSimulator lesson={lesson} onOpenSandbox={onOpenSandbox} />;
    case 'mind-map-mini':
      return <MiniMindMapSimulator lesson={lesson} onOpenSandbox={onOpenSandbox} />;
    default:
      return <SensoryAppleSimulator lesson={lesson} />;
  }
};

// ============================================================================
// 1. SENSORY APPLE & VIVIDNESS CALIBRATOR (VVIQ 1-5 + Raytracing + Micro Zoom)
// ============================================================================
const SensoryAppleSimulator: React.FC<{ lesson: AZLesson }> = ({ lesson }) => {
  const [vividnessStage, setVividnessStage] = useState<number>(4);
  const [lightAngle, setLightAngle] = useState<number>(45);
  const [microZoom, setMicroZoom] = useState<number>(1);
  const [crossSection, setCrossSection] = useState<boolean>(false);
  const [blindfoldMode, setBlindfoldMode] = useState<boolean>(false);
  const [holdSeconds, setHoldSeconds] = useState<number>(0);
  const [activeSenses, setActiveSenses] = useState<string[]>(['sight', 'weight']);

  useEffect(() => {
    if (!blindfoldMode) {
      setHoldSeconds(0);
      return;
    }
    const timer = setInterval(() => {
      setHoldSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [blindfoldMode]);

  const toggleSense = (sense: string) => {
    if (sense === 'crunch') soundEngine.playChime(660);
    setActiveSenses((prev) =>
      prev.includes(sense) ? prev.filter((s) => s !== sense) : [...prev, sense]
    );
  };

  const rad = (lightAngle * Math.PI) / 180;
  const lightX = 50 + Math.cos(rad) * 35;
  const lightY = 50 + Math.sin(rad) * 35;
  const shadowX = -Math.cos(rad) * 28;
  const shadowY = -Math.sin(rad) * 18;

  const stageDescriptions: Record<number, { name: string; desc: string }> = {
    1: {
      name: 'Stage 1: Conceptual Void (Aphantasia)',
      desc: 'You know the concept of "Apple" spatially, but no visual light or contour appears yet.'
    },
    2: {
      name: 'Stage 2: Dim Wireframe Silhouette (Hypophantasia)',
      desc: 'Faint ghost-like outline or fleeting monochrome contour on a dark canvas.'
    },
    3: {
      name: 'Stage 3: Flat Chromatic Form (Moderate Imagery)',
      desc: 'Clear 2D/3D shape with recognizable crimson color, but flat lighting.'
    },
    4: {
      name: 'Stage 4: Raytraced Volume & Shadow (Strong Phantasia)',
      desc: 'Directional specular highlight, curved core shadow, and realistic surface curvature.'
    },
    5: {
      name: 'Stage 5: Hyperphantasia (5-Sense Hologram)',
      desc: 'Glistening condensation droplets, lenticel skin pores, crisp acoustic crunch, and tactile weight.'
    }
  };

  return (
    <div className="bg-slate-900/90 border border-violet-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive VVIQ & Sensory Calibrator • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            {stageDescriptions[vividnessStage].name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCrossSection((v) => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              crossSection
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {crossSection ? 'Sliced Cross-Section' : 'Whole Object'}
          </button>
          <button
            onClick={() => {
              setBlindfoldMode((b) => !b);
              soundEngine.playChime(528);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              blindfoldMode
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                : 'bg-slate-800 border border-violet-500/40 text-violet-300 hover:bg-violet-950/60'
            }`}
          >
            {blindfoldMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {blindfoldMode ? `Holding in Mind (${holdSeconds}s)` : 'Blindfold Hold Test'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Interactive Visual Stage */}
        <div className="lg:col-span-7 relative h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden bg-grid-pattern">
          {/* Orbiting Light Source Indicator */}
          <div
            className="absolute w-7 h-7 rounded-full bg-amber-300/20 border border-amber-300 flex items-center justify-center shadow-lg shadow-amber-400/30 transition-all duration-150 pointer-events-none"
            style={{
              left: `calc(${lightX}% - 14px)`,
              top: `calc(${lightY}% - 14px)`
            }}
            title="Mental Key Light Source"
          >
            <Sun className="w-4 h-4 text-amber-300" />
          </div>

          {blindfoldMode ? (
            <div className="text-center px-6 max-w-md animate-pulse">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-violet-400/50 mx-auto mb-4 flex items-center justify-center">
                <EyeOff className="w-8 h-8 text-violet-400" />
              </div>
              <p className="text-violet-200 font-semibold text-base">
                Eyes Softened — Project Stage {vividnessStage} onto this Dark Canvas
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Maintain the highlight at {lightAngle}°, feel its 200g weight in your palm, and hold steady... ({holdSeconds}s)
              </p>
            </div>
          ) : (
            <div
              className="relative flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${1 + (microZoom - 1) * 0.45})` }}
            >
              {/* Cast Shadow */}
              {vividnessStage >= 4 && (
                <div
                  className="absolute w-36 h-12 rounded-full bg-black/75 blur-md transition-all"
                  style={{
                    transform: `translate(${shadowX}px, ${72 + shadowY}px)`
                  }}
                />
              )}

              {/* SVG Apple / Object Renderer across Stages 1-5 */}
              <svg width="220" height="220" viewBox="0 0 200 200" className="overflow-visible">
                <defs>
                  <radialGradient
                    id="appleGrad"
                    cx={`${lightX}%`}
                    cy={`${lightY}%`}
                    r="65%"
                  >
                    <stop
                      offset="0%"
                      stopColor={vividnessStage === 5 ? '#fda4af' : '#f43f5e'}
                    />
                    <stop
                      offset="45%"
                      stopColor={vividnessStage >= 4 ? '#e11d48' : '#be123c'}
                    />
                    <stop
                      offset="100%"
                      stopColor={vividnessStage >= 4 ? '#4c0519' : '#881337'}
                    />
                  </radialGradient>
                  <radialGradient id="fleshGrad" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#fef9c3" />
                    <stop offset="85%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </radialGradient>
                </defs>

                {vividnessStage === 1 && (
                  <g>
                    <circle
                      cx="100"
                      cy="105"
                      r="58"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                    />
                    <text
                      x="100"
                      y="108"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="12"
                      fontFamily="monospace"
                    >
                      [CONCEPT: APPLE]
                    </text>
                  </g>
                )}

                {vividnessStage >= 2 && (
                  <g>
                    {/* Stem */}
                    <path
                      d="M100 52 Q104 32 114 28"
                      fill="none"
                      stroke={vividnessStage === 2 ? '#64748b' : '#78350f'}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Leaf */}
                    {vividnessStage >= 3 && (
                      <path
                        d="M103 44 Q125 30 135 44 Q120 56 103 44 Z"
                        fill={vividnessStage >= 4 ? '#10b981' : '#059669'}
                      />
                    )}
                    {/* Apple Body */}
                    <path
                      d="M100 54 C70 42, 38 68, 42 108 C46 146, 76 168, 96 164 C100 163, 100 163, 104 164 C124 168, 154 146, 158 108 C162 68, 130 42, 100 54 Z"
                      fill={
                        vividnessStage === 2
                          ? 'none'
                          : crossSection
                          ? 'url(#fleshGrad)'
                          : 'url(#appleGrad)'
                      }
                      stroke={
                        vividnessStage === 2
                          ? '#94a3b8'
                          : crossSection
                          ? '#e11d48'
                          : 'rgba(255,255,255,0.15)'
                      }
                      strokeWidth={vividnessStage === 2 ? '2' : crossSection ? '6' : '1'}
                      strokeDasharray={vividnessStage === 2 ? '5 3' : undefined}
                    />

                    {/* Cross-section star core & seeds */}
                    {crossSection && vividnessStage >= 3 && (
                      <g>
                        <polygon
                          points="100,82 106,98 122,98 109,108 114,124 100,114 86,124 91,108 78,98 94,98"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="1.5"
                          opacity="0.7"
                        />
                        <ellipse cx="94" cy="105" rx="3" ry="5" fill="#451a03" />
                        <ellipse cx="106" cy="105" rx="3" ry="5" fill="#451a03" />
                      </g>
                    )}

                    {/* Stage 5 Hyperphantasia Dewdrops & Micro-Lenticels */}
                    {vividnessStage === 5 && !crossSection && (
                      <g>
                        <circle cx="75" cy="85" r="1.2" fill="#fef08a" opacity="0.7" />
                        <circle cx="88" cy="115" r="1" fill="#fef08a" opacity="0.6" />
                        <circle cx="122" cy="95" r="1.3" fill="#fef08a" opacity="0.7" />
                        <circle cx="115" cy="130" r="1.1" fill="#fef08a" opacity="0.6" />
                        <circle cx="68" cy="122" r="1" fill="#fef08a" opacity="0.6" />
                        {/* Specular Dewdrop */}
                        <ellipse
                          cx="78"
                          cy="96"
                          rx="4"
                          ry="5.5"
                          fill="rgba(255,255,255,0.65)"
                          stroke="#ffffff"
                          strokeWidth="0.8"
                        />
                        <circle cx="77" cy="94" r="1.5" fill="#ffffff" />
                        <ellipse
                          cx="124"
                          cy="112"
                          rx="3"
                          ry="4.5"
                          fill="rgba(255,255,255,0.55)"
                        />
                      </g>
                    )}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Active Multi-Sensory Anchors Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400">
              {stageDescriptions[vividnessStage].desc}
            </span>
          </div>
        </div>

        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Mind’s Eye Vividness Stage (1–5)</span>
              <span className="text-violet-400 font-bold">Stage {vividnessStage} / 5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={vividnessStage}
              onChange={(e) => setVividnessStage(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>1: Void</span>
              <span>2: Outline</span>
              <span>3: Color</span>
              <span>4: 3D Light</span>
              <span>5: Hyper</span>
            </div>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Mental Light Source Orbit
              </span>
              <span className="text-amber-300 font-mono">{lightAngle}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={lightAngle}
              onChange={(e) => setLightAngle(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Hyper-Detail Macro Zoom (Module H)</span>
              <span className="text-cyan-400 font-mono">{microZoom.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={microZoom}
              onChange={(e) => setMicroZoom(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* 5-Sense Braiding Toggles */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 mb-2">
              5-Channel Sensory Anchor Braid (Module K):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'sight', label: '👁️ Specular Dew' },
                { id: 'weight', label: '✋ 200g Cool Weight' },
                { id: 'crunch', label: '🔊 Crisp Snap' },
                { id: 'aroma', label: '🌿 Tart Orchard Mist' },
                { id: 'taste', label: '🍎 Sweet-Acidic Bite' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSense(s.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    activeSenses.includes(s.id)
                      ? 'bg-violet-600/30 border border-violet-400 text-violet-200'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. 3D MENTAL ROTATION, BLUEPRINT & X-RAY SIMULATOR (Modules B, O, R, X)
// ============================================================================
const Rotation3DSimulator: React.FC<{ lesson: AZLesson }> = ({ lesson }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shape, setShape] = useState<'cube' | 'octahedron' | 'chiral-L' | 'watch-exploded'>('chiral-L');
  const [rotX, setRotX] = useState<number>(25);
  const [rotY, setRotY] = useState<number>(40);
  const [rotZ, setRotZ] = useState<number>(0);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const [xrayMode, setXrayMode] = useState<boolean>(true);
  const [explodedFactor, setExplodedFactor] = useState<number>(lesson.letter === 'X' ? 1.6 : 1.0);
  const [blindfold, setBlindfold] = useState<boolean>(false);

  useEffect(() => {
    if (!autoSpin) return;
    const id = setInterval(() => {
      setRotY((y) => (y + 1.5) % 360);
    }, 30);
    return () => clearInterval(id);
  }, [autoSpin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (blindfold) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 75;

    const rx = (rotX * Math.PI) / 180;
    const ry = (rotY * Math.PI) / 180;
    const rz = (rotZ * Math.PI) / 180;

    const project = (x: number, y: number, z: number) => {
      // Rotate X
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);
      // Rotate Y
      const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rotate Z
      const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

      const fov = 4.5;
      const dist = fov / (fov + z2 * 0.35);
      return {
        x: cx + x3 * scale * dist,
        y: cy + y3 * scale * dist,
        z: z2
      };
    };

    let vertices: [number, number, number][] = [];
    let edges: [number, number, string?][] = [];

    if (shape === 'cube') {
      const e = explodedFactor;
      vertices = [
        [-1 * e, -1 * e, -1 * e],
        [1 * e, -1 * e, -1 * e],
        [1 * e, 1 * e, -1 * e],
        [-1 * e, 1 * e, -1 * e],
        [-1 * e, -1 * e, 1 * e],
        [1 * e, -1 * e, 1 * e],
        [1 * e, 1 * e, 1 * e],
        [-1 * e, 1 * e, 1 * e]
      ];
      edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      if (xrayMode) {
        // Internal core cube
        const base = vertices.length;
        const inner = 0.45;
        vertices.push(
          [-inner, -inner, -inner],
          [inner, -inner, -inner],
          [inner, inner, -inner],
          [-inner, inner, -inner],
          [-inner, -inner, inner],
          [inner, -inner, inner],
          [inner, inner, inner],
          [-inner, inner, inner]
        );
        edges.push(
          [base, base + 1, '#f43f5e'], [base + 1, base + 2, '#f43f5e'],
          [base + 2, base + 3, '#f43f5e'], [base + 3, base, '#f43f5e'],
          [base + 4, base + 5, '#f43f5e'], [base + 5, base + 6, '#f43f5e'],
          [base + 6, base + 7, '#f43f5e'], [base + 7, base + 4, '#f43f5e'],
          [base, base + 4, '#f43f5e'], [base + 1, base + 5, '#f43f5e'],
          [base + 2, base + 6, '#f43f5e'], [base + 3, base + 7, '#f43f5e']
        );
      }
    } else if (shape === 'octahedron') {
      const e = explodedFactor;
      vertices = [
        [0, -1.35 * e, 0],
        [0, 1.35 * e, 0],
        [-1.2 * e, 0, 0],
        [1.2 * e, 0, 0],
        [0, 0, -1.2 * e],
        [0, 0, 1.2 * e]
      ];
      edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2]
      ];
      if (xrayMode) {
        edges.push([0, 1, '#f59e0b'], [2, 3, '#f59e0b'], [4, 5, '#f59e0b']);
      }
    } else {
      // Shepard-Metzler Chiral L-Block / Exploded Assembly
      const gap = (explodedFactor - 1) * 0.65;
      const cubes: [number, number, number, string][] = [
        [0, -1 - gap, 0, '#38bdf8'],
        [0, 0, 0, '#38bdf8'],
        [0, 1 + gap, 0, '#38bdf8'],
        [1 + gap, 1 + gap, 0, '#a855f7'],
        [0, -1 - gap, 1 + gap, '#f43f5e']
      ];
      cubes.forEach(([cx0, cy0, cz0, color]) => {
        const s = 0.42;
        const base = vertices.length;
        vertices.push(
          [cx0 - s, cy0 - s, cz0 - s],
          [cx0 + s, cy0 - s, cz0 - s],
          [cx0 + s, cy0 + s, cz0 - s],
          [cx0 - s, cy0 + s, cz0 - s],
          [cx0 - s, cy0 - s, cz0 + s],
          [cx0 + s, cy0 - s, cz0 + s],
          [cx0 + s, cy0 + s, cz0 + s],
          [cx0 - s, cy0 + s, cz0 + s]
        );
        const cubeEdges: [number, number][] = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];
        cubeEdges.forEach(([a, b]) => edges.push([base + a, base + b, color]));
      });
    }

    const projected = vertices.map(([x, y, z]) => project(x, y, z));

    // Draw Edges
    edges.forEach(([i, j, customColor]) => {
      const p1 = projected[i];
      const p2 = projected[j];
      if (!p1 || !p2) return;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = customColor || '#22d3ee';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = customColor || '#22d3ee';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Draw Vertices
    projected.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, idx === 0 ? 5 : 3.2, 0, Math.PI * 2);
      ctx.fillStyle = idx === 0 ? '#facc15' : '#e0f2fe';
      ctx.fill();
    });
  }, [shape, rotX, rotY, rotZ, xrayMode, explodedFactor, blindfold]);

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" /> 3D Shepard-Metzler & X-Ray Engine • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Spatial Blueprinting, 3-Axis Rotation & Exploded CAD View
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAutoSpin((s) => !s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              autoSpin
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {autoSpin ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {autoSpin ? 'Auto-Orbit On' : 'Manual Gimbal'}
          </button>
          <button
            onClick={() => setXrayMode((x) => !x)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              xrayMode
                ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {xrayMode ? 'X-Ray Core Visible' : 'Outer Shell Only'}
          </button>
          <button
            onClick={() => setBlindfold((b) => !b)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              blindfold
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800 border border-violet-500/40 text-violet-300'
            }`}
          >
            {blindfold ? 'Reveal 3D Model' : 'Blindfold Rotation Test'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-7 relative h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center bg-grid-pattern">
          <canvas ref={canvasRef} width={460} height={300} className="max-w-full" />
          {blindfold && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90">
              <EyeOff className="w-10 h-10 text-cyan-400 mb-3 animate-bounce" />
              <p className="text-white font-semibold">
                Mentally Rotate the {shape.toUpperCase()} +90° on the Y-Axis!
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Track the golden anchor vertex (•) and the colored chiral arms in your mind’s eye, then click "Reveal 3D Model" to check your orientation.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'chiral-L', label: 'Chiral L-Block' },
              { id: 'cube', label: 'Tesseract Cube' },
              { id: 'octahedron', label: 'Octahedron' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setShape(item.id as 'cube' | 'octahedron' | 'chiral-L')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  shape === item.id
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {[
            { label: 'Pitch (X-Axis)', val: rotX, set: setRotX, color: 'accent-cyan-400' },
            { label: 'Yaw (Y-Axis)', val: Math.round(rotY), set: setRotY, color: 'accent-violet-400' },
            { label: 'Roll (Z-Axis)', val: rotZ, set: setRotZ, color: 'accent-pink-400' }
          ].map((axis) => (
            <div key={axis.label} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{axis.label}</span>
                <span className="text-cyan-300 font-mono">{axis.val}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={axis.val}
                onChange={(e) => {
                  setAutoSpin(false);
                  axis.set(Number(e.target.value));
                }}
                className={`w-full ${axis.color} cursor-pointer`}
              />
            </div>
          ))}

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Exploded CAD Layer Separation (Module X)</span>
              <span className="text-rose-300 font-mono">{explodedFactor.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={2.2}
              step={0.1}
              value={explodedFactor}
              onChange={(e) => setExplodedFactor(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. RETINAL AFTERIMAGE & TACHISTOSCOPIC FLASH TRAINER (Modules C & P)
// ============================================================================
const AfterimageFlashSimulator: React.FC<{ lesson: AZLesson }> = ({ lesson }) => {
  const [mode, setMode] = useState<'afterimage' | 'flash'>('afterimage');
  const [fixationTime, setFixationTime] = useState<number>(20);
  const [isFixating, setIsFixating] = useState<boolean>(false);
  const [showDarkWall, setShowDarkWall] = useState<boolean>(false);
  const [palette, setPalette] = useState<'cyan-crimson' | 'emerald-magenta' | 'cobalt-gold'>('cyan-crimson');

  // Flash Grid state
  const symbols = ['▲', '◆', '★', '●', '✚', '⬢', '✦', '▼', '◉'];
  const [flashGrid, setFlashGrid] = useState<string[]>(['▲', '★', '●', '◆', '✦', '⬢', '✚', '▼', '◉']);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [revealGrid, setRevealGrid] = useState<boolean>(false);

  useEffect(() => {
    if (!isFixating) return;
    if (fixationTime <= 0) {
      setIsFixating(false);
      setShowDarkWall(true);
      soundEngine.playChime(528);
      return;
    }
    const timer = setTimeout(() => setFixationTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [isFixating, fixationTime]);

  const startFixation = () => {
    setShowDarkWall(false);
    setFixationTime(20);
    setIsFixating(true);
  };

  const triggerFlash = () => {
    const shuffled = [...symbols].sort(() => Math.random() - 0.5);
    setFlashGrid(shuffled);
    setRevealGrid(false);
    setIsFlashing(true);
    soundEngine.playChime(740);
    setTimeout(() => {
      setIsFlashing(false);
    }, 550);
  };

  const colors = {
    'cyan-crimson': { primary: '#00ffff', ring: '#ff0055', complement: 'Glowing Crimson-Red Star' },
    'emerald-magenta': { primary: '#00ff66', ring: '#ff00aa', complement: 'Neon Magenta-Violet Lotus' },
    'cobalt-gold': { primary: '#2563eb', ring: '#facc15', complement: 'Brilliant Golden Sunburst' }
  }[palette];

  return (
    <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Retinal Persistence & Eidetic Flash Lab • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Bridge Physical Sight & Closed-Eye Visualization
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('afterimage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              mode === 'afterimage'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            20s Retinal Afterimage
          </button>
          <button
            onClick={() => setMode('flash')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              mode === 'flash'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            500ms Eidetic Flash Matrix
          </button>
        </div>
      </div>

      {mode === 'afterimage' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div
            className={`lg:col-span-7 h-80 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative transition-colors duration-200 ${
              showDarkWall ? 'bg-slate-950' : 'bg-slate-950'
            }`}
          >
            {showDarkWall ? (
              <div className="text-center p-6">
                <div className="w-3 h-3 rounded-full bg-white/40 mx-auto mb-4" />
                <p className="text-lg font-bold text-white">
                  Blink Softly or Close Your Eyes Now!
                </p>
                <p className="text-sm text-pink-300 mt-1">
                  Observe the complementary <span className="underline">{colors.complement}</span> floating in your field of view.
                </p>
                <p className="text-xs text-slate-400 mt-3 max-w-md mx-auto">
                  Emmert’s Law Drill: Project the glowing afterimage onto a far wall in your mind to watch it double in size, then bring it close to shrink it.
                </p>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <svg width="230" height="230" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="82" fill={colors.ring} opacity="0.25" />
                  <polygon
                    points="100,20 122,74 180,78 135,116 150,174 100,142 50,174 65,116 20,78 78,74"
                    fill={colors.primary}
                  />
                  {/* Central Fixation Point */}
                  <circle cx="100" cy="100" r="5" fill="#0f172a" />
                  <circle cx="100" cy="100" r="2" fill="#ffffff" />
                </svg>
                {isFixating && (
                  <div className="absolute -bottom-6 bg-slate-900/90 border border-pink-500/40 px-3 py-1 rounded-full text-xs font-mono text-pink-200">
                    Keep eyes locked on center dot: {fixationTime}s
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>How this trains the Mind’s Eye:</strong> Staring at the central dot for 20 seconds bleaches cone photoreceptors, producing a real closed-eye signal. Steering and scaling that signal trains top-down V1 attention.
              </p>
              <div className="flex gap-2">
                {(['cyan-crimson', 'emerald-magenta', 'cobalt-gold'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPalette(p);
                      setShowDarkWall(false);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium border transition ${
                      palette === p
                        ? 'bg-pink-500/20 border-pink-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {p.replace('-', ' → ')}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={startFixation}
                  className="flex-1 py-2.5 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-semibold rounded-xl text-xs shadow-lg"
                >
                  {isFixating ? `Fixating... (${fixationTime}s)` : 'Start 20s Fixation Timer'}
                </button>
                <button
                  onClick={() => {
                    setIsFixating(false);
                    setShowDarkWall((w) => !w);
                  }}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs"
                >
                  {showDarkWall ? 'Show Target' : 'Dark Wall'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-6">
            {isFlashing || revealGrid ? (
              <div className="grid grid-cols-3 gap-4 w-56 h-56">
                {flashGrid.map((sym, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-slate-900 border border-amber-400/50 flex items-center justify-center text-3xl text-amber-300 shadow-lg shadow-amber-500/10"
                  >
                    {sym}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center max-w-sm">
                <p className="text-base font-semibold text-amber-200">
                  Hold the 3×3 Iconic Snapshot in Your Mind!
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Read the top row, middle row, and bottom row symbols off your mental screen before clicking "Check Matrix".
                </p>
              </div>
            )}
          </div>
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">500ms Tachistoscopic Recall Drill</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click <strong>Flash 500ms</strong> while relaxing your gaze on the center of the box. Do not try to name the symbols during the flash—absorb the whole visual photograph and read it back after the screen goes dark.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={triggerFlash}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
                >
                  ⚡ Flash 500ms Pattern
                </button>
                <button
                  onClick={() => setRevealGrid((r) => !r)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium"
                >
                  {revealGrid ? 'Hide Matrix' : 'Check Matrix'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. SACRED GEOMETRY & MANDALA ENGINE (Modules G, U, Y)
// ============================================================================
const MandalaGeometrySimulator: React.FC<{ lesson: AZLesson }> = ({ lesson }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [petals, setPetals] = useState<number>(8);
  const [rings, setRings] = useState<number>(3);
  const [speed, setSpeed] = useState<number>(1);
  const [voidFade, setVoidFade] = useState<number>(lesson.letter === 'Y' ? 0.35 : 1);

  useEffect(() => {
    let angle = 0;
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      angle += 0.008 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const breathScale = 1 + Math.sin(angle * 1.5) * 0.12;

      ctx.save();
      ctx.globalAlpha = voidFade;

      for (let r = 1; r <= rings; r++) {
        const radius = r * 34 * breathScale;
        const dir = r % 2 === 0 ? -1 : 1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle * dir * (1 + r * 0.2));

        for (let i = 0; i < petals; i++) {
          const theta = (i * Math.PI * 2) / petals;
          ctx.save();
          ctx.rotate(theta);

          ctx.beginPath();
          ctx.ellipse(radius * 0.55, 0, radius * 0.45, radius * 0.22, 0, 0, Math.PI * 2);
          ctx.strokeStyle = r === 1 ? '#facc15' : r === 2 ? '#c084fc' : '#38bdf8';
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.restore();
        }
        ctx.restore();
      }

      // Central Bindu Star
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [petals, rings, speed, voidFade]);

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Sacred Symmetry & Stillness Engine • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Counter-Rotating Concentric Lattice & Obsidian Canvas Reset
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-7 h-80 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
          <canvas ref={canvasRef} width={360} height={300} />
        </div>

        <div className="lg:col-span-5 space-y-3.5">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Radial Symmetry Fold (Petals)</span>
              <span className="text-amber-300 font-mono">{petals}-Fold</span>
            </div>
            <input
              type="range"
              min={4}
              max={16}
              step={2}
              value={petals}
              onChange={(e) => setPetals(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Concentric Counter-Rotating Rings</span>
              <span className="text-violet-300 font-mono">{rings} Rings</span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={rings}
              onChange={(e) => setRings(Number(e.target.value))}
              className="w-full accent-violet-400 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Obsidian Void Stillness (Module Y Opacity)</span>
              <span className="text-cyan-300 font-mono">{Math.round(voidFade * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={voidFade}
              onChange={(e) => setVoidFade(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. GUIDED INNER CINEMA & PERCEPTUAL CAMERA DIRECTOR (Modules D, F, I, V, Z)
// ============================================================================
const GuidedCinemaSimulator: React.FC<{ lesson: AZLesson }> = ({ lesson }) => {
  const [cameraMode, setCameraMode] = useState<'1st' | '2nd' | '3rd'>('1st');
  const [focalPlane, setFocalPlane] = useState<'macro' | 'deep'>('macro');
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentStep = lesson.steps[activeStepIdx] || lesson.steps[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIdx((i) => {
        const next = (i + 1) % lesson.steps.length;
        soundEngine.playChime(528);
        return next;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, lesson.steps.length]);

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Inner Cinema Director & Guided Pacer • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Perceptual Camera Switching, Rack Focus & Timed Visualization
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying((p) => !p);
              soundEngine.playChime(528);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isPlaying
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 border border-emerald-500/40 text-emerald-300'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Guided Pacer Running' : 'Auto-Play Guided Steps'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Inner Cinema Viewport */}
        <div className="lg:col-span-7 h-80 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between p-6 bg-iso-pattern">
          {/* Horizon / Background Layer */}
          <div
            className={`transition-all duration-500 flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 ${
              focalPlane === 'macro' ? 'blur-[2px] opacity-50' : 'blur-0 opacity-100 border-emerald-500/40'
            }`}
          >
            <span className="text-emerald-300 font-semibold">🏔️ Far Horizon Plane (3 km Parallax)</span>
            <span className="text-slate-400">
              {cameraMode === '1st'
                ? 'Looking out through your own eyes'
                : cameraMode === '2nd'
                ? 'Viewing yourself through your students’ eyes'
                : 'Floating 4m ceiling Director Camera'}
            </span>
          </div>

          {/* Center Guided Prompt Stage */}
          <div className="my-auto text-center max-w-lg mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              {currentStep.breathingCue} • {currentStep.sensoryFocus}
            </span>
            <h4 className="text-base font-bold text-white">{currentStep.phase}</h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              “{currentStep.instruction}”
            </p>
          </div>

          {/* Foreground Macro Plane */}
          <div
            className={`transition-all duration-500 flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-slate-900/90 border ${
              focalPlane === 'macro'
                ? 'blur-0 opacity-100 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                : 'blur-[2px] opacity-55 border-slate-800'
            }`}
          >
            <span className="text-cyan-300 font-semibold">🧭 Macro Foreground Plane (25 cm Tactile Reach)</span>
            <span className="text-slate-400 font-mono">Camera: {cameraMode.toUpperCase()} PERSON</span>
          </div>
        </div>

        {/* Camera & Step Controls */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 mb-2">
              Perceptual Camera Position (Module I):
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: '1st', label: '1st Person (Eyes)' },
                { id: '2nd', label: '2nd Person (Student)' },
                { id: '3rd', label: '3rd Person (Director)' }
              ].map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setCameraMode(cam.id as '1st' | '2nd' | '3rd')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition ${
                    cameraMode === cam.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 mb-2">
              Optical Rack Focus (Module D Depth Planes):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFocalPlane('macro')}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  focalPlane === 'macro'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                Focus Foreground (Bokeh Far)
              </button>
              <button
                onClick={() => setFocalPlane('deep')}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  focalPlane === 'deep'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                Focus Horizon (Blur Close)
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 mb-2">
              Guided Sequence Steps:
            </p>
            <div className="space-y-1.5">
              {lesson.steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                    activeStepIdx === idx
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{st.phase}</span>
                  <span className="text-[10px] font-mono opacity-75">{st.durationSec}s</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. MINI MEMORY PALACE & MIND MAP SIMULATORS (Link to Full Sandbox)
// ============================================================================
const MiniPalaceSimulator: React.FC<SimulatorProps> = ({ lesson, onOpenSandbox }) => {
  const [testRecall, setTestRecall] = useState(false);
  const sampleStations = [
    { num: 1, locus: 'Obsidian Fountain', image: 'Giant Ruby Apple spraying tart golden mist' },
    { num: 2, locus: 'Vitruvian Archway', image: 'Neon Cyan Laser Cube spinning in mid-air' },
    { num: 3, locus: 'Prismatic Rose Window', image: 'Liquid Cobalt & Amber Rainbow Waterfall' },
    { num: 4, locus: 'Golden Lion Throne', image: '12-Foot Neon Lion juggling lightning batteries' }
  ];

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Architectural Loci Preview • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Method of Loci & Exaggerated Station Encoding
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTestRecall((r) => !r)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-amber-400/40 text-amber-300"
          >
            {testRecall ? 'Reveal Encoded Images' : 'Hide Images (Recall Test)'}
          </button>
          {onOpenSandbox && (
            <button
              onClick={() => onOpenSandbox('palace')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Open Full Memory Palace Architect
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sampleStations.map((st) => (
          <div
            key={st.num}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold flex items-center justify-center">
                {st.num}
              </span>
              <span className="text-xs font-bold text-white">{st.locus}</span>
            </div>
            {testRecall ? (
              <p className="text-xs text-amber-300/80 italic py-3">
                [Visualize what is happening at Station #{st.num}...]
              </p>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">{st.image}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MiniMindMapSimulator: React.FC<SimulatorProps> = ({ lesson, onOpenSandbox }) => {
  return (
    <div className="bg-slate-900/90 border border-violet-500/30 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Radiant Node-Graph Preview • Module {lesson.letter}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Associative Mind Mapping & Scenario Branching
          </h3>
        </div>
        {onOpenSandbox && (
          <button
            onClick={() => onOpenSandbox('mindmap')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Launch Interactive Mind Map Studio
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-950 border border-violet-500/30">
          <div className="font-bold text-violet-300 mb-1">1. Central Visual Totem</div>
          <p className="text-slate-400">
            Start every topic with a high-contrast 3D emblem in the center of the canvas rather than linear text.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
          <div className="font-bold text-cyan-300 mb-1">2. Chromatic Arterial Branches</div>
          <p className="text-slate-400">
            Assign one distinct electric color per primary branch so students recall entire clusters by hue.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
          <div className="font-bold text-emerald-300 mb-1">3. Cross-Synapse Links</div>
          <p className="text-slate-400">
            Connect distant nodes across branches to reveal second-order causal loops and creative syntheses.
          </p>
        </div>
      </div>
    </div>
  );
};
