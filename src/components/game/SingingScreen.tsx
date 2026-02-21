import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "@/data/songs";
import { Team } from "@/hooks/useGameState";
import { playClick } from "@/lib/sounds";
import SpotifyPlayer from "./SpotifyPlayer";

interface SingingScreenProps {
  song: Song;
  currentTeam: Team;
  playerName: string;
  songsPlayed: number;
  totalRounds: number;
  onFinishSinging: () => void;
}

export default function SingingScreen({
  song,
  currentTeam,
  playerName,
  songsPlayed,
  totalRounds,
  onFinishSinging,
}: SingingScreenProps) {
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const teamColor = currentTeam === "swedish" ? "text-swedish-blue" : "text-finnish-blue";
  const teamFlag = currentTeam === "swedish" ? "🇸🇪" : "🇫🇮";
  const teamBg = currentTeam === "swedish"
    ? "from-swedish-blue/10 to-swedish-yellow/10"
    : "from-finnish-blue/10 to-finnish-white/20";

  useEffect(() => {
    if (!isPlaying) return;
    if (currentLine >= song.lyrics.length - 1) {
      setIsFinished(true);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isPlaying, currentLine, song.lyrics.length]);

  const startKaraoke = () => {
    playClick();
    setIsPlaying(true);
    setCurrentLine(0);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b ${teamBg} bg-background`}>
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="font-body text-sm text-muted-foreground">
          Round {Math.min(songsPlayed + 1, totalRounds)}/{totalRounds}
        </div>
        <div className={`font-display text-lg font-bold ${teamColor}`}>
          {teamFlag} {playerName}'s turn
        </div>
      </div>

      {/* Song info */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center px-4 pt-4"
      >
        <span className="text-4xl mb-2 block animate-wiggle">🎤</span>
        <h2 className="font-display text-3xl font-bold text-foreground mb-1">
          {song.title}
        </h2>
        <p className="font-body text-muted-foreground text-sm">
          Melodi: {song.melody}
          {song.note && <span className="ml-2 italic">({song.note})</span>}
        </p>
        {song.isRefrain && (
          <span className="inline-block mt-2 font-body text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">
            Refräng
          </span>
        )}
        {song.spotifyTrackId && (
          <div className="mt-4 px-2">
            <SpotifyPlayer trackId={song.spotifyTrackId} compact />
          </div>
        )}
      </motion.div>

      {/* Lyrics karaoke view */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg space-y-3">
          <AnimatePresence>
            {song.lyrics.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, scale: 0.95 }}
                animate={{
                  opacity: isPlaying ? (i === currentLine ? 1 : i < currentLine ? 0.5 : 0.3) : 0.8,
                  scale: i === currentLine ? 1.08 : 1,
                  color: i === currentLine ? undefined : undefined,
                }}
                transition={{ duration: 0.3 }}
                className={`font-display text-center text-lg md:text-xl leading-relaxed py-1 transition-colors ${
                  i === currentLine
                    ? `font-bold ${teamColor} text-2xl md:text-3xl`
                    : i < currentLine
                    ? "text-muted-foreground"
                    : "text-foreground/40"
                }`}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 text-center">
        {!isPlaying && !isFinished && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            onClick={startKaraoke}
            className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
          >
            ▶️ Start Singing!
          </motion.button>
        )}
        {isFinished && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            onClick={onFinishSinging}
            className="bg-gold text-accent-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform glow-gold"
          >
            ⭐ Rate Performance! ⭐
          </motion.button>
        )}
      </div>
    </div>
  );
}
