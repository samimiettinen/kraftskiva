// Web Audio API synthesized sound effects — no external APIs needed

let audioCtx: AudioContext | null = null;
let audioMuted = false;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

export function setAudioMuted(muted: boolean) {
  audioMuted = muted;
}

export function isAudioMuted(): boolean {
  return audioMuted;
}

/* ───── Glass Clink ───── */
export function playGlassClink() {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;

  // Two short high-pitched tones simulating glass
  for (let i = 0; i < 2; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2800 + i * 400, t + i * 0.12);
    filter.type = "highpass";
    filter.frequency.value = 2000;
    gain.gain.setValueAtTime(0.3, t + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.4);
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(t + i * 0.12);
    osc.stop(t + i * 0.12 + 0.5);
  }

  // Add a metallic shimmer
  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.1;
  noise.buffer = buf;
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 5000;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.2, t);
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  noise.connect(hpf).connect(ng).connect(ctx.destination);
  noise.start(t);
}

/* ───── Pour Liquid ───── */
export function playPourSound() {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const dur = 1.2;
  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(800, t);
  bp.frequency.linearRampToValueAtTime(1200, t + dur);
  bp.Q.value = 2;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.08, t);
  g.gain.setValueAtTime(0.12, t + 0.3);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  noise.connect(bp).connect(g).connect(ctx.destination);
  noise.start(t);
}

/* ───── Applause ───── */
export function playApplause(duration = 2) {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const d = buf.getChannelData(0);
  // Modulated noise to simulate clapping
  for (let i = 0; i < d.length; i++) {
    const mod = Math.sin(i / (ctx.sampleRate * 0.02)) > 0 ? 1 : 0.3;
    d[i] = (Math.random() * 2 - 1) * mod;
  }
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3000;
  bp.Q.value = 0.5;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.15, t + 0.3);
  g.gain.setValueAtTime(0.15, t + duration * 0.6);
  g.gain.exponentialRampToValueAtTime(0.001, t + duration);
  noise.connect(bp).connect(g).connect(ctx.destination);
  noise.start(t);
}

/* ───── Cheer / Crowd ───── */
export function playCheer() {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  // Multiple oscillators for "wooo" vocal quality
  [200, 350, 500, 700].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.linearRampToValueAtTime(freq * 1.3, t + 0.4);
    osc.frequency.linearRampToValueAtTime(freq * 0.8, t + 1);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.03, t + 0.1);
    g.gain.setValueAtTime(0.03, t + 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1500;
    osc.connect(lp).connect(g).connect(ctx.destination);
    osc.start(t + i * 0.03);
    osc.stop(t + 1.3);
  });
  playApplause(1.5);
}

/* ───── Star Ding ───── */
export function playStarDing(pitch = 1) {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 1200 * pitch;
  g.gain.setValueAtTime(0.2, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.35);
}

/* ───── Victory Fanfare ───── */
export function playVictoryFanfare() {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.1, t + i * 0.2);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.2 + 0.5);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3000;
    osc.connect(lp).connect(g).connect(ctx.destination);
    osc.start(t + i * 0.2);
    osc.stop(t + i * 0.2 + 0.6);
  });
  setTimeout(() => playApplause(3), 900);
}

/* ───── Background Music (Festive Polka Loop) ───── */
let bgMusicGain: GainNode | null = null;
let bgMusicPlaying = false;
const bgOscillators: OscillatorNode[] = [];

