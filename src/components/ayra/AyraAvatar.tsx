import { CircleDot, Maximize2, Minimize2 } from "lucide-react";
import ayra from "@/assets/ayra.png.asset.json";

// The portrait always shows the whole face: a blurred copy fills the frame, the sharp portrait is
// "contain"-fitted on top, so any panel size / shape keeps the face fully visible and auto-scaled.
export function AyraAvatar({ big = false, speaking, text, onToggle }: { big?: boolean; speaking: boolean; text?: string | undefined; onToggle?: () => void }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-glow/40 bg-panel glow-ring scan animate-pop [container-type:size]">
      <img src={ayra.url} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover object-top opacity-40 blur-2xl" />
      <img src={ayra.url} alt="AYRA AI agent" className={`absolute inset-0 h-full w-full object-contain object-top ${speaking ? "" : "animate-breathe"}`} />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent p-2" style={{ fontSize: "clamp(10px, 2.6cqw, 14px)" }}>
        <span className="flex items-center gap-1 rounded bg-background/70 px-1.5 font-mono text-glow"><CircleDot className="h-3 w-3 animate-pulse text-destructive" />LIVE · AYRA</span>
        {onToggle && (
          <button onClick={onToggle} className="rounded bg-background/70 p-1 hover:bg-accent" aria-label="Toggle stage">
            {big ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-3">
        <div className="mb-1.5 flex h-4 items-end gap-0.5">
          {Array.from({ length: big ? 32 : 18 }).map((_, i) => (
            <span key={i} className={`w-1 rounded-full bg-glow ${speaking ? "animate-wave" : "opacity-30"}`} style={{ height: "100%", animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <p className="line-clamp-2 text-foreground" style={{ fontSize: "clamp(11px, 3.4cqw, 22px)" }}>{speaking ? "soch rahi hoon…" : text}</p>
      </div>
    </div>
  );
}
