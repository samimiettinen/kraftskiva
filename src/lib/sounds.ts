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


/* ───── Drum Sounds ───── */
export function playKickDrum(time = 0) {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime + time;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(0.01, t + 0.5);
  g.gain.setValueAtTime(0.4, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.5);
}

export function playSnare(time = 0) {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime + time;
  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
  noise.buffer = buf;
  
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.25, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  
  noise.connect(g).connect(ctx.destination);
  noise.start(t);
}

export function playHiHat(time = 0) {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime + time;
  const noise = ctx.createBufferSource();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
  const d = buf.getChannelData(0);
  
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
  noise.buffer = buf;
  
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 8000;
  
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.15, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  
  noise.connect(hpf).connect(g).connect(ctx.destination);
  noise.start(t);
}

/* ───── Drum Fills / Transitions ───── */
export function playDrumFill(style: "standard" | "buildup" | "breakdown" = "standard") {
  if (audioMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;

  if (style === "standard") {
    // Classic snare roll building up with kick accents
    const steps = 16;
    for (let i = 0; i < steps; i++) {
      const time = i * 0.08;
      const vol = 0.05 + (i / steps) * 0.2;

      // Snare hits getting faster
      const noise = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * vol;
      noise.buffer = buf;
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol, t + time);
      g.gain.exponentialRampToValueAtTime(0.001, t + time + 0.08);
      noise.connect(g).connect(ctx.destination);
      noise.start(t + time);

      // Kick on every 4th hit
      if (i % 4 === 0) {
        const osc = ctx.createOscillator();
        const kg = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, t + time);
        osc.frequency.exponentialRampToValueAtTime(0.01, t + time + 0.3);
        kg.gain.setValueAtTime(vol * 1.5, t + time);
        kg.gain.exponentialRampToValueAtTime(0.001, t + time + 0.3);
        osc.connect(kg).connect(ctx.destination);
        osc.start(t + time);
        osc.stop(t + time + 0.35);
      }
    }
    // Final crash cymbal
    const crash = ctx.createBufferSource();
    const crashBuf = ctx.createBuffer(1, ctx.sampleRate * 0.8, ctx.sampleRate);
    const cd = crashBuf.getChannelData(0);
    for (let i = 0; i < cd.length; i++) cd[i] = (Math.random() * 2 - 1);
    crash.buffer = crashBuf;
    const chpf = ctx.createBiquadFilter();
    chpf.type = "highpass";
    chpf.frequency.value = 4000;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.25, t + steps * 0.08);
    cg.gain.exponentialRampToValueAtTime(0.001, t + steps * 0.08 + 0.8);
    crash.connect(chpf).connect(cg).connect(ctx.destination);
    crash.start(t + steps * 0.08);

    // Big kick at the end
    const finalKick = ctx.createOscillator();
    const fkg = ctx.createGain();
    finalKick.type = "sine";
    finalKick.frequency.setValueAtTime(180, t + steps * 0.08);
    finalKick.frequency.exponentialRampToValueAtTime(0.01, t + steps * 0.08 + 0.5);
    fkg.gain.setValueAtTime(0.5, t + steps * 0.08);
    fkg.gain.exponentialRampToValueAtTime(0.001, t + steps * 0.08 + 0.5);
    finalKick.connect(fkg).connect(ctx.destination);
    finalKick.start(t + steps * 0.08);
    finalKick.stop(t + steps * 0.08 + 0.55);
  }

  if (style === "buildup") {
    // Accelerating tom-tom pattern building to a crash
    const tomFreqs = [200, 170, 140, 120]; // descending toms
    let offset = 0;
    for (let rep = 0; rep < 3; rep++) {
      const speed = 0.2 - rep * 0.05; // Gets faster each repetition
      tomFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + offset + speed);
        g.gain.setValueAtTime(0.25 + rep * 0.05, t + offset);
        g.gain.exponentialRampToValueAtTime(0.001, t + offset + speed);
        osc.connect(g).connect(ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + speed + 0.05);
        offset += speed;
      });
    }
    // Crash + kick finale
    const crash = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 1.0, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    crash.buffer = buf;
    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 3500;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.3, t + offset);
    cg.gain.exponentialRampToValueAtTime(0.001, t + offset + 1.0);
    crash.connect(hpf).connect(cg).connect(ctx.destination);
    crash.start(t + offset);
  }

  if (style === "breakdown") {
    // Sparse, dramatic hits with space between
    const hits = [
      { time: 0, type: "kick" as const },
      { time: 0.3, type: "snare" as const },
      { time: 0.5, type: "kick" as const },
      { time: 0.65, type: "hihat" as const },
      { time: 0.8, type: "snare" as const },
      { time: 0.9, type: "hihat" as const },
      { time: 0.95, type: "hihat" as const },
      { time: 1.0, type: "kick" as const },
      { time: 1.0, type: "snare" as const },
    ];
    hits.forEach(({ time: hitTime, type }) => {
      if (type === "kick") {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, t + hitTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, t + hitTime + 0.4);
        g.gain.setValueAtTime(0.4, t + hitTime);
        g.gain.exponentialRampToValueAtTime(0.001, t + hitTime + 0.4);
        osc.connect(g).connect(ctx.destination);
        osc.start(t + hitTime);
        osc.stop(t + hitTime + 0.45);
      } else if (type === "snare") {
        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
        noise.buffer = buf;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.3, t + hitTime);
        g.gain.exponentialRampToValueAtTime(0.001, t + hitTime + 0.12);
        noise.connect(g).connect(ctx.destination);
        noise.start(t + hitTime);
      } else {
        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
        noise.buffer = buf;
        const hpf = ctx.createBiquadFilter();
        hpf.type = "highpass";
        hpf.frequency.value = 8000;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.15, t + hitTime);
        g.gain.exponentialRampToValueAtTime(0.001, t + hitTime + 0.06);
        noise.connect(hpf).connect(g).connect(ctx.destination);
        noise.start(t + hitTime);
      }
    });
  }
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
let melodySourceNodes: AudioBufferSourceNode[] = [];
let melodyOscillators: OscillatorNode[] = [];
let melodyPlaying = false;

