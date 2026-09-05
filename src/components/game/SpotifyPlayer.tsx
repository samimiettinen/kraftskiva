interface SpotifyPlayerProps {
  trackId: string;
  compact?: boolean;
}

export default function SpotifyPlayer({ trackId, compact = false }: SpotifyPlayerProps) {
  const height = compact ? 80 : 152;

  return (
    <iframe
      title="Spotify-melodiasoitin"
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
      width="100%"
      height={height}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl"
      style={{ borderRadius: 12 }}
    />
  );
}
