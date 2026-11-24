import { useEffect, useState } from "react";

export type ThemeMode = "auto" | "light" | "dark";
const KEY = "ayra-theme";

/** Auto mode: light from 07:00 to 17:59 local time, dark otherwise. */
export function themeForHour(hour: number): "light" | "dark" {
  return hour >= 7 && hour < 18 ? "light" : "dark";
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>("auto");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as ThemeMode | null;
    if (saved) setModeState(saved);
  }, []);

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset["theme"] = mode === "auto" ? themeForHour(new Date().getHours()) : mode;
    };
    apply();
    if (mode !== "auto") return;
    const iv = setInterval(apply, 60_000);
    return () => clearInterval(iv);
  }, [mode]);

  const setMode = (m: ThemeMode) => {
    localStorage.setItem(KEY, m);
    setModeState(m);
  };
  const cycle = () => setMode(mode === "auto" ? "light" : mode === "light" ? "dark" : "auto");
  return { mode, setMode, cycle };
}
