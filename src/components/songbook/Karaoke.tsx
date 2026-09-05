import { useState } from "react";
import { ArrowLeft, ArrowRight, Monitor } from "lucide-react";
import type { BookSong } from "@/data/songbook";
import { useScreenAwake } from "@/hooks/useScreenAwake";
import { displayRepeats, splitVerses } from "@/lib/verses";
const awakeLabels = {
  requesting: "Pidetään näyttö hereillä…",
  active: "Näyttö pysyy hereillä",
  paused: "Näytön hereilläpito keskeytyi",
  unsupported: "Selain ei tue hereilläpitoa. Tarkista näytön aikakatkaisu.",
  denied: "Hereilläpito ei onnistunut. Tarkista näytön aikakatkaisu.",
};
export default function Karaoke({ song }: { song: BookSong }) {
  const [verse, setVerse] = useState(0);
  const verses = splitVerses(displayRepeats(song.lyrics));
  const awake = useScreenAwake();
  return <section className="karaoke-stage" aria-label="Karaoke" onKeyDown={e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") { e.preventDefault(); setVerse(v => Math.min(verses.length - 1, v + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setVerse(v => Math.max(0, v - 1)); }
  }}>
    <p className="awake-status" role="status"><Monitor size={16}/>{awakeLabels[awake]}</p>
    <div className="karaoke-verse" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">SÄKEISTÖ {verse + 1} / {verses.length}</span>
      <div className="lyrics">{verses[verse].map((line, i) => <p key={i}>{line}</p>)}</div>
    </div>
    <div className="verse-controls">
      <button className="text-button" disabled={verse === 0} onClick={() => setVerse(v => v - 1)}><ArrowLeft size={19}/>Edellinen säkeistö</button>
      <button className="red-button" disabled={verse === verses.length - 1} onClick={() => setVerse(v => v + 1)}>Seuraava säkeistö<ArrowRight size={19}/></button>
    </div>
    <p className="karaoke-help">Vaihda säkeistöä painikkeilla tai nuolinäppäimillä. Jokainen laulaa omaan tahtiin.</p>
  </section>;
}
