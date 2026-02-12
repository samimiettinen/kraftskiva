import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
  size: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const emojis = ["🦞", "🥃", "⭐", "🎉", "🇸🇪", "🇫🇮", "🎵", "🌟"];
    const items: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 20,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-bounce"
          style={{
            left: `${p.x}%`,
            top: "-40px",
            fontSize: `${p.size}px`,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
