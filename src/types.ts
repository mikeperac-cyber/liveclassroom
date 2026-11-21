export type VisualizationCategory =
  | 'Sensory & Vividness'
  | 'Spatial & 3D'
  | 'Memory Architecture'
  | 'Mind Mapping & Ideation'
  | 'Guided Imagery & Mastery';

export type SimulatorType =
  | 'sensory-apple'
  | 'rotation-3d'
  | 'afterimage'
  | 'mandala-geometry'
  | 'guided-cinema'
  | 'memory-palace-mini'
  | 'mind-map-mini';

export interface GuidedStep {
  phase: string;
  instruction: string;
  breathingCue: 'Inhale (4s)' | 'Hold & Construct (4s)' | 'Exhale & Stabilize (6s)' | 'Deep Focus';
  durationSec: number;
  sensoryFocus: string;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AZLesson {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  category: VisualizationCategory;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Mastery';
  durationMinutes: number;
  simulatorType: SimulatorType;
  tagline: string;
  overview: string;
  neuroscienceNote: string;
  steps: GuidedStep[];
  drillPrompt: string;
  keyTakeaways: string[];
  quiz: LessonQuiz;
  isCustom?: boolean;
}

export interface MindMapNode {
  id: string;
  label: string;
  subtitle?: string;
  x: number;
  y: number;
  color: string;
  icon: string;
  notes?: string;
}

export interface MindMapEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface MemoryLocus {
  id: string;
  order: number;
  stationName: string;
  targetConcept: string;
  visualImage: string;
  sensoryAnchor: string;
  x: number; // percentage 10-90
  y: number; // percentage 10-90
  color: string;
}

export interface MemoryPalaceRoom {
  id: string;
  name: string;
  theme: string;
  description: string;
  loci: MemoryLocus[];
}

export interface VividnessProfile {
  contourClarity: number; // 1-5
  colorIntensity: number; // 1-5
  spatialDepth3D: number; // 1-5
  motionStability: number; // 1-5
  multisensoryFusion: number; // 1-5
}

export interface StudentProgress {
  completedLetters: string[];
  quizScores: Record<string, boolean>;
  vividnessRatings: Record<string, number>; // 1-5 rating per letter
  journalNotes: Record<string, string>;
  vividnessProfile: VividnessProfile;
  xp: number;
  streakDays: number;
}
