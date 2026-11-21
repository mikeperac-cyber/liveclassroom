// Web Audio API Ambient Binaural & Chime Synthesizer for Guided Visualization

export type BrainwavePreset = 'off' | 'alpha-10hz' | 'theta-6hz' | 'gamma-40hz';

class VisualizationSoundEngine {
  private ctx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private currentPreset: BrainwavePreset = 'off';

  private ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setPreset(preset: BrainwavePreset, volume = 0.08) {
    this.stopDrone();
    this.currentPreset = preset;
    if (preset === 'off') return;

    try {
      this.ensureContext();
      if (!this.ctx) return;

      const baseFreq = preset === 'theta-6hz' ? 180 : preset === 'alpha-10hz' ? 216 : 240;
      const beatDiff = preset === 'theta-6hz' ? 6 : preset === 'alpha-10hz' ? 10 : 40;

      const merger = this.ctx.createChannelMerger(2);
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), this.ctx.currentTime + 1.2);

      this.leftOsc = this.ctx.createOscillator();
      this.rightOsc = this.ctx.createOscillator();
      this.leftOsc.type = 'sine';
      this.rightOsc.type = 'sine';

      this.leftOsc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      this.rightOsc.frequency.setValueAtTime(baseFreq + beatDiff, this.ctx.currentTime);

      const leftGain = this.ctx.createGain();
      const rightGain = this.ctx.createGain();
      leftGain.gain.value = 0.5;
      rightGain.gain.value = 0.5;

      this.leftOsc.connect(leftGain);
      this.rightOsc.connect(rightGain);
      leftGain.connect(merger, 0, 0);
      rightGain.connect(merger, 0, 1);

      merger.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.leftOsc.start();
      this.rightOsc.start();
    } catch {
      // Ignore audio autoplay blocks until user interaction
    }
  }

  public stopDrone() {
    try {
      if (this.leftOsc) {
        this.leftOsc.stop();
        this.leftOsc.disconnect();
        this.leftOsc = null;
      }
      if (this.rightOsc) {
        this.rightOsc.stop();
        this.rightOsc.disconnect();
        this.rightOsc = null;
      }
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain = null;
      }
    } catch {
      // Safe cleanup
    }
    this.currentPreset = 'off';
  }

  public playChime(freq = 528) {
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const harmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      harmonic.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      harmonic.frequency.setValueAtTime(freq * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.value = 0.25;

      osc.connect(gain);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      harmonic.start(now);
      osc.stop(now + 2.5);
      harmonic.stop(now + 2.5);
    } catch {
      // Ignore audio errors
    }
  }

  public getPreset(): BrainwavePreset {
    return this.currentPreset;
  }
}

export const soundEngine = new VisualizationSoundEngine();
