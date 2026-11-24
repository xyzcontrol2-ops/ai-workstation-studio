import { Sun, Moon, SunMoon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { mode, cycle } = useTheme();
  const I = mode === "auto" ? SunMoon : mode === "light" ? Sun : Moon;
  const label = mode === "auto" ? "Auto (time)" : mode === "light" ? "Light" : "Dark";
  return (
    <button onClick={cycle} title={`Theme: ${label} — click to change`} className={`flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent ${className}`}>
      <I className="h-3.5 w-3.5" /><span className="hidden sm:inline">{label}</span>
    </button>
  );
}