/**
 * Vibraphone / synth bell synthesis.
 * Sine fundamental + detuned partial + soft tremolo for warmth.
 */
function playSynthTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  destination: AudioNode,
  volume = 0.18
) {
  if (freq <= 0) return;

  // Fundamental sine
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = freq;

  // Soft 2nd partial for bell character
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = freq * 2.0;

  // 3rd partial very quiet for shimmer
  const osc3 = ctx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.value = freq * 3.98;

  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(volume, startTime);
  g1.gain.exponentialRampToValueAtTime(volume * 0.6, startTime + duration * 0.3);
  g1.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.4);

  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(volume * 0.3, startTime);
  g2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.5);

  const g3 = ctx.createGain();
  g3.gain.setValueAtTime(volume * 0.08, startTime);
  g3.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.3);

  // Tremolo LFO for vibraphone motor effect
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 5.5;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.15;
  lfo.connect(lfoGain).connect(g1.gain);
  lfo.start(startTime);
  lfo.stop(startTime + duration + 0.5);

  osc1.connect(g1).connect(destination);
  osc2.connect(g2).connect(destination);
  osc3.connect(g3).connect(destination);

  osc1.start(startTime);
  osc1.stop(startTime + duration + 0.5);
  osc2.start(startTime);
  osc2.stop(startTime + duration + 0.5);
  osc3.start(startTime);
  osc3.stop(startTime + duration + 0.5);

  melodyOscillators.push(osc1, osc2, osc3, lfo);
}

/**
 * Play a warm acoustic bass note using sine + slight harmonics
 */
function playBassTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  destination: AudioNode
) {
  if (freq <= 0) return;

  // Fundamental
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.12, startTime);
  g.gain.setValueAtTime(0.10, startTime + duration * 0.6);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.95);

  // Add subtle 2nd harmonic for body
  const osc2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = freq * 2;
  g2.gain.setValueAtTime(0.03, startTime);
  g2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 600;

  osc.connect(g).connect(lp).connect(destination);
  osc2.connect(g2).connect(lp);
  osc.start(startTime);
  osc.stop(startTime + duration);
  osc2.start(startTime);
  osc2.stop(startTime + duration);
  melodyOscillators.push(osc, osc2);
}

export function playSongMelody(melodyName: string) {
  if (audioMuted) return;
  stopSongMelody();
  melodyPlaying = true;

  const melody = getMelodyForSong(melodyName);
  const ctx = getCtx();
  const beatDur = 60 / melody.bpm;

  const melodyGain = ctx.createGain();
  melodyGain.gain.value = 0.18;

  // Create simple reverb using delays and feedback
  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.7;
  
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.3;

  // Multiple delays at different times for diffuse reverb
  const delays: { delay: DelayNode; gain: GainNode }[] = [];
  const delayTimes = [0.037, 0.041, 0.043, 0.047]; // Prime numbers for natural diffusion
  
  delayTimes.forEach((time) => {
    const delay = ctx.createDelay(0.1);
    const gain = ctx.createGain();
    delay.delayTime.value = time;
    gain.gain.value = 0.4;
    delay.connect(gain);
    gain.connect(wetGain);
    delays.push({ delay, gain });
  });

  melodyGain.connect(dryGain).connect(ctx.destination);
  melodyGain.connect(delays[0].delay);
  delays.forEach((d, i) => {
    if (i > 0) d.delay.connect(delays[i - 1].delay);
  });
  wetGain.connect(ctx.destination);

  const bassGain = ctx.createGain();
  bassGain.gain.value = 0.10;
  bassGain.connect(ctx.destination);

  // Play melody with synth vibraphone tone
  let offset = 0;
  melody.notes.forEach((note) => {
    const noteDur = note.dur * beatDur;
    if (note.freq > 0) {
      playSynthTone(ctx, note.freq, ctx.currentTime + offset, noteDur, melodyGain, 0.18);
    }
    offset += noteDur;
  });

  // Play bass line with warm bass tone
  if (melody.bassLine) {
    let bassOffset = 0;
    melody.bassLine.forEach((note) => {
      const noteDur = note.dur * beatDur;
      if (note.freq > 0) {
        playBassTone(ctx, note.freq, ctx.currentTime + bassOffset, noteDur, bassGain);
      }
      bassOffset += noteDur;
    });
  }

  // Drums removed per user request

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
  melodySourceNodes.forEach((s) => {
    try { s.stop(); } catch {}
  });
  melodySourceNodes = [];
}
