import { useState } from "react";
import { motion } from "framer-motion";
import { Team } from "@/hooks/useGameState";

interface RatingScreenProps {
  currentTeam: Team;
  performerName: string;
  raterName: string;
  onRate: (rating: number) => void;
}

export default function RatingScreen({ currentTeam, performerName, raterName, onRate }: RatingScreenProps) {
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const raterFlag = currentTeam === "swedish" ? "🇫🇮" : "🇸🇪";
  const raterColor = currentTeam === "swedish" ? "text-finnish-blue" : "text-swedish-blue";

  const handleSubmit = () => {
    if (selected === 0) return;
    setSubmitted(true);
    setTimeout(() => onRate(selected), 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center max-w-md"
      >
        <span className="text-5xl block mb-4">{raterFlag}</span>
        <h2 className={`font-display text-3xl font-bold ${raterColor} mb-2`}>
          {raterName}, rate the performance!
        </h2>
        <p className="font-body text-muted-foreground mb-8">
          How well did <strong>{performerName}</strong> sing?
        </p>

        {/* Star rating */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(star)}
              className={`text-5xl transition-all ${
                star <= selected ? "drop-shadow-lg" : "opacity-30 grayscale"
              }`}
            >
              {star <= selected ? "⭐" : "☆"}
            </motion.button>
          ))}
        </div>

        {selected > 0 && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <p className="font-display text-xl font-bold text-foreground mb-4">
              {selected === 1 && "Terrible... 😬"}
              {selected === 2 && "Needs more schnapps 🥴"}
              {selected === 3 && "Not bad! 🎵"}
              {selected === 4 && "Great singing! 🎶"}
              {selected === 5 && "LEGENDARY! 🌟🦞"}
            </p>
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
            >
              {submitted ? "Submitted!" : `Give ${selected} stars`}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
