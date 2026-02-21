import { motion } from "framer-motion";
import { Song } from "@/data/songs";
import { playGlassClink, playDrumFill } from "@/lib/sounds";
import SpotifyPlayer from "./SpotifyPlayer";

interface HelanGarScreenProps {
  song: Song;
  onFinish: () => void;
}

export default function HelanGarScreen({ song, onFinish }: HelanGarScreenProps) {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-center max-w-lg"
      >
        <motion.span
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl block mb-4"
        >
          🥃
        </motion.span>

        <h1 className="font-display text-5xl font-bold text-primary text-cartoon-shadow mb-2">
          {song.title}
        </h1>
        <p className="font-body text-muted-foreground mb-2">
          🇸🇪🇫🇮 Everyone sings together! 🇫🇮🇸🇪
        </p>
        <p className="font-body text-sm text-primary font-bold mb-6">
          ⭐ 5 points for both teams! ⭐
        </p>

        <div className="bg-card cartoon-border p-6 mb-8">
          {song.lyrics.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              className="font-display text-xl md:text-2xl text-foreground leading-relaxed py-1"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {song.spotifyTrackId && (
          <div className="mb-6">
            <SpotifyPlayer trackId={song.spotifyTrackId} compact />
          </div>
        )}

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => { playGlassClink(); playDrumFill("buildup"); setTimeout(onFinish, 1800); }}
          className="bg-primary text-primary-foreground font-display text-xl font-bold px-10 py-4 rounded-full cartoon-border hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
        >
          🦞 Start the Battle! 🦞
        </motion.button>
      </motion.div>
    </div>
  );
}
