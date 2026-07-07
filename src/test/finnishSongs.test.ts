import { describe, it, expect } from "vitest";
import { finnishSongs } from "@/data/finnishSongs";

describe("finnishSongs catalogue", () => {
  it("has unique ids", () => {
    const ids = finnishSongs.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("has well-formed spotify ids", () => {
    for (const s of finnishSongs) {
      if (s.spotifyTrackId) expect(s.spotifyTrackId).toMatch(/^[A-Za-z0-9]{22}$/);
    }
  });
  it("has non-empty lyrics and melody", () => {
    for (const s of finnishSongs) {
      expect(s.lyrics.filter(l => l.trim()).length).toBeGreaterThan(0);
      expect(s.melody.trim().length).toBeGreaterThan(0);
      expect(s.title.trim().length).toBeGreaterThan(0);
    }
  });
  it("has a full catalogue", () => {
    expect(finnishSongs.length).toBeGreaterThanOrEqual(20);
  });
});
