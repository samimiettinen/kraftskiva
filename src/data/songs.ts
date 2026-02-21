export interface Song {
  id: string;
  title: string;
  melody: string;
  lyrics: string[];
  isRefrain?: boolean;
  note?: string;
  spotifyTrackId?: string;
}

export const helanGar: Song = {
  id: "helan-gar",
  title: "Helan Går",
  melody: "Traditionell",
  spotifyTrackId: "1W2GHo8BYN8a5vPDbzolnL",
  lyrics: [
    "Helan går!",
    "Sjung hopp faderallan lallan lej!",
    "Helan går!",
    "Sjung hopp faderallan lej!",
    "Och den som inte helan tar,",
    "han heller inte halvan får.",
    "Helan gååår!",
    "(Sjung hopp faderallan lej!)",
  ],
};

export const songs: Song[] = [
  {
    id: "nu-tar-vi-den",
    title: "Nu tar vi den",
    melody: "Du kära gran (julsången)",
    spotifyTrackId: "2AAm2fYOlCxNt44ReCp9B8",
    lyrics: [
      "Nu tar vi den, nu tar vi den",
      "Nu tar vi den, nu tar vi den",
      "Nu tar vi den, nu tar vi den",
      "Nu tar vi den, nu tar vi den",
      "Nu tar vi den, nu tar vi den",
      "Nu tar vi den, nu tar vi den",
    ],
  },
];

export function getShuffledSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}

export function getShuffledSwedishSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}
