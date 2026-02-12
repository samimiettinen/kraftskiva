// Note frequencies (Hz) for melody playback
const N = {
  C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, B4: 494,
  C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880,
  G3: 196, A3: 220, B3: 247,
  REST: 0,
} as const;

export interface MelodyNote {
  freq: number;
  dur: number; // in beats (1 = quarter note)
}

export interface Melody {
  notes: MelodyNote[];
  bpm: number;
  waveform: OscillatorType;
}

function n(freq: number, dur: number): MelodyNote {
  return { freq, dur };
}

// Helan Går — traditional Swedish drinking song
const helanGar: Melody = {
  bpm: 140, waveform: "triangle",
  notes: [
    n(N.G4,1), n(N.G4,1), n(N.B4,1), n(N.B4,1),
    n(N.D5,1.5), n(N.D5,0.5), n(N.B4,1), n(N.REST,0.5),
    n(N.A4,0.5), n(N.A4,0.5), n(N.A4,0.5), n(N.A4,1),
    n(N.B4,1), n(N.G4,1), n(N.G4,1),
    n(N.G4,1), n(N.G4,1), n(N.B4,1), n(N.B4,1),
    n(N.D5,1.5), n(N.D5,0.5), n(N.B4,1), n(N.REST,0.5),
    n(N.A4,0.5), n(N.A4,0.5), n(N.A4,0.5), n(N.A4,1),
    n(N.G4,1), n(N.G4,1), n(N.REST,0.5),
    n(N.A4,1), n(N.D5,0.5), n(N.D5,0.5), n(N.D5,1),
    n(N.B4,1), n(N.G4,1), n(N.G4,1),
    n(N.A4,1), n(N.D5,0.5), n(N.D5,0.5), n(N.D5,1),
    n(N.B4,1), n(N.G4,1), n(N.G4,1),
    n(N.G4,1), n(N.G4,1), n(N.B4,1), n(N.B4,1),
    n(N.D5,1), n(N.D5,1), n(N.G5,1.5),
    n(N.F5,0.5), n(N.F5,0.5), n(N.F5,0.5), n(N.F5,1),
    n(N.G5,2),
  ],
};

// Twinkle Twinkle / Blinka lilla stjärna / Bä bä vita lamm
const twinkleTwinkle: Melody = {
  bpm: 120, waveform: "triangle",
  notes: [
    n(N.C4,1), n(N.C4,1), n(N.G4,1), n(N.G4,1),
    n(N.A4,1), n(N.A4,1), n(N.G4,2),
    n(N.F4,1), n(N.F4,1), n(N.E4,1), n(N.E4,1),
    n(N.D4,1), n(N.D4,1), n(N.C4,2),
    n(N.G4,1), n(N.G4,1), n(N.F4,1), n(N.F4,1),
    n(N.E4,1), n(N.E4,1), n(N.D4,2),
    n(N.G4,1), n(N.G4,1), n(N.F4,1), n(N.F4,1),
    n(N.E4,1), n(N.E4,1), n(N.D4,2),
    n(N.C4,1), n(N.C4,1), n(N.G4,1), n(N.G4,1),
    n(N.A4,1), n(N.A4,1), n(N.G4,2),
    n(N.F4,1), n(N.F4,1), n(N.E4,1), n(N.E4,1),
    n(N.D4,1), n(N.D4,1), n(N.C4,2),
  ],
};

// Små grodorna (= Frère Jacques)
const smaGrodorna: Melody = {
  bpm: 140, waveform: "triangle",
  notes: [
    n(N.C4,1), n(N.D4,1), n(N.E4,1), n(N.C4,1),
    n(N.C4,1), n(N.D4,1), n(N.E4,1), n(N.C4,1),
    n(N.E4,1), n(N.F4,1), n(N.G4,2),
    n(N.E4,1), n(N.F4,1), n(N.G4,2),
    n(N.G4,0.5), n(N.A4,0.5), n(N.G4,0.5), n(N.F4,0.5),
    n(N.E4,1), n(N.C4,1),
    n(N.G4,0.5), n(N.A4,0.5), n(N.G4,0.5), n(N.F4,0.5),
    n(N.E4,1), n(N.C4,1),
    n(N.C4,1), n(N.G3,1), n(N.C4,2),
    n(N.C4,1), n(N.G3,1), n(N.C4,2),
  ],
};

