import { Song } from "./songs";

export const finnishSongs: Song[] = [
  {
    id: "fi-lapin-kulta",
    title: "Lapin kulta",
    melody: "Jaakko kulta (kaanon)",
    spotifyTrackId: "4HBAoSScGiUz18KtGaUIUF",
    lyrics: [
      "Lapin Kulta, Lapin Kulta,",
      "Karjala, Karjala,",
      "Sininen ja Olvi, Sininen ja Olvi,",
      "Koff, Koff, Koff, Koff, Koff, Koff.",
    ],
  },
];

export function getShuffledFinnishSongs(): Song[] {
  return [...finnishSongs].sort(() => Math.random() - 0.5);
}
