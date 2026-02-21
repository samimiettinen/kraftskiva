import { useState, useCallback } from "react";
import { Song, helanGar, getShuffledSwedishSongs } from "@/data/songs";
import { getShuffledFinnishSongs } from "@/data/finnishSongs";

export type Team = "swedish" | "finnish";
export type GamePhase = "welcome" | "setup" | "helan" | "singing" | "rating" | "drink" | "scoreboard" | "gameover";

export interface GameState {
  phase: GamePhase;
  currentTeam: Team;
  swedishScore: number;
  finnishScore: number;
  currentSong: Song | null;
  songQueue: Song[];
  swedishSongQueue: Song[];
  finnishSongQueue: Song[];
  swedishSongIndex: number;
  finnishSongIndex: number;
  songsPlayed: number;
  totalRounds: number;
  swedishPlayerName: string;
  finnishPlayerName: string;
}

const TOTAL_ROUNDS = 8;

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: "welcome",
    currentTeam: "swedish",
    swedishScore: 0,
    finnishScore: 0,
    currentSong: null,
    songQueue: [],
    swedishSongQueue: [],
    finnishSongQueue: [],
    swedishSongIndex: 0,
    finnishSongIndex: 0,
    songsPlayed: 0,
    totalRounds: TOTAL_ROUNDS,
    swedishPlayerName: "Hanna",
    finnishPlayerName: "Max",
  });

  // Pick a song for a team: 90% own songs, 10% crossover
  const pickSongForTeam = (team: Team, swQueue: Song[], fiQueue: Song[], swIdx: number, fiIdx: number): { song: Song; newSwIdx: number; newFiIdx: number } => {
    const useCrossover = Math.random() < 0.1;
    if (team === "swedish") {
      if (useCrossover && fiQueue.length > 0) {
        const song = fiQueue[fiIdx % fiQueue.length];
        return { song, newSwIdx: swIdx, newFiIdx: fiIdx + 1 };
      }
      const song = swQueue[swIdx % swQueue.length];
      return { song, newSwIdx: swIdx + 1, newFiIdx: fiIdx };
    } else {
      if (useCrossover && swQueue.length > 0) {
        const song = swQueue[swIdx % swQueue.length];
        return { song, newSwIdx: swIdx + 1, newFiIdx: fiIdx };
      }
      const song = fiQueue[fiIdx % fiQueue.length];
      return { song, newSwIdx: swIdx, newFiIdx: fiIdx + 1 };
    }
  };

  const startGame = useCallback((swedishName: string, finnishName: string) => {
    const swQueue = getShuffledSwedishSongs();
    const fiQueue = getShuffledFinnishSongs();
    setState((prev) => ({
      ...prev,
      phase: "helan",
      currentSong: helanGar,
      currentTeam: "swedish",
      songQueue: swQueue,
      swedishSongQueue: swQueue,
      finnishSongQueue: fiQueue,
      swedishSongIndex: 0,
      finnishSongIndex: 0,
      swedishPlayerName: swedishName || "Hanna",
      finnishPlayerName: finnishName || "Max",
      swedishScore: 0,
      finnishScore: 0,
      songsPlayed: 0,
    }));
  }, []);

  const finishHelan = useCallback(() => {
    setState((prev) => {
      // Joint Helan Går done — award max points (5) to both teams, then start regular rounds
      const { song, newSwIdx, newFiIdx } = pickSongForTeam("swedish", prev.swedishSongQueue, prev.finnishSongQueue, prev.swedishSongIndex, prev.finnishSongIndex);
      return {
        ...prev,
        phase: "singing",
        currentTeam: "swedish",
        currentSong: song,
        swedishSongIndex: newSwIdx,
        finnishSongIndex: newFiIdx,
        swedishScore: prev.swedishScore + 5,
        finnishScore: prev.finnishScore + 5,
      };
    });
  }, []);

  const submitRating = useCallback((rating: number) => {
    setState((prev) => ({
      ...prev,
      phase: "drink",
      ...(prev.currentTeam === "swedish"
        ? { swedishScore: prev.swedishScore + rating }
        : { finnishScore: prev.finnishScore + rating }),
    }));
  }, []);

  const nextTurn = useCallback(() => {
    setState((prev) => {
      const nextTeam: Team = prev.currentTeam === "swedish" ? "finnish" : "swedish";
      const isRoundComplete = prev.currentTeam === "finnish";
      const newSongsPlayed = isRoundComplete ? prev.songsPlayed + 1 : prev.songsPlayed;

      if (newSongsPlayed >= prev.totalRounds && isRoundComplete) {
        return { ...prev, phase: "gameover" };
      }

      const { song, newSwIdx, newFiIdx } = pickSongForTeam(nextTeam, prev.swedishSongQueue, prev.finnishSongQueue, prev.swedishSongIndex, prev.finnishSongIndex);

      return {
        ...prev,
        phase: "singing",
        currentTeam: nextTeam,
        currentSong: song,
        songsPlayed: newSongsPlayed,
        swedishSongIndex: newSwIdx,
        finnishSongIndex: newFiIdx,
      };
    });
  }, []);

  const showScoreboard = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "scoreboard" }));
  }, []);

  const goToRating = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "rating" }));
  }, []);

  const goToSetup = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "setup" }));
  }, []);

  const restartGame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "welcome" }));
  }, []);

  return {
    state,
    startGame,
    finishHelan,
    submitRating,
    nextTurn,
    showScoreboard,
    goToRating,
    goToSetup,
    restartGame,
  };
}