export function startBackgroundMusic() {
  if (bgMusicPlaying) return;
  const ctx = getCtx();
  bgMusicPlaying = true;

  bgMusicGain = ctx.createGain();
  bgMusicGain.gain.value = 0.04;
  bgMusicGain.connect(ctx.destination);

  // Simple repeating polka-ish melody
  const melody = [
    392, 440, 494, 523, 587, 523, 494, 440,
    392, 330, 349, 392, 440, 392, 349, 330,
  ]; // G4-based folk melody

  const bass = [196, 196, 247, 247, 262, 262, 220, 220,
                196, 196, 175, 175, 220, 220, 196, 196];

  const noteDur = 0.3;

  function playLoop() {
    if (!bgMusicPlaying) return;
    const ctx2 = getCtx();
    const t = ctx2.currentTime;

    melody.forEach((freq, i) => {
      // Melody
      const osc = ctx2.createOscillator();
      const g = ctx2.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.06, t + i * noteDur);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * noteDur + noteDur * 0.9);
      osc.connect(g).connect(bgMusicGain!);
      osc.start(t + i * noteDur);
      osc.stop(t + i * noteDur + noteDur);
      bgOscillators.push(osc);

      // Bass
      const bOsc = ctx2.createOscillator();
      const bG = ctx2.createGain();
      bOsc.type = "sine";
      bOsc.frequency.value = bass[i];
      bG.gain.setValueAtTime(0.08, t + i * noteDur);
      bG.gain.exponentialRampToValueAtTime(0.001, t + i * noteDur + noteDur * 0.9);
      bOsc.connect(bG).connect(bgMusicGain!);
      bOsc.start(t + i * noteDur);
      bOsc.stop(t + i * noteDur + noteDur);
      bgOscillators.push(bOsc);
    });

    // Schedule next loop
    const loopDur = melody.length * noteDur * 1000;
    if (bgMusicPlaying) {
      setTimeout(playLoop, loopDur - 50);
    }
  }

  playLoop();
}

export function stopBackgroundMusic() {
  bgMusicPlaying = false;
  bgOscillators.forEach((o) => {
    try { o.stop(); } catch {}
  });
  bgOscillators.length = 0;
  if (bgMusicGain) {
    bgMusicGain.gain.exponentialRampToValueAtTime(0.001, getCtx().currentTime + 0.5);
  }
}

export function isMusicPlaying() {
  return bgMusicPlaying;
}

/* ───── Button Click ───── */
export function playClick() {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 800;
  g.gain.setValueAtTime(0.1, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

/* ───── Song Melody Player ───── */
import { getMelodyForSong, type Melody } from "@/lib/melodies";

let melodyTimeouts: ReturnType<typeof setTimeout>[] = [];
let melodyOscillators: OscillatorNode[] = [];
let melodyPlaying = false;

export function playSongMelody(melodyName: string) {
  if (audioMuted) return;
  stopSongMelody();
  melodyPlaying = true;

  const melody = getMelodyForSong(melodyName);
  const ctx = getCtx();
  const beatDur = 60 / melody.bpm;

  const melodyGain = ctx.createGain();
  melodyGain.gain.value = 0.12;
  melodyGain.connect(ctx.destination);

  const bassGain = ctx.createGain();
  bassGain.gain.value = 0.08; // Slightly quieter than melody
  bassGain.connect(ctx.destination);

  // Play melody
  let offset = 0;
  melody.notes.forEach((note) => {
    if (note.freq > 0) {
      const startTime = ctx.currentTime + offset;
      const noteDur = note.dur * beatDur;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = melody.waveform;
      osc.frequency.value = note.freq;
      g.gain.setValueAtTime(0.15, startTime);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + noteDur * 0.95);
      osc.connect(g).connect(melodyGain);
      osc.start(startTime);
      osc.stop(startTime + noteDur);
      melodyOscillators.push(osc);
    }
    offset += note.dur * beatDur;
  });

  // Play bass line if available
  if (melody.bassLine) {
    let bassOffset = 0;
    melody.bassLine.forEach((note) => {
      if (note.freq > 0) {
        const startTime = ctx.currentTime + bassOffset;
        const noteDur = note.dur * beatDur;

        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine"; // Bass sounds better with sine wave
        osc.frequency.value = note.freq;
        g.gain.setValueAtTime(0.12, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + noteDur * 0.95);
        osc.connect(g).connect(bassGain);
        osc.start(startTime);
        osc.stop(startTime + noteDur);
        melodyOscillators.push(osc);
      }
      bassOffset += note.dur * beatDur;
    });
  }

  // Loop the melody
  const totalDur = offset * 1000;
  const loopTimeout = setTimeout(() => {
    if (melodyPlaying) playSongMelody(melodyName);
  }, totalDur - 50);
  melodyTimeouts.push(loopTimeout);
}

export function stopSongMelody() {
  melodyPlaying = false;
  melodyTimeouts.forEach(clearTimeout);
  melodyTimeouts = [];
  melodyOscillators.forEach((o) => {
    try { o.stop(); } catch {}
  });
  melodyOscillators = [];
}
