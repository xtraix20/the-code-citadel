// Web Audio API Retro 8-bit sound generator for The Code Citadel
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicInterval = null;
    this.isEnabled = false;
    
    // A simple heroic medieval fantasy theme loop (NES/Zelda-like)
    // Array of [note_name, duration_in_beats]
    this.musicNotes = [
      ['A3', 1], ['C4', 1], ['D4', 1], ['D4', 2],
      ['D4', 1], ['F4', 1], ['G4', 1], ['G4', 2],
      ['G4', 1], ['A4', 1], ['F4', 1], ['G4', 1], ['D4', 3],
      
      ['A3', 1], ['C4', 1], ['D4', 1], ['D4', 2],
      ['D4', 1], ['F4', 1], ['G4', 1], ['G4', 2],
      ['G4', 1], ['F4', 1], ['E4', 1], ['D4', 1], ['D4', 3]
    ];
    
    this.noteFreqs = {
      'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66,
      'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
      'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25
    };
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  toggle(enabled) {
    this.init();
    this.isEnabled = enabled;
    if (enabled) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  playNote(frequency, type, duration, volume = 0.05) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type; // 'square', 'triangle', 'sawtooth', 'sine'
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio failed to play", e);
    }
  }

  // --- Sound Effects (SFX) ---
  playClick() {
    this.init();
    this.playNote(587.33, 'triangle', 0.08, 0.12);
  }

  playCoin() {
    this.init();
    if (!this.isEnabled) return;
    this.playNote(987.77, 'square', 0.1, 0.05); // B5
    setTimeout(() => {
      this.playNote(1318.51, 'square', 0.25, 0.05); // E6
    }, 80);
  }

  playVictory() {
    this.init();
    if (!this.isEnabled) return;
    const notes = [
      [523.25, 0.1], // C5
      [659.25, 0.1], // E5
      [783.99, 0.1], // G5
      [1046.50, 0.35] // C6
    ];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note[0], 'square', note[1], 0.08);
      }, index * 100);
    });
  }

  playDamage() {
    this.init();
    if (!this.isEnabled) return;
    this.playNote(220, 'sawtooth', 0.25, 0.1);
    setTimeout(() => {
      this.playNote(130, 'sawtooth', 0.35, 0.1);
    }, 100);
  }

  playHeal() {
    this.init();
    if (!this.isEnabled) return;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playNote(freq, 'triangle', 0.12, 0.08);
      }, index * 50);
    });
  }

  playAlchemist() {
    this.init();
    if (!this.isEnabled) return;
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const freq = 400 + Math.random() * 300;
        this.playNote(freq, 'triangle', 0.07, 0.06);
      }, i * 60);
    }
  }

  // --- Background Music Loop ---
  startMusic() {
    if (this.musicInterval) return;
    let currentBeat = 0;
    
    const playNextNote = () => {
      if (!this.isEnabled) return;
      const [noteName, beats] = this.musicNotes[currentBeat];
      const freq = this.noteFreqs[noteName];
      
      if (freq) {
        // Background music playing soft square notes
        this.playNote(freq, 'square', beats * 0.35, 0.015);
      }
      
      currentBeat = (currentBeat + 1) % this.musicNotes.length;
      this.musicInterval = setTimeout(playNextNote, beats * 350);
    };
    
    playNextNote();
  }

  stopMusic() {
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundEngine();
