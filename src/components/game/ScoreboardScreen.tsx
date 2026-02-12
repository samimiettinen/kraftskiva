import { motion } from "framer-motion";

interface ScoreboardScreenProps {
  swedishName: string;
  finnishName: string;
  swedishScore: number;
  finnishScore: number;
  onContinue: () => void;
}

export default function ScoreboardScreen({
  swedishName,
  finnishName,
  swedishScore,
  finnishScore,
  onContinue,
}: ScoreboardScreenProps) {
  const maxScore = Math.max(swedishScore, finnishScore, 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="w-full max-w-md text-center"
      >
        <h2 className="font-display text-4xl font-bold text-primary text-cartoon-shadow mb-8">
          🦞 Scoreboard 🦞
        </h2>

        <div className="space-y-6 mb-8">
          {/* Swedish */}
          <div className="bg-card cartoon-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-lg font-bold text-swedish-blue">
                🇸🇪 {swedishName}
              </span>
              <span className="font-display text-2xl font-bold text-foreground">
                {swedishScore} ⭐
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 cartoon-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(swedishScore / maxScore) * 100}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-full bg-swedish-blue rounded-full"
              />
            </div>
          </div>

          {/* Finnish */}
          <div className="bg-card cartoon-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-lg font-bold text-finnish-blue">
                🇫🇮 {finnishName}
              </span>
              <span className="font-display text-2xl font-bold text-foreground">
                {finnishScore} ⭐
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 cartoon-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(finnishScore / maxScore) * 100}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full bg-finnish-blue rounded-full"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform"
        >
          Continue Playing →
        </button>
      </motion.div>
    </div>
  );
}
