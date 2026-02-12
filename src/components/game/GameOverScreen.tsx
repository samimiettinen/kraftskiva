import { useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "@/components/game/Confetti";
import { playVictoryFanfare, stopBackgroundMusic } from "@/lib/sounds";

interface GameOverScreenProps {
  swedishName: string;
  finnishName: string;
  swedishScore: number;
  finnishScore: number;
  onRestart: () => void;
}

export default function GameOverScreen({
  swedishName,
  finnishName,
  swedishScore,
  finnishScore,
  onRestart,
}: GameOverScreenProps) {
  const isDraw = swedishScore === finnishScore;
  const winner = swedishScore > finnishScore ? "swedish" : "finnish";
  const winnerName = winner === "swedish" ? swedishName : finnishName;
  const winnerFlag = winner === "swedish" ? "🇸🇪" : "🇫🇮";
  const winnerDrink = winner === "swedish" ? "Skåne Akvavit" : "Koskenkorva";
  const winnerCheer = winner === "swedish" ? "SKÅL!" : "KIPPIS!";
  const winnerColor = winner === "swedish" ? "text-swedish-blue" : "text-finnish-blue";

  useEffect(() => {
    stopBackgroundMusic();
    playVictoryFanfare();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      <Confetti />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-center max-w-md z-10"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-8xl block mb-4"
        >
          🏆
        </motion.span>

        {isDraw ? (
          <>
            <h1 className="font-display text-5xl font-bold text-primary text-cartoon-shadow mb-4">
              It's a Draw!
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-2">
              Both bankers are equally drunk!
            </p>
            <p className="font-display text-3xl font-bold text-foreground">
              🇸🇪 {swedishScore} - {finnishScore} 🇫🇮
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-bold text-primary text-cartoon-shadow mb-2">
              {winnerFlag} {winnerName} Wins!
            </h1>
            <p className={`font-display text-5xl font-bold ${winnerColor} mb-4 animate-wiggle`}>
              {winnerCheer}
            </p>
            <p className="font-body text-lg text-muted-foreground mb-2">
              Celebrating with {winnerDrink}! 🥃
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              🇸🇪 {swedishScore} - {finnishScore} 🇫🇮
            </p>
          </>
        )}

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onRestart}
          className="mt-8 bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
        >
          🦞 Play Again! 🦞
        </motion.button>
      </motion.div>
    </div>
  );
}