// Räven raskar över isen
const ravenRaskar: Melody = {
  bpm: 130, waveform: "triangle",
  notes: [
    n(N.G4,0.5), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,0.5),
    n(N.G4,0.5), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,0.5),
    n(N.C5,0.5), n(N.C5,0.5), n(N.D5,0.5), n(N.C5,0.5),
    n(N.B4,1), n(N.A4,1),
    n(N.G4,0.5), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,0.5),
    n(N.G4,0.5), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,0.5),
    n(N.C5,0.5), n(N.D5,0.5), n(N.C5,0.5), n(N.B4,0.5),
    n(N.A4,1), n(N.G4,1),
    n(N.D5,1), n(N.D5,1), n(N.E5,0.5), n(N.D5,0.5),
    n(N.C5,1), n(N.B4,1),
    n(N.C5,1), n(N.C5,1), n(N.D5,0.5), n(N.C5,0.5),
    n(N.B4,1), n(N.A4,1),
    n(N.G4,0.5), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,0.5),
    n(N.C5,0.5), n(N.D5,0.5), n(N.C5,0.5), n(N.B4,0.5),
    n(N.A4,1), n(N.G4,2),
  ],
};

// Mors lilla Olle
const morsLillaOlle: Melody = {
  bpm: 110, waveform: "triangle",
  notes: [
    n(N.E4,1), n(N.E4,0.5), n(N.F4,0.5), n(N.G4,1), n(N.G4,1),
    n(N.A4,1), n(N.A4,0.5), n(N.G4,0.5), n(N.F4,1), n(N.E4,1),
    n(N.D4,1), n(N.D4,0.5), n(N.E4,0.5), n(N.F4,2),
    n(N.E4,1), n(N.E4,0.5), n(N.F4,0.5), n(N.G4,1), n(N.G4,1),
    n(N.A4,1), n(N.A4,0.5), n(N.G4,0.5), n(N.F4,1), n(N.E4,1),
    n(N.D4,1), n(N.F4,0.5), n(N.E4,0.5), n(N.D4,2),
  ],
};

// Vi går över daggstänkta berg
const daggstanktaBerg: Melody = {
  bpm: 120, waveform: "triangle",
  notes: [
    n(N.G4,1), n(N.A4,1), n(N.B4,1), n(N.G4,1),
    n(N.D5,1.5), n(N.C5,0.5), n(N.B4,2),
    n(N.A4,1), n(N.B4,1), n(N.C5,1), n(N.A4,1),
    n(N.D5,1.5), n(N.C5,0.5), n(N.B4,2),
    n(N.D5,1), n(N.E5,1), n(N.D5,1), n(N.C5,1),
    n(N.B4,1), n(N.A4,1), n(N.G4,2),
  ],
};

// Uppå källarbacken
const uppaKallarbacken: Melody = {
  bpm: 150, waveform: "triangle",
  notes: [
    n(N.G4,0.5), n(N.A4,0.5), n(N.B4,1), n(N.B4,1),
    n(N.B4,0.5), n(N.C5,0.5), n(N.D5,1), n(N.D5,1),
    n(N.D5,0.5), n(N.C5,0.5), n(N.B4,0.5), n(N.A4,0.5),
    n(N.G4,1), n(N.B4,1),
    n(N.A4,1), n(N.A4,0.5), n(N.B4,0.5),
    n(N.A4,0.5), n(N.G4,0.5), n(N.G4,2),
    n(N.G4,0.5), n(N.A4,0.5), n(N.B4,1), n(N.B4,1),
    n(N.B4,0.5), n(N.C5,0.5), n(N.D5,1), n(N.D5,1),
    n(N.E5,0.5), n(N.D5,0.5), n(N.C5,0.5), n(N.B4,0.5),
    n(N.A4,1), n(N.G4,2),
  ],
};

// Generic cheerful folk melody
const genericFolk: Melody = {
  bpm: 130, waveform: "triangle",
  notes: [
    n(N.G4,1), n(N.B4,0.5), n(N.D5,0.5), n(N.B4,1),
    n(N.A4,1), n(N.G4,0.5), n(N.A4,0.5), n(N.B4,1),
    n(N.G4,1), n(N.E4,0.5), n(N.G4,0.5), n(N.A4,1),
    n(N.B4,1), n(N.D5,1), n(N.B4,1), n(N.G4,1),
    n(N.A4,1), n(N.B4,0.5), n(N.A4,0.5), n(N.G4,2),
  ],
};

// Map song melody names to melody data
export const melodyMap: Record<string, Melody> = {
  "Traditionell": helanGar,
  "Blinka lilla stjärna": twinkleTwinkle,
  "Bä, bä vita lamm": twinkleTwinkle,
  "Små grodorna": smaGrodorna,
  "Räven raskar över isen": ravenRaskar,
  "Mors lilla Olle": morsLillaOlle,
  "Vi går över daggstänkta berg": daggstanktaBerg,
  "Uppå källarbacken": uppaKallarbacken,
  "ABC": genericFolk,
  "Stockholm i mitt hjärta": genericFolk,
  "Flickan hon går i ringen": genericFolk,
  "Bara bada bastu": genericFolk,
  "Genom eld och vatten": genericFolk,
  "Jänta å ja": genericFolk,
  "Tänd ett ljus": genericFolk,
  "Lille katt": genericFolk,
};

export function getMelodyForSong(melodyName: string): Melody {
  return melodyMap[melodyName] || genericFolk;
}
