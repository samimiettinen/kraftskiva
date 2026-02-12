import { useState, useCallback } from "react";
import { Song, helanGar, getShuffledSongs } from "@/data/songs";

export type Team = "swedish" | "finnish";
export type GamePhase = "welcome" | "setup" | "helan" | "singing" | "rating" | "drink" | "scoreboard" | "gameover";

export interface GameState {
  phase: GamePhase;
  currentTeam: Team;
  swedishScore: number;
  finnishScore: number;
  currentSong: Song | null;
  songQueue: Song[];
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
    songsPlayed: 0,
    totalRounds: TOTAL_ROUNDS,
    swedishPlayerName: "Erik",
    finnishPlayerName: "Matti",
  });

  const startGame = useCallback((swedishName: string, finnishName: string) => {
    setState((prev) => ({
      ...prev,
      phase: "helan",
      currentSong: helanGar,
      songQueue: getShuffledSongs(),
      swedishPlayerName: swedishName || "Erik",
      finnishPlayerName: finnishName || "Matti",
      swedishScore: 0,
      finnishScore: 0,
      songsPlayed: 0,
    }));
  }, []);

  const finishHelan = useCallback(() => {
    setState((prev) => {
      const nextSong = prev.songQueue[0];
      return {
        ...prev,
        phase: "singing",
        currentSong: nextSong || null,
        currentTeam: "swedish",
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

      const songIndex = isRoundComplete ? prev.songQueue.findIndex((s) => s.id === prev.currentSong?.id) + 1 : prev.songQueue.findIndex((s) => s.id === prev.currentSong?.id);
      const nextSong = isRoundComplete ? prev.songQueue[songIndex + 1] || prev.songQueue[0] : prev.currentSong;

      return {
        ...prev,
        phase: "singing",
        currentTeam: nextTeam,
        currentSong: nextSong,
        songsPlayed: newSongsPlayed,
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
