import { useCallback, useEffect, useState } from "react";

const PREFIX = "m4t:";

/** Stan zapisywany w localStorage (odczyt po hydracji, by uniknąć niezgodności SSR). */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      setValue(raw ? (JSON.parse(raw) as T) : initial);
    } catch {
      /* ignore */
    }
    const onSync = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (d?.key === key) setValue(d.value);
    };
    window.addEventListener("m4t-sync", onSync);
    return () => window.removeEventListener("m4t-sync", onSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        localStorage.setItem(PREFIX + key, JSON.stringify(v));
        queueMicrotask(() => window.dispatchEvent(new CustomEvent("m4t-sync", { detail: { key, value: v } })));
        return v;
      });
    },
    [key],
  );
  return [value, set] as const;
}

export function useFavorites() {
  const [favs, setFavs] = useStored<string[]>("favs", []);
  const toggle = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  return { favs, toggle, isFav: (id: string) => favs.includes(id) };
}
