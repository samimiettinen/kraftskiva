import { useState } from "react";
import { motion } from "framer-motion";

interface SetupScreenProps {
  onStart: (swedishName: string, finnishName: string) => void;
}

export default function SetupScreen({ onStart }: SetupScreenProps) {
  const [swedishName, setSwedishName] = useState("Erik");
  const [finnishName, setFinnishName] = useState("Matti");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-md"
      >
        <h2 className="font-display text-4xl font-bold text-center text-primary text-cartoon-shadow mb-8">
          🦞 Player Setup
        </h2>

        <div className="space-y-6">
          {/* Swedish Player */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card cartoon-border p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-swedish-blue" />
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-swedish-blue to-swedish-yellow" />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🇸🇪</span>
              <h3 className="font-display text-xl font-bold text-swedish-blue">Swedish Banker</h3>
            </div>
            <input
              type="text"
              value={swedishName}
              onChange={(e) => setSwedishName(e.target.value)}
              placeholder="Player name"
              className="w-full bg-muted font-body text-foreground px-4 py-3 rounded-lg cartoon-border text-lg focus:outline-none focus:ring-2 focus:ring-swedish-blue"
            />
            <p className="font-body text-sm text-muted-foreground mt-2">
              Drinks: Skåne Akvavit 🥃 • Says: <strong className="text-swedish-blue">"Skål!"</strong>
            </p>
          </motion.div>

          {/* Finnish Player */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card cartoon-border p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-finnish-blue" />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🇫🇮</span>
              <h3 className="font-display text-xl font-bold text-finnish-blue">Finnish Banker</h3>
            </div>
            <input
              type="text"
              value={finnishName}
              onChange={(e) => setFinnishName(e.target.value)}
              placeholder="Player name"
              className="w-full bg-muted font-body text-foreground px-4 py-3 rounded-lg cartoon-border text-lg focus:outline-none focus:ring-2 focus:ring-finnish-blue"
            />
            <p className="font-body text-sm text-muted-foreground mt-2">
              Drinks: Koskenkorva 🥃 • Says: <strong className="text-finnish-blue">"Kippis!"</strong>
            </p>
          </motion.div>
        </div>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => onStart(swedishName, finnishName)}
          className="w-full mt-8 bg-primary text-primary-foreground font-display text-xl font-bold py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform"
        >
          🎶 Let's Sing! 🎶
        </motion.button>
      </motion.div>
    </div>
  );
}
