import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import { bookSongs, readProgress, spotifySearch } from "@/data/songbook";

beforeEach(() => {
  cleanup();
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => data.set(key, value),
    clear: () => data.clear(),
    removeItem: (key: string) => data.delete(key),
  });
});
const mount = () =>
  render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
  );
describe("songbook", () => {
  it("finds a song by its lyrics and opens lyrics with the correct melody search", () => {
    mount();
    fireEvent.change(screen.getByRole("textbox", { name: "Etsi laulua" }), {
      target: { value: "integroin" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /Integraali on valmis Tuiki/ }),
    );
    expect(screen.getByText("Ravun kuoren integroin,")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Etsi melodia Spotifysta/ }),
    ).toHaveAttribute(
      "href",
      spotifySearch(bookSongs.find((s) => s.id === "integraali")!),
    );
  });
  it("awards a song only once and restores the score after reopening the app", () => {
    const app = mount();
    fireEvent.click(screen.getByRole("button", { name: /Avataan ilta/ }));
    fireEvent.click(screen.getByRole("button", { name: "Laulettu! +10 p" }));
    expect(
      screen.getByRole("button", { name: "Laulettu – skål!" }),
    ).toBeDisabled();
    expect(readProgress().sung).toEqual(["helan-gar"]);
    app.unmount();
    mount();
    expect(screen.getByText("10 p")).toBeInTheDocument();
  });
  it("resets the evening only after confirmation and preserves favorites", () => {
    localStorage.setItem(
      "kraftskiva-book-v1",
      JSON.stringify({
        sung: ["helan-gar"],
        favorites: ["rapu-kulta"],
        challenges: [0],
      }),
    );
    mount();
    fireEvent.click(screen.getAllByRole("button", { name: "Illan saldo" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Aloita uusi ilta" }));
    fireEvent.click(screen.getByRole("button", { name: "Jatketaan iltaa" }));
    expect(readProgress().sung).toEqual(["helan-gar"]);
    fireEvent.click(screen.getByRole("button", { name: "Aloita uusi ilta" }));
    fireEvent.click(
      screen.getAllByRole("button", { name: "Aloita uusi ilta" }).at(-1)!,
    );
    expect(readProgress()).toEqual({
      sung: [],
      favorites: ["rapu-kulta"],
      challenges: [],
    });
  });
  it("recovers from malformed saved state and drops unknown ids and duplicates", () => {
    localStorage.setItem("kraftskiva-book-v1", "broken");
    expect(readProgress().sung).toEqual([]);
    localStorage.setItem(
      "kraftskiva-book-v1",
      JSON.stringify({
        sung: ["helan-gar", "helan-gar", "unknown"],
        challenges: [0, 0, 99, "1"],
      }),
    );
    expect(readProgress()).toEqual({
      sung: ["helan-gar"],
      favorites: [],
      challenges: [0],
    });
  });
});

describe('HNKK songbook import', () => {
  it('includes all thirty songs and joins column and page continuations', () => {
    const imported = bookSongs.filter(s => s.collection === 'HNKK');
    expect(imported).toHaveLength(30);
    expect(new Set(bookSongs.map(s => s.id)).size).toBe(bookSongs.length);
    expect(imported.find(s => s.id === 'hnkk-jos-avecisi-kieltaa')?.lyrics).toContain('Maisterit koulussa opettaa,');
    expect(imported.find(s => s.id === 'hnkk-snapsin-kaveri')?.lyrics).toContain('känni silloin suojelee.');
    expect(imported.find(s => s.id === 'hnkk-sorkan-sallit')?.lyrics).toContain('basga haisee, balalaikka soi. :;:');
  });
  it('finds bilingual HNKK lyrics through the Swedish filter and uses honest fallback searches', () => {
    mount();
    fireEvent.click(screen.getByRole('button', {name: 'Ruotsiksi'}));
    fireEvent.change(screen.getByRole('textbox', {name: 'Etsi laulua'}), {target: {value: 'Aqua vera'}});
    expect(screen.getByRole('button', {name: /Aqua vera Terve teille lintuset/})).toBeInTheDocument();
    const unknown = bookSongs.find(s => s.id === 'hnkk-yksijalkainen')!;
    expect(unknown.melodyUncertain).toBe(true);
    expect(decodeURIComponent(spotifySearch(unknown))).toContain('Yksijalkainen');
  });
});
