import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Team } from "@/hooks/useGameState";
import { playPourSound, playGlassClink, playCheer } from "@/lib/sounds";

interface DrinkScreenProps {
  currentTeam: Team;
  playerName: string;
  onNext: () => void;
}

export default function DrinkScreen({ currentTeam, playerName, onNext }: DrinkScreenProps) {
  const [step, setStep] = useState(0);

  const isSwedish = currentTeam === "swedish";
  const drink = isSwedish ? "Skåne Akvavit" : "Koskenkorva";
  const cheer = isSwedish ? "SKÅL!" : "KIPPIS!";
  const flag = isSwedish ? "🇸🇪" : "🇫🇮";
  const bgGradient = isSwedish
    ? "from-swedish-blue/20 to-swedish-yellow/20"
    : "from-finnish-blue/20 to-finnish-white/30";

  useEffect(() => {
    playPourSound();
    const t1 = setTimeout(() => { setStep(1); playGlassClink(); }, 500);
    const t2 = setTimeout(() => { setStep(2); playCheer(); }, 1500);
    const t3 = setTimeout(() => setStep(3), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${bgGradient} bg-background px-4`}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="pour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <span className="text-8xl block">🍶</span>
            <p className="font-display text-2xl text-foreground mt-4">Pouring {drink}...</p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="glass"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-center"
          >
            <span className="text-9xl block">🥃</span>
            <p className="font-display text-xl text-muted-foreground mt-4">
              {playerName}, raise your glass!
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="cheer"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-6xl block mb-4">{flag}</span>
            <h1 className="font-display text-7xl md:text-8xl font-bold text-primary text-cartoon-shadow animate-wiggle">
              {cheer}
            </h1>
            <p className="font-body text-lg text-muted-foreground mt-4">
              🥃 {drink} 🥃
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            key="done"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <span className="text-6xl block mb-4">{flag}</span>
            <h1 className="font-display text-6xl font-bold text-primary text-cartoon-shadow mb-6">
              {cheer}
            </h1>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              onClick={onNext}
              className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform"
            >
              Next Turn →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
