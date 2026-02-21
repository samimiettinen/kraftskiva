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
  {
    id: "mera-brannvin",
    title: "Mera brännvin i glasen",
    melody: "Internationalen",
    spotifyTrackId: "0CtcUIFujDsusQbu56J2Ks",
    lyrics: [
      "Mera brännvin i glasen,",
      "mera glas på vårt bord,",
      "mera bord på kalasen,",
      "mer kalas på vår jord.",
      "",
      "Mera jordar kring månen,",
      "mera månar kring Mars,",
      "mera marscher till Skåne,",
      "mera Skåne, bevars!",
    ],
  },
  {
    id: "jag-har-aldrig",
    title: "Jag har aldrig vart på snusen",
    melody: "Jag har aldrig vart på snusen",
    spotifyTrackId: "5zySep1VCygO94LDlq2C6b",
    lyrics: [
      "Jag har aldrig vart på snusen",
      "Aldrig rökat en cigarr, haleluja!",
      "Mina dygder äro tusen",
      "Inga syndiga laster jag har",
      "Jag har aldrig sett nått naket",
      "Inte ens ett litet nyfött barn",
      "Mina blickar går mot taket",
      "Därmed undgår jag frestarens garn",
      "",
      "Haleluja, Haleluja,",
      "Haleluja, Haleluja,",
      "Haleluja, Haleluja,",
      "Haleluja-a-ah",
      "",
      "Bacchus spelar på gitarren",
      "Satan spelar på sitt handklaver",
      "Alla djävlar dansar tango",
      "Säg vad kan en väl önska sig mer?",
      "Jo, att alla bäckar vore brännvin",
      "Riddarfjärden full av bayerskt öl",
      "Konjak i varenda rännsten",
      "Och punsch i varenda vattenpöl",
      "",
      "Och mera öl, och mera öl,",
      "Och mera öl, och mera öl,",
      "Och mera öl, och mera öl,",
      "Och mera ö-ö-öl",
    ],
  },
];

export function getShuffledSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}

export function getShuffledSwedishSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}
