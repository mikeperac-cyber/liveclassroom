import React, { useEffect, useRef, useState } from 'react';
import {
  Network,
  Landmark,
  PenTool,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Download,
  RotateCcw,
  Move,
  Layers
} from 'lucide-react';
import { MemoryLocus, MemoryPalaceRoom, MindMapEdge, MindMapNode } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SandboxProps {
  initialTab?: 'mindmap' | 'palace' | 'whiteboard';
  nodes: MindMapNode[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  edges: MindMapEdge[];
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
  rooms: MemoryPalaceRoom[];
  setRooms: React.Dispatch<React.SetStateAction<MemoryPalaceRoom[]>>;
}

export const VisualSandboxLab: React.FC<SandboxProps> = ({
  initialTab = 'mindmap',
  nodes,
  setNodes,
  edges,
  setEdges,
  rooms,
  setRooms
}) => {
  const [activeTab, setActiveTab] = useState<'mindmap' | 'palace' | 'whiteboard'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Interactive Visual Sandbox & Creation Lab
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-0.5">
            Mind Map Studio • Memory Palace Architect • Teaching Whiteboard
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('mindmap')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'mindmap'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-4 h-4" /> Mind Map Studio
          </button>
          <button
            onClick={() => setActiveTab('palace')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'palace'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" /> Memory Palace Architect
          </button>
          <button
            onClick={() => setActiveTab('whiteboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'whiteboard'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PenTool className="w-4 h-4" /> Freeform Visual Whiteboard
          </button>
        </div>
      </div>

      {activeTab === 'mindmap' && (
        <MindMapStudio nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      )}
      {activeTab === 'palace' && <MemoryPalaceArchitect rooms={rooms} setRooms={setRooms} />}
      {activeTab === 'whiteboard' && <TeachingWhiteboard />}
    </div>
  );
};

// ============================================================================
// TAB 1: INTERACTIVE MIND MAP STUDIO (Draggable Node-Graph + Branch Builder)
// ============================================================================
const MindMapStudio: React.FC<{
  nodes: MindMapNode[];
  setNodes: React.Dispatch<React.SetStateAction<MindMapNode[]>>;
  edges: MindMapEdge[];
  setEdges: React.Dispatch<React.SetStateAction<MindMapEdge[]>>;
}> = ({ nodes, setNodes, edges, setEdges }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(80, Math.min(rect.width - 80, e.clientX - rect.left));
    const y = Math.max(50, Math.min(rect.height - 50, e.clientY - rect.top));
    setNodes((prev) => prev.map((n) => (n.id === draggingId ? { ...n, x, y } : n)));
  };

  const addChildBranch = () => {
    if (!selectedNode) return;
    const palette = ['#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#a855f7', '#38bdf8'];
    const color = palette[nodes.length % palette.length];
    const angle = (nodes.length * 1.1) % (Math.PI * 2);
    const newId = `node-${Date.now()}`;
    const newNode: MindMapNode = {
      id: newId,
      label: 'New Visual Concept',
      subtitle: 'Keyword + Totem',
      x: Math.max(100, Math.min(800, selectedNode.x + Math.cos(angle) * 170)),
      y: Math.max(70, Math.min(470, selectedNode.y + Math.sin(angle) * 130)),
      color,
      icon: 'Sparkles',
      notes: 'Describe the vivid 3D symbol and sensory association for this node.'
    };
    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [
      ...prev,
      { id: `edge-${Date.now()}`, from: selectedNode.id, to: newId, label: 'Associates' }
    ]);
    setSelectedNodeId(newId);
    soundEngine.playChime(620);
  };

  const deleteSelectedNode = () => {
    if (!selectedNode || nodes.length <= 1) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedNode.id));
    setEdges((prev) =>
      prev.filter((e) => e.from !== selectedNode.id && e.to !== selectedNode.id)
    );
    setSelectedNodeId(nodes[0].id);
  };

  const loadScenarioTreeTemplate = () => {
    const scenarioNodes: MindMapNode[] = [
      {
        id: 'q-root',
        label: 'Decision Crossroads (Module Q)',
        subtitle: 'Present Choice Point',
        x: 160,
        y: 270,
        color: '#8b5cf6',
        icon: 'Eye',
        notes: 'Stand at the crystal bifurcation bridge and project all 3 parallel futures.'
      },
      {
        id: 'q-opt',
        label: 'Timeline A: Bold Expansion',
        subtitle: 'High Velocity Path',
        x: 520,
        y: 110,
        color: '#10b981',
        icon: 'Sparkles',
        notes: 'Launch live global cohort + interactive 3D curriculum.'
      },
      {
        id: 'q-base',
        label: 'Timeline B: Steady Mastery',
        subtitle: 'Compound Growth',
        x: 520,
        y: 270,
        color: '#06b6d4',
        icon: 'Box',
        notes: 'Weekly A–Z modules with community memory palace challenges.'
      },
      {
        id: 'q-stress',
        label: 'Timeline C: Stress-Test Hedge',
        subtitle: 'Resilient Backup',
        x: 520,
        y: 430,
        color: '#f59e0b',
        icon: 'Landmark',
        notes: 'Pre-rehearsed recovery maneuver (Module F) for any obstacle.'
      }
    ];
    const scenarioEdges: MindMapEdge[] = [
      { id: 'qe1', from: 'q-root', to: 'q-opt', label: 'Branch Alpha' },
      { id: 'qe2', from: 'q-root', to: 'q-base', label: 'Branch Beta' },
      { id: 'qe3', from: 'q-root', to: 'q-stress', label: 'Branch Gamma' }
    ];
    setNodes(scenarioNodes);
    setEdges(scenarioEdges);
    setSelectedNodeId('q-root');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Interactive Node-Graph Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDraggingId(null)}
        onMouseLeave={() => setDraggingId(null)}
        className="lg:col-span-8 h-[540px] rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden select-none bg-grid-pattern shadow-2xl"
      >
        {/* Top Toolbar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2 pointer-events-auto">
            <Move className="w-3.5 h-3.5 text-violet-400" />
            Drag any node to arrange your radial constellation • Click a node to edit or branch
          </div>
          <div className="flex gap-2 pointer-events-auto">
            <button
              onClick={loadScenarioTreeTemplate}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 font-medium"
            >
              Load Quantum Scenario Tree (Q)
            </button>
            <button
              onClick={addChildBranch}
              className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-3.5 h-3.5" /> Add Branch from Selected
            </button>
          </div>
        </div>

        {/* SVG Curved Synaptic Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2 - 22;
            return (
              <g key={edge.id}>
                <path
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke={toNode.color}
                  strokeWidth="3"
                  strokeOpacity="0.65"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    className="font-mono"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Draggable Nodes */}
        {nodes.map((node) => {
          const isSelected = node.id === selectedNode?.id;
          return (
            <div
              key={node.id}
              onMouseDown={() => {
                setSelectedNodeId(node.id);
                setDraggingId(node.id);
              }}
              style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                borderColor: node.color,
                boxShadow: isSelected ? `0 0 24px ${node.color}55` : undefined
              }}
              className={`absolute z-10 px-4 py-2.5 rounded-2xl bg-slate-900/95 border-2 cursor-grab active:cursor-grabbing transition-shadow min-w-[160px] max-w-[220px] ${
                isSelected ? 'ring-2 ring-white/60' : 'hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-xs font-bold text-white leading-tight">{node.label}</span>
              </div>
              {node.subtitle && (
                <div className="text-[11px] text-slate-400 mt-0.5 pl-5 truncate">
                  {node.subtitle}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Inspector & Editor */}
      <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-violet-400 font-semibold">
              Radiant Node Inspector
            </span>
            <h3 className="text-base font-bold text-white">Customize Visual Totem</h3>
          </div>
          {nodes.length > 1 && (
            <button
              onClick={deleteSelectedNode}
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
              title="Delete Node"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {selectedNode && (
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Concept Keyword / Title</label>
              <input
                type="text"
                value={selectedNode.label}
                onChange={(e) =>
                  setNodes((prev) =>
                    prev.map((n) =>
                      n.id === selectedNode.id ? { ...n, label: e.target.value } : n
                    )
                  )
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Visual Totem / Subtitle (Module S)
              </label>
              <input
                type="text"
                value={selectedNode.subtitle || ''}
                onChange={(e) =>
                  setNodes((prev) =>
                    prev.map((n) =>
                      n.id === selectedNode.id ? { ...n, subtitle: e.target.value } : n
                    )
                  )
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">
                Chromatic Branch Hue (Module C)
              </label>
              <div className="flex gap-2">
                {['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'].map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      setNodes((prev) =>
                        prev.map((n) => (n.id === selectedNode.id ? { ...n, color: c } : n))
                      )
                    }
                    className={`w-7 h-7 rounded-full border-2 transition ${
                      selectedNode.color === c ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Multi-Sensory Teaching Notes
              </label>
              <textarea
                rows={4}
                value={selectedNode.notes || ''}
                onChange={(e) =>
                  setNodes((prev) =>
                    prev.map((n) =>
                      n.id === selectedNode.id ? { ...n, notes: e.target.value } : n
                    )
                  )
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              onClick={addChildBranch}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" /> Sprout Child Node from Here
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// TAB 2: MEMORY PALACE ARCHITECT (Floorplan Loci + Recall Walk Mode)
// ============================================================================
const MemoryPalaceArchitect: React.FC<{
  rooms: MemoryPalaceRoom[];
  setRooms: React.Dispatch<React.SetStateAction<MemoryPalaceRoom[]>>;
}> = ({ rooms, setRooms }) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || '');
  const [selectedLocusId, setSelectedLocusId] = useState<string>(rooms[0]?.loci[0]?.id || '');
  const [recallWalkMode, setRecallWalkMode] = useState<boolean>(false);
  const [walkIndex, setWalkIndex] = useState<number>(0);
  const [revealedInWalk, setRevealedInWalk] = useState<boolean>(false);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];
  const selectedLocus =
    activeRoom.loci.find((l) => l.id === selectedLocusId) || activeRoom.loci[0];

  const handleFloorplanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (recallWalkMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Only add if clicking empty floor (not on a button)
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;

    const nextOrder = activeRoom.loci.length + 1;
    const colors = ['#f43f5e', '#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899'];
    const newLocus: MemoryLocus = {
      id: `locus-${Date.now()}`,
      order: nextOrder,
      stationName: `Station #${nextOrder} Alcove`,
      targetConcept: 'New Concept to Memorize',
      visualImage: 'Describe a giant, kinetic, exaggerated 3D totem interacting with this station',
      sensoryAnchor: 'Sound + Tactile Temperature + Scent',
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(12, Math.min(88, y)),
      color: colors[(nextOrder - 1) % colors.length]
    };

    setRooms((prev) =>
      prev.map((r) => (r.id === activeRoom.id ? { ...r, loci: [...r.loci, newLocus] } : r))
    );
    setSelectedLocusId(newLocus.id);
    soundEngine.playChime(587);
  };

  const updateSelectedLocus = (patch: Partial<MemoryLocus>) => {
    if (!selectedLocus) return;
    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoom.id
          ? {
              ...r,
              loci: r.loci.map((l) => (l.id === selectedLocus.id ? { ...l, ...patch } : l))
            }
          : r
      )
    );
  };

  const deleteLocus = (id: string) => {
    if (activeRoom.loci.length <= 1) return;
    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoom.id
          ? {
              ...r,
              loci: r.loci
                .filter((l) => l.id !== id)
                .map((l, idx) => ({ ...l, order: idx + 1 }))
            }
          : r
      )
    );
  };

  const currentWalkLocus = activeRoom.loci[walkIndex] || activeRoom.loci[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Architectural Floorplan & Loci Trajectory */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
          <div className="flex flex-wrap gap-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                  setSelectedLocusId(room.loci[0]?.id || '');
                  setWalkIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  room.id === activeRoom.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                🏛️ {room.name} ({room.loci.length} Loci)
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setRecallWalkMode((m) => !m);
              setWalkIndex(0);
              setRevealedInWalk(false);
              soundEngine.playChime(528);
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              recallWalkMode
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-800 border border-amber-400/40 text-amber-300 hover:bg-slate-700'
            }`}
          >
            {recallWalkMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {recallWalkMode ? 'Exit Recall Walk Mode' : 'Start Blind Recall Walk'}
          </button>
        </div>

        {/* Architectural Sanctuary Blueprint */}
        <div
          onClick={handleFloorplanClick}
          className="h-[460px] rounded-2xl bg-slate-950 border-2 border-amber-500/30 relative overflow-hidden bg-iso-pattern cursor-crosshair shadow-2xl"
        >
          {/* Architectural Room Walls & Compass */}
          <div className="absolute inset-5 border border-amber-500/20 rounded-xl pointer-events-none flex flex-col justify-between p-4">
            <div className="flex justify-between text-[11px] font-mono text-amber-300/60">
              <span>NORTH WALL • {activeRoom.theme.toUpperCase()}</span>
              <span>CLICK FLOOR TO PLACE NEW LOCUS STATION</span>
            </div>
            <div className="mx-auto my-auto w-44 h-44 rounded-full border border-dashed border-amber-500/15 flex items-center justify-center">
              <span className="text-xs font-mono text-slate-600">CENTRAL ROTUNDA DOME</span>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-amber-300/60">
              <span>WEST COLONNADE</span>
              <span>🚪 GRAND ENTRANCE THRESHOLD (SOUTH)</span>
              <span>EAST ALCOVE</span>
            </div>
          </div>

          {/* SVG Sequential Journey Path Connecting Loci 1 -> N */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {activeRoom.loci.map((locus, idx) => {
              const next = activeRoom.loci[idx + 1];
              if (!next) return null;
              return (
                <line
                  key={locus.id}
                  x1={`${locus.x}%`}
                  y1={`${locus.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeOpacity="0.5"
                />
              );
            })}
          </svg>

          {/* Loci Stations */}
          {activeRoom.loci.map((locus, idx) => {
            const isSelected = recallWalkMode
              ? idx === walkIndex
              : locus.id === selectedLocus?.id;

            return (
              <button
                key={locus.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (recallWalkMode) {
                    setWalkIndex(idx);
                    setRevealedInWalk(false);
                  } else {
                    setSelectedLocusId(locus.id);
                  }
                }}
                style={{
                  left: `${locus.x}%`,
                  top: `${locus.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute z-10 group transition-all ${
                  isSelected ? 'scale-110 z-20' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl bg-slate-900/95 border-2 text-left shadow-xl min-w-[150px] max-w-[200px] ${
                    isSelected ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ borderColor: locus.color }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full text-[11px] font-extrabold text-slate-950 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: locus.color }}
                    >
                      {locus.order}
                    </span>
                    <span className="text-xs font-bold text-white truncate">
                      {locus.stationName}
                    </span>
                  </div>
                  <div className="text-[11px] mt-1 truncate">
                    {recallWalkMode && (!revealedInWalk || idx !== walkIndex) ? (
                      <span className="text-amber-300/80 italic">🔒 Hidden for Recall...</span>
                    ) : (
                      <span className="text-slate-300 font-medium">{locus.targetConcept}</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Station Editor OR Recall Walk Tester */}
      <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 h-fit">
        {recallWalkMode && currentWalkLocus ? (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Sequential Loci Recall Test (Modules J & M)
              </span>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                Station #{currentWalkLocus.order}: {currentWalkLocus.stationName}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">
                Step into the <strong>{activeRoom.name}</strong> and look at{' '}
                <strong className="text-amber-300">{currentWalkLocus.stationName}</strong>. What exaggerated 3D image and concept did you anchor here?
              </p>
              {revealedInWalk ? (
                <div className="pt-3 border-t border-slate-800 space-y-2 animate-fadeIn">
                  <div className="text-sm font-bold text-emerald-300">
                    ✓ {currentWalkLocus.targetConcept}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <strong>Visual Totem:</strong> {currentWalkLocus.visualImage}
                  </p>
                  <p className="text-xs text-amber-300">
                    <strong>Sensory Anchor:</strong> {currentWalkLocus.sensoryAnchor}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setRevealedInWalk(true);
                    soundEngine.playChime(660);
                  }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Reveal Encoded Concept & Totem
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setWalkIndex((i) => (i - 1 + activeRoom.loci.length) % activeRoom.loci.length);
                  setRevealedInWalk(false);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                ← Previous Station
              </button>
              <button
                onClick={() => {
                  setWalkIndex((i) => (i + 1) % activeRoom.loci.length);
                  setRevealedInWalk(false);
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
              >
                Next Station →
              </button>
            </div>
          </div>
        ) : (
          selectedLocus && (
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                    Locus Station #{selectedLocus.order} Editor
                  </span>
                  <h3 className="text-base font-bold text-white">Architectural Anchor</h3>
                </div>
                {activeRoom.loci.length > 1 && (
                  <button
                    onClick={() => deleteLocus(selectedLocus.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    title="Delete Station"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Architectural Feature / Furniture
                </label>
                <input
                  type="text"
                  value={selectedLocus.stationName}
                  onChange={(e) => updateSelectedLocus({ stationName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Target Concept to Remember
                </label>
                <input
                  type="text"
                  value={selectedLocus.targetConcept}
                  onChange={(e) => updateSelectedLocus({ targetConcept: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  Exaggerated 3D Visual Image (Module E)
                </label>
                <textarea
                  rows={3}
                  value={selectedLocus.visualImage}
                  onChange={(e) => updateSelectedLocus({ visualImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  5-Sense Hook (Sound, Weight, Temperature)
                </label>
                <input
                  type="text"
                  value={selectedLocus.sensoryAnchor}
                  onChange={(e) => updateSelectedLocus({ sensoryAnchor: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

// ============================================================================
// TAB 3: FREEFORM VISUAL TEACHING WHITEBOARD & LASER SKETCHPAD
// ============================================================================
const TeachingWhiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#38bdf8');
  const [brushSize, setBrushSize] = useState<number>(4);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [laserMode, setLaserMode] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw initial welcome diagram
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(240, 220, 55, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mind’s Eye', 240, 224);

    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(295, 220);
    ctx.lineTo(420, 220);
    ctx.stroke();

    ctx.strokeRect(420, 175, 130, 90);
    ctx.fillText('3D Projection', 485, 224);
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = laserMode ? '#f43f5e' : color;
    ctx.lineWidth = laserMode ? 6 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = laserMode ? '#f43f5e' : color;
    ctx.shadowBlur = laserMode ? 16 : 6;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetheria-visual-whiteboard.png';
    a.click();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {['#38bdf8', '#a855f7', '#ec4899', '#10b981', '#facc15', '#ffffff'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setLaserMode(false);
                setColor(c);
              }}
              className={`w-7 h-7 rounded-full border-2 transition ${
                !laserMode && color === c ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <button
            onClick={() => setLaserMode((l) => !l)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              laserMode
                ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            🔴 Neon Laser Pen
          </button>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Stroke:</span>
            <input
              type="range"
              min={2}
              max={14}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-20 accent-cyan-400"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearBoard}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Canvas
          </button>
          <button
            onClick={exportImage}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Diagram PNG
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden bg-grid-pattern">
        <canvas
          ref={canvasRef}
          width={1000}
          height={460}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          className="w-full h-[460px] cursor-crosshair"
        />
      </div>
    </div>
  );
};
