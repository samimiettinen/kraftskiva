import { motion } from "framer-motion";
import heroImage from "@/assets/hero-crayfish.jpg";
import { playClick, startBackgroundMusic } from "@/lib/sounds";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Hero image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Kräftskiva Party"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <span className="text-6xl mb-4 block">🦞</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary text-cartoon-shadow mb-2">
            Kräftskiva
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Snapsvisa Battle
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-2">
            🇫🇮 Finnish vs Swedish 🇸🇪 Investment Bankers
          </p>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Sing, drink & compete — who can handle the schnapps?
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex flex-col gap-4 items-center"
        >
          <button
            onClick={() => { playClick(); startBackgroundMusic(); onStart(); }}
            className="bg-primary text-primary-foreground font-display text-2xl font-bold px-12 py-5 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
          >
            🥃 Start the Party! 🥃
          </button>

          <div className="flex gap-6 mt-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0 }}
              className="text-center"
            >
              <span className="text-3xl">🇫🇮</span>
              <p className="font-body text-xs text-muted-foreground mt-1">Koskenkorva</p>
              <p className="font-display font-bold text-finnish-blue">"Kippis!"</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="text-center"
            >
              <span className="text-3xl">🦞</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="text-center"
            >
              <span className="text-3xl">🇸🇪</span>
              <p className="font-body text-xs text-muted-foreground mt-1">Skåne Akvavit</p>
              <p className="font-display font-bold text-swedish-blue">"Skål!"</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
