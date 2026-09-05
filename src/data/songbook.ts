import { helanGar, songs, type Song } from "./songs";
import { hnkkSongs } from "./hnkkSongs";
import { finnishSongs } from "./finnishSongs";
export type BookSong = Song & {
  language: "fi" | "sv" | "fi-sv";
  collection?: "HNKK";
  spotifyQuery?: string;
  melodyUncertain?: boolean;
  category: "Klassikot" | "Teekkarit" | "Pitkän kaavan";
  source: string;
};
const originalSongs: BookSong[] = [
  {
    id: "rapu-kulta",
    title: "Rapu kulta",
    melody: "Jaakko kulta",
    language: "fi",
    category: "Teekkarit",
    source: "Tätä laulukirjaa varten kirjoitettu uusi sanoitus.",
    lyrics: [
      "Rapu kulta, rapu kulta,",
      "missä oot, missä oot?",
      "Tillin alta kurkkaa,",
      "tillin alta kurkkaa,",
      "saksin näin, saksin näin.",
    ],
    note: "Kaanon: toinen puoli pöytää aloittaa kaksi säettä myöhemmin.",
  },
  {
    id: "integraali",
    title: "Integraali on valmis",
    melody: "Tuiki, tuiki, tähtönen",
    language: "fi",
    category: "Teekkarit",
    source: "Tätä laulukirjaa varten kirjoitettu uusi sanoitus.",
    lyrics: [
      "Tuiki, tuiki, teekkari,",
      "missä piilee laskari?",
      "Ravun kuoren integroin,",
      "tillin päälle derivoin.",
      "Tuiki, tuiki, teekkari,",
      "valmis on jo laskari.",
    ],
    note: "Viimeisellä säkeellä koko pöytä julistaa laskarin palautetuksi.",
  },
  {
    id: "rapupoydan-marssi",
    title: "Rapupöydän marssi",
    melody: "When the Saints Go Marching In",
    language: "fi",
    category: "Teekkarit",
    source: "Tätä laulukirjaa varten kirjoitettu uusi sanoitus.",
    lyrics: [
      "Kun rapu käy, kun rapu käy,",
      "kun rapu pöytään jälleen käy,",
      "me tahdomme olla siinä joukossa,",
      "kun rapu pöytään jälleen käy.",
      "",
      "Kun laulu soi, kun laulu soi,",
      "kun koko pöytä laulaa voi,",
      "ei sävelen tarvitse olla kohdallaan,",
      "kun koko pöytä laulaa voi.",
    ],
    note: "Toinen säkeistö lauletaan yhdessä. Pöytään saa taputtaa tahtia.",
  },
];
export const bookSongs: BookSong[] = [
  {
    ...helanGar,
    language: "sv",
    category: "Klassikot",
    source: "Alkuperäisen repon sanoitus.",
  },
  ...originalSongs,
  ...finnishSongs.map((song) => ({
    ...song,
    language: "fi" as const,
    category:
      song.id === "fi-lapin-kulta"
        ? ("Klassikot" as const)
        : ("Pitkän kaavan" as const),
    source: "Alkuperäisen repon sanoitus.",
  })),
  ...songs.map((song) => ({
    ...song,
    language: "sv" as const,
    category:
      song.id === "jag-har-aldrig"
        ? ("Pitkän kaavan" as const)
        : ("Klassikot" as const),
    source: "Alkuperäisen repon sanoitus.",
  })),
  ...hnkkSongs,
];
export function spotifySearch(song: Song & { spotifyQuery?: string }) {
  const query = song.spotifyQuery ?? (
    song.melody === "Traditionell"
      ? song.title
      : song.melody.replace(/\s*\(.*\)/, ""));
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}
export const challenges = [
  {
    title: "Kaanon haltuun",
    text: "Jakakaa pöytä kahtia. Toinen puoli aloittaa kaksi säettä myöhemmin.",
    songId: "rapu-kulta",
  },
  {
    title: "Laskari palautettu",
    text: "Laulakaa viimeinen säe kuin juuri valmistuneet diplomi-insinöörit.",
    songId: "integraali",
  },
  {
    title: "Koko pöytä kuoroon",
    text: "Yksi aloittaa, muut liittyvät toiseen säkeistöön. Kukaan ei jää solistiksi vahingossa.",
    songId: "rapupoydan-marssi",
  },
];
export type BookProgress = {
  sung: string[];
  favorites: string[];
  challenges: number[];
};
export const emptyProgress: BookProgress = {
  sung: [],
  favorites: [],
  challenges: [],
};
export function readProgress(): BookProgress {
  try {
    const saved = JSON.parse(
      localStorage.getItem("kraftskiva-book-v1") || "null",
    );
    if (!saved) return emptyProgress;
    const validIds = new Set(bookSongs.map((s) => s.id));
    return {
      sung: Array.isArray(saved.sung)
        ? [
            ...new Set<string>(
              saved.sung.filter(
                (id: unknown) => typeof id === "string" && validIds.has(id),
              ),
            ),
          ]
        : [],
      favorites: Array.isArray(saved.favorites)
        ? [
            ...new Set<string>(
              saved.favorites.filter(
                (id: unknown) => typeof id === "string" && validIds.has(id),
              ),
            ),
          ]
        : [],
      challenges: Array.isArray(saved.challenges)
        ? [
            ...new Set<number>(
              saved.challenges.filter(
                (id: unknown) =>
                  Number.isInteger(id) &&
                  Number(id) >= 0 &&
                  Number(id) < challenges.length,
              ),
            ),
          ]
        : [],
    };
  } catch {
    return emptyProgress;
  }
}
export const pointsFor = (p: BookProgress) =>
  p.sung.length * 10 + p.challenges.length * 20;
