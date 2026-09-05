import { useState } from "react";
interface SpotifyPlayerProps { trackId: string; compact?: boolean; }
export default function SpotifyPlayer({ trackId, compact = false }: SpotifyPlayerProps) {
  const [approvedTrack, setApprovedTrack] = useState<string | null>(null);
  if (approvedTrack !== trackId) return <div className="rounded border p-4 bg-white text-slate-800 text-sm">
    <p>Spotify-soitin muodostaa yhteyden Spotifyhin ja välittää sille teknisiä tietoja. Lataa soitin vain, jos hyväksyt tämän.</p>
    <button className="mt-3 rounded bg-slate-800 text-white px-4 py-3" onClick={() => setApprovedTrack(trackId)}>Hyväksy ja lataa Spotify-soitin</button>
  </div>;
  return <div><iframe title="Spotify-melodiasoitin" src={`https://open.spotify.com/embed/track/${trackId}?theme=0`} width="100%" height={compact ? 80 : 152} frameBorder="0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-xl"/><button className="text-sm underline p-2" onClick={() => setApprovedTrack(null)}>Sulje Spotify-soitin</button></div>;
}
