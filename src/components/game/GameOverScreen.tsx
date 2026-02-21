import { useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "@/components/game/Confetti";
import { playVictoryFanfare } from "@/lib/sounds";
import hannaImg from "@/assets/swedish-banker-hanna.png";
import maxImg from "@/assets/finnish-banker-max.png";

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
  const swedishWins = swedishScore > finnishScore;

  useEffect(() => {
    playVictoryFanfare();
  }, []);

  const winnerCheer = isDraw ? "It's a Draw!" : swedishWins ? "SKÅL!" : "KIPPIS!";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
      <Confetti />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-center max-w-lg z-10"
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-bold text-primary text-cartoon-shadow mb-8"
        >
          {winnerCheer}
        </motion.h1>

        {/* Banker portraits with medals */}
        <div className="flex items-end justify-center gap-6 md:gap-10 mb-8">
          {/* Hanna (Swedish) */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              {/* Medal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 z-20"
              >
                <span className="text-5xl drop-shadow-lg">
                  {isDraw ? "🥇" : swedishWins ? "🥇" : "🥈"}
                </span>
              </motion.div>
              {/* Portrait */}
              <motion.div
                animate={
                  !isDraw && swedishWins
                    ? { y: [0, -8, 0] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className={`rounded-2xl cartoon-border overflow-hidden ${
                  !isDraw && swedishWins
                    ? "ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                    : "opacity-90"
                }`}
              >
                <img
                  src={hannaImg}
                  alt={swedishName}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover"
                />
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-display text-lg font-bold text-swedish-blue mt-3"
            >
              🇸🇪 {swedishName}
            </motion.p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="font-display text-2xl font-bold text-foreground"
            >
              {swedishScore} ⭐
            </motion.p>
          </motion.div>

          {/* VS divider */}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="font-display text-2xl font-bold text-muted-foreground mb-16"
          >
            VS
          </motion.span>

          {/* Max (Finnish) */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              {/* Medal */}
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -left-4 z-20"
              >
                <span className="text-5xl drop-shadow-lg">
                  {isDraw ? "🥇" : swedishWins ? "🥈" : "🥇"}
                </span>
              </motion.div>
              {/* Portrait */}
              <motion.div
                animate={
                  !isDraw && !swedishWins
                    ? { y: [0, -8, 0] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className={`rounded-2xl cartoon-border overflow-hidden ${
                  !isDraw && !swedishWins
                    ? "ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                    : "opacity-90"
                }`}
              >
                <img
                  src={maxImg}
                  alt={finnishName}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover"
                />
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-display text-lg font-bold text-finnish-blue mt-3"
            >
              🇫🇮 {finnishName}
            </motion.p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="font-display text-2xl font-bold text-foreground"
            >
              {finnishScore} ⭐
            </motion.p>
          </motion.div>
        </div>

        {/* Final score */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-body text-lg text-muted-foreground mb-6"
        >
          {isDraw
            ? "Both bankers are equally legendary! 🦞"
            : `${swedishWins ? swedishName : finnishName} takes the crown! 👑`}
        </motion.p>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={onRestart}
          className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
        >
          🦞 Play Again! 🦞
        </motion.button>
      </motion.div>
    </div>
  );
}
