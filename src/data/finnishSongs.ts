import { Song } from "./songs";

export const finnishSongs: Song[] = [
  {
    id: "fi-lapin-kulta",
    title: "Lapin kulta",
    melody: "Jaakko kulta (kaanon)",
    spotifyTrackId: "4HBAoSScGiUz18KtGaUIUF",
    lyrics: [
      "Lapin Kulta, Lapin Kulta, Karjala, Karjala,",
      "Sininen ja Karhu, Sininen ja Karhu,",
      "Koff, Koff, Koff, Koff, Koff, Koff.",
    ],
  },
  {
    id: "fi-siilasvuo",
    title: "Siilasvuo",
    melody: "Siilasvuo",
    spotifyTrackId: "4hEJW83BLAjkYAOVXEjyuB",
    lyrics: [
      "Minä, minä, minä olen Ensio Siilasvuo",
      "Enkä minä koskaan viinaa juo",
      "Jos minä viinaa juon",
      "En ole minä Siilasvuo",
      "",
      "Minä olen Ensio Siilasvuo",
      "Enkä minä lottia telttaan tuo",
      "Jos minä lottia tuon",
      "En ole minä Siilasvuo",
      "",
      "Minä olen Aslak Valkeapää",
      "Enkä minä selvää päivää nää",
      "Jos minä joskus nään",
      "En ole minä Valkeapää",
      "",
      "Minä olen presidentti Koivisto",
      "Enkä minä koskaan jahkaile",
      "Jos minä jahkailen",
      "En ole minä Koivisto",
      "",
      "Minä olen Paavo Väyrynen",
      "Lentoemon peppuun koske en",
      "Jos minä rohkenen",
      "Niin en ole Väyrynen",
      "",
      "Minä olen Virolaisen Jussi",
      "Enkä minä koskaan",
      "Jos minä joskus",
      "En ole minä Virolaisen Jussi",
    ],
  },
];

export function getShuffledFinnishSongs(): Song[] {
  return [...finnishSongs].sort(() => Math.random() - 0.5);
}
