import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import Karaoke from "@/components/songbook/Karaoke";
import { bookSongs } from "@/data/songbook";
import { displayRepeats, splitVerses } from "@/lib/verses";
import { useScreenAwake } from "@/hooks/useScreenAwake";
const originalWakeLock = Object.getOwnPropertyDescriptor(navigator, "wakeLock");
afterEach(() => {
  cleanup(); vi.restoreAllMocks();
  if (originalWakeLock) Object.defineProperty(navigator, "wakeLock", originalWakeLock);
  else Reflect.deleteProperty(navigator, "wakeLock");
});
describe("karaoke", () => {
  it("keeps stanza boundaries and normalizes the three source repeat marks", () => {
    expect(splitVerses(["", "A", "B", "", "", "C", ""])).toEqual([["A", "B"], ["C"]]);
    expect(displayRepeats([":,: A", "B :;:", "", ";: C :;:"])).toEqual(["|: A", "B :|", "", "|: C :|"]);
  });
  it("shows one verse at a time and supports keyboard navigation without wrapping", () => {
    render(<Karaoke song={bookSongs.find(s => s.id === "rapupoydan-marssi")!}/>);
    expect(screen.getByText("Kun rapu käy, kun rapu käy,")).toBeInTheDocument();
    expect(screen.queryByText("Kun laulu soi, kun laulu soi,")).not.toBeInTheDocument();
    const next = screen.getByRole("button", {name: "Seuraava säkeistö"});
    fireEvent.keyDown(next, {key: "ArrowRight"});
    expect(screen.getByText("Kun laulu soi, kun laulu soi,")).toBeInTheDocument();
    expect(next).toBeDisabled();
    fireEvent.keyDown(screen.getByRole("button", {name: "Edellinen säkeistö"}), {key:"ArrowLeft"});
    expect(screen.getByText("SÄKEISTÖ 1 / 2")).toBeInTheDocument();
  });
  it("releases the screen lock when leaving karaoke", async () => {
    const release = vi.fn().mockResolvedValue(undefined);
    const request = vi.fn().mockResolvedValue({released:false, release, addEventListener:vi.fn()});
    Object.defineProperty(navigator,"wakeLock",{configurable:true,value:{request}});
    const hook = renderHook(useScreenAwake);
    await waitFor(() => expect(hook.result.current).toBe("active"));
    hook.unmount();
    expect(release).toHaveBeenCalledOnce();
  });
  it("releases a late lock after unmount instead of leaving the screen awake", async () => {
    let resolve: (value: unknown) => void;
    const release = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator,"wakeLock",{configurable:true,value:{request:()=>new Promise(r=>{resolve=r;})}});
    const hook = renderHook(useScreenAwake); hook.unmount();
    await act(async () => resolve({released:false,release,addEventListener:vi.fn()}));
    expect(release).toHaveBeenCalledOnce();
  });
  it("reports a rejected lock honestly", async () => {
    Object.defineProperty(navigator,"wakeLock",{configurable:true,value:{request:()=>Promise.reject(new Error("denied"))}});
    const hook = renderHook(useScreenAwake);
    await waitFor(() => expect(hook.result.current).toBe("denied"));
  });
});
