/**
 * Web Audio API Ambient Synthesizer for Gaian Experience
 * Autonomous procedural audio without relying on external assets
 */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.spaceOsc = null;
    this.oceanNoiseNode = null;
    this.currentMode = 'space'; // 'space' | 'wind' | 'ocean'
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. Deep Space Drone (Warm sub-harmonic sine)
    this.spaceOsc = this.ctx.createOscillator();
    this.spaceOsc.type = 'sine';
    this.spaceOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note (55 Hz)

    const spaceFilter = this.ctx.createBiquadFilter();
    spaceFilter.type = 'lowpass';
    spaceFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.spaceGain = this.ctx.createGain();
    this.spaceGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.spaceOsc.connect(spaceFilter);
    spaceFilter.connect(this.spaceGain);
    this.spaceGain.connect(this.masterGain);
    this.spaceOsc.start();

    // 2. High Shimmer Harmonic (Atmospheric feel)
    this.shimmerOsc = this.ctx.createOscillator();
    this.shimmerOsc.type = 'triangle';
    this.shimmerOsc.frequency.setValueAtTime(220, this.ctx.currentTime);

    this.shimmerGain = this.ctx.createGain();
    this.shimmerGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.shimmerOsc.connect(this.shimmerGain);
    this.shimmerGain.connect(this.masterGain);
    this.shimmerOsc.start();

    this.isPlaying = true;
    this.masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 2.0);
  }

  toggle() {
    if (!this.ctx) {
      this.init();
      return true;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
      this.isPlaying = true;
      this.masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.5);
      return true;
    } else if (this.isPlaying) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (!this.isPlaying && this.ctx) this.ctx.suspend();
      }, 500);
      this.isPlaying = false;
      return false;
    } else {
      this.ctx.resume();
      this.isPlaying = true;
      this.masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.5);
      return true;
    }
  }

  playZoomSwoosh() {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  playBubblePing() {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const freq = 600 + Math.random() * 400;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  setAudioAtmosphereByScroll(progress) {
    if (!this.ctx || !this.isPlaying) return;
    if (progress > 0.7) {
      // In ocean
      this.spaceOsc.frequency.setTargetAtTime(45, this.ctx.currentTime, 0.5);
      if (Math.random() < 0.03) {
        this.playBubblePing();
      }
    } else {
      this.spaceOsc.frequency.setTargetAtTime(55, this.ctx.currentTime, 0.5);
    }
  }
}
