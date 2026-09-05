import { useEffect, useState } from "react";

export type AwakeStatus = "requesting" | "active" | "paused" | "unsupported" | "denied";
export function useScreenAwake() {
  const [status, setStatus] = useState<AwakeStatus>("requesting");
  useEffect(() => {
    if (!("wakeLock" in navigator)) { setStatus("unsupported"); return; }
    let disposed = false;
    let pending = false;
    let lock: WakeLockSentinel | undefined;
    async function acquire() {
      if (disposed || pending || document.visibilityState !== "visible" || (lock && !lock.released)) return;
      pending = true;
      try {
        const acquired = await navigator.wakeLock.request("screen");
        if (disposed || document.visibilityState !== "visible") { await acquired.release(); return; }
        lock = acquired;
        setStatus("active");
        acquired.addEventListener("release", () => { if (!disposed) setStatus("paused"); });
      } catch { if (!disposed) setStatus("denied"); }
      finally { pending = false; }
    }
    function visibilityChanged() {
      if (document.visibilityState === "visible") void acquire();
      else { setStatus("paused"); void lock?.release().catch(() => {}); }
    }
    void acquire();
    document.addEventListener("visibilitychange", visibilityChanged);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", visibilityChanged);
      void lock?.release().catch(() => {});
    };
  }, []);
  return status;
}
