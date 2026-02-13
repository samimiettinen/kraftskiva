// Note frequencies (Hz) for melody playback
const N = {
  C4: 262, Cs4: 277, D4: 294, Ds4: 311, E4: 330, F4: 349, Fs4: 370, G4: 392, Gs4: 415, A4: 440, As4: 466, B4: 494,
  C5: 523, Cs5: 554, D5: 587, Ds5: 622, E5: 659, F5: 698, Fs5: 740, G5: 784, Gs5: 831, A5: 880,
  G3: 196, A3: 220, B3: 247, F3: 175, C3: 131, D3: 147, E3: 165,
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
  bassLine?: MelodyNote[];
  harmonyLine?: MelodyNote[];
  drumPattern?: DrumPattern;
}

export interface DrumPattern {
  kicks: number[]; // Beat positions for kicks
  snares: number[]; // Beat positions for snares
  hiHats: number[]; // Beat positions for hi-hats
  barsPerPattern: number; // How many bars the pattern spans
}

function n(freq: number, dur: number): MelodyNote {
  return { freq, dur };
}

// Helan Går — vibraphone jazz arrangement (arr. Joel S., 220 BPM swing)
const helanGar: Melody = {
  bpm: 220, waveform: "sine",
  notes: [
    // Bar 1-2: Fmaj7 → Am7
    n(N.C5, 1), n(N.C5, 2), n(N.F5, 1),
    n(N.REST, 0.5), n(N.C5, 0.5), n(N.A4, 2), n(N.REST, 0.5), n(N.A4, 0.5),
    // Bar 3-4: G7 → Cmaj7
    n(N.G4, 1), n(N.G4, 0.5), n(N.A4, 0.5), n(N.B4, 1), n(N.C5, 1),
    n(N.C5, 1), n(N.E5, 0.5), n(N.C5, 0.5), n(N.D5, 2),
    // Bar 5-6: Fmaj7 → Am7
    n(N.C5, 2), n(N.F5, 1), n(N.REST, 0.5), n(N.C5, 0.5),
    n(N.A4, 2), n(N.REST, 0.5), n(N.A4, 0.5),
    // Bar 7-8: G7 → Cmaj7
    n(N.G4, 1), n(N.G4, 1), n(N.G4, 1), n(N.G4, 1),
    n(N.REST, 0.5), n(N.E5, 0.5), n(N.C5, 1), n(N.REST, 0.5), n(N.G4, 0.5),
    // Bar 9-10: Am7 → D7
    n(N.A4, 0.67), n(N.Fs4, 0.67), n(N.Gs4, 0.67), n(N.A4, 1), n(N.Fs4, 1),
    n(N.G4, 1), n(N.G4, 1), n(N.G4, 1), n(N.G4, 1),
    // Bar 11-12: G7 → Cmaj7
    n(N.REST, 0.5), n(N.G4, 0.5), n(N.E5, 1), n(N.C5, 1), n(N.C5, 1),
    n(N.Gs4, 0.67), n(N.A4, 0.67), n(N.Gs4, 0.67),
    // Bar 13-14: Em7 → Am7
    n(N.E5, 1), n(N.E5, 1), n(N.E5, 1), n(N.E5, 1),
    n(N.REST, 0.5), n(N.E5, 0.5), n(N.C5, 1), n(N.C5, 1), n(N.REST, 0.5),
    // Bar 15-16: Gm7 → C7/G
    n(N.G4, 2), n(N.REST, 0.5), n(N.G4, 0.5),
    n(N.C5, 1.5), n(N.F5, 0.5), n(N.E5, 2),
    // Bar 17-18: Fmaj7/A → Dm9 → G7/B
    n(N.F5, 1), n(N.REST, 0.5), n(N.E5, 0.5), n(N.F5, 1), n(N.E5, 1),
    n(N.D5, 0.67), n(N.Gs4, 0.67), n(N.A4, 0.67), n(N.B4, 0.67), n(N.Gs4, 0.67), n(N.A4, 0.67),
    // Bar 19: Cadd9 (final)
    n(N.C5, 4),
  ],
  bassLine: [
    n(N.F3, 4), n(N.A3, 4),
    n(N.G3, 4), n(N.C3, 4),
    n(N.F3, 4), n(N.A3, 4),
    n(N.G3, 4), n(N.C3, 4),
    n(N.A3, 4), n(N.D3, 4),
    n(N.G3, 4), n(N.C3, 4),
    n(N.E3, 4), n(N.A3, 4),
    n(N.G3, 4), n(N.C3, 4),
    n(N.F3, 4), n(N.D3, 4),
    n(N.G3, 4),
    n(N.C3, 4),
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
  bassLine: [
    n(N.C4,2), n(N.G3,2),
    n(N.F3,2), n(N.C4,2),
    n(N.C4,4),
    n(N.C4,2), n(N.G3,2),
    n(N.F3,2), n(N.C4,2),
    n(N.C4,4),
  ],
  drumPattern: {
    kicks: [0, 2],
    snares: [1, 3],
    hiHats: [0, 1, 2, 3],
    barsPerPattern: 1,
  },
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
  bassLine: [
    n(N.C4,2), n(N.C4,2),
    n(N.C4,2), n(N.C4,2),
    n(N.G3,2), n(N.G3,2),
    n(N.C4,2), n(N.C4,2),
    n(N.C4,2), n(N.G3,2),
    n(N.C4,4),
  ],
  drumPattern: {
    kicks: [0, 2, 4, 6],
    snares: [2, 6],
    hiHats: [0, 1, 2, 3, 4, 5, 6, 7],
    barsPerPattern: 2,
  },
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
  bassLine: [
    n(N.G3,2), n(N.G3,2),
    n(N.G3,2), n(N.G3,2),
    n(N.D4,2), n(N.D4,2),
    n(N.A3,2), n(N.A3,2),
    n(N.G3,2), n(N.G3,2),
    n(N.G3,4),
  ],
  drumPattern: {
    kicks: [0, 2, 4, 6],
    snares: [2, 6],
    hiHats: [0, 1, 2, 3, 4, 5, 6, 7],
    barsPerPattern: 2,
  },
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
  bassLine: [
    n(N.D4,2), n(N.D4,2),
    n(N.D4,2), n(N.F4,2),
    n(N.D4,2), n(N.D4,2),
    n(N.D4,4),
  ],
  drumPattern: {
    kicks: [0, 3],
    snares: [1.5, 4.5],
    hiHats: [0, 1, 2, 3, 4, 5],
    barsPerPattern: 1.5,
  },
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
  bassLine: [
    n(N.G3,2), n(N.B3,2),
    n(N.D4,2), n(N.B3,2),
    n(N.G3,4),
  ],
  drumPattern: {
    kicks: [0, 2],
    snares: [1, 3],
    hiHats: [0, 1, 2, 3],
    barsPerPattern: 1,
  },
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
  bassLine: [
    n(N.G3,2), n(N.G3,2),
    n(N.G3,2), n(N.G3,2),
    n(N.D4,2), n(N.D4,2),
    n(N.G3,2), n(N.G3,2),
    n(N.G3,4),
  ],
  drumPattern: {
    kicks: [0, 2, 4, 6],
    snares: [2, 6],
    hiHats: [0, 1, 2, 3, 4, 5, 6, 7],
    barsPerPattern: 2,
  },
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
  bassLine: [
    n(N.G3,2), n(N.G3,2),
    n(N.D4,2), n(N.D4,2),
    n(N.A3,2), n(N.A3,2),
    n(N.G3,2), n(N.G3,2),
    n(N.G3,4),
  ],
  drumPattern: {
    kicks: [0, 2, 4, 6],
    snares: [2, 6],
    hiHats: [0, 1, 2, 3, 4, 5, 6, 7],
    barsPerPattern: 2,
  },
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
