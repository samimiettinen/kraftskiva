import { useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "@/components/game/Confetti";
import { playVictoryFanfare } from "@/lib/sounds";
import bgImg from "@/assets/max-hanko.png";
import videoSrc from "@/assets/martin-max-video.mp4";

interface MaxMartinEasterEggProps {
  swedishScore: number;
  finnishScore: number;
  onRestart: () => void;
}

export default function MaxMartinEasterEgg({
  swedishScore,
  finnishScore,
  onRestart,
}: MaxMartinEasterEggProps) {
  useEffect(() => {
    playVictoryFanfare();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Confetti />

      {/* Background image with zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={bgImg}
          alt="Max Martin Easter Egg"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
        className="z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full"
      >
        {/* Achievement text */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mb-2"
        >
          <span className="font-body text-sm md:text-base uppercase tracking-[0.3em] text-yellow-400/80">
            🏆 Achievement Unlocked 🏆
          </span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-yellow-400 mb-6"
          style={{
            textShadow: "0 0 40px rgba(234,179,8,0.6), 0 0 80px rgba(234,179,8,0.3), 0 4px 8px rgba(0,0,0,0.5)",
          }}
        >
          Max Martin
        </motion.h1>

        {/* Score */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-display text-xl md:text-2xl text-white/80 mb-6"
        >
          🇸🇪 Martin: {swedishScore} ⭐ vs 🇫🇮 Max: {finnishScore} ⭐
        </motion.p>

        {/* Video with zoom */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 80 }}
          className="w-full max-w-xl mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.3)] border-2 border-yellow-400/40"
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
          </motion.div>
        </motion.div>

        {/* Play Again */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={onRestart}
          className="bg-yellow-400 text-black font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform"
          style={{ boxShadow: "0 0 30px rgba(234,179,8,0.5)" }}
        >
          🦞 Play Again! 🦞
        </motion.button>
      </motion.div>
    </div>
  );
}
